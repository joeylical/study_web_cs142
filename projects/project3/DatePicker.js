'use strict';

/**
 * A range like it in Python
 * @param  {...any} args 
 * @returns 
 */
function range(...args) {
  let from = 0;
  let to;
  let step = 1;
  
  switch(args.length) {
    case 1:
      to = args[0];
      break;
    case 2:
      from = args[0];
      to = args[1];
      break;
    case 3:
      from = args[0];
      to = args[1];
      step = args[2];
      break;
    default:
      throw new Error('Only 1~3 arguments allowed.');
  }

  const top = Math.floor((to - from)/step);
  const f = i => i * step + from;
  return [...Array(top).keys()].map(f);
}

class DatePicker {
  constructor (id, callback) {
    this.pdom = document.getElementById(id);
    this.date = new Date();
    this.displaying_date = new Date(this.date);
    this.displaying_date.setDate(1);
    this.callback = callback;
  }

  /**
   * trigger the callback
   * @param {date} date 
   */
  UpdateDate(date) {
    this.date = date;
    if (typeof this.callback === 'function') {
      // console.log(this.getYear(), this.getMonth(), this.getDay());
      this.callback(
        this.id,
        {
          year: this.getYear(),
          month: this.getMonth(),
          day: this.getDay()
        }
      );
    }
  }

  /**
   * 
   * @returns Year of currently selected date.
   */
  getYear() {
    return this.date.getFullYear();
  }

  /**
   * 
   * @returns Month of currently selected date.
   */
  getMonth() {
    return this.date.getMonth() + 1;
  }

  /**
   * 
   * @returns Day of currently selected date.
   */
  getDay() {
    return this.date.getDate();
  }

  /**
   * Return if a year is a leap year.
   * @param {number} year 
   * @returns boolean
   */
  isLeepYear(year = this.getYear()) {
    if (year % 400 === 0) {
      return true;
    } else if ((year % 100 !== 0 ) && (year % 4 === 0)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Return how many days in a month of selected year.
   * @param {number} month 
   * @returns number
   */
  getDaysOfMonth(month) {
    let month_days = 31;
    if ([4, 6, 9, 11].indexOf(month) >= 0) {
      month_days = 30;
    } else if (month === 2) {
      if (this.isLeepYear()) {
        month_days = 29;
      } else {
        month_days = 28;
      }
    }

    return month_days;
  }

  selectDate(date) {
    date = parseInt(date, 10);
    const d = new Date(this.displaying_date);
    d.setDate(date);
    this.UpdateDate(d);
  }

  /**
   * date -> days of <td>
   * @param {date} date 
   */
  getDatesHTML() {
    const firstd = this.displaying_date;
    let weekday = firstd.getDay();

    let last_month = (firstd.getMonth() - 1 + 12) % 12;
    last_month += 1;
    let last_year = firstd.getFullYear();
    if (firstd.getMonth() === 0) {
      last_year -= 1;
    }

    let next_month = (firstd.getMonth() + 1) % 12;
    next_month  += 1;
    let next_year = firstd.getFullYear();
    if (firstd.getMonth() === 11) {
      next_year += 1;
    }

    const create_style = color => curr => `
        color: ${color};
      ` + (curr?`
        font-weight: bolder;
        background-color: orange;
      `:'');

    const style_gray = create_style('gray');

    const style_black = create_style('black');

    // begin padding
    weekday %= 7;
    const last_day_of_last_month = this.getDaysOfMonth(last_month);
    const lpadding = i => (i + last_day_of_last_month - weekday + 1).toString();
    let formatter = d => {
      const td = document.createElement('td');
      td.style = style_gray(
        (this.date.getFullYear() === last_year) &&
        (this.date.getMonth() + 1 === last_month) &&
        parseInt(d, 10) === this.date.getDate()
      );
      td.innerText = d;
      return td;
    };
    let date_seq = range(weekday)
                    .map(lpadding)
                    .map(formatter);

    // current month
    formatter = d => {
      const td = document.createElement('td');
      td.style = `
        cursor: pointer;
      ` + style_black(
        (this.date.getFullYear() === this.displaying_date.getFullYear()) &&
        (this.date.getMonth() === this.displaying_date.getMonth()) &&
        (parseInt(d, 10) === this.date.getDate())
      );
      td.innerText = d;
      td.onclick = () => {
        const date = new Date(this.displaying_date);
        date.setDate(parseInt(d, 10));
        this.UpdateDate(date);
        this.renderMonth();
      };
      return td;
    };
    const month_days = this.getDaysOfMonth(firstd.getMonth() + 1);
    date_seq = date_seq.concat(range(month_days)
                    .map(i => (i+1).toString())
                    .map(c => {
                      if (c.length === 1) c = '0' + c;
                      return c;
                    })
                    .map(formatter));
    
    // end padding
    formatter = d => {
      const td = document.createElement('td');
      td.style = style_gray(
        (this.date.getFullYear() === next_year) &&
        (this.date.getMonth() + 1 === next_month) &&
        parseInt(d, 10) === this.date.getDate()
      );
      td.innerText = d;
      return td;
    };
    const date_seq_len = date_seq.length;
    if (date_seq_len % 7 !== 0) {
      const padding_days = 7 - (date_seq_len % 7);
      date_seq = date_seq.concat(range(0,  padding_days)
                    .map(i => (i+1).toString())
                    .map(c => {
                      if (c.length === 1) c = '0' + c;
                      return c;
                    })
                    .map(formatter));
    }

    return date_seq;
  }

  prev_month() {
    const date = new Date(this.displaying_date);
    if (date.getMonth() === 0) {
      date.setMonth(11);
      date.setFullYear(date.getFullYear() - 1);
    } else {
      date.setMonth(date.getMonth() - 1);
      date.setFullYear(date.getFullYear());
    }
    return date;    
  }

  next_month() {
    const date = new Date(this.displaying_date);
    if (date.getMonth() === 11) {
      date.setMonth(0);
      date.setFullYear(date.getFullYear() + 1);
    } else {
      date.setMonth(date.getMonth() + 1);
      date.setFullYear(date.getFullYear());
    }
    return date;
  }

  render_toolbar(root) {
    const toolbar = document.createElement('div');
    toolbar.style = `
        width: auto; 
        display: flex; 
        flex-flow: row; 
        justify-content: space-between;
        background-color: yellow;
    `;
    
    const prev = document.createElement('div');
    prev.style = `
        cursor: pointer;
        font-family: system-ui;
    `;
    prev.innerText = '<';
    prev.onclick = () => {
      this.displaying_date = this.prev_month();
      this.renderMonth();
    };
    toolbar.appendChild(prev);

    const d = document.createElement('div');
    d.style = `
        text-align: center;
        cursor: pointer;
        font-family: system-ui;
    `;
    const a = this.displaying_date.toDateString().split(' ');
    d.innerText = `${a[1]} ${a[3]}`;
    toolbar.appendChild(d);

    const next = document.createElement('div');
    next.style = `
        cursor: pointer;
        font-family: system-ui;
    `;
    next.innerText = '>';
    next.onclick = () => {
      this.displaying_date = this.next_month();
      this.renderMonth();
    };
    toolbar.appendChild(next);

    root.appendChild(toolbar);
  }

  renderMonth() {
    this.pdom.innerHTML = '';
    this.pdom.style = `
        width: 240px; 
        display: flex; 
        flex-flow: column;
        border: 1px solid gray;
    `;

    //todo: make dates clickable
    const cal = document.createElement('table');
    cal.style = `
        text-align: center;
        justify-content: space-around;
        border-collapse: collapse;
    `;
    this.render_toolbar(this.pdom);
    
    const cal_caption = document.createElement('tr');
    cal_caption.style = `
        background-color: lightgreen;
        border: 1px solid gray;
    `;
    cal_caption.innerHTML = `
        <th>Su</th>
        <th>Mo</th>
        <th>Tu</th>
        <th>We</th>
        <th>Th</th>
        <th>Fr</th>
        <th>Sa</th>
    `;
    cal.appendChild(cal_caption);
    
    const date_seq = this.getDatesHTML();
    for(let i=0;i < date_seq.length;i += 7) {
      const week = date_seq.slice(i, i+7);
      const week_row = document.createElement('tr');
      // for(let j=0;j < 7;j++) week_row.appendChild(week[j]);
      week.forEach(dom => week_row.appendChild(dom));
      cal.appendChild(week_row);
    }
    this.pdom.appendChild(cal);
  }

  render(date) {
    this.date = new Date(date);
    this.displaying_date = new Date(date);
    this.displaying_date.setDate(1);
    this.renderMonth();
  }
}