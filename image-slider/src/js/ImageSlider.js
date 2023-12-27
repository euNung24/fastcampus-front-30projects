export default class ImageSlider {
  $containerEl;

  $sliderEl;

  $prevBtn;

  $nextBtn;

  $indicatorEl;

  $length;

  $crtSlideIdx = 0;

  $slideWidth;

  $intervalId;

  $autoPlay = true;

  constructor() {
    this.setElements();
    this.initSetting();
    this.createIndicator();
    this.setEvents();
    this.setAutoPlay();
  }

  setElements() {
    this.$containerEl = document.querySelector('.image-slider-wrapper');
    this.$sliderEl = this.$containerEl.querySelector('.image-box');
    this.$prevBtn = this.$containerEl.querySelector('.btn-prev');
    this.$nextBtn = this.$containerEl.querySelector('.btn-next');
    this.$indicatorEl = this.$containerEl.querySelector('.indicator-box');
    this.$autoPlayEl = this.$containerEl.querySelector('.btn-control-box');
  }

  initSetting() {
    this.$length = this.$sliderEl.querySelectorAll('li').length;
    this.$slideWidth = this.$containerEl.clientWidth;
    this.$sliderEl.style.width = `${this.$slideWidth * this.$length}px`;
  }

  setEvents() {
    this.$prevBtn.addEventListener('click', this.handlePrevBtn.bind(this));
    this.$nextBtn.addEventListener('click', this.handleNextBtn.bind(this));
    this.$indicatorEl.addEventListener(
      'click',
      this.handleIndicator.bind(this),
    );
    this.$autoPlayEl.addEventListener('click', this.handleAutoPlay.bind(this));
  }

  moveSlide() {
    this.$sliderEl.style.left = `-${this.$crtSlideIdx * this.$slideWidth}px`;
    this.setIndicator();
    if (this.$intervalId) {
      clearInterval(this.$intervalId);
    }
    this.setAutoPlay();
  }

  handlePrevBtn() {
    this.$crtSlideIdx -= 1;
    if (this.$crtSlideIdx < 0) {
      this.$crtSlideIdx = this.$length - 1;
    }
    this.moveSlide();
  }

  handleNextBtn() {
    this.$crtSlideIdx += 1;
    if (this.$crtSlideIdx > this.$length - 1) {
      this.$crtSlideIdx = 0;
    }
    this.moveSlide();
  }

  createIndicator() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.$length; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i.toString();
      if (this.$crtSlideIdx === i) {
        li.classList.add('active');
      }
      fragment.appendChild(li);
    }
    this.$indicatorEl.appendChild(fragment);
  }

  setIndicator() {
    this.$indicatorEl.querySelector('.active')?.classList.remove('active');
    this.$indicatorEl
      .querySelectorAll('li')
      [this.$crtSlideIdx].classList.add('active');
  }

  handleIndicator(e) {
    this.$crtSlideIdx = parseInt(
      e.target.dataset.index || this.$crtSlideIdx,
      10,
    );
    this.moveSlide();
  }

  setAutoPlay() {
    if (this.$autoPlay) {
      this.$intervalId = setInterval(this.handleNextBtn.bind(this), 2500);
      this.$autoPlayEl.classList.add('play');
      this.$autoPlayEl.classList.remove('pause');
    } else {
      clearInterval(this.$intervalId);
      this.$autoPlayEl.classList.add('pause');
      this.$autoPlayEl.classList.remove('play');
    }
  }

  handleAutoPlay(e) {
    if (e.target.closest('button').dataset.status === 'play') {
      this.$autoPlay = true;
    } else if (e.target.closest('button').dataset.status === 'pause') {
      this.$autoPlay = false;
    }
    this.setAutoPlay();
  }
}
