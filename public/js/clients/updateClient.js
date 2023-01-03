let id = 0;
$('.client-update').click(function (e) {
  console.log($('#updateAdmin'));
  id = e.currentTarget.value;

  fetch(`../../admin/client/get/${id}`, {
    method: 'GET', // or 'PUT'
  })
    .then((response) => response.json())
    .then((data) => {
      let form = document.getElementById('updateform');
      form.innerHTML = `<form
      class="updateAdminForm"
      id="updateAdminForm"
      enctype="multipart/form-data"
      novalidate
    >
      <div class="col-sm-12 messages" id="messages"></div>
      <div class="form-floating mt-1">
        <input
          type="text"
          class="form-control"
          id="usernameUpdate"
          name="usernameUpdate"
          placeholder="Username"
          value="${data.username}"
          required
        />
        <label for="floatingInput"
          >Nombre de usuario <i class="bi bi-person"></i
        ></label>
      </div>

      <div class="form-floating mt-1">
        <input
          type="email"
          class="form-control"
          id="emailUpdate"
          name="emailUpdate"
          placeholder="name@example.com"
          value="${data.email}"
          required
        />
        <label for="floatingInput"
          >Correo electronico <i class="bi bi-envelope-at"></i
        ></label>
      </div>
      <div class="form-floating mt-1">
        <input
          type="password"
          class="form-control"
          id="passwordUpdate"
          name="passwordUpdate"
          placeholder="Password"
          required
        />
        <label for="floatingPassword"
          >Contraseña <i class="bi bi-key"></i
        ></label>
      </div>

      <div class="mt-1">
        <input
          multiple
          type="file"
          class="form-control"
          name="fileUpdate"
          id="fileUpdate"
        />
      </div>

      
    </form>`;
      console.log(data);
    })
    .catch((data) => {
      console.error('Error:', data);
    });
});

$('#updateClient').click(function () {
  const formData = new FormData();
  const password = $('#passwordUpdate').val();
  const username = $('#usernameUpdate').val();
  const email = $('#emailUpdate').val();
  const file = document.querySelector('#fileUpdate');
  for (const [name, value] of formData) {
    console.log(`${name} ${value}`);
  }
  formData.append('username', username);
  formData.append('email', email);
  formData.append('rol', 'client');
  if (file.files[0] != undefined) {
    formData.append('image', file.files[0]);
  }

  if (!password) {
    formData.delete('password');
  } else {
    formData.append('password', password);
  }

  fetch(`../../admin/${id}`, {
    method: 'PUT',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status == 200) {
        Swal.fire({
          title: 'Listo!',
          text: `${data.message}!`,
          icon: 'success',
          showConfirmButton: false,
        });
        setTimeout(() => {
          document.location.reload();
        }, 1500);
      } else {
        Swal.fire({
          title: 'Oops!',
          text: `${data.message}`,
          icon: 'error',
          showConfirmButton: true,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
