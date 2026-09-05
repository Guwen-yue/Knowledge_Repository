import * as react from 'react';
import { throttle } from 'lodash-es';
import { useState } from 'react';
import Hello from "./components/Hello";
import NameEditComponent from "./components/NameEditComponent";

const now_age=18;

const App:React.FC = () => {
  const [username, setUsername] = useState("胡文强");
  // 添加节流函数，防止频繁触发
  // const setUsernameState = throttle((event:React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(event.target.value);
  // }, 5000);

  return (
    <div>
      {/* <Hello userName={username}/> */}
      <NameEditComponent initialUserName={username} onNameSubmit={setUsername} />
    </div>
  );
}

export default App;
