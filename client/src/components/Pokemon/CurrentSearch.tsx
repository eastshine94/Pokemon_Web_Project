import React from 'react';
import { inject, observer } from 'mobx-react';
import { STORES } from '../../constants';
import PokeStore from '../../stores/Pokemon';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

interface InjectedProps {
    [STORES.POKE_STORE]?: PokeStore;
    routeProps: RouteComponentProps;
}

const CurrentSearch: React.FC<InjectedProps> = (props) => {
    const pokeStore = props[STORES.POKE_STORE] as PokeStore;
    const pokemonSearch = pokeStore.search;
    const routeProps = props.routeProps;
    const query = queryString.parse(routeProps.location.search);

    const onCancel = () => {
        query.search = "";
        query.page = "1";
        const search = queryString.stringify(query);
        routeProps.history.push({
            pathname: routeProps.location.pathname,
            search: search
        });
    }


    return (
        <div className="input_search_block">
            {pokemonSearch ?
                <div className="currentSearch">
                    <span>{pokeStore.search}</span>
                    <i className="fa fa-times-circle cancelButton" onClick={() => onCancel()} />
                </div> : ""}
        </div>
    )
}

export default inject(STORES.POKE_STORE)(observer(CurrentSearch));