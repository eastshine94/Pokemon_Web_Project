import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../constants';

const AuthWrapper: React.FC = ({ children }) => {
    return (
        <div className="Auth_Positioner">
            <div className="Auth_Box">
                <div className="Auth_LogoWrapper">
                    <Link to={PAGE_PATHS.HOME} className="Auth_Logo">
                        <img src="https://pokemonkorea.co.kr/templates/default/style/img/sub_logo_top.png" alt="home"></img>
                    </Link>
                </div>
                <div className="Auth_Contents">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthWrapper;