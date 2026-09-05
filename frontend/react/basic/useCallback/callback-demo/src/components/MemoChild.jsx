import {
  useState,useMemo,memo
} from "react";

const MemoChild = memo(({name}) => {
  
  console.log("MemoChild渲染优化")

  return (
    <div>
      <p> Hello,{name}</p>
    </div>
  )
});



export default MemoChild;
