import React, { useState } from "react";
const Form = ({ value, setValue, handleSubmit }) => {
  // 글 쓸수 있게 하는 이벤트 핸들러
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="flex pb-2">
      <input
        type="text"
        name="value"
        placeholder="해야 할 일을 입력하세요."
        onChange={handleChange}
        value={value}
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
      />
      <input
        type="submit" //애가 눌려지면 form에 onSubmit가 실행됨
        value="입력"
        className="btn className p-2 text-blue-400 border-2 border0blue-400 rounded hover:text-white hover:bg-blue-200"
      />
    </form>
  );
};
export default Form;
