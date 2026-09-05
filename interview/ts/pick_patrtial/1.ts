interface User {
  id: number
  name: string
  age: number,
  email: string,
}
// 有什么特性 一个类型挑选你需要的字段，形成新的类型  ？
// 负责项目，区分度  
type UserPreview =Pick<User,"id"|"name"|"age">
const u: UserPreview ={ 
  id:1,
  name:"张三",
  age:18,
}

// omit 去掉部分字段
type UserSafe = Omit<User,"email">

const safeUser: UserSafe = {
  id:1,
  name:"文强",
  age:18,
}
// 所有字段全部变成可选
type PartialUser = Partial<User>
// patch 修改 对象属性很多
const patchUser: PartialUser = {
  name:"胡文强",
  age:18,
}



const emptyObj: PartialUser = {}
// json key:value Record<键类型，值类型>
type Dicts = Record<string,number>
const dict: Dicts = {
  id:1,
  age:18,
}
// status code
// 1xx 执行中
// 2XX 成功
// 3XX 要跳转
// 4XX 用户错误
// 5xx 服务端错误
console.log(dict)
type ErrorMsgMap =Record<number,string>;
const errorMessage:ErrorMsgMap = {
  400:"请求参数错误",
  401:"未授权，请重新登录",
  403:"拒绝访问，权限不够",
  404:"资源找不到",
  500:"服务器内部错误"
}

function geetErrMsg(code:number):string {
  return errorMessage[code] ?? "未知错误"
}

function fn() {
   return {x:1,y:2}
}
type fnRturn =ReturnType<typeof fn>
// 联合类型 
type All ="id" | "name" | "age" | "email"
type AfteExclude=Exclude<All,"id"|"name">
// Omit ?  

