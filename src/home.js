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

  // Page 1 specific: Search button handler
  const searchBtn = document.querySelector('#searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLink = e.target.href;
      window.location.href = targetLink + window.location.search;
    });
  }
});
