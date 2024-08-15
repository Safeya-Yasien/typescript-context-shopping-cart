const CURRENCY_FORMATTER = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};

export default formatCurrency;
