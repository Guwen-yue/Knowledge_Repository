// const App=()=>{
//   return (
//     <>
//     <Parent>
//       <Child>
//         <GrandChild>
//           <GrandGrandChild></GrandGrandChild>
//         </GrandChild>
//       </Child>
//     </Parent>
//     </>
//   )
// }
import {
  ThemeContext
} from "./ThemeContext"
import { useState,useContext } from "react"
import Page from "./components/Page"

const App=()=>{
  const [theme,setTheme]=useState("light");
  return (
    // 上下文的提供者 容器
    // 并不是需要全局，任何地方作为容器
    // 默认值 light 可以通过 value 来改变
    <ThemeContext.Provider value={theme}>
      <Page/>
      <button onClick={()=>setTheme("dark")}>切换主题{theme}</button>
    </ThemeContext.Provider>
  )
}
export default App;