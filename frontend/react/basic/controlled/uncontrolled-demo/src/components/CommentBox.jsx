import {
  useRef,useState
} from "react";

const CommentBox = () => {
  const textareaRef = useRef(null);
  

  const handleSubmit =() =>{
    const comment = textareaRef.current.value;
    console.log(textareaRef.current.value)
    if(!comment) return 
    console.log(comment);
  }

  return (
    <div>
      <textarea placeholder="输入评论"  ref={textareaRef} />
      <button onClick={handleSubmit}>提交评论</button>
    </div>
  );
};
export default CommentBox;
