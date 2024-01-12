import { ReactNode } from "react";
import "./sortable.css";
declare const SortableList: ({ renderItemContent, list, keyAttr, onClick, }: {
    renderItemContent: (id: number, item: any) => ReactNode;
    list: any[];
    keyAttr?: string | undefined;
    onClick?: ((...args: any) => void) | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export default SortableList;
