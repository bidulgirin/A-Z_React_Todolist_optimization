import React, { useState } from "react";
function Form({ value, setValue, handleSubmit }) {
  // 글 쓸수 있게 하는 이벤트 핸들러
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <input
        type="text"
        name="value"
        style={{ flex: "10", padding: "5px" }}
        placeholder="해야 할 일을 입력하세요."
        onChange={handleChange}
        value={value}
      />
      <input
        type="submit" //애가 눌려지면 form에 onSubmit가 실행됨
        value="입력"
        className="btn"
        style={{ flex: "1" }}
      />
    </form>
  );
}

export default Form;
