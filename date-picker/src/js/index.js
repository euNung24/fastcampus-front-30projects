class DatePicker {
  wrapperEl;
  dateInputEl;
  calenderEl;
  monthEl;
  monthContentEl;
  prevMonthBtnEl;
  nextMonthBtnEl;
  dateEl;

  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  calendarData = {
    data: '',
    year: 0,
    month: 0,
    date: 0,
  };

  selectedData = {
    data: '',
    year: 0,
    month: 0,
    date: 0,
  };

  constructor() {
    this.initCalendarDate();
    this.initSelectedDate();
    this.setElements();
    this.initCalendarData();
    this.setEvents();
  }

  initCalendarDate() {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth();
    const date = data.getDate();

    this.calendarData = {
      data,
      year,
      month,
      date,
    };
  }

  initSelectedDate() {
    this.selectedData = { ...this.calendarData };
  }

  setElements() {
    this.wrapperEl = document.querySelector('.date-picker-wrapper');
    this.dateInputEl = this.wrapperEl.querySelector('.date-picker-input');
    this.calenderEl = this.wrapperEl.querySelector('.calendar-wrapper');
    this.monthEl = this.calenderEl.querySelector('.month');
    this.monthContentEl = this.monthEl.querySelector('.content');
    this.prevMonthBtnEl = this.monthEl.querySelector('.btn-prev');
    this.nextMonthBtnEl = this.monthEl.querySelector('.btn-next');
    this.dateEl = this.calenderEl.querySelector('.dates');
  }

  setEvents() {
    this.dateInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    this.prevMonthBtnEl.addEventListener(
      'click',
      this.moveToPrevMonth.bind(this),
    );
    this.nextMonthBtnEl.addEventListener(
      'click',
      this.moveToNextMonth.bind(this),
    );
    this.dateEl.addEventListener('click', this.onClickSelectDate.bind(this));
  }

  toggleCalendar() {
    if (this.calenderEl.classList.contains('show')) {
      this.calendarData = { ...this.selectedData };
    }
    this.calenderEl.classList.toggle('show');
    this.updateMonth();
    this.updateDates();
  }

  moveToPrevMonth() {
    this.calendarData.month--;
    if (this.calendarData.month < 0) {
      this.calendarData.month = 11;
      this.calendarData.year--;
    }
    this.updateMonth();
    this.updateDates();
  }

  moveToNextMonth() {
    this.calendarData.month++;
    if (this.calendarData.month > 11) {
      this.calendarData.month = 0;
      this.calendarData.year++;
    }
    this.updateMonth();
    this.updateDates();
  }

  genTwoDigitNum(num) {
    return num.toString().padStart(2, '0');
  }

  initCalendarData() {
    this.setCalendarInput();
    this.updateMonth();
    this.updateDates();
  }

  setCalendarInput() {
    this.dateInputEl.innerHTML = `${
      this.selectedData.year
    }/${this.genTwoDigitNum(this.selectedData.month + 1)}/${this.genTwoDigitNum(
      this.selectedData.date,
    )}`;
  }

  updateMonth() {
    this.monthContentEl.innerHTML = `${this.calendarData.year} ${
      this.monthData[this.calendarData.month]
    }`;
  }

  updateDates() {
    this.dateEl.innerHTML = '';
    const { year, month } = this.calendarData;
    const numOfDates = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numOfDates; i++) {
      const dateEl = document.createElement('span');
      dateEl.dataset.date = (i + 1).toString();
      dateEl.textContent = (i + 1).toString();
      fragment.appendChild(dateEl);
    }
    this.dateEl.appendChild(fragment);

    // setStartDay
    this.dateEl.firstElementChild.style.gridColumnStart = (
      startDay + 1
    ).toString();

    // colorToFriday
    [
      ...this.dateEl.querySelectorAll(`span:nth-child(7n + ${7 - startDay})`),
    ].forEach(el => (el.style.color = 'blue'));

    // colorToSunday
    [
      ...this.dateEl.querySelectorAll(
        `span:nth-child(7n + ${(8 - startDay) % 7})`,
      ),
    ].forEach(el => (el.style.color = 'red'));

    this.colorToday();
    this.colorSelectedDay();
  }

  colorToday() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    if (
      todayYear === this.calendarData.year &&
      todayMonth === this.calendarData.month
    ) {
      this.dateEl
        .querySelector(`[data-date="${todayDate}"]`)
        .classList.add('today');
    }
  }

  onClickSelectDate(e) {
    const selectedYear = this.calendarData.year;
    const selectedMonth = this.calendarData.month;
    const selectedDate = e.target.dataset.date || 1;

    this.selectedData = {
      data: new Date(selectedYear, selectedMonth, selectedDate),
      year: selectedYear,
      month: selectedMonth,
      date: selectedDate,
    };
    this.colorSelectedDay();
    this.setCalendarInput();
    this.calenderEl.classList.remove('show');
  }

  colorSelectedDay() {
    if (
      this.selectedData.year === this.calendarData.year &&
      this.selectedData.month === this.calendarData.month
    ) {
      this.dateEl.querySelector('.select')?.classList.remove('select');
      this.dateEl
        .querySelector(`[data-date="${this.selectedData.date}"]`)
        .classList.add('select');
    }
  }
}

new DatePicker();
