import React from "react";
//  x버튼 스타일

function List({ todoData, setTodoData }) {
  // const btnStyle = {
  //   color: "#fff",
  //   border: "none",
  //   padding: "5px 9px",
  //   borderRadius: "50%",
  //   cursor: "pointer",
  //   float: "right",
  // };
  // 목록 스타일
  // const getStyle = (completed) => {
  //   return {
  //     padding: "10px",
  //     borderBottom: "1px #ccc dotted",
  //     textDecoration: completed ? "line-through" : "none",
  //   };
  // };
  // x버튼 클릭 이벤트
  const handleClick = (id) => {
    //filter 메서드로 id랑 data.id가 같은 애만 빼고 배열 출력하도록 하는 명령을 변수에저장
    let newTodoData = todoData.filter((data) => data.id !== id);
    // console.log('newTodoData', newTodoData)
    //this.setState({ todoData: newTodoData }); //setState() 상태 변화
    setTodoData(newTodoData);
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
  return (
    <div>
      {/* TODO: map() 메소드를 이용해 내용의 중복없이 data배열을 나열 할 수있다 */}
      {todoData.map((data) => (
        <div key={data.id}>
          <input
            type="checkbox"
            onChange={() => {
              handleCompleChange(data.id);
            }}
            defaultChecked={false}
          />
          {data.title}
          <button
            onClick={() => {
              handleClick(data.id); //고유한 값을 인자로 해주는 함수를 연결
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default List;
