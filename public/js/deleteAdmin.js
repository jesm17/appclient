$('.admin-delete').click(function (e) {
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
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      $.ajax({
        method: 'delete',
        url: 'admin/' + id,
        success(data) {
          Swal.fire({
            title: 'Listo!',
            text: `${data.message}`,
            icon: 'success',
            showConfirmButton: false,
          });
          setTimeout(function () {
            document.location.reload();
          }, 1500);
        },
        error(data) {
          console.log(data);
        },
      });
    }
  });
});
