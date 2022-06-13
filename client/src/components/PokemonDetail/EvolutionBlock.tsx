import React from 'react';
import EvolutionPart from './EvolutionPart';
import { EvolutionDTO } from '../../../../shared/types/PokeType';

interface Props {
    evolutions: Array<Array<EvolutionDTO>>;
    currentId: string;
}

const EvolutionBlock: React.SFC<Props> = ({evolutions, currentId}) => {
    let index:number = 0;
    const renderEvolutions= evolutions ? evolutions.map(evolve => {
        index++;
        const useArrow: boolean = index < evolutions.length? true : false;
        return(
            <EvolutionPart evolution = {evolve} currentId={currentId} useArrow={useArrow} key={evolve[0].id}/>
        );
    }) : "";
    const noEvolveMessage = evolutions && evolutions.length <= 1 ? "This Pokémon does not evolve.": ""
    
    return(
        <div className="evolutionsBlock">
            <h2 className="evolutionsText">Evolutions</h2>
            <h4 className="evolutionsText">{noEvolveMessage}</h4>
            <div className="evolutions">
                {renderEvolutions}
            </div>
        </div>
    )
}

export default EvolutionBlock;