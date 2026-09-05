// 全局负责 提供用户身份状态管理
// 创建store 
import { create } from 'zustand'
// hooks编程 自定义hooks 
export const useAuthStore =create(set=> ({
// set 修改状态的方法
  token:localStorage.getItem('token') ||  "",
  user: JSON.parse(localStorage.getItem('user')) ||  null,
  // actions
  setAuth:({token,user})=>{
    set({token,user})
  },
  logout:()=>{
    set({token:"",user:null})
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}))
