import { UserList } from "./data"
const resolvers = {
    Query :{
        users: ()=>{
            return UserList
        },
        user: (parents,args)=>{
            console.log("parents: ", parents)
            console.log("args: ", args)
            const id = args.id
            const user = UserList.find(data=>data.id==id)
            return user
        }
    }
}
export default resolvers