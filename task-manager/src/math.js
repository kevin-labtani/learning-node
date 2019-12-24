// temp file to explore testing with jest

const calculateTip = (total, tipPercent) => {
  const tip = total * tipPercent;
  return total + tip;
};

module.exports = {
  calculateTip,
};
