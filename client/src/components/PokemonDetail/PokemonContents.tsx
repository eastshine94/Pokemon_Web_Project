import React from 'react';
import PokemonData from './PokemonData';
import {PokemonDTO} from '../../../../shared/types/PokeType'
import CardType from '../Pokemon/CardType';


const PokemonContents: React.SFC<PokemonDTO> = ({image, name, flavor_text, regions, types, height,weight}) => {
    const PokeType = types ? types.map(type => <CardType type={type} key={type} />) : "";
    return (
        <div className="pokemonContent">
            <img className="pokemonImage" src={image} alt={name} />
            <div className="pokemonDetail">
                <h2>Explain</h2>
                <div className="pokemonExplain">{flavor_text}</div>
                <h2>Detail</h2>
                <div className="pokemonDataBlock">
                    <PokemonData title="Height" data={`${height / 10}m`} />
                    <PokemonData title="Regions" data={regions} />
                    <PokemonData title="Weight" data={`${weight / 10}kg`} />
                    <PokemonData title="Types" dataClassName="card_type">{PokeType}</PokemonData>
                </div>
            </div>
        </div>
    )
}

export default PokemonContents;