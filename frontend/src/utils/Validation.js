const validate = (value) => {
  let errors = {};

  if (!value.trim()) {
    errors.cep = "Nenhum CEP inserido";
  } else if (value.length < 8) {
    errors.cep = "O CEP precisa ter ao menos 8 dígitos";
  }

  return errors;
};

export default validate;
