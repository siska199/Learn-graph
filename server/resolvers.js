import { UserList, MovieList } from "./data"
const resolvers = {
    Query :{
        users: ()=>{
            return UserList
        },
        user: (parent,args)=>{
            console.log("parent: ", parent)
            console.log("args: ", args)
            const id = args.id
            const user = UserList.find(data=>data.id==id)
            return user
        },
        movies : ()=>{
            return MovieList
        },
        movie  : (parent, args)=>{
            const name = args.name
            const movie = MovieList.find(data=>data.name==name)
            return movie
        }
    },
    User : {
        favoriteMovies : ()=>{
            return MovieList.slice(0,2)
        }
    },
    Mutation : {
        createUser : (parent, args)=>{
            const userData = args.input
            console.log("get User data: ", userData)
            const lastId = UserList.length-1
            UserList.push({
                ...userData,
                id : lastId+1
            })
            return UserList[lastId+1]
        },
        updateUser : (parent,args)=>{
            const userData = args.input
            const index = UserList.findIndex(data=>data.id==userData.id)
            console.log("index: ", index)
            UserList[index] = {
                ...UserList[index],
                ...userData
            }
            console.log("new data: ", UserList[index])
            return UserList[index]
        },
        deleteUser: (parent,args)=>{
            const id = args.id
            console.log(`id data ${id}`)
            const data = UserList.filter(data=>data.id != id)
            return data
        }
    }
}
export default resolvers