import React from 'react';

interface Props {
    id: number;
    name : string;
}


const PokemonNameBlock: React.SFC<Props> = ({id, name }) => {
    return(
        <div className="pokemonNameBlock">
            <div className="pokemonName">{name}</div>
            <div className="pokemonId">No. {String(id).padStart(3, "0")}</div>
        </div>
    );
}

export default PokemonNameBlock;