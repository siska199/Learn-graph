import React, { useState } from 'react'
import {useQuery, gql, useLazyQuery, useMutation} from "@apollo/client"

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
const MUTATION_CREATE_USER = gql`
    mutation CreateUser($input : CreateUserInput!){
        createUser(input : $input){
            name,
            id
        }
    }

`   
const DisplayData = () => {
    const {data:dataUsers, loading, refetch,error} = useQuery(QUERY_ALL_USERS)
    const {data:dataMovies, loading :loadingMovies, error:errorMovies} = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovie, {data:movieSearched, error:errorMovieSearched}] = useLazyQuery(QUERY_MOVIE_BY_NAME )
    const [movie, setMovie] = useState("")
    const [form, setForm] = useState({
        name : "",
        age:0
    })
    const [createUser, {}] = useMutation(MUTATION_CREATE_USER)
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
    const handleOnChange=(e)=>{
        const newForm = {
            ...form,
            [e.target.name] : e.target.name=="age"?Number(e.target.value):e.target.value
        }
        console.log("newForm: ", newForm)
        setForm(newForm)
    }
    const handleOnSubmit = ()=>{
        console.log("form: ", form)
        createUser({
            variables : {input : form}
        })
        refetch()
    }
  return (

    <div>
        <div>
            <input type="text" name="name" placeholder='name' onChange={(e)=>handleOnChange(e)}/>
            <input type="number" name="age" placeholder='age' onChange={(e)=>handleOnChange(e)}/>
            <button onClick={()=>handleOnSubmit()}>Add User</button>
        </div>
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