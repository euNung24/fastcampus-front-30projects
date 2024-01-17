import React, { Fragment, useState } from "react";
import Title from "./components/Title";
import styled from "@emotion/styled";
import NumBox from "./components/NumBox";
import Button from "./components/Button";

const StyledMain = styled.main`
  margin: 40px;
`;
const NumBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledP = styled.p`
  font-size: 20px;
  color: var(--primary);
`;
const genLottoNums = () => {
  let arr: number[] = [];
  while (arr.length < 6) {
    const num = Math.trunc(Math.random() * 45) + 1;
    !arr.includes(num) && arr.push(num);
  }
  return arr;
};

const getRank = (randomNums: number[], winningNums: number[]) => {
  const copiedWinningNumbers = [...winningNums];
  const bonusNum = copiedWinningNumbers.pop();
  let count = 0;
  for (let nums of randomNums) {
    if (copiedWinningNumbers.includes(nums)) {
      count++;
    }
  }
  switch (count) {
    case 6:
      return 1;
    case 5:
      return randomNums.includes(bonusNum!) ? 2 : 3;
    case 4:
      return 4;
    case 3:
      return 5;
  }
  return;
};
function App() {
  const [lottoNums, setLottoNums] = useState<number[] | null>(null);
  const [winningNums, setWinningNums] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
  ]);

  const clickWinningNum = (idx: number, num: number) => {
    if (winningNums.includes(num)) {
      return;
    }
    const copiedWinningNums = [...winningNums];
    copiedWinningNums[idx] = num;
    setWinningNums(copiedWinningNums);
  };

  const onClickDrawing = () => {
    setLottoNums(genLottoNums());
  };

  const rank = lottoNums && getRank(lottoNums, winningNums);

  return (
    <StyledMain>
      <Title>정답 번호</Title>
      <NumBoxWrapper>
        {winningNums.map((num, idx) =>
          idx !== 6 ? (
            <NumBox
              key={idx}
              num={num}
              onClick={(num: number) => clickWinningNum(idx, num)}
            />
          ) : (
            <Fragment key={idx}>
              <NumBox disabled />
              <NumBox num={num} />
            </Fragment>
          ),
        )}
      </NumBoxWrapper>

      <div style={{ height: "120px" }}></div>
      <Button onClick={onClickDrawing}>랜덤 번호 추첨</Button>
      {lottoNums && (
        <div>
          <Title>번호 추첨 결과</Title>
          <NumBoxWrapper>
            {lottoNums.map((num) => (
              <NumBox key={num} num={num} disabled />
            ))}
          </NumBoxWrapper>
          <StyledP>{rank ? `${rank}등 입니다!` : "낙첨입니다."}</StyledP>
        </div>
      )}
    </StyledMain>
  );
}

export default App;
