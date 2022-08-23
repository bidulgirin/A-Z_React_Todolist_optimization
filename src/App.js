import React, { useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";
const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];
export default function App() {
  //useState : 상태 저장
  const [todoData, setTodoData] = useState(initialTodoData); //localStorage로 전에 입력해던걸 가져올수있어!
  const [value, setValue] = useState("");

  /**
   * submit버튼을 눌렀을때 동작하게 하는 이벤트
   * @param {*} e 이벤트
   */
  const handleSubmit = (e) => {
    //새로고침방지
    e.preventDefault();

    /**
     * 새로운 할 일 데이터 추가
     */
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    //useState 안썼을때 기본 setState
    //this.setState({ todoData: [...todoData, newTodo], value: "" });

    // set데이터로 갱신
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    //입력란에 있던 글씨 지워줌
    setValue("");
  };
  //모든 할 일 지우기 이벤트
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
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
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
        <Lists todoData={todoData} setTodoData={setTodoData} />
      </div>
    </div>
  );
}
