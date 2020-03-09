import { observable, action } from 'mobx'

export default class BaseStore {

    @observable menuVisible: boolean = true;

    @action
    setMenuVisible = (visible: boolean) => {
        this.menuVisible = visible;
    }

}