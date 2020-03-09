import React from 'react';
interface InjectProps{
    onClick: Function; 
}
const AuthButton: React.FC<InjectProps> = ({children, onClick}) => {
    return(
        <div className="Auth_Button_Wrapper" onClick={() => onClick()}>
            {children}
        </div>
    );
}

export default AuthButton;