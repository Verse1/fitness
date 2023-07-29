export const getAgeOptions = () => {
  const options = [];
  for (let i = 1; i <= 100; i++) {
    options.push({ label: `${i}`, value: i });
  }
  return options;
};
