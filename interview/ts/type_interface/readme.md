# ts必考题 之type & interface 的区别
- interface 的开发用法
- 共同点
  interface  和 type 都可以描述对象的结构，
  用于函数和参数，返回值
  interface Users {
  name: string,
  age: number,
  avatar: string,
}

type Usertype {

}

## 区别
- 继承
- 申明的合并
- 接口属性可以分头多次约束，合并
  type不可以重复声明
- 能否表示非对象类型
- 函数类型的区别
  都可以表达，有些区别，type 更方便