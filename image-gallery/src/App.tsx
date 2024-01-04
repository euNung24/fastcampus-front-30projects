import React, { useCallback, useState } from "react";
import "./App.css";
import ImageBox from "./components/ImageBox";
import { useDropzone } from "react-dropzone";

function App() {
  const [imageList, setImageList] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.readAsDataURL(file!);
      reader.onloadend = (e) => {
        setImageList((prev) => [...prev, e.target?.result as string]);
      };
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container">
      <section className={"gallery-box " + (imageList?.length > 0 && "row")}>
        {imageList?.length === 0 && (
          <p className="text-center">
            이미지가 없습니다. <br />
            이미지를 추가해주세요.
          </p>
        )}
        {imageList.map((img, idx) => (
          <ImageBox key={img + idx} src={img} />
        ))}
        <div className="plus-btn" {...getRootProps()}>
          <input type="file" {...getInputProps()} />+
        </div>
      </section>
    </div>
  );
}

export default App;
