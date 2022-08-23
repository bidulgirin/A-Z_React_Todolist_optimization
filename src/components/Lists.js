import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData }) => {
  /**
   * 잡고 놓을때 이벤트 처리
   * @param {*} result
   * @returns 재정렬된데이터를 리턴
   */
  const handleEnd = (result) => {
    console.log(result);
    //목적지가 없으면 이벤트 취소함
    if (!result.destination) return;

    // 리액트의 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = todoData;

    // 1. 변경시키는 아이템을 배열에서 지워줌
    // 2. return 값으로 지워진 아이템을 잡아줌
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    //원하는 자리에 reorderedItem을 삽입해줌
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  return (
    <DragDropContext onDragEnd={handleEnd}>
      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((data, index) => (
              <Draggable
                key={data.id}
                draggableId={data.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <List
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    completed={data.completed}
                    todoData={todoData}
                    setTodoData={setTodoData}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {/*자연스러운 공간*/}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default Lists;
