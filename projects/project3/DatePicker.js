class DatePicker {
  constructor (id, callback) {
    this._pdom = document.getElementById(id);
    this._selected_date = {
      year: 2024,
      month: 1,
      day: 1,
      getDate: function() {
        let t = new Date();
        t.setFullYear(this.year);
        t.setMonth(this.month-1);
        t.setDate(this.day);
        return t;
      }
    };
  }

  render(date) {
    this._pdom.innerHTML = '';
    this._selected_date.year = date.getFullYear();
    this._selected_date.month = date.getMonth() + 1;
    this._selected_date.day = date.getDay();

    //todo: add a title line
    //todo: add < > function to title line
    //todo: make dates clickable
    let cal = document.createElement('table');
    let cal_caption = document.createElement('tr');
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
    
    let firstd = this._selected_date.getDate();
    firstd.setDate(1);
    let weekday = firstd.getDay();
    weekday = (weekday + 1) % 7;
    let date_seq = Array.apply(null, Array(weekday)).map((i)=>' ');
    let month_days = 31;
    if ([4, 6, 9, 11].indexOf(this._selected_date.month) >= 0) {
      month_days = 30;
    } else if (this._selected_date.year % 400 == 0) {
      month_days = 29;
    } else if (this._selected_date.year % 4 && this._selected_date.year % 100 != 0) {
      month_days = 29;
    } else {
      month_days = 28;
    }
    date_seq = date_seq.concat([...Array(month_days).keys()].map((x)=>(x+1).toString()));
    let date_seq_len = date_seq.length;
    if (date_seq_len % 7 != 0) {
      date_seq = date_seq.concat(Array.apply(null, Array(7-(date_seq_len % 7))).map((i)=>' '));
    }
    for(let i=0;i < date_seq.length;i += 7) {
      let week = date_seq.slice(i, i+7);
      let week_row = document.createElement('tr');
      week_row.innerHTML = week.map((x) => `<td>${x}</td>`).join('');
      cal.appendChild(week_row);
    }
    this._pdom.appendChild(cal);
  }
}