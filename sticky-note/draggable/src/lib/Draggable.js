import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "underscore";

const DraggableContext = createContext(null);
function Draggable({ children, x = 0, y = 0 }) {
  const [position, setPosition] = useState([x, y]);

  return (
    <DraggableContext.Provider value={{ position, setPosition }}>
      <div
        style={{
          userSelect: "none",
          position: "absolute",
          left: position[0],
          top: position[1],
        }}
      >
        {children}
      </div>
    </DraggableContext.Provider>
  );
}

function Handle({ children, onDrag = () => {} }) {
  const { setPosition } = useContext(DraggableContext);
  const handleRef = useRef(null);
  const mouseDownPosRef = useRef([0, 0]);

  const debouncedDrag = useMemo(
    () => debounce((e, ...args) => onDrag(e, ...args), 100),
    [onDrag],
  );

  const onMouseMove = useCallback(
    (e) => {
      const [x, y] = mouseDownPosRef.current;
      const newPosition = [e.clientX - x, e.clientY - y];
      if (
        newPosition[0] < 0 ||
        newPosition[1] < 0 ||
        newPosition[0] > window.innerWidth ||
        newPosition[1] > window.innerHeight
      ) {
        return;
      }
      setPosition(newPosition);
      debouncedDrag(e);
    },
    [setPosition, debouncedDrag],
  );

  const onEndDrag = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onEndDrag);
    document.documentElement.removeEventListener("mouseleave", onEndDrag);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (e) => {
      const { left, top } = handleRef.current.getBoundingClientRect();
      mouseDownPosRef.current = [e.clientX - left, e.clientY - top];
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onEndDrag);
      document.documentElement.addEventListener("mouseleave", onEndDrag);
    },
    [onMouseMove, onEndDrag],
  );

  useEffect(() => {
    const handle = handleRef.current;
    if (handle) {
      handle.addEventListener("mousedown", onMouseDown);
    }
    return () => {
      if (handle) {
        handle.removeEventListener("mousedown", onMouseDown);
        debouncedDrag.cancel();
      }
    };
  }, [handleRef, onMouseDown, debouncedDrag]);

  return <div ref={handleRef}>{children}</div>;
}

Draggable.Handle = Handle;

export default Draggable;
