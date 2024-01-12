var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import Sortable from "./Sortable";
import "./sortable.css";
var SortableList = function (_a) {
    var renderItemContent = _a.renderItemContent, list = _a.list, keyAttr = _a.keyAttr, _b = _a.onClick, onClick = _b === void 0 ? function () { } : _b;
    var _c = useState(list), itemList = _c[0], setItemList = _c[1];
    var startIdxRef = useRef(0);
    var handleDragStart = function (idx) {
        startIdxRef.current = idx;
    };
    var handleDrop = function (dropIdx) {
        var newList = __spreadArray([], itemList, true);
        var targetItem = itemList[startIdxRef.current];
        if (dropIdx > startIdxRef.current) {
            newList.splice(dropIdx, 0, targetItem);
            newList.splice(startIdxRef.current, 1);
        }
        else {
            newList.splice(startIdxRef.current, 1);
            newList.splice(dropIdx, 0, targetItem);
        }
        setItemList(newList);
    };
    return (_jsxs("ul", __assign({ className: "sortable-list" }, { children: [itemList.map(function (v, idx) { return (_jsx(Sortable, __assign({ draggable: true, index: idx, handleDragStart: handleDragStart, handleDrop: handleDrop, handleClick: function (e) {
                    onClick(e, v, { index: idx });
                } }, { children: renderItemContent(idx, v) }), keyAttr ? v[keyAttr] : idx)); }), _jsx(Sortable, { draggable: false, index: itemList.length, handleDragStart: handleDragStart, handleDrop: handleDrop })] })));
};
export default SortableList;
