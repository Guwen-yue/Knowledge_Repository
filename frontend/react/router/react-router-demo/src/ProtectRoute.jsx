import { Navigate, useLocation } from 'react-router-dom';
const ProtectRoute = ({ children }) => {
  console.log(children,"------")
  // 拦截请求 鉴权 可以  
  // html5 本地存储 域名的沙盒
  const isLogin= localStorage.getItem("isLogin") === "true";
  console.log(isLogin,"isLogin")
  // 用 useLocation() 拿路由 location 对象（普通对象，可被 history.replaceState 序列化）
  const location = useLocation();
  if(!isLogin){
    // 路由 设置state状态对象
    // 从哪里来？ 传给登录页一个带 pathname 的对象
    return <Navigate to="/login" replace state={{from: location}}/>
  }
  // 登录成功， 才显示子组件
  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectRoute;

