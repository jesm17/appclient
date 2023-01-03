$('#addProduct').click(function () {
  const nombre = $('#nombre').val();
  const descripcion = $('#descripcion').val();
  const precio = $('#precio').val();

  axios
    .post('../../productos', {
      nombre: nombre,
      descripcion: descripcion,
      precio: parseInt(precio),
    })
    .then(function (response) {
      Swal.fire({
        title: 'Listo!',
        text: `${response.data.message}`,
        icon: 'success',
        showConfirmButton: false,
      });
      setTimeout(function () {
        document.location.reload();
      }, 1500);
    })
    .catch(function (err) {
      Swal.fire({
        title: 'Oops!',
        text: `${err.response.data.message}`,
        icon: 'error',
        showConfirmButton: true,
      });
    });
});
