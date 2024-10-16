import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const keyframes: ResolvableTo<
  KeyValuePair<string, KeyValuePair<string, KeyValuePair<string, string>>>
> = {
  stripe: {

    "0%": {
      "background-position": "1rem 0",
    },
    "100%": {
      "background-position": "0 0",
    }
  },
  spin: {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    }
  },
  ping: {
    "75%, 100%": {
      transform: "scale(2)",
      opacity: "0",
    },
  },
  pulse: {
    "50%": {
      opacity: ".5",
    },
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
    },
  },
  "fade-in": {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },

  "fade-out": {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
  },

  "fade-in-down": {
    "0%": {
      opacity: "0",
      transform: "translate3d(0, -100%, 0)",
    },
    "100%": {
      opacity: "1",
      transform: "translate3d(0, 0, 0)",
    },
  },
  "fade-in-left": {
    "0%": {
      opacity: "0",
      transform: "translate3d(-100%, 0, 0)",
    },
    "100%": {
      opacity: "1",
      transform: "translate3d(0, 0, 0)",
    },
  },
  "fade-in-right": {
    "0%": {
      opacity: "0",
      transform: "translate3d(100%, 0, 0)",
    },
    "100%": {
      opacity: "1",
      transform: "translate3d(0, 0, 0)",
    },
  },
  "fade-in-up": {
    "0%": {
      opacity: "0",
      transform: "translate3d(0, 100%, 0)",
    },
    "100%": {
      opacity: "1",
      transform: "translate3d(0, 0, 0)",
    },
  },
  "fade-out-down": {
    "0%": {
      opacity: "1",
    },
    "100%": {
      opacity: "0",
      transform: "translate3d(0,  calc(100vh), 0)",
    },
  },
  "fade-out-left": {
    "0%": {
      opacity: "1",
    },
    "100%": {
      opacity: "0",
      transform: "translate3d(-100%, 0, 0)",
    },
  },
  "fade-out-right": {
    "0%": {
      opacity: "1",
    },
    "100%": {
      opacity: "0",
      transform: "translate3d(100%, 0, 0)",
    },
  },
  "fade-out-up": {
    "0%": {
      opacity: "1",
    },
    "100%": {
      opacity: "0",
      transform: "translate3d(0, -100%, 0)",
    },
  },
  "slide-in-down": {
    "0%": {
      transform: "translate3d(0, -100%, 0)",
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
    },
  },
  "slide-in-left": {
    "0%": {
      transform: "translate3d(-100%, 0, 0)",
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
    },
  },
  "slide-in-right": {
    "0%": {
      transform: "translate3d(100%, 0, 0)",
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
    },
  },
  "slide-in-up": {
    "0%": {
      transform: "translate3d(0, 100%, 0)",
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
    },
  },
  "slide-out-down": {
    "0%": {
      transform: "translate3d(0, 100%, 0)",
    },
    "100%": {
      transform: "translate3d(0, calc(100vh), 0)",
    },
  },
  "slide-out-left": {
    "0%": {
      transform: "translate3d(0, 0, 0)",
    },
    "100%": {
      transform: "translate3d(-100%, 0, 0)",
    },
  },
  "slide-out-right": {
    "0%": {
      transform: "translate3d(0, 0, 0)",
    },
    "100%": {
      transform: "translate3d(100%, 0, 0)",
    },
  },
  "slide-out-up": {
    "0%": {
      transform: "translate3d(0, 0, 0)",
    },
    "100%": {
      transform: "translate3d(0, -100%, 0)",
    },
  },
  "slide-down": {
    "0%": {
      transform: "translate3d(0, 0, 0)",
    },
    "100%": {
      transform: "translate3d(0, calc(100vh), 0)",
    },
  },
  "slide-left": {
    "0%": {
      transform: "translate3d(0, 0, 0)",
    },
    "100%": {
      transform: "translate3d(-100%, 0, 0)",
    },
  },
  "slide-right": {
    "0%": {
      transform: "translate3d(0, 0, 0)",
    },
    "100%": {
      transform: "translate3d(100%, 0, 0)",
    },
  },
  "slide-up": {
    "0%": {
      transform: "translate3d(0, 0, 0)",
    },
    "100%": {
      transform: "translate3d(0, -100%, 0)",
    },
  },
  "zoom-in": {
    "0%": {
      opacity: "0",
      transform: "scale3d(0.3, 0.3, 0.3)",
    },
    "50%": {
      opacity: "1",
    },
  },
  "zoom-out": {
    "0%": {
      opacity: "1",
    },
    "50%": {
      opacity: "0",
      transform: "scale3d(0.3, 0.3, 0.3)",
    },
    "100%": {
      opacity: "0",
    },
  },
  tada: {
    "0%": {
      transform: "scale3d(1, 1, 1)",
    },
    "10%, 20%": {
      transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
    },
    "30%, 50%, 70%, 90%": {
      transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
    },
    "40%, 60%, 80%": {
      transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
    },
    "100%": {
      transform: "scale3d(1, 1, 1)",
    },
  },
  "spinner-grow": {
    "0%": {
      transform: "scale(0)",
    },
    "50%": {
      transform: "none",
      opacity: "1",
    },
  },
  "placeholder-wave": {
    "100%": { maskPosition: "-200% 0%" },
  },
  "show-up-clock": {
    "0%": {
      opacity: "0",
      transform: "scale(0.7)",
    },
    "100%": {
      opacity: "1",
      transform: "scale(1)",
    },
  },
  "infinite-progress-horizontal": {
    "0%": {
      transform:  "translateX(-100%)",
    },
    "100%": {
      transform:  "translateX(100%)",
    }
  },
  "infinite-progress-vertical": {
    "0%": {
      transform:  "translateY(-100%)",
    },
    "100%": {
      transform:  "translateY(100%)",
    }
  }
};
