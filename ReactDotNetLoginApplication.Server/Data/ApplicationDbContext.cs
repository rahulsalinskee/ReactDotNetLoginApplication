using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactDotNetLoginApplication.Server.Models;

namespace ReactDotNetLoginApplication.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*
            *  Customize the ASP.NET Identity model and override the defaults if needed.
            *  For example, you can rename the ASP.NET Identity table names and more.
            *  Add your customizations after calling base.OnModelCreating(modelBuilder);
            */
        }
    }
}
