export const getWeightOptions = () => {
  return Array.from({ length: 161 }, (_, i) => {
    const weight = i + 40;
    return { label: `${weight}`, value: weight };
  });
};
