import AirDatepicker from 'air-datepicker';
import nl from 'air-datepicker/locale/nl';
import en from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';
import './styles.css';

// Constants
const DATE_MIN_OFFSET_DAYS = 1;
const DATE_MAX_OFFSET_DAYS = 365 * 2;

// Locale helper
function getLocale() {
  const docLang = document.documentElement.lang || 'nl';
  const locales = { nl, en };
  return (locales[docLang.toLowerCase()] || nl).default;
}

// Date formatter
function dateToYYYYMMDD(date) {
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Common combobox clear handler
function setupComboboxClear() {
  document
    .querySelectorAll('[fs-list-element="clear"], [fs-combobox-element="clear"]')
    .forEach((btn) =>
      btn.addEventListener('click', () => {
        document.querySelector('[fs-combobox-element="clear"]')?.click();
        document.querySelector('.fs-combobox_fake-reset')?.click();
      })
    );
}

// Location parameter handler
function handleLocationFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const locationEqual = urlParams.get('2_location_equal');

  if (locationEqual) {
    const input = document.querySelector('[fs-combobox-element="text-input"]');
    if (input) {
      input.value = locationEqual;
      console.log('Location set from URL:', input.value);
    }
  }
}

// Date parameter handler
function handleDateFromURL(datePicker) {
  const urlParams = new URLSearchParams(window.location.search);
  const startDate = urlParams.get('2_date_greater-equal');
  const endDate = urlParams.get('2_date_less-equal');

  if (startDate) {
    datePicker.selectDate(endDate ? [startDate, endDate] : startDate);
  }
}

// Default date picker configuration
function getDefaultDatePickerConfig() {
  return {
    locale: getLocale(),
    firstDay: 1,
    dateFormat: 'd MMM yyyy',
    buttons: ['clear'],
    multipleDatesSeparator: ' - ',
    range: true,
    minDate: new Date(Date.now() + DATE_MIN_OFFSET_DAYS * 24 * 60 * 60 * 1000),
    maxDate: new Date(Date.now() + DATE_MAX_OFFSET_DAYS * 24 * 60 * 60 * 1000),
    toggleSelected: false,
    autoClose: true,
    minView: 'days',
    position: 'bottom right',
  };
}

// Default onSelect handler
function createDefaultOnSelectHandler() {
  return function ({ date }) {
    const startInput = document.querySelector('#date-picker_start');
    const endInput = document.querySelector('#date-picker_end');

    if (startInput && date[0]) {
      startInput.value = dateToYYYYMMDD(date[0]);
      startInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    if (endInput && date[1]) {
      endInput.value = dateToYYYYMMDD(date[1]);
      endInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };
}

// Initialize date picker with common setup
function initializeDatePicker(selector = '#date-picker_input', customConfig = {}) {
  const inputElement = document.querySelector(selector);
  if (!inputElement) {
    console.warn(`Date picker input element not found: ${selector}`);
    return null;
  }

  inputElement.setAttribute('readonly', 'readonly');

  const defaultConfig = getDefaultDatePickerConfig();
  const config = {
    ...defaultConfig,
    onSelect: createDefaultOnSelectHandler(),
    ...customConfig,
  };

  return new AirDatepicker(selector, config);
}

// Export all functions and constants
export {
  DATE_MIN_OFFSET_DAYS,
  DATE_MAX_OFFSET_DAYS,
  getLocale,
  dateToYYYYMMDD,
  setupComboboxClear,
  handleLocationFromURL,
  handleDateFromURL,
  getDefaultDatePickerConfig,
  createDefaultOnSelectHandler,
  initializeDatePicker,
};
