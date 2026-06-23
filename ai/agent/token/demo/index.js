import { getEncoding } from 'js-tiktoken'

// decode 解码
// ()里是gpt 官方的token 编码器  cl100k_base
// utf-8 编码
const enc = getEncoding('cl100k_base') //utf-8 编码
const text ="hello ,tiktoken!你好世界"
const tokens = enc.encode(text)
console.log("编码后的token:",tokens)
console.log("总token数:",tokens.length)

const decondText = enc.decode(tokens);
console.log("解码后的文本:",decondText)
