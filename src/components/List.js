import React, { useCallback, useEffect, useState } from "react";

const List = React.memo(
  ({
    key,
    id,
    title,
    todoData,
    setTodoData,
    completed,
    provided,
    snapshot,
  }) => {
    //수정모드 state 저장
    const [isEditing, setIsEditing] = useState(false);
    // 편집모드로 갔을때
    const [editedTitle, setEditedTitle] = useState(title);

    const handleClick = useCallback(
      (id) => {
        //filter 메서드로 id랑 data.id가 같은 애만 빼고 배열 출력하도록 하는 명령을 변수에저장
        let newTodoData = todoData.filter((data) => data.id !== id);
        setTodoData(newTodoData);
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
        /*stringify 하는 이유 : array같은것들을 텍스트로 변환해준 후에 저장하려고 stringify 해주는거임
         아니면 [object Object]로 뜸*/
      },
      [todoData]
    );

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
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };
    // 편집모드에서 글쓰게 해주는거
    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };
    //세이브 버튼 눌렀을때 이벤트
    const handleSubmit = (e) => {
      e.preventDefault();
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };
    //에디트 모드일 때 return 되는 UI
    if (isEditing) {
      return (
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded ">
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full px-3 py-2 text-gray bordered"
                value={editedTitle}
                onChange={handleEditChange}
                defaultChecked={false}
              />
            </form>
          </div>
          <div>
            <button
              className="px-4 py-2 "
              onClick={() => {
                setIsEditing(false); //고유한 값을 인자로 해주는 함수를 연결
              }}
            >
              X
            </button>
            <button onClick={handleSubmit} type="submit" className="px-4 py-2">
              save
            </button>
          </div>
        </div>
      );
    } else {
      //editing 모드가 아닐때 (기본UI)
      return (
        <div
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded `}
          key={key}
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
            <span className={`${completed ? "line-through" : undefined}`}>
              {title}
            </span>
          </div>
          <div>
            <button
              className="px-4 py-2 "
              onClick={() => {
                handleClick(id); //고유한 값을 인자로 해주는 함수를 연결
              }}
            >
              X
            </button>
            <button
              className="px-4 py-2"
              onClick={() => {
                setIsEditing(true); //고유한 값을 인자로 해주는 함수를 연결
              }}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);
export default List;
