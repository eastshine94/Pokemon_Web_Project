import React from 'react';

interface InjectedProps {
    title: string;
    value: string;
}

const CardText: React.FC<InjectedProps> = ({title, value}) => {
    return (
        <div className="card-text-contents">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    )
}

export default CardText;