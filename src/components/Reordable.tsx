/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from "@hello-pangea/dnd";
import { twMerge } from "tailwind-merge";


// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  // some basic styles to make the items look a bit nicer
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#3B82F6" : "white",
  // background: isDragging ? "#93C5FD" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

export default function Reordable() {
  const [items, setItems] = React.useState<any[]>([
    {id: "1", value: "Item value 1"},
    {id: "2", value: "Item value 2"},
    {id: "3", value: "Item value 3"},
    {id: "4", value: "Item value 4"},
    {id: "5", value: "Item value 5"},
    {id: "6", value: "Item value 6"},
    {id: "7", value: "Item value 7"},
    {id: "8", value: "Item value 8"},
    {id: "9", value: "Item value 9"},
  ]);

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  }

  return (
      <div className="w-full max-w-[1400px]">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="rounded-md bg-gray-300"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={twMerge(
                          `rounded-md font-semibold relative text-gray-600 select-none truncate`,
                          `rounded-md font-semibold relative select-none truncate`,
                          snapshot.isDragging
                            ? "text-white"
                            : ""
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {index + 1} - item value
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
  );
}