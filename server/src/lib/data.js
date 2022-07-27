export const UserList = [
    ...Array(10)
].map((_,i)=>(
    {
        id : i,
        name: `name${i}`,
        age : 20+i,
        nationality : `CANADA`,
        friends : [...Array(1)].map((_,i)=>({
            id : i,
            name: `name${i}`,
            age : 20+i,
        }))
    }
))

export const MovieList = [
    ...Array(10)
].map((_,i)=>({
    id : i,
    name : `name movie ${i}`,
    year : 2000+i,
    isInTheathers: i%2==0?true:false

}))