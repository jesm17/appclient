$('.product-delete').click(function (e) {
  let id = e.currentTarget.value;
  Swal.fire({
    title: 'Esta seguro de eliminar este administrador?',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: ``,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4565',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`../../productos/${id}`)
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
        .catch(function (error) {
          console.log(error);
        });
    }
  });
});
