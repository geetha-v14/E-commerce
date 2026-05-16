const calculateDiscount = (
  price,
  salePrice
) => {

  if (
    !salePrice ||
    salePrice <= 0 ||
    salePrice >= price
  ) {

    return 0;

  }

  const discount =  ((price - salePrice) / price) * 100;

  return Math.round(discount);

};

module.exports = calculateDiscount;