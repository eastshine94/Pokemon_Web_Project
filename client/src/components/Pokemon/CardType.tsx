import React from 'react';

interface InjectedProps{
    type: string
}

const CardType: React.FC<InjectedProps> = ({type}) => { 
    return(
        <div className={`types ${type}`}> {type} </div>            
    );
}

export default CardType;