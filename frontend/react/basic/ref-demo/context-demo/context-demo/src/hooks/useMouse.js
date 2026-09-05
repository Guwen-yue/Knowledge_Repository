import { useState,useEffect } from "react"
export const useMouse=()=>{
  const [x,setX]=useState(0);
  const [y,setY]=useState(0);
  const handleMouseMove=(e)=>{
    setX(e.clientX);
    setY(e.clientY);
  }
  useEffect(()=>{
    document.addEventListener("mousemove",handleMouseMove)
    return ()=>{
      // 函数组件写在后，不会主动回收的
      // 定时器
      document.removeEventListener("mousemove",handleMouseMove)
    }
  },[])
  
  return {
    x,
    y
  }
}
