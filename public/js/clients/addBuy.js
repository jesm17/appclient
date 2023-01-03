$('#addBuyButton').click(function () {
  axios
    .get('../../../productos/')
    .then((response) => {
      const { data } = response;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
