import { useAuthStore } from './store/user.js'
import React ,{ useState,lazy,Suspense,useEffect }  from 'react'
// import { Routes,Route} from "react-router-dom"
import { geterepo } from './api/repo.js'
// import RequireAuth from './components/RequireAuth.js'
// import Nav from "./components/Nav"
// const Home=lazy(()=>import('./pages/Home.js'))
import Login from './pages/Login.jsx'
// const Pay=lazy(()=>import('./pages/Pay.js'))



const App = () => {
  // 组件状态放到store
  const {token,user,setToken,setUser} = useAuthStore(state=> state.token )
  console.log(token)
  useEffect(()=>{
    (async()=>{
      const res=await geterepo()
      console.log(res)
    })()
  })
   return (
    <div>
      <Login />
    </div>
  );
};
export default App;

