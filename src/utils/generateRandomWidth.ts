export const generateRandomWidth = (
  minWidth: number,
  maxWidth: number,
): number => {
  const width = Math.floor(
    Math.random() * (maxWidth - minWidth + 1) + minWidth,
  );

  return width;
};

export const generateRandomHeight = (
  minHeight: number,
  maxHeight: number,
): number => {
  const height = Math.floor(
    Math.random() * (maxHeight - minHeight + 1) + minHeight,
  );

  return height;
};
