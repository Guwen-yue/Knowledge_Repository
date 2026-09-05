// useRef
import { useRef } from "react";

const UncontrolledInput = () => {
  const inputRef =useRef(null);
  const handleClick =() =>{
    console.log(inputRef.current.value)
  }
  return (
    <div>
      UncontrolledInput
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>点击获取值</button>
    </div>
  );
};
export default UncontrolledInput;