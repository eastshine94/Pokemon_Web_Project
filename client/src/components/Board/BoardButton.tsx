import React from 'react';

interface Props {
    title: string;
    icon?: string;
    onClick: Function;
}

const BoardButton: React.SFC<Props> = ({title, icon, onClick}) => {
    return (
        <div className="boardButton" onClick ={() => onClick()}>
            <i className={icon}/> {title}
        </div>
    );
}


export default BoardButton;