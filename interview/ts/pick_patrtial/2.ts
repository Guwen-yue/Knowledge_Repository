interface User {
    id: number
    name: string
    age: number,
    email: string,
}

type userKeys = keyof User

type KeepKeys = Exclude<userKeys,"email">

type MyOmitUser = Pick<User,KeepKeys>;
