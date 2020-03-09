import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../constants';
import { EvolutionDTO } from '../../../../shared/types/PokeType';

interface InjectedProps extends EvolutionDTO {
    currentId: string;
}


const EvolutionPartContents: React.SFC<InjectedProps> = ({ id, name, currentId }) => {
    const evolutionClassName = id === Number(currentId) ? "evolutionPartContents disabled": "evolutionPartContents"
    return (
        <Link to={`${PAGE_PATHS.POKEDEX}/detail/${id}`} className={evolutionClassName}>
            <img className="evolutionImage" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(id).padStart(3, "0")}.png`} alt="" />
            <div className="evolutionIdName">
                <div className="evolutionId">No. {String(id).padStart(3, "0")}</div>
                <div>{name}</div>
            </div>
        </Link>
    )
}

export default EvolutionPartContents;