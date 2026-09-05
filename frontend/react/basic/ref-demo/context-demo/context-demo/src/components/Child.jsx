import { useTheme } from "../hooks/useTheme"

const Child =()=>{
  const theme=useTheme();
  console.log(theme)
  return (
    <div>
      <h1>Child</h1>
      <button className={theme}>切换主题{theme}</button>
    </div>

  )
}
export default Child;