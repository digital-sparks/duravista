import {
  setupComboboxClear,
  handleLocationFromURL,
  handleDateFromURL,
  initializeDatePicker,
} from './shared-utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Setup common handlers
  setupComboboxClear();
  handleLocationFromURL();

  // Initialize date picker with default config
  const datePicker = initializeDatePicker();

  if (!datePicker) return;

  // Handle date from URL parameters
  handleDateFromURL(datePicker);

  // Page 2 specific: Clear button handler (excluding location field)
  document
    .querySelectorAll('[fs-list-element="clear"]:not([fs-list-field="location"])')
    .forEach((button) => {
      button.addEventListener('click', () => {
        datePicker.clear();
      });
    });
});
