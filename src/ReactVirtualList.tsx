import React, { useEffect, useRef, useState } from "react";
import { find } from "lodash";

interface IProps {
  children: JSX.Element[];
  className?: string;
}

export const ReactVirtualList = (props: IProps) => {
  const { children, className } = props;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(children.length);
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let previousNodeInfo = {
      index: 0,
      top: 0,
      height: 0,
      bottom: 0,
    };
    const nodeInfoList = Array.from(listRef.current.children).map(
      (node, index) => {
        return (previousNodeInfo = {
          index,
          top: previousNodeInfo.bottom,
          height: node.clientHeight,
          bottom: previousNodeInfo.bottom + node.clientHeight,
        });
      }
    );
    function update(scrollTop) {
      const containerHeight = containerRef.current.clientHeight;
      const startNode = find(nodeInfoList, (node) => node.bottom >= scrollTop);
      const endNode = find(
        nodeInfoList,
        (node) => node.bottom >= scrollTop + containerHeight
      );
      setStart(startNode.index);
      setEnd(endNode.index + 1);
      setStartOffset(startNode.top);
      setEndOffset(
        nodeInfoList[nodeInfoList.length - 1].bottom - endNode.bottom
      );
    }
    function handleScroll(ev) {
      update(ev.target.scrollTop);
    }
    update(0);
    containerRef.current.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [children]);

  return (
    <div ref={containerRef} className={className}>
      <div
        style={{ padding: `${startOffset}px 0 ${endOffset}px 0` }}
        ref={listRef}
      >
        {children.slice(start, end)}
      </div>
    </div>
  );
};
