import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

//Utils
import Toast from "./utils/Toast";

//GlobalStyle
import GlobalStyles from "./components/GlobalStyles";

//Views
import InputView from "./views/InputView";
import ListView from "./views/ListView";

function App() {
  const [errors, setErrors] = useState({}); //Objeto de erros
  const [showErrors, setShowErrors] = useState(false); //Exibe os erros
  const [isLoading, setIsLoading] = useState(false); //Estado de carregamento
  const [inputValue, setInputValue] = useState(); //Valor inputado após máscara
  const [cep, setCep] = useState(""); //Dados recebidos do backend

  const handleSubmit = async () => {
    setCep("");
    setShowErrors(true);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          `http://localhost:4646/cep/${inputValue}`
        );

        setCep(data);

        if (data.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Encontrado!",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        if (err.response.data && err.response.data.code === "ETIMEDOUT") {
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
    }
  };

  return (
    <>
      <GlobalStyles />
      <Home>
        <h1>BUSCA CEP</h1>
        <InputView
          inputValue={inputValue}
          setInputValue={setInputValue}
          submit={handleSubmit}
          errors={errors}
          setErrors={setErrors}
          showErrors={showErrors}
        />
        <ListView data={cep} isLoading={isLoading} />
      </Home>
    </>
  );
}

export default App;

const Home = styled.div`
  min-width: 730px;
  padding: 3rem 5rem;
  margin-top: 8rem;
  text-align: center;
`;
