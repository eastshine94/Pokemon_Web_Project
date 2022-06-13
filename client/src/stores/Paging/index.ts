import { observable, action } from 'mobx';

export default class PageStore {

    range = (length: number, startAt: number) => {
        return [...Array(length).keys()].map(val => val + startAt);
    }

    @observable currentPage: number = 1;
    @observable totalPage: number = 0;
    @observable pagesPerPage: number = 5;
    @observable pages: number[] = [];

    
    @action
    onNextPage = () => {
        if (this.pages.length > 0) {
            const nextFirstPage = this.pages[0] + this.pagesPerPage;
            if (nextFirstPage <= this.totalPage) {
                const nextPages = this.pages.filter(page => page + this.pagesPerPage <= this.totalPage)
                    .map(page => page + this.pagesPerPage);
                this.setPages(nextPages);
                this.setCurrentPage(nextFirstPage);
            }
        }
    }

    @action
    onPrevPage = () => {
        if (this.pages.length > 0) {
            const prevFirstPage = this.pages[0] - this.pagesPerPage;
            if (prevFirstPage > 0) {
                const prevPages = this.range(this.pagesPerPage, prevFirstPage).filter(page => page <= this.totalPage);
                this.setPages(prevPages);
                this.setCurrentPage(prevFirstPage + this.pagesPerPage - 1);
            }
        }
    }

    @action
    onFirstPage = () => {
        if (this.pages.length > 0) {
            if (this.currentPage !== 1) {
                if (this.pages[0] > 1) {
                    const firstPages = this.range(this.pagesPerPage, 1).filter(page => page <= this.totalPage);
                    this.setPages(firstPages);
                }
                this.setCurrentPage(1);
            }
        }
    }

    @action
    onLastPage = () => {
        if (this.pages.length > 0) {
            if (this.currentPage !== this.totalPage) {
                const FirstInLastPage = Math.floor((this.totalPage - 1) / this.pagesPerPage) * this.pagesPerPage + 1;
                
                if(FirstInLastPage > this.currentPage){
                    const LastPages = this.range(this.pagesPerPage, FirstInLastPage).filter(page => page <= this.totalPage);
                    this.setPages(LastPages);
                }
                this.setCurrentPage(this.totalPage);
            }
        }
    }

    @action
    onPage = (page: number) => {
        this.setCurrentPage(page);
    }

    @action
    setPages = (pages: number[]) => {
        this.pages = pages;
    }

    @action
    setCurrentPage = (page: number) => {
        this.currentPage = page;
    }

    @action
    setTotalPage = (num: number) => {
        this.totalPage = num;
    }

    @action
    setPagesPerPage = (num: number) => {
        this.pagesPerPage = num;
    }
}
