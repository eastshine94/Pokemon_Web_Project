import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { AuthContents, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import { PAGE_PATHS,STORES } from '../../constants';
import AuthStore from '../../stores/Auth';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

interface InjectedProps extends RouteComponentProps{
    [STORES.AUTH_STORE]: AuthStore;
}

class Login extends Component<InjectedProps> {
    
    constructor(props: InjectedProps){
        super(props);
        props[STORES.AUTH_STORE].resetLogin();
    }
    
    render() {
        const authStore = this.props[STORES.AUTH_STORE];

        const onChangeID = (event: ChangeEvent<HTMLInputElement>) => {
            authStore.setUserID(event.target.value);
        }

        const onChangePW = (event: ChangeEvent<HTMLInputElement>) => {
            authStore.setPassword(event.target.value);
        }
        const login = async() => {
            const userID = authStore.userID;
            const password = authStore.password;
            let errMsg: string|undefined;
            if (userID.length < 5) {
                errMsg = "Please enter the ID at least 5 characters.";
            }
            else if (password.length < 5) {
                errMsg = "Please enter a password of at least 5 characters.";
            }

            if(errMsg){
                alert(errMsg);
                return false;
            }

            try {
                const result = await authStore.login();
                alert(result.data.msg);
                this.props.history.goBack();
            } catch (err) {
                alert(err.response.data.msg);
            }
        }
        const enterKeyPress = (e: KeyboardEvent) => {
            if(e.charCode === 13){
                login();
            }
        }
        return (
            <AuthContents title="Login">
                <InputWithLabel label="ID" rest={{
                    name: "userID",
                    placeholder: "ID",
                    value: authStore.userID,
                    onChange:onChangeID,
                    onKeyPress:enterKeyPress,
                }} />
                <InputWithLabel label="Password" rest={{
                    name: "password",
                    placeholder: "Password",
                    type: "password",
                    value: authStore.password,
                    onChange:onChangePW,
                    onKeyPress:enterKeyPress,
                }} />
                <AuthButton onClick={login}>Login</AuthButton>
                <RightAlignedLink to={PAGE_PATHS.SIGNUP}>Sign Up</RightAlignedLink>
            </AuthContents>
        );
    }

}

export default inject(STORES.AUTH_STORE)(observer(Login));