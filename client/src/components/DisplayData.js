import React, { useState } from 'react'
import {useQuery, gql, useLazyQuery} from "@apollo/client"

const QUERY_ALL_USERS = gql`
    query GetAllUsers{
        users{
            id
            name
            age
            nationality
        }
    }
`

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies{
        movies{
            name
        }
    }

`

const QUERY_MOVIE_BY_NAME = gql`
    query GetMovieByName($name : String!){
        movie(name: $name){
            name
            year
        }
    }
`

const DisplayData = () => {
    const {data:dataUsers, loading, error} = useQuery(QUERY_ALL_USERS)
    const {data:dataMovies, loading :loadingMovies, error:errorMovies} = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovie, {data:movieSearched, error:errorMovieSearched}] = useLazyQuery(QUERY_MOVIE_BY_NAME )
    const [movie, setMovie] = useState("")

    if(loading){
        return <h1>Loading data...</h1>
    }
    if(dataUsers && dataMovies){
        console.log("users", dataUsers.users)
        console.log("movies: ", dataMovies)
    }
    if(error){
        console.log(error)
    }
    console.log("Movie searched: ", movieSearched)
  return (
    <div>
        {
            dataUsers?.users?.map((data,i)=>(
                <h1>{data.name}</h1>
            ))
        }

        <div>
            <input onChange={(e)=>setMovie(e.target.value)}/>
            <button onClick={()=>fetchMovie({
                variables : {
                    name : movie
                }
            })}>Search</button>
            <div>
                {
                    movieSearched && (
                        <div>
                            {movieSearched.movie.name}
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default DisplayData