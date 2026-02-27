const convertNumberCurrency = (val) => {
  if (!val) {
    return "";
  }
  return `Rp. ${new Intl.NumberFormat("id-ID").format(val)}`;
};

export default convertNumberCurrency;
