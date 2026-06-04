let friends = [];

async function loadData() {
  // console.log('loadData');
  // endpoint 
  const endpoint = 'http://localhost:3000/friends';
  const res= await fetch(endpoint) // 发送请求 异步
    // 等待响应返回
    // 响应体是json二进制字符串 转换为json对象
  const data= await res.json();
  return data;
}
function renderData(friends) {
  const oBody=document.querySelector('table tbody');
  oBody.innerHTML='';
  oBody.innerHTML= friends.length > 0 ? friends.map(friend=>`
  <tr>
    <td>${friend.id}</td>
    <td>${friend.name}</td>
    <td>${friend.age}</td>
  </tr>
  `).join('') : '<tr><td colspan="3">暂无数据</td></tr>';
}
async function init() {
  console.log('init start');
  friends= await loadData();
  console.log(friends);
  renderData(friends);
}
init();
// console.log('init end')
