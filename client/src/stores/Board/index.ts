import { observable, action } from 'mobx';
import axios from 'axios';
import { ApiResponse, BoardUrlDto } from '../types';
import AuthStore from '../Auth';
import PageStore from '../Paging';


interface RegistrationDTO{
    title : string;
    contents: string;
}
interface PostDTO {
    id: number;
    title : string;
    userID: string;
    contents: string;
    createdAt: string;
}

const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export default class BoardStore {
    @observable authStore: AuthStore;
    @observable pageStore: PageStore;
    @observable posts:Array<PostDTO> = [];
    @observable cursor: number = 99999999;
    @observable postData: PostDTO|undefined;

    constructor(authStore: AuthStore, pageStore:PageStore) {
        this.authStore = authStore;
        this.pageStore = pageStore;
    }
   
    @action
    registration  = async(body: RegistrationDTO) => {
        if (this.authStore.auth == null) {
          throw new Error('need to login!');
        }
        const sendData = {
            userID: this.authStore.auth.userID,
            ...body
        }
        const response:ApiResponse<PostDTO> = await axios.post(`${API_HOST}/board`, sendData);
        
        return response; 
    }
    @action
    deletePost = async(no: number) => {
        const response:ApiResponse<PostDTO> = await axios.post(`${API_HOST}/board/delete?no=${no}`);
        return response;
    }

    @action
    updatePost = async(no: number, body:RegistrationDTO) => {
        if (this.authStore.auth == null) {
            throw new Error('need to login!');
        }
        const response:ApiResponse<PostDTO> = await axios.post(`${API_HOST}/board/modify?no=${no}`, body);
        return response;
    }
    @action
    getAllPosts = async() => {
        const response:ApiResponse<Array<PostDTO>> = await axios.get(`${API_HOST}/board`);
        const count = await response.data.count as number;
        await this.setPosts(response.data.data);
        await this.pageStore.setTotalPage(Math.ceil(count/15));
        if(this.posts.length > 0) {
            await this.setCursor(this.posts[0].id);
        }
    }

    @action
    getPosts = async() => {
        const response:ApiResponse<Array<PostDTO>> = await axios.get(`${API_HOST}/board?cursor=${this.cursor}&page=${this.pageStore.currentPage}`);
        await this.setPosts(response.data.data);
    }
    @action
    getPostData = async(num: number|undefined) => {
        if(num){
            const response: ApiResponse<PostDTO> = await axios.get(`${API_HOST}/board/${num}`);
            this.postData = response.data.data;
        }
        else {
            this.postData = undefined;
        }
    }
    @action
    getParamsfromUrl = async(props: BoardUrlDto) => {
        const page:number = props.page ? Number(props.page) : 1;
        const pagesPerPage = this.pageStore.pagesPerPage;
        const firstPage = page % pagesPerPage !== 0 ? 
            Math.floor(page/pagesPerPage) * pagesPerPage + 1 : 
            page - pagesPerPage + 1;
        await this.pageStore.setCurrentPage(page);
        await this.pageStore.setPages(this.pageStore.range(pagesPerPage, firstPage).filter(pages => pages <= this.pageStore.totalPage));
    
        const no: number|undefined = props.no ? Number(props.no): undefined;
        
        await this.getPostData(no);
      
        if(page === 1){
            await this.getAllPosts();
        }
        else {
            await this.getPosts();
        }  
    }

  

    @action
    setPosts = (posts:Array<PostDTO>) => {
        this.posts = posts;
    }
    @action
    setCursor = (cursor: number) => {
        this.cursor = cursor;
    }

   
}
