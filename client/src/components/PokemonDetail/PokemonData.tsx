import React from 'react';

interface InjectedProps {
    children?: React.ReactNode;
    dataClassName?: string;
    title: string;
    data?: string;
}
const PokemonData: React.FC<InjectedProps> = ({children, dataClassName, title, data}) => {
    return (
        <div className="pokemonData">
            <div className="pokemonDataTitle">{title}</div>
            <div className={dataClassName}>
                {data ? data : children}
            </div>   
       </div>
    )
}


export default PokemonData;