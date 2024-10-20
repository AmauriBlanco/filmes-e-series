export interface Movie {
    id: number;
    imgSrc: string;
    title: string;
    href: string;
    release_date: string;
    poster_path: string;
}

export interface Serie {
   
    id: number;
    imgSrc: string;
    name: string;
    href: string;
    first_air_date: string;
    poster_path: string;
}

export interface MovieDetailsTypes {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    genres: string[]; 
    vote_average: number;
}


export interface SerieDetailsTypes {
    id: number;
    name: string; 
    poster_path: string;
    first_air_date: string; 
    overview: string;
    genres: string[]; 
    vote_average: number; 
}

export interface RelatedMovie {
    id: number;
    title: string; 
    poster_path: string;
    first_air_date: string; 
    overview: string;
    genres: string[]; 
    vote_average: number; 
}


export interface RelatedMovie {
    id: number;
    title: string; 
    poster_path: string;
    first_air_date: string; 
    overview: string;
    genres: string[]; 
    vote_average: number; 
}

