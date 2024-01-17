import React, { ChangeEvent, ChangeEventHandler } from "react";
import styled from "@emotion/styled";

type NumBoxProps = {
  num?: number;
  disabled?: boolean;
  onClick?: (num: number) => void;
};

const StyledNumBox = styled.select`
  width: 48px;
  height: 48px;
  border: 1px solid var(--primary);
  text-align: center;
  appearance: none;
  color: var(--primary);

  &:disabled {
    opacity: 1;
  }
`;
const NumBox = ({
  num = 0,
  disabled = false,
  onClick = () => {},
}: NumBoxProps) => {
  const onChange = (e: ChangeEvent) => {
    onClick(+(e.currentTarget as HTMLSelectElement).value);
  };

  return (
    <StyledNumBox
      disabled={disabled}
      value={num === 0 ? "+" : num}
      onChange={onChange}
    >
      {num !== 0 ? (
        Array(45)
          .fill(0)
          .map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))
      ) : (
        <option value={"+"}>+</option>
      )}
    </StyledNumBox>
  );
};

export default NumBox;
