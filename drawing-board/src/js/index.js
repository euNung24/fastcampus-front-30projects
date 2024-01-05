class DrawingBoard {
  BRUSH = {
    color: "#000",
    size: 10,
  };

  isMouseDown = false;

  constructor() {
    this.setElements();
    this.init();
    this.setEvents();
  }

  setElements() {
    this.wrapperEl = document.querySelector(".drawing-board-wrapper");
    this.drawingBoardEl = this.wrapperEl.querySelector(".drawing-board");
    this.toolbarEl = this.drawingBoardEl.querySelector(".toolbar");
    this.brushEl = this.toolbarEl.querySelector(".brush");
    this.brushColorInputEl = this.toolbarEl.querySelector(".color input");
    this.canvasEl = this.drawingBoardEl.querySelector("canvas");
    this.brushPanelEl = this.wrapperEl.querySelector(".brush-panel");
    this.brushSizeInputEl = this.brushPanelEl.querySelector("input");
    this.brushInfoEl = this.brushPanelEl.querySelector(".circle");
  }

  init() {
    // 브러쉬 active
    this.brushEl.classList.add("active");
    this.brushPanelEl.classList.remove("hide");
    this.canvasEl.style.cursor = "crosshair";
    // canvas 설정
    this.ctx = this.canvasEl.getContext("2d");
    const { width, height } = this.canvasEl.getBoundingClientRect();
    this.canvasEl.width = width;
    this.canvasEl.height = height;
    // 브러시 기본 세팅
    this.brushSizeInputEl.value = this.BRUSH.size;
    this.brushInfoEl.style.width = this.BRUSH.size + "px";
    this.brushInfoEl.style.height = this.BRUSH.size + "px";
    this.brushInfoEl.style.backgroundColor = this.BRUSH.color;
  }

  setEvents() {
    this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
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

  onClickBrush(e) {
    e.currentTarget.classList.add("active");
    this.brushPanelEl.classList.remove("hide");
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
    this.ctx.lineWidth = this.BRUSH.size;
    this.ctx.strokeStyle = this.BRUSH.color;
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
    this.BRUSH.size = +e.target.value;
    this.brushInfoEl.style.width = this.BRUSH.size + "px";
    this.brushInfoEl.style.height = this.BRUSH.size + "px";
  }

  onChangeBrushColor(e) {
    this.BRUSH.color = e.target.value;
    this.brushInfoEl.style.backgroundColor = this.BRUSH.color;
  }
}

new DrawingBoard();
