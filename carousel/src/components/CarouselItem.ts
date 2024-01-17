import styled from "@emotion/styled";

const CarouselItem = styled.div<{ idx: number }>`
  min-width: 500px;
  background: #cfaaff;
  transform: translateX(${({ idx }) => `-${idx * 100}%`});
  transition: transform 0.5s ease-in-out;
`;

export default CarouselItem;
