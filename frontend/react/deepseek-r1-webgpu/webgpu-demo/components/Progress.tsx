// 返回jsx 的函数就是组件
// 函数接受参数,复用组件的时候,进度,文件,,大小不一样
// 组件的属性 html 属性的方式传过来的props
export const Progress = ({text,percentage,total,index}) => {
  // percentage ??=0;
  return (
    <div className="progress-item flex items-center justify-between">
      <p>{index+1}</p>
      <p>{text}</p>
      <p>{percentage}%</p>
      <p>{total}</p>
    </div>
  )
}

