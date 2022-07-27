import React from 'react'
import {useQuery, gql} from "@apollo/client"

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

const DisplayData = () => {
    const {data:dataUsers, loading, error} = useQuery(QUERY_ALL_USERS)
    const {data:dataMovies, loading :loadingMovies, error:errorMovies} = useQuery(QUERY_ALL_MOVIES)
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
  return (
    <div>
        {
            dataUsers?.users?.map((data,i)=>(
                <h1>{data.name}</h1>
            ))
        }
    </div>
  )
}

export default DisplayData