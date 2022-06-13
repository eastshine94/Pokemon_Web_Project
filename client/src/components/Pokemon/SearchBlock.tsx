import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { inject, observer } from 'mobx-react';
import PokeStore from '../../stores/Pokemon';
import { STORES } from '../../constants';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';

interface InjectProps{
    [STORES.POKE_STORE]?: PokeStore;
    routeProps: RouteComponentProps;
}

const SearchBlock:React.FC<InjectProps> = (props) => {
    const PokeStore = props[STORES.POKE_STORE] as PokeStore;
    const routeProps = props.routeProps;
    const [currentSearch, setCurrentSearch] = useState("");
    
    const pathName = routeProps.location.pathname;
    const queryParams = routeProps.location.search;
    const query = queryString.parse(queryParams);
    
    const changeSearch = (v: ChangeEvent<HTMLInputElement>) => {
        setCurrentSearch(v.target.value);
    };

    const onSearch = () => {
        PokeStore.setSearch(currentSearch);
        query.page = "1";
        query.search = currentSearch;
        routeProps.history.push(`${pathName}?${queryString.stringify(query)}`);
        setCurrentSearch("");
    }
    
    const enterKeyPress = (e: KeyboardEvent) => {
        if(e.charCode === 13){
            onSearch();
        }
    }
    return(
        <div className="input_search_block">
                <input 
                    className="input_search"
                    type="text"
                    value= {currentSearch}
                    onChange= {changeSearch}
                    onKeyPress= {enterKeyPress}
                    placeholder="Please enter Pokemon number, name or type for searching."
                />
                <button className="search_button" onClick={onSearch}>Search</button>
        </div>
    );
}

export default inject(STORES.POKE_STORE)(observer(SearchBlock));