import axios from 'axios';
import Pokemon from '../models/Pokemon';
import logger from '../logger';
import { Regions, EvolutionDTO } from '../../shared/types/PokeType';

interface PokemonResponse {
    id: number,
    species: { name: string },
    types: Array<{ type: { name: string } }>,
    height: number,
    weight: number
}

interface SpeciesResponse {
    evolution_chain: { url: string }
    flavor_text_entries: [{
        flavor_text: string,
        language: { name: string }
    }]
}

interface EvolutionChain {
    evolves_to: Array<EvolutionChain>,
    species: { name: string, url: string }
}

interface EvolutionChainResponse {
    chain: {
        evolves_to: Array<EvolutionChain>,
        species: { name: string, url: string }
    }
}


const updatePokemonList = async () => {
    let nextPokemon = await Pokemon.count().then(c => c + 1);
    while (true) {
        const pokemonData = await getPokemonData(nextPokemon);
        
        if(!pokemonData){
            break;
        }
        const flavorText = await getFlavorTextAndURL(nextPokemon);
        const evolution = await getEvolutionChain(flavorText.evolution_chain_url);
        Pokemon.create({
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.image,
            types: pokemonData.types,
            height: pokemonData.height,
            weight: pokemonData.weight,
            regions: getRegions(pokemonData.id),
            flavor_text: flavorText.text,
            evolution: evolution
        });
        nextPokemon++;
    }
}
const getPokemonData = async (id: number) => {
    const pokemonData: PokemonResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(res => res.data)
        .catch(err => {
            logger.info("There are no Pokemon to add to the dictionary.");
            return false;
        });
    if (!pokemonData) {
        return false;
    }
    const types: Array<string> = [];
    for (var i = 0; i < pokemonData.types.length; i++) {
        types.push(pokemonData.types[i].type.name);
    }
    return {
        id: pokemonData.id,
        name: pokemonData.species.name,
        image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemonData.id).padStart(3,"0")}.png`,
        types: types,
        height: pokemonData.height,
        weight: pokemonData.weight
    }
}


const getFlavorTextAndURL = async (id: number) => {
    const speciesData: SpeciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then(
        res => res.data
    )
    const index = speciesData.flavor_text_entries.find(val => {
        return val.language.name === "en";
    });

    const flavor_text = index ? index.flavor_text : "No features";
    return { text: flavor_text, evolution_chain_url: speciesData.evolution_chain.url };
}

const getEvolutionChain = async (url: string) => {
    const evolutionChain: EvolutionChainResponse = await axios.get(url).then(
        res => res.data
    )
    const chain = evolutionChain.chain;
    const evolutionSequence: Array<Array<EvolutionDTO>> = [];
    
    // 형식에서 벗어난 유일한 포켓몬
    if(url === "https://pokeapi.co/api/v2/evolution-chain/135/"){
        evolutionSequence.push([{ id: Number(chain.species.url.split("/")[6]), name: chain.species.name }]);
        evolutionSequence.push([
            { id: Number(chain.evolves_to[0].species.url.split("/")[6]), 
                name: chain.evolves_to[0].species.name },
            { id: Number(chain.evolves_to[1].species.url.split("/")[6]), 
                name: chain.evolves_to[1].species.name 
            }]);
        evolutionSequence.push([
            { id: Number(chain.evolves_to[0].evolves_to[0].species.url.split("/")[6]), 
                name: chain.evolves_to[0].evolves_to[0].species.name},
            { id: Number(chain.evolves_to[1].evolves_to[0].species.url.split("/")[6]), 
                name: chain.evolves_to[1].evolves_to[0].species.name}
        ]); 
    }
    else {
        //초기
        evolutionSequence.push([{ id: Number(chain.species.url.split("/")[6]), name: chain.species.name }]);
        //1번째 진화
        if (chain.evolves_to.length > 0) {
            const evolutionPart: Array<EvolutionDTO> = [];
            chain.evolves_to.map(val => {
                evolutionPart.push({
                    id: Number(val.species.url.split("/")[6]),
                    name: val.species.name
                });
            })

            evolutionSequence.push(evolutionPart);

            //2번째 진화
            if (chain.evolves_to[0].evolves_to.length > 0) {
                const evolutionPart: Array<EvolutionDTO> = [];
                chain.evolves_to[0].evolves_to.map(val => {
                    evolutionPart.push({
                        id: Number(val.species.url.split("/")[6]),
                        name: val.species.name
                    });
                })
                evolutionSequence.push(evolutionPart);
            }
        }
    }
    return evolutionSequence;
}

const getRegions = (id: number): Regions => {
    if (id <= 151) {
        return "Kanto";
    }
    else if (id <= 251) {
        return "Johto";
    }
    else if (id <= 386) {
        return "Hoenn";
    }
    else if (id <= 493) {
        return "Sinnoh";
    }
    else if (id <= 649) {
        return "Unova";
    }
    else if (id <= 721) {
        return "Kalos";
    }
    else if (id <= 807) {
        return "Alola";
    }
    else {
        return "All";
    }
}

export default updatePokemonList;