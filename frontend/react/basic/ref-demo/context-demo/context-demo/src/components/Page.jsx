import Child from "./Child"
import { ThemeContext } from "../ThemeContext"
import { useTheme } from "../hooks/useTheme"




const Page =()=>{
  const theme=useTheme();
console.log(theme)

  return (
    <>
      Page{theme}
      <br />
      <Child/>
    </>
  )
}


export default Page;