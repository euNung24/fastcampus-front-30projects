type ImageBoxProps = {
  src: string;
};
function ImageBox({ src }: ImageBoxProps) {
  return (
    <div className="image-box">
      <img src={src} alt="uploadedImage" />
    </div>
  );
}

export default ImageBox;
