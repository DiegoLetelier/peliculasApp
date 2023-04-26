import { useState, useEffect } from 'react';
import movieDB from '../api/movieBD';
import { MovieFull } from '../interfaces/movieInerface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoading : boolean;
    cast: Cast [];
   movieFull?: MovieFull;
   

}

export const useMovieDetails = (movieId: number) => {
   
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
})

    const getMovieDetails = async () => {
        
        const promiseMovie = await movieDB.get<MovieFull>(`/${movieId}`);
        const promiseCast = await movieDB.get<CreditsResponse>(`/${movieId}/credits`)
        
        const [respMovie, respCast] =  await Promise.all ([promiseMovie, promiseCast])
        
        setState({
        isLoading: false,
        movieFull: respMovie.data,
        cast: respCast.data.cast
        })
    }

    useEffect(()=>{
    
        getMovieDetails();
    
    }, [])

    return {
        ...state
    
    }

}
