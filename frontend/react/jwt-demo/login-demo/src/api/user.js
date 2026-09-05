import axios from 'axios'
// 登录接口
export const login = async (data) => {
  const res=await axios.post('/login', data)
  return res.data
}
