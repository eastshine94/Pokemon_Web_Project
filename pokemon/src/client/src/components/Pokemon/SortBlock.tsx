import React, {ChangeEvent} from 'react';
import { inject, observer } from 'mobx-react';
import { STORES } from '../../constants';
import PokeStore from '../../stores/Pokemon/index';
import { Regions, SortKey } from '../../../../shared/types/PokeType';
import SortWrapper from './SortWrapper';
import RegionsButton from './RegionsButton';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

interface InjectedProps {
    [STORES.POKE_STORE]?: PokeStore;
    routeProps: RouteComponentProps;
}

const SortBlock: React.FC<InjectedProps> = ( props ) => {
    const pokeStore = props[STORES.POKE_STORE] as PokeStore;
    const routeProps = props.routeProps;
    const regions:Array<Regions> = ["All", "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova","Kalos","Alola"];
    const pathName = routeProps.location.pathname;
    const queryParams = routeProps.location.search;
    const query = queryString.parse(queryParams);    
    const setRegions = (area:Regions) => {
        pokeStore.setRegions(area);
        query.page = "1";
        query.regions = area;
        routeProps.history.push(`${pathName}?${queryString.stringify(query)}`);
    }
    const sortRegions = regions.map(area => {
        const buttonClassName = area === pokeStore.regions? "regionsButton regionsButton_primary" :"regionsButton";
        return (<RegionsButton buttonClassName={buttonClassName} name={area} onButtonClick={() => setRegions(area)} key={area}/>);
    });

        
    const sortValueTitle: Array<[SortKey,string]> = [
        ["ID_ASC","Lowest Number(First)"], 
        ["ID_DESC","Highest Number"], 
        ["Alpha_ASC","A-Z"], 
        ["Alpha_DESC","Z-A"]];

    
    const sortOption = sortValueTitle.map(val => {
        const value = val[0];
        const title = val[1];
        return(
            <option value={value} key={value}> 
                {title} 
            </option>
        );
    });

    const onChangeSortOption = (event:ChangeEvent<HTMLSelectElement>) => {
        const value:SortKey =event.target.value as SortKey;
        pokeStore.setOrderBy(value);    
        query.page = "1";
        query.orderBy = value;
        routeProps.history.push(`${pathName}?${queryString.stringify(query)}`);
    }

    return(
        <div className="sort_block">
            <SortWrapper wrapperClassName="regions_wrapper" title="Regions">
                <div className="regions_block">
                    {sortRegions} 
                </div>
            </SortWrapper>
            <SortWrapper wrapperClassName="sortOption_wrapper" title="Sort Option">
                <div className="sortOption_block">
                    <select value={pokeStore.orderBy} name="sortOption" className="sortOption" onChange={onChangeSortOption}>
                        {sortOption}
                    </select>
                </div>
            </SortWrapper>
        </div>
    );
}

export default inject(STORES.POKE_STORE)(observer(SortBlock)); 