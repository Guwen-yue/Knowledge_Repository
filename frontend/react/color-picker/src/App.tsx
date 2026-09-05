import { useState } from "react";
import  ColorBrowser  from "./components/ColorBrowser";
import type { Color} from './model/Color'
import ColorPicker from './components/ColorPicker'
import MemberTable from './components/MemberTable'



function App() {
  // ts 适合大型项目，代码量大
  const [color,setColor] = useState<Color>({
    red:20,
    green:20,
    blue:20,
    })
  return (
    <>
      <ColorBrowser color={color} />
      <ColorPicker color={color} onColorUpdated={setColor} />
      <MemberTable />
    </>
  );
}


export default App;