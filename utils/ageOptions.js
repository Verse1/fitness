export const getAgeOptions = () => {
  return Array.from({ length: 82 }, (_, i) => {
    const age = i + 18;
    return { label: age.toString(), value: age };
  });
};
