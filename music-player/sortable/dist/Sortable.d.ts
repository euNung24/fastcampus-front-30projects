import { ReactNode } from "react";
interface SortableProps {
    index: number;
    draggable: boolean;
    handleDragStart: (idx: number) => void;
    handleDrop: (idx: number) => void;
    handleClick?: (...args: any) => void;
    children?: ReactNode;
}
declare const Sortable: ({ index, draggable, handleDragStart, handleDrop, handleClick, children, }: SortableProps) => import("react/jsx-runtime").JSX.Element;
export default Sortable;
