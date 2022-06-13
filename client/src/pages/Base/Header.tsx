import React from 'react';
import { PAGE_PATHS, STORES } from '../../constants';
import {HeaderTitle, MenuWrapper} from '../../components/Header';
import { inject, observer } from 'mobx-react';
import BaseStore from '../../stores/Base';
import '../../css/Base/header.css';
interface InjectedProps {
    [STORES.BASE_STORE]?: BaseStore; 
}

const Header: React.FC<InjectedProps> = (props) => {
    const baseStore = props[STORES.BASE_STORE] as BaseStore;

    return (
        <div className="headerWrapper">
            <HeaderTitle url={PAGE_PATHS.HOME} image="https://pokemonkorea.co.kr/templates/default/style/img/sub_logo_top.png" />
            {baseStore.menuVisible? <MenuWrapper/> : ""}
        </div>
    );
}


export default inject(STORES.BASE_STORE)(observer(Header));