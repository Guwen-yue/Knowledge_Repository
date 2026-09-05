import * as react from 'react';


interface props{
  editingName: string;
  initialUserName: string;
  disabled:boolean;
  onNameEditingUpdated:(userName:string)=>void;
  onNameUpdate:(userName:string)=>void;
}

const NameEditComponent:React.FC<props> = (props) => {
    const {
      initialUserName,
      disabled, 
      editingName,
      onNameEditingUpdated,
      onNameUpdate}=props;

  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    onNameEditingUpdated(event.target.value);
  }
  const onNameSubmit = () =>{
    onNameUpdate(initialUserName)  ;
  }

  return (
      <>
      <label>更新名字:</label>
      <input type="text"  onChange={onChange} />
      <button onClick={onNameSubmit}>Reset</button>
      </>
  );
}
export default NameEditComponent;
