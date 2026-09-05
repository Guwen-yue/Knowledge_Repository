// react 全面hooks编程 ， 可以使用react-router-dom 等提供的hooks ，还可以自定义hook use 开头函数，
// 自己封装的，简单好用，封装比普通函数的封装，多的地方是可以将react 响应式，副作用业务等封装进去
// 在Provider 里面任何层级的组件 多个地方消费数据，模块化抽离放到hooks里面
import {
   ThemeContext
} from "../ThemeContext"
import { 
  useContext // 消费context 
} from "react"

//  约定以use开头
export const useTheme = ()=>{
  return useContext(ThemeContext)
}