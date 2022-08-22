import React, { useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
// 클래스 컴포넌트
export default function App() {
  //State : 상태 저장
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // 글을 쓰고 submit버튼을 누르면 동작하게 하는 이벤트
  const handleSubmit = (e) => {
    //새로 고침 안되게
    e.preventDefault();

    // 새로운 할일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 할일 추가
    //this.setState({ todoData: [...todoData, newTodo], value: "" });
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };
  // 화면 출력

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1 className="text-3xl font-bold underline">할 일 목록</h1>
        </div>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
        <List todoData={todoData} setTodoData={setTodoData} />
      </div>
    </div>
  );
}
