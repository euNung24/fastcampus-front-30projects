import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import CarouselItem from "./CarouselItem";

const CarouselWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  overflow: hidden;
  position: relative;
`;

const CarouselButton = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ position }) => `${position}: 0`};
  transform: translateY(-50%);
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
}
const Carousel = ({
  children,
  autoLoop = false,
  loopTime = 500,
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
    <CarouselWrapper>
      <CarouselButton position="left" onClick={onClickLeft}>
        {"<"}
      </CarouselButton>
      {carouselItems.map((child, index) => (
        <CarouselItem key={index} idx={idx} transTime={loopTime}>
          {child}
        </CarouselItem>
      ))}
      <CarouselButton position="right" onClick={onClickRight}>
        {">"}
      </CarouselButton>
    </CarouselWrapper>
  );
};

export default Carousel;