import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Wrapper, CardContents, NullPage } from '../../components/Pokemon';
import PokeStore from '../../stores/Pokemon';
import { Pagination } from '../../components/Pagination';
import { STORES } from '../../constants';
import '../../css/Pokemon/pokemon.css';
import { PokemonUrlDto } from '../../stores/types';
import queryString from "query-string";

interface InjectedProps extends RouteComponentProps{
    [STORES.POKE_STORE]: PokeStore;
}

class Pokemon extends Component<InjectedProps> {
   
    constructor(props:InjectedProps) {
        super(props);
        const query:PokemonUrlDto = queryString.parse(this.props.location.search) as PokemonUrlDto;
        this.props[STORES.POKE_STORE].initPokemon(query);
    }
    
    componentDidUpdate(prevProps: InjectedProps) {
        if (prevProps.location.search !== this.props.location.search){      
            const query:PokemonUrlDto = queryString.parse(this.props.location.search) as PokemonUrlDto;
            this.props[STORES.POKE_STORE].initPokemon(query);
        }
    }

    render() {
        window.scrollTo(0,0);
        const pokemonStore = this.props[STORES.POKE_STORE];
        const renderPage = () => {
            if(pokemonStore.totalNum !== 0) {
                const pokeList = pokemonStore.pokemons.map(pokemon => <CardContents {...pokemon} key ={pokemon.id}/>);
                return pokeList; 
            }
            else
                return <NullPage/>
        }
           
        return (
            <>
                <Wrapper routeProps = {this.props}>
                    {renderPage()}
                </Wrapper>
                <Pagination routeProps = {this.props}/>
            </>
        );
    }

}

export default inject(STORES.POKE_STORE)(observer(Pokemon));