import React from "react";
import Carousel from "./components/Carousel";

function App() {
  return (
    <Carousel loopTime={1000} direction="column" autoLoop>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Carousel>
  );
}

export default App;
