import React from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';

interface Props {
    icon: string;
    title: string;
    navLinkParam: NavLinkProps;
}

const Menu: React.SFC<Props> = ({ icon, title, navLinkParam}) => {

    return(
        <NavLink {...navLinkParam}>
            <i className={icon}></i>               
            <div className="menuTitle">{title}</div>
        </NavLink>
    )
} 

export default Menu;