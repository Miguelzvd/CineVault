export interface IMidiaContent {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    id?: number;
  }
  
  export interface IMidiaContentResponse {
    Search: IMidiaContent[];
    totalResults: string;
    Response: string;
  }