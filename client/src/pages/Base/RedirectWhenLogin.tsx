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


const RedirectWhenLogin: React.FC<InjectedProps> = ({component:Component, redirectTo, path, exact, [STORES.AUTH_STORE]:authStore}) => {
    return(
        <Route
          path={path}
          exact={exact}
          render={(props: any) =>
            authStore!.isLoggedIn() ? <Redirect to={redirectTo}/> : <Component {...props} />
          }
        />
    )
}

export default inject(STORES.AUTH_STORE)(observer(RedirectWhenLogin));