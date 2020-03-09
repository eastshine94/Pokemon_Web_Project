import React from 'react';
import {Link} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { STORES } from '../../constants';
import AuthStore from '../../stores/Auth';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
interface InjectedProps {
    url: string;
    image: string;
    [STORES.AUTH_STORE]?: AuthStore;
}

const HeaderTitle: React.FC<InjectedProps> = (props) => {
    const authStore = props[STORES.AUTH_STORE] as AuthStore;
    return(
        <div className="headerTitle">
            <Link to={props.url}><img src={props.image} alt={"Pokemon"} className="title"/></Link>
            {authStore.isLoggedIn()? <LogoutButton onClick={authStore.logout}/> : <LoginButton/>}
        </div>
    )
}

export default inject(STORES.AUTH_STORE)(observer(HeaderTitle));