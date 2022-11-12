/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      brightness: {
        15: '.15'
      },
      backgroundImage: {
        'office': "url('/assets/background_image.jpg')",
      },
      
      colors: {
        white: "#ffffff",
        divider: "#c2c2c2",
        primary: "#f39c12",
        primaryContainer: "#333333",
        dropdown: '#414141',
        surface: "#212121",
        success: "#388E3C",
        error: "#b00d20",
        disabled: "#2E2E2E"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
  ],
};
