import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {BoardButton} from '../../components/Board';
import BoardStore from '../../stores/Board';
import { STORES, PAGE_PATHS } from '../../constants';
import { RouteComponentProps } from 'react-router';

interface Props {
    id: number;
    title: string;
    userID: string;
    createdAt: string;
    contents: string;
    [STORES.BOARD_STORE]?: BoardStore;
    routeProps : RouteComponentProps;
}
class BoardContents extends Component<Props> {
    render() {
        const boardStore = this.props[STORES.BOARD_STORE] as BoardStore;
        const visibleButtons = boardStore.authStore.auth?.userID === this.props.userID ? true : false; 
        
        const onDelete = async() => {
            const is_ok = window.confirm("Would you like to delete?");
            if(is_ok){
                try{
                    const result = await boardStore.deletePost(this.props.id);
                    alert(result.data.msg);
                    this.props.routeProps.history.push(`${PAGE_PATHS.BOARD}?page=1`);
                }catch(err){
                    alert(err.response.msg);
                }
            }
        }

        const onModify = async() => {
            const is_ok = window.confirm("Would you like to modify?");
            if(is_ok){
                this.props.routeProps.history.push(`${PAGE_PATHS.BOARDMODIFY}?no=${this.props.id}`);
            }

        }
        const onWrite = () => {
            this.props.routeProps.history.push(PAGE_PATHS.BOARDWRITE);
        }
        return(
            <div className="boardContentsWrapper">
                <div className ="boardContentHeader">
                    <div className="boardTitle">{this.props.title}</div>
                    <div>
                        <span className="boardUser">{this.props.userID}</span>
                        <span className="boardDate">{this.props.createdAt.substring(0,10)}</span>
                    </div>
                </div>
                <div className="boardContents">
                    {this.props.contents}
                </div>
                <div className="boardButtons">
                    {visibleButtons? <BoardButton title="Delete" icon="fa fa-trash" onClick={onDelete}/> : ""}
                    {visibleButtons? <BoardButton title="Modify" icon="fa fa-edit" onClick={onModify}/> : ""}
                    <BoardButton title="Write" icon="fa fa-pencil" onClick={onWrite}/>
                </div>
            </div>
        )
    }
    
}

export default inject(STORES.BOARD_STORE)(observer(BoardContents));

