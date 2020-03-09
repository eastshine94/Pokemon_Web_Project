export type Regions = "All"| "Kanto"| "Johto"| "Hoenn"| "Sinnoh"| "Unova" | "Kalos" | "Alola";
    
export type SortKey = "ID_ASC" | "ID_DESC" | "Alpha_ASC" | "Alpha_DESC";

export interface EvolutionDTO {
    id: number;
    name: string;
}

export interface PokemonDTO {
    id: number;
    name: string;
    image: string;
    types: Array<string>;
    height: number;
    weight: number;
    regions: Regions;
    flavor_text: string;
    evolution: Array<Array<EvolutionDTO>>;
}

