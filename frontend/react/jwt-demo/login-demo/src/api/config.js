 import axios from 'axios'
 const instance =axios.create({
  baseURL:'/api',
  timeout:5000,
 })
//  拦截每个请求
 instance.interceptors.request.use(
  config=>{
    const token = localStorage.getItem('token')
    if(token){
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  error=>{
    return Promise.reject(error)
  }
 )
 
//  instance.interceptors.response.use(
//   res=> {
//     return res.data
//   }
//  )
 export default instance