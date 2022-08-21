import React, { useEffect, useState } from "react";

// 클래스 컴포넌트
export default function App() {
  //State : 상태 저장
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  //  x버튼 스타일
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };
  // 목록 스타일
  // 함수형태로 만드는 이유 : 나중에 동적인 변경을 해야해서
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  // x버튼 클릭 이벤트
  const handleClick = (id) => {
    //filter 메서드로 id랑 data.id가 같은 애만 빼고 배열 출력하도록 하는 명령을 변수에저장
    let newTodoData = todoData.filter((data) => data.id !== id);
    // console.log('newTodoData', newTodoData)
    //this.setState({ todoData: newTodoData }); //setState() 상태 변화
    setTodoData(newTodoData);
  };
  // 글 쓸수 있게 하는 이벤트 핸들러
  const handleChange = (e) => {
    //this.setState({ value: e.target.value });
    setValue(e.target.value);
  };
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

  // 체크박스 체크하면 completed가 true로 바뀌는 것
  const handleCompleChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    //this.setState({ todoData: newTodoData });
    setTodoData(newTodoData);
  };
  // 화면 출력

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
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
        {/* TODO: map() 메소드를 이용해 내용의 중복없이 data배열을 나열 할 수있다 */}
        {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input
              type="checkbox"
              onChange={() => {
                handleCompleChange(data.id);
              }}
              defaultChecked={false}
            />
            {data.title}
            <button
              style={btnStyle}
              onClick={() => {
                handleClick(data.id); //고유한 값을 인자로 해주는 함수를 연결
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
