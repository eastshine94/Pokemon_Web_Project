import React from 'react';

interface Props {
    onClick: Function;
}

const LogoutButton: React.FC<Props> = ({onClick}) => {
    return(
        <div className="authButtion" onClick={()=>onClick()}>
            <i className="fa fa-sign-out fa-1x"/> 
            <span> Logout </span> 
        </div>
    )
}

export default LogoutButton;