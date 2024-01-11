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
import SortableList from "./lib/SortableList";
function Content(_a) {
    var idx = _a.idx, item = _a.item;
    return (_jsx("div", __assign({ style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100px",
            height: "100px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "rgb(".concat(Math.random() * 255, ", ").concat(Math.random() * 255, ",").concat(Math.random() * 255, ")"),
            backgroundColor: "#abcdef",
        } }, { children: item.content })));
}
function App() {
    var test = [
        { content: "1", id: 1 },
        { content: "2", id: 2 },
        { content: "3", id: 3 },
        { content: "4", id: 4 },
        { content: "5", id: 5 },
    ];
    return (_jsx(SortableList, { list: test, onClick: function (e) {
            console.log(e === null || e === void 0 ? void 0 : e.currentTarget);
        }, keyAttr: "id", renderItemContent: function (id, list) { return _jsx(Content, { item: list, idx: id }); } }));
}
export default App;
