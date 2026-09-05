import { useRef,
  useEffect,
  useState
 } from 'react'

// function App() {
//   // ref 对象引用  null 初始的时候
//   // 为了他会引用的
//   const [count, setCount] = useState(0)
//   console.log('--------------')
//   const inputRef = useRef(null)
//   useEffect(() => {
//     console.log(inputRef.current)
//     inputRef.current.focus()
//   }, [])
//   return (
//     <>
//       {/* 把用户当小白， 前端的的职责就是打造良好的用户体验，挂载后直接focus input ，不用点一下autoFocus 
//           react 如何持有一个dom 节点对象   */}
//       <input type="text" autoFocus placeholder="请输入用户名" ref={inputRef} />
//       {count}
//       <button onClick={() => setCount(count + 1)}>增加</button>
//     </>
//   )
// } 

const App = () => {
  const numRef=useRef(0); // 引用一个值
  const [,forceRender]=useState(0) // 响应式
  console.log(numRef.current)
  return (
    <>
    <div onClick={() => {numRef.current++;forceRender(numRef.current)}} >{numRef.current}</div>
    </>
  )
}

export default App


