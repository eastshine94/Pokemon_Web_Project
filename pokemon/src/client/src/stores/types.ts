import {AxiosResponse} from 'axios';
import { Regions, SortKey } from '../../../shared/types/PokeType';
interface Response<T> {
    data: T,
    count?: number,
    msg?: string,
}

export type ApiResponse<T> = AxiosResponse<Response<T>>


export type PokemonUrlDto = { 
    search: string;
    page:string; 
    regions:Regions; 
    orderBy:SortKey;
}

export type BoardUrlDto = { 
    page:string|undefined; 
    no: string|undefined;
}