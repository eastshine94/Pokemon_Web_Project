import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { Pagination } from '../../components/Pagination';
import { BoardWrapper, BoardButton,BoardHead ,BoardRow} from '../../components/Board';
import { STORES, PAGE_PATHS } from '../../constants';
import BoardStore from '../../stores/Board';
import { BoardUrlDto } from '../../stores/types';
import BoardContents from './BoardContents';
import '../../css/Board/board.css';

interface InjectedProps extends RouteComponentProps {
    [STORES.BOARD_STORE]: BoardStore;
}

class BoardList extends Component<InjectedProps> {
    constructor(props: InjectedProps){
        super(props);
        const query:BoardUrlDto = queryString.parse(this.props.location.search) as BoardUrlDto;  
        const init = async() => {
            await this.props[STORES.BOARD_STORE].getAllPosts();  
            await this.props[STORES.BOARD_STORE].getParamsfromUrl(query);
        }
        init();  
    }

    componentDidUpdate(prevProps: InjectedProps) {
        if (prevProps.location.search !== this.props.location.search){      
            const query:BoardUrlDto = queryString.parse(this.props.location.search) as BoardUrlDto;
            this.props[STORES.BOARD_STORE].getParamsfromUrl(query);
        }
    }

    render() {
        const boardStore = this.props[STORES.BOARD_STORE];
        const postsList =  boardStore.posts.map(val => <BoardRow routeProps={this.props} {...val} key={val.id}/>);
        const postData = boardStore.postData;
        const onWrite = () => {
            this.props.history.push(PAGE_PATHS.BOARDWRITE);
        }
        return (
            <BoardWrapper title="Community">
                {postData? <BoardContents routeProps={this.props} {...postData} />: ""}
                <table className="table">
                    <BoardHead/>
                    <thead>
                        {postsList}
                     </thead>                    
                </table>
                <div className="boardButtons">
                    <BoardButton title="Write" icon="fa fa-pencil" onClick={onWrite}/>
                </div>
                <Pagination routeProps={this.props}/>
            </BoardWrapper>
        )
    }
}

export default inject(STORES.BOARD_STORE)(observer(BoardList)); 