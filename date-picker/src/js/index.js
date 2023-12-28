/*
1. date 세팅

*/
class DatePicker {
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

  constructor() {
    this.initCalendarDate();
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
    this.prevMonthBtnEl.addEventListener(
      'click',
      this.moveToPrevMonth.bind(this),
    );
    this.nextMonthBtnEl.addEventListener(
      'click',
      this.moveToNextMonth.bind(this),
    );
  }

  moveToPrevMonth() {
    this.calendarData.month--;
    if (this.calendarData.month < 0) {
      this.calendarData.month = 11;
      this.calendarData.year--;
    }
    this.setMonthContent();
    this.genCalendarDates();
  }

  moveToNextMonth() {
    this.calendarData.month++;
    if (this.calendarData.month > 11) {
      this.calendarData.month = 0;
      this.calendarData.year++;
    }
    this.setMonthContent();
    this.genCalendarDates();
  }

  genTwoDigitNum(num) {
    return num.toString().padStart(2, '0');
  }

  initCalendarData() {
    this.setCalendarInput();
    this.setMonthContent();
    this.genCalendarDates();
  }

  setCalendarInput() {
    this.dateInputEl.innerHTML = `${
      this.calendarData.year
    }/${this.genTwoDigitNum(this.calendarData.month + 1)}/${this.genTwoDigitNum(
      this.calendarData.date,
    )}`;
  }

  setMonthContent() {
    this.monthContentEl.innerHTML = `${this.calendarData.year} ${
      this.monthData[this.calendarData.month]
    }`;
  }

  genCalendarDates() {
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
  }
}

new DatePicker();
