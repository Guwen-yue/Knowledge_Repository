import { useState,useRef } from "react";

const RegisterForm = () => {
  // 非受控两次useRef
  // vue ref 简单数据类型 / reactive  复杂数据类型
  const [form,setForm] = useState({
    username:"",
    password:""
  })

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(form)
  }

  return (
    <form>
      <input type="text" name="username"
      value={form.username} 
      onChange={handleChange}
      placeholder="请输入用户名"
      />
      <input type="text" name="password"
      value={form.password} 
      onChange={handleChange}
      placeholder="请输入密码"
      />
      <button type="submit" onClick={handleSubmit}>提交</button>
    </form>
  )
}

export default RegisterForm;
