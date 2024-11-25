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

export const addOns = [
  {
    id: 1,
    name: "Online service",
    desc: "Access to multiplayer games",
    billing: {
      monthly: { fee: 1, cycle: "/mo" },
      yearly: { fee: 10, cycle: "/yr" },
    },
    selected: false // To track if the checkbox is checked
  },
  {
    id: 2,
    name: "Larger storage",
    desc: "Extra 1TB of cloud save",
    billing: {
      monthly: { fee: 2, cycle: "/mo" },
      yearly: { fee: 20, cycle: "/yr" },
    },
    selected: false
  },
  {
    id: 3,
    name: "Customizable profile",
    desc: "Custom theme on your profile",
    billing: {
      monthly: { fee: 2, cycle: "/mo" },
      yearly: { fee: 20, cycle: "/yr" },
    },
    selected: false
  }
];