import PokeStore from './Pokemon';
import PageStore from './Paging';
import BaseStore from './Base';
import AuthStore from './Auth';
import BoardStore from './Board';
import NoticeStore from './Notice';

export default class RootStore {    
    pageStore = new PageStore();
    pokeStore = new PokeStore(this.pageStore);
    baseStore = new BaseStore();
    authStore = new AuthStore();
    boardStore = new BoardStore(this.authStore, this.pageStore);
    noticeStore = new NoticeStore();
}