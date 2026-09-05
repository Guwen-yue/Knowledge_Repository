import * as react from 'react';
import { useState, useEffect } from 'react';
import Hello from "./components/Hello";
import NameEditComponent from "./components/NameEdit";


const App:React.FC = () => {
  const [name, setName] = useState("胡文强");
  const [editingName, setEditingName] = useState("defaultUserName");

  const loadUserName = () =>{
    setTimeout(() => {
      setName("name from async call");
      setEditingName("editing name from async call");
    }, 2000);
  } 
    useEffect(() => {
      loadUserName();
    }, []);

    const setUserNameState= ()=>{
      setName(editingName);
    }
  return (
    <>
      名字：{name}
      <Hello userName={name} editingName={editingName} />
      <NameEditComponent 
      initialUserName={name}
      editingName={editingName}
      disabled={editingName==="" || editingName===name}
      onNameEditingUpdated={setEditingName}
      onNameUpdate={setName} />
    </>
  )
}

export default App;

