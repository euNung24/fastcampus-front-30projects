class DrawingBoard {
  CANVAS_COLOR = "#FFF";

  BRUSH = {
    color: "#000",
    size: 10,
  };

  ERASER = {
    color: this.CANVAS_COLOR,
    size: 10,
  };

  isMouseDown = false;

  constructor() {
    this.setElements();
    this.setEvents();
    this.init();
  }

  setElements() {
    this.wrapperEl = document.querySelector(".drawing-board-wrapper");
    this.drawingBoardEl = this.wrapperEl.querySelector(".drawing-board");
    this.toolbarEl = this.drawingBoardEl.querySelector(".toolbar");
    this.brushEl = this.toolbarEl.querySelector(".brush");
    this.eraserEl = this.toolbarEl.querySelector(".eraser");
    this.brushColorInputEl = this.toolbarEl.querySelector(".color input");
    this.canvasEl = this.drawingBoardEl.querySelector("canvas");
    this.brushPanelEl = this.wrapperEl.querySelector(".brush-panel");
    this.brushSizeInputEl = this.brushPanelEl.querySelector("input");
    this.brushInfoEl = this.brushPanelEl.querySelector(".circle");
  }

  init() {
    // 브러쉬 active
    this.brushEl.click();
    // canvas 설정
    this.ctx = this.canvasEl.getContext("2d");
    const { width, height } = this.canvasEl.getBoundingClientRect();
    this.canvasEl.width = width;
    this.canvasEl.height = height;
    this.ctx.fillStyle = this.CANVAS_COLOR;
    this.ctx.fillRect(0, 0, width, height);
  }

  setEvents() {
    this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
    this.eraserEl.addEventListener("click", this.onClickEraser.bind(this));
    this.canvasEl.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvasEl.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvasEl.addEventListener("mouseup", this.onFinishBrush.bind(this));
    this.canvasEl.addEventListener("mouseout", this.onFinishBrush.bind(this));
    this.brushSizeInputEl.addEventListener(
      "change",
      this.onChangeBrushSize.bind(this)
    );
    this.brushColorInputEl.addEventListener(
      "input",
      this.onChangeBrushColor.bind(this)
    );
  }

  setMode() {
    if (this.brushEl.classList.contains("active")) {
      this.MODE = this.BRUSH;
    } else if (this.eraserEl.classList.contains("active")) {
      this.MODE = this.ERASER;
    }
  }

  setBrushPanelInfo() {
    this.brushInfoEl.style.backgroundColor = this.MODE.color;
    this.brushInfoEl.style.width = this.MODE.size + "px";
    this.brushInfoEl.style.height = this.MODE.size + "px";
    this.brushSizeInputEl.value = this.MODE.size;
  }

  onClickBrush(e) {
    e.currentTarget.classList.add("active");
    this.brushPanelEl.classList.remove("hide");
    this.eraserEl.classList.remove("active");
    this.canvasEl.style.cursor = "crosshair";
    this.setMode();
    this.setBrushPanelInfo();
  }

  onClickEraser(e) {
    e.currentTarget.classList.add("active");
    this.brushPanelEl.classList.remove("hide");
    this.brushEl.classList.remove("active");
    this.canvasEl.style.cursor = "crosshair";
    this.setMode();
    this.setBrushPanelInfo();
  }

  getMousePosition(e) {
    const { left, top } = this.canvasEl.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  }

  onMouseDown(e) {
    this.isMouseDown = true;
    const { x, y } = this.getMousePosition(e);
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = this.MODE.size;
    this.ctx.strokeStyle = this.MODE.color;
    this.ctx.moveTo(x, y);
  }

  onMouseMove(e) {
    if (!this.isMouseDown) return;
    const { x, y } = this.getMousePosition(e);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  onFinishBrush() {
    this.isMouseDown = false;
  }

  onChangeBrushSize(e) {
    if (this.MODE === this.BRUSH) {
      this.BRUSH.size = +e.target.value;
      this.brushInfoEl.style.width = this.BRUSH.size + "px";
      this.brushInfoEl.style.height = this.BRUSH.size + "px";
    } else {
      this.ERASER.size = +e.target.value;
      this.brushInfoEl.style.width = this.ERASER.size + "px";
      this.brushInfoEl.style.height = this.ERASER.size + "px";
    }
  }

  onChangeBrushColor(e) {
    this.BRUSH.color = e.target.value;
    this.brushInfoEl.style.backgroundColor = this.BRUSH.color;
  }
}

new DrawingBoard();
