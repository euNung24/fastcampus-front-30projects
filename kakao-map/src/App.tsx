import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
  }
}
function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const [markerList, setMarkerList] = useState<any>([]);
  const initMapLevel = 10;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4f0465ec6c5bded5c217d701d893bb84&autoload=false";
    document.head.appendChild(script);

    if (mapRef.current) {
      script.onload = () => {
        // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
        window.kakao.maps.load(function () {
          const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: initMapLevel, //지도의 레벨(확대, 축소 정도)
          };
          kakaoMapRef.current = new window.kakao.maps.Map(
            mapRef.current,
            options,
          );
          window.kakao.maps.event.addListener(
            kakaoMapRef.current,
            "click",
            (e: any) => {
              const title = prompt("마커의 이름을 설정하세요.");
              if (title) {
                const marker = new window.kakao.maps.Marker({
                  map: kakaoMapRef.current,
                  position: e.latLng,
                  title,
                });
                setMarkerList((prev: any) => [...prev, marker]);
              }
            },
          );
        });
      };
    }
    return () => {
      script.remove();
    };
  }, []);

  const onClickLocation = (lat: number, lng: number) => {
    kakaoMapRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
  };

  const onChangeLevel = (e: ChangeEvent) => {
    const inputEl = e.currentTarget as HTMLInputElement;
    kakaoMapRef.current.setLevel(+inputEl.max - +inputEl.value);
  };

  return (
    <section>
      <fieldset
        style={{
          display: "flex",
          flexDirection: "column",
          width: "450px",
        }}
      >
        <legend>선택</legend>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>지역 :</span>
          <button
            type="button"
            onClick={() => onClickLocation(37.5642135, 127.0016985)}
          >
            서울
          </button>
          <button
            type="button"
            onClick={() => onClickLocation(35.1379222, 129.05562775)}
          >
            부산
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>타입 :</span>
          <select
            defaultValue="ROADMAP"
            onChange={(e) => {
              kakaoMapRef.current.setMapTypeId(
                window.kakao.maps.MapTypeId[e.target.value],
              );
            }}
          >
            <option value="ROADMAP">ROADMAP</option>
            <option value="SKYVIEW">SKYVIEW</option>
            <option value="HYBRID">HYBRID</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>Zoom :</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>Out</span>
            <input
              type="range"
              min={1}
              max={14}
              defaultValue={initMapLevel}
              onChange={(e) => {
                onChangeLevel(e);
              }}
            />
            <span>In</span>
          </div>
        </div>
      </fieldset>
      <div
        ref={mapRef}
        style={{ width: "500px", height: "400px", margin: "12px 0" }}
      ></div>
      <ul>
        {markerList.map((marker: any) => (
          <li key={marker.getTitle() + marker.getPosition()}>
            <span style={{ marginRight: "8px" }}>{marker.getTitle()}</span>
            <button
              onClick={() => {
                setMarkerList((prev: any) =>
                  prev.filter((v: any) => v !== marker),
                );
                marker.setMap(null);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
