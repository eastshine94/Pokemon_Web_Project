import React from 'react';
import {EvolutionDTO} from '../../../../shared/types/PokeType';
import EvolutionPartContents from './EvolutionPartContents';

interface InjectedProps {
    evolution: Array<EvolutionDTO>;
    currentId : string;
    useArrow: boolean;
}

const EvolutionPart: React.SFC<InjectedProps> = ({evolution, currentId, useArrow}) => {
    const contents = evolution.map(val => <EvolutionPartContents {...val} currentId ={currentId} key={val.id}/>);
    return(
        <>
            <div className="evolutionPart">
                {contents};
            </div>
            {useArrow? <div className ="evolutionArrow"> → </div> : ""} 
        </>
    )
}

export default EvolutionPart;