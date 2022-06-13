import React from 'react';
import { NavLinkProps } from 'react-router-dom';
import { PAGE_PATHS } from '../../constants';
import Menu from './Menu';

const MenuWrapper: React.SFC = () => {
    const homeParams:NavLinkProps = {
        exact:true,
        to: PAGE_PATHS.HOME,
        className: "menuBlock homeBlock",
        activeClassName: "homeActive"
    }
    
    const pokedexParams: NavLinkProps = {
        to: `${PAGE_PATHS.POKEDEX}?orderBy=ID_ASC&page=1&regions=All&search=`,
        className: "menuBlock pokedexBlock",
        activeClassName: "pokedexActive"
    }
    const communityParams: NavLinkProps = {
        to: `${PAGE_PATHS.BOARD}?page=1`,
        className: "menuBlock communityBlock",
        activeClassName: "communityActive"
    }

    return(
        <div className="menu">
            <Menu navLinkParam={homeParams} icon="fa fa-home fa-2x" title="Home"/>
            <Menu navLinkParam={pokedexParams} icon="fa fa-book fa-2x" title="Pokedex"/>
            <Menu navLinkParam={communityParams} icon="fa fa-comments fa-2x" title="Community"/>
        </div>
    )
}

export default MenuWrapper;