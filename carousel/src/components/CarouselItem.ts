import styled from "@emotion/styled";

const CarouselItem = styled.div<{
  idx: number;
  transTime: number;
  direction: "row" | "column";
}>`
  ${({ direction }) =>
    direction === "row" ? "min-width: 500px" : "min-height: 500px"};
  background: #cfaaff;
  transform: ${({ direction, idx }) =>
    direction === "row"
      ? `translateX(-${idx * 100}%)`
      : `translateY(-${idx * 100}%)`};
  transition: transform ${({ transTime }) => `${transTime}ms`} ease-in-out;
`;

export default CarouselItem;
