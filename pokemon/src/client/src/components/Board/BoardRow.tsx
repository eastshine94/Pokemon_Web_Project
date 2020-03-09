import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

interface Props {
    id: number;
    title: string;
    userID: string;
    createdAt: string;
    routeProps: RouteComponentProps;
}

const BoardRow: React.SFC<Props> = ({id, title, userID, createdAt, routeProps}) => {
    const date = new Date(createdAt);
    
    const dateFormat = (date: Date) => {
        const getYear= date.getFullYear();
        const getMonth = (date.getMonth() + 1).toString().padStart(2,"0");
        const getDate = date.getDate().toString().padStart(2,"0");
        return `${getYear}-${getMonth}-${getDate}`
    }
    const onClickTitle = () => {
        const queryParams = routeProps.location.search;
        const query = queryString.parse(queryParams);
        query.no = String(id);
        
        routeProps.history.push({
            pathname: routeProps.location.pathname,
            search: queryString.stringify(query),
        });
    }
    return(
        <tr>
            <td className="colNo">{id}</td>
            <td className="colTitle" onClick={() => onClickTitle()}>{title}</td>
            <td className="colWriter">{userID}</td>
            <td className="colDate">{dateFormat(date)}</td>
        </tr>
    )
}

export default BoardRow;