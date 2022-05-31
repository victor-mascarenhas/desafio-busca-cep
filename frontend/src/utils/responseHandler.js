import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const responseHandler = (dataObj, isError = false) => {
  if (!isError) {
    switch (dataObj.status) {
      case 200:
        Toast.fire({
          icon: "success",
          title: "Encontrado!",
        });
        break;
      case 400:
        Toast.fire({
          icon: "warning",
          title: "Bloqueado por excesso de tentativas",
        });
        break;
      default:
        Toast.fire({
          icon: "error",
          title: dataObj.message,
        });
        break;
    }
  } else if (isError) {
    if (dataObj.response.data && dataObj.response.data.code === "ETIMEDOUT") {
      Swal.fire({
        title: "Opa!",
        text: "Você deve aguardar alguns segundos antes de fazer uma nova consulta.",
        icon: "warning",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível conectar-se com o servidor.",
        icon: "error",
        showConfirmButton: false,
      });
    }
  }
};

export default responseHandler;
