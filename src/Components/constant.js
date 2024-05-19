const distinctColors = [
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#581845",
  "#581845",
  "#8E44AD",
  "#663399",
  "#2980B9",
  "#2E86C1",
  "#F1C40F",
  "#16A085",
  "#D35400",
];

export const getRandomColor = () => {
  return distinctColors[Math.floor(Math.random() * distinctColors.length)];
};

export const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
