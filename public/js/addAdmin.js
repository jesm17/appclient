$('#addAdmin').click(function () {
  const formData = new FormData();
  const password = $('#password').val();
  const username = $('#username').val();
  const email = $('#email').val();
  const rol = $('#rol').val();
  const file = document.querySelector('#file');
  formData.append('username', username);
  formData.append('password', password);
  formData.append('email', email);
  formData.append('rol', rol);
  formData.append('file', file.files[0]);

  fetch('admin', {
    method: 'POST', // or 'PUT'
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === 500) {
        Swal.fire({
          title: 'Oops!',
          text: `${data.message}`,
          icon: 'error',
          showConfirmButton: true,
        });
      } else if (data.statusCode) {
        Swal.fire({
          title: 'Oops!',
          text: `${data.message}`,
          icon: 'error',
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          title: 'Listo!',
          text: `${data.message}`,
          icon: 'success',
          showConfirmButton: false,
        });
        setTimeout(function () {
          document.location.reload();
        }, 1500);
      }
    })
    .catch((data) => {
      console.error('Error:', data);
    });
});
