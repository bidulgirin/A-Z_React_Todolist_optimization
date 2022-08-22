import React from "react";

const List = ({
  key,
  id,
  title,
  todoData,
  setTodoData,
  completed,
  provided,
  snapshot,
}) => {
  const handleClick = (id) => {
    //filter 메서드로 id랑 data.id가 같은 애만 빼고 배열 출력하도록 하는 명령을 변수에저장
    let newTodoData = todoData.filter((data) => data.id !== id);
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
    <div
      className={`${
        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded `}
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps} //손으로 드래그할수있게
    >
      <div className="items-center">
        <input
          type="checkbox"
          className="mr-3"
          onChange={() => {
            handleCompleChange(id);
          }}
          defaultChecked={false}
        />
        <span className={`${completed ? "line-through" : undefined}   `}>
          {title}
        </span>
      </div>
      <div>
        <button
          onClick={() => {
            handleClick(id); //고유한 값을 인자로 해주는 함수를 연결
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default List;
