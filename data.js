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