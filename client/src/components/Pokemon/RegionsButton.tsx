import React from 'react';

interface InjectedProps {
    buttonClassName: string;
    name: string;
    onButtonClick: Function;
}

const RegionsButton:React.FC<InjectedProps> = ({buttonClassName, name, onButtonClick}) => {
    
    return(
        <div className={buttonClassName} onClick={() => onButtonClick() }>{name}</div> 
    )
      
}

export default RegionsButton;