export default class ImageSlider {
  $containerEl;
  $length;
  $crtSlideIdx = 0;
  $slideWidth;

  constructor() {
    this.setElements();
    this.initSetting();
    this.setEvents();
  }

  setElements() {
    this.$containerEl = document.querySelector('.image-slider-wrapper');
    this.$sliderEl = this.$containerEl.querySelector('.image-box');
    this.$prevBtn = this.$containerEl.querySelector('.btn-prev');
    this.$nextBtn = this.$containerEl.querySelector('.btn-next');
  }
  initSetting() {
    this.$length = this.$sliderEl.querySelectorAll('li').length;
    this.$slideWidth = this.$containerEl.clientWidth;
    this.$sliderEl.style.width = this.$slideWidth * this.$length + 'px';
  }

  setEvents() {
    this.$prevBtn.addEventListener('click', this.handlePrevBtn.bind(this));
    this.$nextBtn.addEventListener('click', this.handleNextBtn.bind(this));
  }

  handlePrevBtn() {
    this.$crtSlideIdx--;
    if (this.$crtSlideIdx < 0) {
      this.$crtSlideIdx = this.$length - 1;
    }
    this.$sliderEl.style.left = `-${this.$crtSlideIdx * this.$slideWidth}px`;
  }

  handleNextBtn() {
    this.$crtSlideIdx++;
    if (this.$crtSlideIdx > this.$length - 1) {
      this.$crtSlideIdx = 0;
    }
    this.$sliderEl.style.left = `-${this.$crtSlideIdx * this.$slideWidth}px`;
  }
}
