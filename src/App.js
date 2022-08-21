import React, { Component } from "react";

// 클래스 컴포넌트
export default class App extends Component {
  //State : 상태 저장
  state = {
    todoData: [
      {
        id: 1,
        title: "공부하기",
        completed: false,
      },
      {
        id: 2,
        title: "청소하기",
        completed: false,
      },
    ],
    value: "",
  };
  //  x버튼 스타일
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };
  // 목록 스타일
  // 함수형태로 만드는 이유 : 나중에 동적인 변경을 해야해서
  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  // x버튼 클릭 이벤트
  handleClick = (id) => {
    //filter 메서드로 id랑 data.id가 같은 애만 빼고 배열 출력하도록 하는 명령을 변수에저장
    let newTodoData = this.state.todoData.filter((data) => data.id !== id);
    // console.log('newTodoData', newTodoData)
    this.setState({ todoData: newTodoData }); //setState() 상태 변화
  };
  // 글 쓸수 있게 하는 이벤트 핸들러
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  // 글을 쓰고 submit버튼을 누르면 동작하게 하는 이벤트
  handleSubmit = (e) => {
    //새로 고침 안되게
    e.preventDefault();

    // 새로운 할일 데이터
    let newTodo = {
      id: Date.now(), //유니크한 특별한 값을 넣어야해서 이 메서드를 쓰는 거래!
      title: this.state.value,
      completed: false,
    };

    // 할일 추가
    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
    //...this.state.todoData 는 원래 있던 데이터를 넣은것이고 (전개연산자로)
    // newTodo 는 새로 추가되는 데이터이다
  };

  // 체크박스 체크하면 completed가 true로 바뀌는 것
  handleCompleChange = (id) => {
    let newTodoData = this.state.todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    this.setState({ todoData: newTodoData });
  };
  // 화면 출력
  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="해야 할 일을 입력하세요."
              onChange={this.handleChange}
              value={this.state.value}
            />
            <input
              type="submit" //애가 눌려지면 form에 onSubmit가 실행됨
              value="입력"
              className="btn"
              style={{ flex: "1" }}
            />
          </form>
          {/* TODO: map() 메소드를 이용해 내용의 중복없이 data배열을 나열 할 수있다 */}
          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input
                type="checkbox"
                onChange={() => {
                  this.handleCompleChange(data.id);
                }}
                defaultChecked={false}
              />
              {data.title}
              <button
                style={this.btnStyle}
                onClick={() => {
                  this.handleClick(data.id); //고유한 값을 인자로 해주는 함수를 연결
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
}
