interface Users {
  name: string,
  age: number,
  avatar: string,
}
type UserType = {
  name: string,
  age: number,
  avatar: string,
}

const u1:UserType = {
  name: 'hwq',
  age: 18,
  avatar: 'https://hwq.ai/avatar',
}
interface Person extends Users {

}
// 不用从0开始 ，继承Person
interface Employee extends Person {
 job:string
}
// 类型别名
type PersonType ={name : string}
// type Employee = PersonType & {job:string}