export const plans = {
  Arcade: {
    img: "images/icon-arcade.svg",
    billing: {
      monthly: { cost: 9, cycle: "/mo" },
      yearly: { cost: 90, cycle: "/yr", discount: "2 months free" },
    },
  },
  Advanced: {
    img: "images/icon-advanced.svg",
    billing: {
      monthly: { cost: 12, cycle: "/mo" },
      yearly: { cost: 120, cycle: "/yr", discount: "2 months free" },
    },
  },
  Pro: {
    img: "images/icon-pro.svg",
    billing: {
      monthly: { cost: 15, cycle: "/mo" },
      yearly: { cost: 150, cycle: "/yr", discount: "2 months free" },
    },
  },
};


export let selectedPlan = {};