import {
  // 代码里面重定向  Navigate组件配置的时候 
  useNavigate,
  useLocation,
} from 'react-router-dom'

const Login=()=>{
  // 跳转
  const navigate = useNavigate();
  const location = useLocation();
  //  /login from 对象为空  
  // posts/new 从这里来 ->  login from 对象  
  const from = location.state?.from?.pathname || '/'; // ?. 可选链运算符 es11 
  // console.log(from);
  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    if(!username || !password){
      alert('请输入用户名和密码');
      return;
    }
    if(username === 'admin' && password === '123456'){
     localStorage.setItem('isLogin', 'true');
    //  浏览器访问留下历史记录的  history 栈
    // 浏览器前进，后退导航 
    // 登录页面成功后 ，如果还能返回登录页面，用户就会蒙，把用户当小白，replace跳转到新页面的同时，
    // 将新页面的历史记录替换掉/login的访问记录
      navigate(from,{replace:true});
      return;
    }else{
      alert('登录失败');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>登录页</h1>
      {/* 必须加 name，FormData 才能取到值 */}
      <input type="text" name="username" placeholder="请输入用户名" required />
      <input type="password" name="password" placeholder="请输入密码" required />
      <button type="submit">登录</button>
    </form>

  )
}

export default Login;

