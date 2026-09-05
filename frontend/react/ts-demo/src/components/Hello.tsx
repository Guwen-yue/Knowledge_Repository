import * as react from 'react';
// props 需要满足的接口约束
type now_ages= number;
interface Props{
  userName:string;
  // age:now_ages;
  editingName:string;
}

// 
type PropsType = Props;

const Hello:React.FC<PropsType> = (props) => {
  return ( 
      <h1 >Hello {props.userName} , {props.editingName}</h1>
  );
}
export default Hello;
