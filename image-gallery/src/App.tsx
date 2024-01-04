import React, { ChangeEvent, useRef, useState } from "react";
import "./App.css";
import ImageBox from "./components/ImageBox";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const onClickPlusBtn = () => {
    inputRef.current?.click();
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file!);
      reader.onloadend = (e) => {
        setImageList((prev) => [...prev, e.target?.result as string]);
      };
    }
  };

  return (
    <div className="container">
      <section className={"gallery-box " + (imageList?.length > 0 && "row")}>
        {imageList?.length === 0 && (
          <p className="text-center">
            이미지가 없습니다. <br />
            이미지를 추가해주세요.
          </p>
        )}
        <input type="file" ref={inputRef} onChange={onChangeInput} />
        {imageList.map((img, idx) => (
          <ImageBox key={img + idx} src={img} />
        ))}
        <button className="plus-btn" onClick={onClickPlusBtn}>
          +
        </button>
      </section>
    </div>
  );
}

export default App;
