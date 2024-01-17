import styled from "@emotion/styled";

const CarouselItem = styled.div<{ idx: number; transTime: number }>`
  min-width: 500px;
  background: #cfaaff;
  transform: translateX(${({ idx }) => `-${idx * 100}%`});
  transition: transform ${({ transTime }) => `${transTime}ms`} ease-in-out;
`;

export default CarouselItem;
