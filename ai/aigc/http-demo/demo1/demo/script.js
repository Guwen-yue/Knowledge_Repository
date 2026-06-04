// API Key：替换为你的 DeepSeek API Key
const API_KEY = 'sk-vivo50fengkuangxingqisi';

// url method http 版本号 请求行
const endpoint = 'https://api.deepseek.com/chat/completions';

// headers 请求头
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

// 请求体
const body = {
  model: 'deepseek-v4-flash',
  messages: [
    {
      role: 'user',
      content: '你好，你是什么大模型',
    },
  ],
};

try {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log(data);

  // 处理响应数据，提取回复内容
  document.getElementById('replay').innerHTML = data.choices[0].message.content;
} catch (error) {
  console.error('请求失败：', error);
  document.getElementById('replay').innerHTML = '请求出错，请检查 API Key 或网络连接';
}
