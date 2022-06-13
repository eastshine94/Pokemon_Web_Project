import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { STORES } from '../../constants';
import PokeStore from '../../stores/Pokemon';
import { PreNext,PokemonNameBlock, PokemonContents, EvolutionBlock } from '../../components/PokemonDetail';
import "../../css/Pokemon/pokemonDetail.css";


interface InjectedProps extends RouteComponentProps<{ id: string }> {
    [STORES.POKE_STORE]: PokeStore;
}

class PokemonDetail extends Component<InjectedProps> {

    constructor(props: InjectedProps) {
        super(props);
        props[STORES.POKE_STORE].getPokemonDetail(this.props.match.params.id);
    }

    componentDidUpdate(prevProps: InjectedProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props[STORES.POKE_STORE].getPokemonDetail(this.props.match.params.id);
        }
    }
    render() {
        window.scrollTo(0,0);

        const pokemon = this.props[STORES.POKE_STORE].detailPokemon;
        const prevPokemon = this.props[STORES.POKE_STORE].prePokemon;
        const nextPokemon = this.props[STORES.POKE_STORE].nextPokemon;
    
        return (
            <div className="wrapper">
                <div className={prevPokemon ? "pokemonPreNext" : "pokemonPreNext onlyNext"}>
                    {prevPokemon ? <PreNext blockClassName="previous" {...prevPokemon} /> : ""}
                    {nextPokemon ? <PreNext blockClassName="next" {...nextPokemon} /> : ""}
                </div>
                <PokemonNameBlock {...pokemon}/>
                <PokemonContents {...pokemon}/>
                <EvolutionBlock evolutions={pokemon.evolution} currentId={this.props.match.params.id}/>
            </div>
        )
    }
}


export default inject(STORES.POKE_STORE)(observer(PokemonDetail));