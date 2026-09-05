import { useState } from "react";
// 受控组件
const ControlledInput = () => {
  const [value, setValue] = useState("")
  return (
    <div>
      ControlledInput
      <input type="text" value={value} onChange={e=>{
        setValue(e.target.value)
      }}/>
    </div>
  );
};
export default ControlledInput;