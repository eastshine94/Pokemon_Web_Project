import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { AuthContents, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import { PAGE_PATHS, STORES } from '../../constants';
import { inject, observer } from 'mobx-react';
import AuthStore from '../../stores/Auth';
import { RouteComponentProps } from 'react-router';

interface InjectedProps extends RouteComponentProps  {
    [STORES.AUTH_STORE]: AuthStore
}

interface SignupDTO{
    userID: string,
    password: string,
    confirmPw: string,
}

class Signup extends Component<InjectedProps> {
    state: SignupDTO = {
        userID: "",
        password: "",
        confirmPw: "",
    }
    render() {
        const authStore = this.props[STORES.AUTH_STORE];
        const changeValue = (v: ChangeEvent<HTMLInputElement>) => {
            this.setState({ [v.target.name]: v.target.value });
        };
        const signUp = async () => {
            const userID = this.state.userID;
            const password = this.state.password;
            const confirm = this.state.confirmPw;
            let errMsg: string | undefined
            if (userID.length < 5) {
                errMsg = "Please enter the ID at least 5 characters.";
            }
            else if (password.length < 5) {
                errMsg = "Please enter a password of at least 5 characters.";
            }
            else if (password !== confirm) {
                errMsg = "Passwords do not match.";
            }

            if (errMsg) {
                alert(errMsg);
                return false;
            }

            try {
                const result = await authStore.signUp({ userID, password });
                alert(result.data.msg);
                this.props.history.push(PAGE_PATHS.LOGIN);
            } catch (err) {
                alert(err.response.data.msg);
            }
        }
        
        const enterKeyPress = (e: KeyboardEvent) => {
            if(e.charCode === 13){
                signUp();
            }
        }

        return (
            <AuthContents title="Sign Up">
                <InputWithLabel label="ID" rest={{
                    name: "userID",
                    placeholder: "ID",
                    value: this.state.userID,
                    onChange: changeValue,
                    onKeyPress: enterKeyPress,
                }} />
                <InputWithLabel label="Password" rest={{
                    name: "password",
                    placeholder: "Password",
                    type: "password",
                    value: this.state.password,
                    onChange: changeValue,
                    onKeyPress: enterKeyPress,
                }} />
                <InputWithLabel label="Confirm Password" rest={{
                    name: "confirmPw",
                    placeholder: "Confirm Password",
                    type: "password",
                    value: this.state.confirmPw,
                    onChange: changeValue,
                    onKeyPress: enterKeyPress,
                }} />
                <AuthButton onClick={signUp}>Sign Up</AuthButton>
                <RightAlignedLink to={PAGE_PATHS.LOGIN}>Login</RightAlignedLink>
            </AuthContents>
        );
    }
}

export default inject(STORES.AUTH_STORE)(observer(Signup));