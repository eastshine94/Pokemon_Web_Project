import React from 'react';

interface InjectedProps {
    children:React.ReactChild;
    wrapperClassName:string, 
    title: string
}


const SortWrapper:React.FC<InjectedProps> = ({children,wrapperClassName,title}) => {
    return(
        <div className={wrapperClassName}>
        <div className="sort_title">{title}</div>
            {children}
        </div>
    );
}

export default SortWrapper; 