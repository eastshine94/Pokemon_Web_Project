import React from 'react';

interface Props {
    title : string;
    children: React.ReactNode;
}

const BoardWrapper: React.SFC<Props> = ({title, children}) => {
    return(
        <div className="boardWrapper">
            <div className="headTitle">{title}</div>
            {children}
        </div>
    )
} 

export default BoardWrapper;