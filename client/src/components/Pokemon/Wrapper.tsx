import React from 'react';
import SearchBlock from './SearchBlock';
import CurrentSearch from './CurrentSearch';
import SortBlock from './SortBlock';
import { RouteComponentProps } from 'react-router';


interface Props {
    children: React.ReactNode;
    routeProps: RouteComponentProps;
}
const Wrapper: React.FC<Props> = ( {children, routeProps} ) => {
    return (
        <div className="wrapper">
            <SearchBlock routeProps = {routeProps}/>
            <CurrentSearch routeProps = {routeProps}/>
            <SortBlock routeProps = {routeProps}/>
            <div className="card_wrapper">
                {children}
            </div>
        </div>
    );
}

export default Wrapper;