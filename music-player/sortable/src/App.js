"use strict";
exports.__esModule = true;
var react_1 = require("react");
var SortableList_1 = require("./lib/SortableList");
function Content(_a) {
    var idx = _a.idx, item = _a.item;
    return (<div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100px",
            height: "100px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "rgb(".concat(Math.random() * 255, ", ").concat(Math.random() * 255, ",").concat(Math.random() * 255, ")"),
            backgroundColor: "#abcdef"
        }}>
      {item.content}
    </div>);
}
function App() {
    var test = [
        { content: "1", id: 1 },
        { content: "2", id: 2 },
        { content: "3", id: 3 },
        { content: "4", id: 4 },
        { content: "5", id: 5 },
    ];
    return (<SortableList_1["default"] list={test} onClick={function (e) {
            console.log(e === null || e === void 0 ? void 0 : e.currentTarget);
        }} keyAttr="id" renderItemContent={function (id, list) { return <Content item={list} idx={id}/>; }}/>);
}
exports["default"] = App;
