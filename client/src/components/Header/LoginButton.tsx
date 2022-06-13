import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../constants';

const LoginButton: React.SFC = () => {
    return(
        <Link to={PAGE_PATHS.LOGIN} className="authButtion">
            <i className="fa fa-user fa-1x"/> 
            <span> Login </span> 
        </Link>
    )
}

export default LoginButton;