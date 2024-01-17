import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import CarouselItem from "./CarouselItem";

const CarouselWrapper = styled.div<{
  direction: "row" | "column";
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  width: 500px;
  height: 500px;
  overflow: hidden;
  position: relative;
`;

const CarouselButton = styled.button<{
  position: "left" | "right";
  direction: "row" | "column";
}>`
  position: absolute;
  ${({ direction, position }) =>
    direction === "row"
      ? "top: 50%"
      : position === "left"
        ? "top: 0"
        : "bottom: 0"};
  ${({ position, direction }) =>
    direction === "row" ? `${position}: 0` : `${position}: 50%`};
  transform: ${({ direction, position }) =>
    direction === "row"
      ? "translateY(-50%)"
      : position === "left"
        ? "translateX(-50%) rotate(90deg)"
        : "translateX(50%)  rotate(90deg)"};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #777777;
  color: #fff;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 999;
`;

interface CarouselProps {
  children: ReactNode | ReactNode[];
  autoLoop?: boolean;
  loopTime?: number;
  transTime?: number;
  direction?: "row" | "column";
}
const Carousel = ({
  children,
  autoLoop = false,
  loopTime = 1000,
  transTime = 500,
  direction = "row",
}: CarouselProps) => {
  const [idx, setIdx] = useState(0);
  const carouselItems = Array.isArray(children) ? children : [children];
  const onClickLeft = () => {
    if (idx > 0) {
      setIdx((prev) => prev - 1);
    } else {
      setIdx(carouselItems.length - 1);
    }
  };
  const onClickRight = () => {
    if (idx < carouselItems.length - 1) {
      setIdx((prev) => prev + 1);
    } else {
      setIdx(0);
    }
  };

  useEffect(() => {
    if (autoLoop) {
      const interval = setInterval(() => {
        setIdx((prev) => (prev < carouselItems.length - 1 ? prev + 1 : 0));
      }, loopTime);
      return () => {
        clearInterval(interval);
      };
    }
  }, [autoLoop, loopTime, carouselItems.length]);

  return (
    <CarouselWrapper direction={direction}>
      <CarouselButton
        position="left"
        direction={direction}
        onClick={onClickLeft}
      >
        {"<"}
      </CarouselButton>
      {carouselItems.map((child, index) => (
        <CarouselItem
          key={index}
          idx={idx}
          transTime={transTime}
          direction={direction}
        >
          {child}
        </CarouselItem>
      ))}
      <CarouselButton
        position="right"
        direction={direction}
        onClick={onClickRight}
      >
        {">"}
      </CarouselButton>
    </CarouselWrapper>
  );
};

export default Carousel;
