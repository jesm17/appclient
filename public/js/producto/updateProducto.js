let id = 0;
$('.product-update').click(function (e) {
  id = e.currentTarget.value;
  axios.get(`../../productos/${id}`).then((response) => {
    console.log(response);
    let body = document.getElementById('body-modal');
    body.innerHTML = `
  <div class="col-sm-12 messages" id="messages"></div>
  <div class="form-floating mt-1">
    <input
      type="text"
      class="form-control"
      id="nombreUpdate"
      name="nombreUpdate"
      placeholder="Cafe"
      value='${response.data.nombre}'
      required
    />
    <label for="floatingInput"
      >Nombre del producto <i class="fa-solid fa-xmarks-lines"></i
    ></label>
  </div>

  <div class="form-floating mt-1">
    <input
      type="text"
      class="form-control"
      id="descripcionUpdate"
      name="descripcionUpdate"
      placeholder="Cafe descafeinado"
      value='${response.data.descripcion}'
      required
    />
    <label for="floatingInput"
      >Descripcion <i class="bi bi-card-text"></i
    ></label>
  </div>
  <div class="form-floating mt-1">
    <input
      type="number"
      class="form-control"
      id="precioUpdate"
      name="precioUpdate"
      placeholder="2000"
      value='${response.data.precio}'
      
      required
    />
    <label for="floatingPassword"
      >Precio <i class="bi bi-currency-dollar"></i
    ></label>
  </div>
  `;
  });
});

$('#productUpdate').click(function () {
  const nombre = $('#nombreUpdate').val();
  const descripcion = $('#descripcionUpdate').val();
  const precio = $('#precioUpdate').val();
  console.log(nombre, descripcion, precio);
  axios
    .put(`../../productos/${id}`, {
      nombre: nombre,
      descripcion: descripcion,
      precio: parseInt(precio),
    })
    .then(function (response) {
      console.log(response);
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
