// import { useState } from 'react'
//  接口 OOP 核心概念
// 抽象
// js 原型式的，函数一等对象
// ts 大型企业击毙开发强类型语言 类java 传统的OOP思路
// 面向接口的编程 父子组件数据接口
interface Users {
  name: string,
  age: number,
  avatar: string,
}



const UserCard = (props: Users) => {
  interface UserCardProps {
  usesr: Users;
  onEdit : (id :number) => void
}
  // const UserCard:React.FC<UserCardProps>=({usesr,onEdit})
  return (
    <div>
      <h1>UserCard</h1>
    </div>
  )
} 
export default UserCard;

