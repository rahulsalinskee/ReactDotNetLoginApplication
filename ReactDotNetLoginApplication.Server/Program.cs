
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactDotNetLoginApplication.Server.Data;
using ReactDotNetLoginApplication.Server.Models;
using System.Security.Claims;

namespace ReactDotNetLoginApplication.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            /* Register Database Context */
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnectionString")));

            builder.Services.AddAuthorization();

            builder.Services.AddIdentityApiEndpoints<ApplicationUser>().AddEntityFrameworkStores<ApplicationDbContext>();

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();

            app.MapIdentityApi<ApplicationUser>();

            /* Add Endpoints For "Logout" Through Minimal API */
            app.MapPost(pattern: "/logout", handler: async (SignInManager<ApplicationUser> signinManager) =>
            {
                await signinManager.SignOutAsync(); /* Remove all authentication cookies */
                return Results.Ok();
            }).RequireAuthorization();

            /* Add Endpoints For "Ping Auth" Through Minimal API */
            app.MapGet(pattern: "/pingauth", handler: (ClaimsPrincipal userPrincipal) =>
            {
                var email = userPrincipal.FindFirstValue(ClaimTypes.Email); /* Get user email from ClaimsPrincipal */
                return Results.Json(new { Email = email }); /* Return Email as plain text in response */
            }).RequireAuthorization();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();

                app.UseSwaggerUI(option =>
                {
                    option.SwaggerEndpoint(url: "/openapi/v1.json", name: "ReactDotNetLoginApplication v1");
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
