import { useEffect, useState } from "react"
import movieDB from "../api/movieBD"
import { Movie, MovieDBMoviesResponse } from "../interfaces/movieInerface"

interface MovieState {
 nowPlaying: Movie[];
 popular: Movie[];
 topRated: Movie[];
 upcoming: Movie[];

}


export const useMovies = () => {

    const [isloading, setIsloading] = useState(true)
    
    const [MovieState, setMovieState] = useState<MovieState>({
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: []
    
    })
    

    const getMovies =  async () => {
       const nowPlayingPromise = await  movieDB.get<MovieDBMoviesResponse>('now_playing');
       const popularPromise = await movieDB.get<MovieDBMoviesResponse>('/popular');
       const topRatedPromise = await movieDB.get<MovieDBMoviesResponse>('/top_rated');
       const upcomingPromise = await movieDB.get<MovieDBMoviesResponse>('/upcoming');
       
       const response = await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise ,
        upcomingPromise
       ])

        setMovieState ({
          nowPlaying: response[0].data.results,
          popular: response[1].data.results,
          topRated: response[2].data.results,
          upcoming: response[3].data.results
        
        })

       setIsloading(false)
    }

    useEffect(() => {
        getMovies();
        
      }, [])
      

  return {
    ...MovieState,
    isloading
}
    
  
}
