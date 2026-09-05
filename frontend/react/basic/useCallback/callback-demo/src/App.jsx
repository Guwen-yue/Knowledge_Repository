import {
  useState,useMemo
} from "react";
import RegularChild from "./components/RegularChild.jsx"
import MemoChild from "./components/MemoChild.jsx"



const App = () => {
  const [count,setCount] = useState(0)
  const [name,setName] = useState("少林队")
  console.log("组件渲染优化")

  return (
    <div>
      <button onClick={()=>{
        setCount(count+1)
      }}>点击{count}</button>
      <button onClick={()=>{
        setName("峨眉队")
      }}>点击设置姓名{name}</button>
      <RegularChild  name={name}/>
      <MemoChild  name={name}/>
    </div>
  );
};



export default App;
