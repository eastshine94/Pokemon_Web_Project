import React, { Component } from 'react';
import { BoardWrapper, BoardButton } from '../../components/Board';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer} from 'mobx-react';
import { PAGE_PATHS, STORES } from '../../constants';
import BoardStore from '../../stores/Board';
import queryString from 'query-string';

interface InjectedProps extends RouteComponentProps {
    [STORES.BOARD_STORE]: BoardStore;
}

class BoardModify extends Component<InjectedProps> {
    state = {
        title: "",
        contents: "",
    }
    constructor(props: InjectedProps) {
        super(props);
        const query = queryString.parse(props.location.search);
        const no = Number(query.no);
        const init = async() => {
            await props[STORES.BOARD_STORE].getPostData(no);
            const postData = await props[STORES.BOARD_STORE].postData;

            if(postData?.userID !== props[STORES.BOARD_STORE].authStore.auth?.userID){
                alert("You do not have permission.");
                props.history.push(`${PAGE_PATHS.BOARD}?page=1`);
                return false;
            }

            await this.setState({
                title: postData?.title,
                contents: postData?.contents
            });
        }
        init();
    }

    render() {
        const boardStore  = this.props[STORES.BOARD_STORE];
        const query = queryString.parse(this.props.location.search);
        const no = Number(query.no);    
        const confirm = async() => {
            if(!this.state.title){
                alert("Please enter the title.");
                return false;
            }
            if(!this.state.contents){
                alert("Please enter the postData.");
                return false;
            }
            const is_ok = window.confirm("Would you like to modify?");
            if(is_ok){
                try{
                    const result = await boardStore.updatePost(no, {...this.state});
                    alert(result.data.msg);
                    this.props.history.push(`${PAGE_PATHS.BOARD}?page=1`);
                }
                catch(err){
                    alert(err.response.data.msg);
                }
                
            }
        }

        const cancel = () => {
            const is_ok = window.confirm("Are you sure you want to cancel modifying?");
            if(is_ok){
                this.props.history.push(`${PAGE_PATHS.BOARD}?page=1`);
            }
        }
        return (
            <BoardWrapper title="Modify">
                <div className="formContents">
                    <input type="text" className="formData" value={this.state.title} placeholder="Please enter the title" onChange={v => this.setState({ title: v.target.value })} />
                </div>
                <div className="formContents">
                    <textarea className="formData writeContents" value={this.state.contents} placeholder="Please enter your postData." onChange={v => this.setState({ contents: v.target.value })} />
                </div>
                <div className="boardButtons">
                    <BoardButton title="Confirm" onClick={() => confirm()}/>
                    <BoardButton title="Cancel" onClick={() => cancel()}/> 
                </div>
            </BoardWrapper>
        );
    }
}


export default inject(STORES.BOARD_STORE)(observer(BoardModify));