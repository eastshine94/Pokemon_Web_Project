import React from 'react';
import { inject, observer } from 'mobx-react';
import PageStore from '../../stores/Paging';
import PageItem from './PageItem';
import { STORES } from '../../constants';
import '../../css/Base/pagination.css';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

interface InjectedProps {
    [STORES.PAGE_STORE]?: PageStore;
    routeProps : RouteComponentProps;
}

const Pagination: React.FC<InjectedProps> = (props) => { 
    const pageStore = props[STORES.PAGE_STORE] as PageStore;
    const routeProps = props.routeProps;
    const pathName = routeProps.location.pathname;
    const queryParams = routeProps.location.search;
    const query = queryString.parse(queryParams);
    const onPage = (page: number) => {
        pageStore.onPage(page);
        query.page = String(page);
        query.no = undefined;
        routeProps.history.push({
            pathname:pathName, 
            search:queryString.stringify(query)});
    }
    const onFirstPage = async() => {
        await pageStore.onFirstPage();
        query.page = await String(pageStore.currentPage);
        query.no = undefined;
        await routeProps.history.push({
            pathname:pathName, 
            search:queryString.stringify(query)});
    }
    const onPrevPage = async() => {
        await pageStore.onPrevPage();
        query.page = await String(pageStore.currentPage);
        query.no = undefined;
        await routeProps.history.push({
            pathname:pathName, 
            search:queryString.stringify(query)});
    }
    const onNextPage = async() => {
        await pageStore.onNextPage();
        query.page = await String(pageStore.currentPage);
        query.no = undefined;
        await routeProps.history.push({
            pathname:pathName, 
            search:queryString.stringify(query)});
    }
    const onLastPage = async() => {
        await pageStore.onLastPage();
        query.page = await String(pageStore.currentPage);
        query.no = undefined;
        await routeProps.history.push({
            pathname:pathName, 
            search:queryString.stringify(query)});
    }
    const showPage = pageStore.pages.map(page => {
        window.scrollTo(0, 0);
        const pageClassName = page === pageStore.currentPage?  "pagination-item active" : "pagination-item";
        return <PageItem pageClassName={pageClassName} page={page} onPage={() => onPage(page)} key={page} />
    });

    return (
        <div className="pagination">
            <PageItem pageClassName="pagination-item" page={"«"} onPage={onFirstPage} />
            <PageItem pageClassName="pagination-item" page={"<"} onPage={onPrevPage} />
            {showPage}
            <PageItem pageClassName="pagination-item" page={">"} onPage={onNextPage} />
            <PageItem pageClassName="pagination-item" page={"»"} onPage={onLastPage} />
        </div>
    );
}

export default  inject(STORES.PAGE_STORE)(observer(Pagination));