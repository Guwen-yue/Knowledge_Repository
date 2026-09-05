import instance from './config.js'
export const geterepo =async()=>{
  const res =await instance.get('/repo');
  console.log(res)
  return res.data

}