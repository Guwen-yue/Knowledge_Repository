import * as react from 'react';
import { useState } from 'react';
// interface po{
//   userName:string,
//   onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
// }

interface props {
  // 接口不是json，而是ts的类型申明 以;结尾
  initialUserName: string;
  disabled:boolean;
  editingName: string;

  onNameUpdated:(userName:string)=>void;
  onNameSubmit:(userName:string)=>void;
}
const NameEditComponent:React.FC<props> = (props) => {
  // 表单事件 自己打理 自有状态
  const [enditingName,setEditingName] = useState(props.initialUserName);
  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(event.target.value);
  }
  const onNameSubmit = () => {
    props.onNameSubmit(enditingName);
  }
  return (
      <>
      <label>更新名字:</label>
      <input type="text" value={enditingName} onChange={onChange} />
      <button onClick={onNameSubmit}>Change</button>
      </>
  );
}
export default NameEditComponent;
