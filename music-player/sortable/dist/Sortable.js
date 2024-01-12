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
import { jsx as _jsx } from "react/jsx-runtime";
var Sortable = function (_a) {
    var index = _a.index, draggable = _a.draggable, handleDragStart = _a.handleDragStart, handleDrop = _a.handleDrop, _b = _a.handleClick, handleClick = _b === void 0 ? function () { } : _b, children = _a.children;
    var onDragStart = function (e) {
        e.currentTarget.classList.add("dragstart");
        handleDragStart(index);
    };
    var onDragEnd = function (e) {
        e.currentTarget.classList.remove("dragstart");
    };
    var onDragOver = function (e) {
        e.preventDefault();
    };
    var onDragEnter = function (e) {
        e.currentTarget.classList.add("dragover");
    };
    var onDragLeave = function (e) {
        e.currentTarget.classList.remove("dragover");
    };
    var onDrop = function (e) {
        e.currentTarget.classList.remove("dragover");
        handleDrop(index);
    };
    var onClick = function (e) {
        handleClick(e);
    };
    return (_jsx("li", __assign({ className: "item", draggable: draggable, onClick: onClick, onDragStart: onDragStart, onDragEnd: onDragEnd, onDragEnter: onDragEnter, onDragOver: onDragOver, onDragLeave: onDragLeave, onDrop: onDrop }, { children: children })));
};
export default Sortable;
