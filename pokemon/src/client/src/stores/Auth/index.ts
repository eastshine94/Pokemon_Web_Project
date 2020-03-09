import { observable, action, reaction } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ApiResponse } from '../types';

interface AuthDTO {
    userID: string;
    password: string;
}
export type LoginResponseDTO = {
    token: string;
    id: number;
}
  
export type AuthResponseDTO = {
    id: number;
    userID: string;
}


const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export default class AuthStore {

    @observable token: string | null = window.sessionStorage.getItem('jwt');
    @observable auth: AuthResponseDTO | undefined;
    @observable userID: string = "";
    @observable password: string = "";

    constructor() {
        if (this.token) {
            this.auth = jwtDecode(this.token) as AuthResponseDTO;
        }
    }

    changeToken = reaction(
        () => this.token,
        token => {
            if (token !== null) window.sessionStorage.setItem('jwt', token);
        }
    );

    @action
    login = async() => {
        const body: AuthDTO ={
            userID: this.userID,
            password: this.password,
        }
        const response: ApiResponse<LoginResponseDTO> = await axios.post(`${API_HOST}/auth/login`,body);
        this.setToken(response.data.data.token);
        return response;
    }
    
    isLoggedIn() {
        return this.token !== null;
    }

    @action
    signUp = async(body: AuthDTO) => {
        const response:ApiResponse<AuthResponseDTO> = await axios.post(`${API_HOST}/auth/signup`,body);
        return response;
    }
    
    @action
    logout = () => {
        window.sessionStorage.removeItem('jwt');
        this.token = null;
        this.auth = undefined;
        alert("You have been logged out.");
        window.location.reload();
    }

    @action
    resetLogin = () => {
        this.userID = "";
        this.password = "";
    }

    @action
    setUserID = (userID: string) => {
        this.userID = userID;
    }

    @action
    setPassword = (password: string) => {
        this.password = password;
    }

    @action
    setToken(token: string) {
      this.token = token;
      this.auth = jwtDecode(token) as AuthResponseDTO;
    }
}