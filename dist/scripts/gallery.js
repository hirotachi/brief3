const optionsPercentage = {
  electric: 5,
  hybrid: 9,
  essence: 14,
  diesel: 21,
  automatic: 19,
};

const vehicles = [
  { type: "moto", electric: true, essence: true, pricePerDay: 10 },
  {
    type: "citadine",
    manual: true,
    electric: true,
    essence: true,
    hybrid: true,
    diesel: true,
    pricePerDay: 12,
  },
  {
    type: "compact",
    manual: true,
    essence: true,
    hybrid: true,
    diesel: true,
    pricePerDay: 14,
  },
  {
    type: "berline",
    automatic: true,
    essence: true,
    hybrid: true,
    diesel: true,
    pricePerDay: 20,
  },
  { type: "utilitaire", manual: true, diesel: true, pricePerDay: 16 },
  {
    type: "engin de chantier",
    manual: true,
    essence: true,
    diesel: true,
    pricePerDay: 900,
  },
  { type: "camion", automatic: true, diesel: true, pricePerDay: 250 },
];
