// todos状态的子仓

import { create } from 'zustand'
// create 是一个高阶函数 返回值也是一个函数
export const useTodosStore = create(set=> ({
  todos:[]
}))
