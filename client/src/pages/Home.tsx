import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { STORES } from '../constants';
import {NoticePost} from '../components/Home';
import NoticeStore from '../stores/Notice';
import '../css/Base/home.css'

interface InjectedProps {
    [STORES.NOTICE_STORE]: NoticeStore;
}


class Home extends Component<InjectedProps> {
    constructor(props: InjectedProps){
        super(props);
        props[STORES.NOTICE_STORE].getAllNotice();
    }
    render() { 
        const noticeStore = this.props[STORES.NOTICE_STORE];
        const renderNotice = noticeStore.notices.map(notice => <NoticePost {...notice} key={notice.id}/>)

        return (
            <div className = "homeWrapper">
                <img className="homeImage" src="https://assets.pokemon.com/assets//cms2/img/video-games/_tiles/pokemon-mystery-dungeon-rescue-team-dx/launch/pokemon-mystery-dungeon-rescue-team-dx-875-animated-en.gif" alt="home"></img>
                <div className="noticeBlock">
                    {renderNotice}
                </div>
            </div>
        );
    };
}


export default inject(STORES.NOTICE_STORE)(observer(Home));