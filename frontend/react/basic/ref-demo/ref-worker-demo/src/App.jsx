import {
  useRef,
  useEffect,
  useState
} from 'react'

const App= ()=>{
  console.log("main thread")
  // console.time("for")
  // for(let i=0;i < 10000;i++){
  //     console.log(i)
  // }

  // let worker=workerRef.current
  // 为组件的渲染 挂载让路  
  const workerRef=useRef(null)
  const [result,setResult]=useState("")
  const [loading,setLoading]= useState(false)
  useEffect(() => {
//   开启一个worker 线程 开销比较大的
//   ref 引用了worker 线程
    workerRef.current=new Worker(
      new URL("./worker.js",import.meta.url)
    )
  }, [])
  const startHeavyCalc=()=>{
    setLoading(true)
    // 消息机制
    // 给worker 线程发送一条工作指令，带上参数
    workerRef.current.postMessage({
      num:88
    })
    // 监听worker 线程 有没有消息到达
    workerRef.current.onmessage=(e)=>{
      // console.log(e)
      const {result} = e.data
      setResult(result)
      setLoading(false)
      workerRef.current.terminate()
      workerRef.current=null
    }
  }
  return (
    <div style={{padding:"30px"}}>
      <h2>useRef + web worker 耗时运算</h2>
      <p>开启web worker 线程 执行5亿次循环，结束后通知主线程</p>
      <button onClick={startHeavyCalc} disabled={loading}>
        {loading?"正在后台计算....":"启动繁重计算任务"}</button>
      <p>计算结果：{result}</p>
    </div>
  )
}


export default App
