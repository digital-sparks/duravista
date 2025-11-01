import AirDatepicker from 'air-datepicker';
import nl from 'air-datepicker/locale/nl';
import en from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

window.Webflow ||= [];
window.Webflow.push(() => {
  const DATE_MIN_OFFSET_DAYS = 1;
  const DATE_MAX_OFFSET_DAYS = 365;

  function getLocale() {
    const docLang = document.documentElement.lang || 'nl';
    const locales = { nl, en };
    return (locales[docLang.toLowerCase()] || nl).default;
  }

  const locale = getLocale();

  function dateToYYYYMMDD(date) {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because getMonth() is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  document.querySelector('#date-picker_input').setAttribute('readonly', 'readonly');

  new AirDatepicker('#date-picker_input', {
    locale,
    firstDay: 1,
    dateFormat: 'd MMM yyyy',
    range: true,
    minDate: new Date(Date.now() + DATE_MIN_OFFSET_DAYS * 24 * 60 * 60 * 1000),
    maxDate: new Date(Date.now() + DATE_MAX_OFFSET_DAYS * 24 * 60 * 60 * 1000),
    toggleSelected: false,
    autoClose: true,
    minView: 'days',
    position: 'bottom right',
    onSelect: function ({ date, formattedDate }) {
      console.log(date, formattedDate);
      document.querySelector('#date-picker_start').value = dateToYYYYMMDD(date[0]);
      document.querySelector('#date-picker_end').value = dateToYYYYMMDD(date[1]);

      document
        .querySelector('#date-picker_start')
        .dispatchEvent(new Event('input', { bubbles: true }));
      document
        .querySelector('#date-picker_end')
        .dispatchEvent(new Event('input', { bubbles: true }));
    },
  });
});
