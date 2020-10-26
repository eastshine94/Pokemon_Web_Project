import React from 'react';
import { inject, observer } from 'mobx-react';
import { STORES } from '../../constants';
import AuthStore from '../../stores/Auth';
import { Route, Redirect } from 'react-router-dom';

interface InjectedProps {
    [STORES.AUTH_STORE]?: AuthStore;
    component: React.ComponentType<any>;
    redirectTo: string;
    path: string;
    exact?: boolean;
}


const RedirectWhenLogout: React.FC<InjectedProps> = ({component:Component, redirectTo, path, exact, [STORES.AUTH_STORE]:authStore}) => 
{
    const renderPage = (props:any) => {
        if(authStore!.isLoggedIn()){
            return <Component {...props}/> 
        }
        alert("Login is required.");
        return <Redirect to={redirectTo}/>; 
    }
    return(
        <Route
            path={path}
            exact={exact}
            render = {(props:any) => renderPage(props)} 
        />
    )
}

export default inject(STORES.AUTH_STORE)(observer(RedirectWhenLogout));