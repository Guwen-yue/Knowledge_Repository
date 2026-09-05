import {
  useState,useMemo
} from "react";

const RegularChild = ({name}) => {
  
  console.log("RegularChild渲染优化")

  return (
    <div>
      RegularChild
      <p>{name}</p>
    </div>
  )
};



export default RegularChild;
