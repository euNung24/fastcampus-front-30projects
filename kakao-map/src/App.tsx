import React, { useEffect, useRef } from "react";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
  }
}
function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4f0465ec6c5bded5c217d701d893bb84&autoload=false";
    document.head.appendChild(script);

    if (mapRef.current) {
      script.onload = () => {
        // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
        window.kakao.maps.load(function () {
          var options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3, //지도의 레벨(확대, 축소 정도)
          };
          var map = new window.kakao.maps.Map(mapRef.current, options);
        });
      };
    }
    return () => {
      script.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ width: "500px", height: "400px" }}></div>;
}

export default App;
