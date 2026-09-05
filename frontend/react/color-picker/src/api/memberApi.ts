// 接口文件
import { type MemberEntity } from "../model/member";


export const getMemberCollection =(): Promise<MemberEntity[]> =>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve([
        {
          id:1,
          login:"祖豪",
          avatar_url:"https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/53bf674817fd4ea0a4158bc46c25d382~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgR3VXZW55dWU=:q75.awebp?rk3s=f64ab15b&x-expires=1785948476&x-signature=GHzpr480XeJaeBq2nHjcpwik7LA%3D"
        },
        {
          id:2,
          login:"阿杰",
          avatar_url:"https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/53bf674817fd4ea0a4158bc46c25d382~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgR3VXZW55dWU=:q75.awebp?rk3s=f64ab15b&x-expires=1785948476&x-signature=GHzpr480XeJaeBq2nHjcpwik7LA%3D"
        },
        {
          id:3,
          login:"文强",
          avatar_url:"https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/53bf674817fd4ea0a4158bc46c25d382~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgR3VXZW55dWU=:q75.awebp?rk3s=f64ab15b&x-expires=1785948476&x-signature=GHzpr480XeJaeBq2nHjcpwik7LA%3D"
        }
      ])
    },500)
  })
}
