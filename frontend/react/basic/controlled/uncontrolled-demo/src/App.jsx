import {LoginForm,RegisterForm,CommentBox,ControlledInput,UncontrolledInput} 
from "./components"

const App = () => {
  return (
    <div>
      <h1>非受控组件受控组件</h1>
      <UncontrolledInput />
      <ControlledInput />
      <CommentBox />
      <RegisterForm />
      <LoginForm />
    </div>
  );
};
export default App;
