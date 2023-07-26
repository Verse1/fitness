export const getHeightOptions = () => {
  return Array.from({ length: 151 }, (_, i) => {
    const height = i + 100;
    return { label: `${height}`, value: height };
  });
};
