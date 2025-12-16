import React from 'react';
import AuthorizeView, { AuthorizedUser } from '../Components/AuthorizeView';
import LogoutLink from '../Components/LogoutLink';
import WeatherForecast from '../Components/WeatherForecast';

export default function Home() {
    return (
        <AuthorizeView>
            <span>
                <LogoutLink>
                    Logout <AuthorizedUser value="email" />
                </LogoutLink>
            </span>
            <WeatherForecast />
        </AuthorizeView>
    )
}
