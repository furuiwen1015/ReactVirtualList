"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactVirtualList = void 0;
var react_1 = __importStar(require("react"));
var lodash_1 = require("lodash");
var ReactVirtualList = function (props) {
    var children = props.children, className = props.className;
    var _a = react_1.useState(0), start = _a[0], setStart = _a[1];
    var _b = react_1.useState(children.length), end = _b[0], setEnd = _b[1];
    var _c = react_1.useState(0), startOffset = _c[0], setStartOffset = _c[1];
    var _d = react_1.useState(0), endOffset = _d[0], setEndOffset = _d[1];
    var containerRef = react_1.useRef(null);
    var listRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var previousNodeInfo = {
            index: 0,
            top: 0,
            height: 0,
            bottom: 0,
        };
        var nodeInfoList = Array.from(listRef.current.children).map(function (node, index) {
            return (previousNodeInfo = {
                index: index,
                top: previousNodeInfo.bottom,
                height: node.clientHeight,
                bottom: previousNodeInfo.bottom + node.clientHeight,
            });
        });
        function update(scrollTop) {
            var containerHeight = containerRef.current.clientHeight;
            var startNode = lodash_1.find(nodeInfoList, function (node) { return node.bottom >= scrollTop; });
            var endNode = lodash_1.find(nodeInfoList, function (node) { return node.bottom >= scrollTop + containerHeight; });
            setStart(startNode.index);
            setEnd(endNode.index + 1);
            setStartOffset(startNode.top);
            setEndOffset(nodeInfoList[nodeInfoList.length - 1].bottom - endNode.bottom);
        }
        function handleScroll(ev) {
            update(ev.target.scrollTop);
        }
        update(0);
        containerRef.current.addEventListener("scroll", handleScroll);
        return function () {
            containerRef.current.removeEventListener("scroll", handleScroll);
        };
    }, [children]);
    return (react_1.default.createElement("div", { ref: containerRef, className: className },
        react_1.default.createElement("div", { style: { padding: startOffset + "px 0 " + endOffset + "px 0" }, ref: listRef }, children.slice(start, end))));
};
exports.ReactVirtualList = ReactVirtualList;
//# sourceMappingURL=ReactVirtualList.js.map