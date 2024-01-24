export const priceToPreciseFloat = (price: number | undefined) => {
  if (!price) return undefined;
  const floatForLargerNumbers = parseFloat(price.toFixed(9));
  if (floatForLargerNumbers < 0.1) {
    return parseFloat(price.toPrecision(6));
  }
  return floatForLargerNumbers;
};
