import React from 'react';
import {Link} from 'react-router-dom';
import {PAGE_PATHS} from '../../constants'
import CardType from './CardType';
import CardText from './CardText';
import { PokemonDTO } from '../../../../shared/types/PokeType';


const CardContents: React.FC<PokemonDTO> = (pokemon) => {

    const PokeType = pokemon.types.map(type => <CardType type = {type} key={type}/>);
    return (
        <Link to={`${PAGE_PATHS.POKEDEX}/detail/${pokemon.id}`} className="card_content">
            <div className="card_number">
                No. <span className="number">{String(pokemon.id).padStart(3,"0")}</span>
            </div>
            <img className="card_img" src={pokemon.image} alt={pokemon.name} />
            <div className="card_name">{pokemon.name}</div>
            <div className="card_type">
                {PokeType}
            </div>
            <div className="card_text">
                <CardText title="Height" value ={`${pokemon.height/10}m`}/>
                <CardText title="Weight" value ={`${pokemon.weight/10}kg`}/>
            </div>
        </Link>

    );
}

export default CardContents;