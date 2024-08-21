/* eslint-disable react-hooks/exhaustive-deps */
import ModalContainer from "@/components/ModalContainer";
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
import { useTheme } from "@/hooks/UseTheme";
import CloseIcon from '@mui/icons-material/Close';


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
    // padding: grid * 2,
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

export type ReordableItemType = Record<"value", string> & Record<"id", string>
export type OutputReordableItemType = ReordableItemType & { prevIndex: number }

interface ReordableModalProps {
    onClose(): void;
    items: ReordableItemType[];
    onSubmit(items: OutputReordableItemType[]): Promise<void>;
    children: (item: ReordableItemType, index: number) => React.ReactElement
}

export default function ReordableModal(props: ReordableModalProps) {
    const [items, setItems] = React.useState<ReordableItemType[]>([]);
    const [isLoading, setIsLoading] = React.useState(false)
    const { themeColor } = useTheme();

    const itemsHasChanged = React.useMemo(() => {
        return !(props.items.map(i => i.id).join("") === items.map(i => i.id).join(""))
    }, [items])

    React.useEffect(() => {
        setItems(props.items)
    }, [])

    const onDragEnd = (result: DropResult) => {
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

    const handleSubmit = async () => {
        if (!itemsHasChanged) return;

        const prevItemsObj: Record<string, { value: string, index: number }> = {}

        for (let index = 0; index < props.items.length; index++) {
            const { id, value } = props.items[index]
            prevItemsObj[id] = { value, index }
        }

        const output: OutputReordableItemType[] = items.map((item, index) => ({ ...item, prevIndex: prevItemsObj[item.id].index }))

        setIsLoading(true)
        try {
            await props.onSubmit(output)
            props.onClose()
        } catch (e) {
            alert("Error")
            console.error(e)
        } finally { setIsLoading(false) }
    }

    return (
        <ModalContainer>
            <div className="w-full max-w-[1000px] h-fit animate-scale">
                <div className="text-right py-2">
                    <button onClick={props.onClose} ><CloseIcon /></button>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                className="rounded-md bg-gray-300 overflow-auto"
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
                                                {props.children(item, index)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <button className="w-full p-2 font-semibold mt-2 rounded-md hover:brightness-105 duration-200" style={{ backgroundColor: itemsHasChanged ? themeColor.color : "#737373" }} disabled={isLoading || !itemsHasChanged} onClick={handleSubmit}>{isLoading ? "Updating..." : "Update"}</button>
            </div>
        </ModalContainer>
    )
}