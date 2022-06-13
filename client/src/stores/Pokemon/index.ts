import { observable, action } from 'mobx';
import axios from 'axios';
import PageStore from '../Paging';
import { Regions, SortKey, PokemonDTO } from '../../../../shared/types/PokeType';
import { ApiResponse, PokemonUrlDto } from '../types';
import { PAGE_PATHS } from '../../constants';

const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export default class PokeStore {
    @observable pagestore: PageStore;

    constructor(pagestore: PageStore) {
        this.pagestore = pagestore;
    }
    @observable url: string = `${PAGE_PATHS.POKEDEX}?page=1&search=&regions=All&orderBy=ID_ASC`;
    @observable pokemons: Array<PokemonDTO> = [];
    @observable search: string = "";
    @observable offset: number = 0;
    @observable limit: number = 12;
    @observable totalNum: number = 1;
    @observable regions: Regions = "All";
    @observable orderBy: SortKey = "ID_ASC";
    @observable detailPokemon: PokemonDTO = {} as PokemonDTO;
    @observable prePokemon: PokemonDTO = {} as PokemonDTO;
    @observable nextPokemon: PokemonDTO = {} as PokemonDTO;


    //http://localhost:3001/api/pokemons? searchValue= & regions= & orderBy= & offset=0 & limit=12
    @action
    getPokemons = async () => {
        const response: ApiResponse<Array<PokemonDTO>> = await axios.get(`${API_HOST}/pokemons?search=${this.search}&regions=${this.regions}&orderBy=${this.orderBy}&offset=${this.offset}&limit=${this.limit}`);
        await this.setPokemons(response.data.data);
        await this.setTotalNum(response.data.count as number);
        await this.pagestore.setTotalPage(Math.ceil(this.totalNum / this.limit));
    }
    
    @action
    initPokemon = async(props:PokemonUrlDto) => {
        await this.setSearch(props.search);
        await this.setRegions(props.regions);
        await this.setOrderBy(props.orderBy);
        await this.setOffset(Number(props.page));
        await this.getPokemons();
        const pagesPerPage = this.pagestore.pagesPerPage;
        const firstPage = Number(props.page) % pagesPerPage !== 0 ? 
            Math.floor(Number(props.page)/pagesPerPage) * pagesPerPage + 1 : 
            Number(props.page) - pagesPerPage + 1;
        this.pagestore.setCurrentPage(Number(props.page));
        await this.pagestore.setPages(this.pagestore.range(pagesPerPage, firstPage).filter(pages => pages <= this.pagestore.totalPage));
    }

    @action
    getPokemonDetail = async (id: string) => {
        const pokemon: ApiResponse<PokemonDTO> = await axios.get(`${API_HOST}/pokemons/detail/${id}`);
        const pre: ApiResponse<PokemonDTO> = await axios.get(`${API_HOST}/pokemons/detail/${Number(id) - 1}`);
        const next: ApiResponse<PokemonDTO> = await axios.get(`${API_HOST}/pokemons/detail/${Number(id) + 1}`);

        this.setDetailPokemon(pokemon.data.data);
        if (pre.data) {
            this.setPrePokemon(pre.data.data);
        }
        if (next.data) {
            this.setNextPokemon(next.data.data);
        }

    }

    @action
    setPokemons = (pokemons: Array<PokemonDTO>) => {
        this.pokemons = pokemons;
    }

    @action
    setSearch = (search: string) => {
        this.search = search;
    }

    @action
    setOffset = (page: number) => {
        this.offset = this.limit * (page - 1);
    }

    @action
    setTotalNum = (num: number) => {
        this.totalNum = num;
    }

    @action
    setRegions = (regions: Regions) => {
        this.regions = regions;
    }

    @action
    setOrderBy = (orderBy: SortKey) => {
        this.orderBy = orderBy;

    }

    @action
    setDetailPokemon = (pokemon: PokemonDTO) => {
        this.detailPokemon = pokemon;
    }
    @action
    setPrePokemon = (pokemon: PokemonDTO) => {
        this.prePokemon = pokemon;
    }
    @action
    setNextPokemon = (pokemon: PokemonDTO) => {
        this.nextPokemon = pokemon;
    }
}