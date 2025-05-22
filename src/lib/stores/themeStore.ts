import { writable } from 'svelte/store';
import { BROWSER } from 'esm-env';

const initialValue = false;

// Create a writable store with an initial value
const createThemeStore = () => {
  const { subscribe, set, update } = writable(initialValue);

  // Function to initialize the theme from localStorage and update body class
  const init = () => {
    if (BROWSER) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        set(true);
        document.body.classList.add('light-mode');
      } else {
        set(false);
        document.body.classList.remove('light-mode');
      }
    }
  };

  // Function to toggle the theme
  const toggle = () => {
    update(isLight => {
      const newIsLightMode = !isLight;
      if (BROWSER) {
        localStorage.setItem('theme', newIsLightMode ? 'light' : 'dark');
        if (newIsLightMode) {
          document.body.classList.add('light-mode');
        } else {
          document.body.classList.remove('light-mode');
        }
      }
      return newIsLightMode;
    });
  };

  // Custom set function to also update localStorage and body class
  const customSet = (value: boolean) => {
    if (BROWSER) {
      localStorage.setItem('theme', value ? 'light' : 'dark');
      if (value) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
    set(value);
  };

  return {
    subscribe,
    set: customSet, // Use customSet to ensure localStorage and body class are updated
    toggle,
    init
  };
};

export const themeStore = createThemeStore();

// Initialize the theme when the store is first imported on the client
if (BROWSER) {
  themeStore.init();
} 