import { ReactNode } from "react";
import "./sortable.css";
declare const SortableList: ({ renderItemContent, list, keyAttr, onDropItem, onClick, }: {
    renderItemContent: (id: number, item: any) => ReactNode;
    list: any[];
    keyAttr?: string | undefined;
    onDropItem?: ((list: any[]) => void) | undefined;
    onClick?: ((...args: any) => void) | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export default SortableList;
