export const generateRandomWidth = (
  minWidth: number,
  maxWidth: number,
): number => {
  const width = Math.floor(
    Math.random() * (maxWidth - minWidth + 1) + minWidth,
  );

  return width;
};
