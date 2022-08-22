import React, { useState } from "react";
import Lists from "./components/Lists";
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
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="todoBlock w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        {/*
          md:w-3/4 
          md:max-3/4 
          md:max-w-lg 
          lg:w-3/4 
          lg:max-w-lg 
        반응형
        */}
        <div className="title flex justify-between mb-3">
          <h1 className="font-bold">할 일 목록</h1>
        </div>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
        <Lists todoData={todoData} setTodoData={setTodoData} />
      </div>
    </div>
  );
}
