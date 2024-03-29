/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1720px",
    },
    extend: {
      textColor: {
        primary: "#DD6B20",
        secondary: "#40E0D0",

        "dark-main": "#0A0C11",
        "dark-secondary": "rgb(19, 24, 35)",
        "light-main": "#D2D6EE",
      },
      backgroundColor: {
        primary: "#DD6B20",
        secondary: "#40E0D0",

        "dark-main": "#0A0C11",
        "dark-secondary": "rgb(19, 24, 35)",
        "dark-tertiary": "#205d7d",
        "dark-hover": "#99a1bd14",

        grayscale: "#111114",

        "light-primary": "#FFF",
        "light-secondary": "#E2EAF4",
      },
      backgroundImage: () => ({
        app: "black",

        "app-find-us":
          "linear-gradient(55deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 75%, rgba(184,115,51,1) 100%)",

        "app-variation-1":
          "linear-gradient(55deg, #0A0C11 0%, #DD6B20 50%, #DD6B20 75%, rgba(184,115,51,1) 100%)",
        "app-variation-2":
          "linear-gradient(55deg, #DD6B20 0%, #0A0C11 50%, #0A0C11 75%, #0A0C11 100%)",

        "dark-primary": "linear-gradient(to right, #0A0C11, rgb(19, 24, 35))",
        "dark-fade":
          "linear-gradient(to right, #0A0C11, #131823, rgb(19, 24, 35))",

        // "blue-harmony": "linear-gradient(to right, #6366f1, #89a0f7, #aebcfb)",
        // "twilight-serenity":
        //   "linear-gradient(to right, #6366f1, #7d72c5, #9581a8)",
        // "oceanic-depths":
        //   "linear-gradient(to right, #6366f1, #4a7ab7, #3091dc)",
        // "evening-sky": "linear-gradient(to right, #6366f1, #596ab5, #4c6e9b)",
        // "mystic-horizon":
        //   "linear-gradient(to right, #6366f1, #7f88b5, #9fa9c9)",

        "gold-rush": "linear-gradient(to right, #B68626, #FFD700)",
        "amber-glow": "linear-gradient(to right, #B68626, #FFBF00)",
        "copper-shine": "linear-gradient(to right, #B68626, #B87333)",
        "sunset-horizon": "linear-gradient(to right, #B68626, #FF8C00)",

        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }),
      borderColor: {
        primary: "#DD6B20",
        secondary: "#40E0D0",

        "dark-main": "#8F8686",
        "light-main": "#D2D6EE",
      },
      keyframes: {
        lightning: {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 0.25,
          },
          "80%": {
            opacity: 0.5,
          },
          "90%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        pulse: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        shadowColorChange: {
          "0%": {
            boxShadow: "0px 0px 10px 5px #ee3a00",
          },
          "33%": {
            boxShadow: "0px 0px 10px 5px #17e8fe",
          },
          "66%": {
            boxShadow: "0px 0px 10px 5px #e23bfd",
          },
          "100%": {
            boxShadow: "0px 0px 10px 5px #eb7744",
          },
          // "100%": {
          //   boxShadow: "0px 0px 10px 5px #895335",
          // },
        },
        lightSpeedInLeft: {
          "0%": {
            transform: "translateX(-100%) skewX(-30deg)",
            opacity: 0,
          },
          "60%": {
            transform: "translateX(20%) skewX(20deg)",
            opacity: 1,
          },
          "80%": {
            transform: "translateX(-5%) skewX(-5deg)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromTop: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        slideInFromLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromBottom: {
          "0%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        typing: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        pulse: "pulse 1s infinite",
        pulseBasic: "pulse 1s ease",
        bounceSlow: "bounce 1.5s infinite",
        slideInTopBasic: "slideInFromTop 1s ease-out",
        slideInRightBasic: "slideInFromRight 1s ease",
        slideInLeftBasic: "slideInFromLeft 1s ease",
        slideInBottomBasic: "slideInFromBottom 1s ease",
        slideInTopFast: "slideInFromTop 0.5s ease-out",
        slideInRightFast: "slideInFromRight 0.5s ease",
        slideInLeftFast: "slideInFromLeft 0.5s ease",
        slideInBottomInstant: "slideInFromBottom 0.25s ease",
        lightSpeedInLeftFast: "lightSpeedInLeft 0.5s ease-out",
        lightSpeedInLeftBase: "lightSpeedInLeft 1s ease-out",
        fadeInInstant: "fadeIn 0.25s ease",
        fadeInBasic: "fadeIn 0.5s ease",
        fadeInBase: "fadeIn 1s ease",
        fadeInLame: "fadeIn 2s ease",
        spinSlow: "spin 5s linear infinite",
        lightningBase: "lightning 2s infinite",
        shadowColorChangeMythical: "shadowColorChange 5s infinite",
        typingBasic: "typing 2s steps(20, end)",
      },
      boxShadow: {
        "dark-shadow": "inset 0 0 0 1px #202835",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
