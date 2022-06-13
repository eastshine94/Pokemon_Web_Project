import React from 'react';

interface injectedProps{
    title:string;

}

const AuthContents:React.FC<injectedProps> = ({title, children}) => {
    return(
        <div>
            <div className="Auth_Title">{title}</div>
            {children}
        </div>
    );  
}

export default AuthContents;