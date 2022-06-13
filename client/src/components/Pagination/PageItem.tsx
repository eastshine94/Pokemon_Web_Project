import React from 'react';

interface InjectedProps {
    page: number|string;
    pageClassName: string;
    onPage: Function;
}

const PageItem: React.FC<InjectedProps> = ({page, pageClassName, onPage}) => {
    return(
        <div className={pageClassName} onClick={() => onPage()}> {page} </div>
    )
}

export default PageItem;