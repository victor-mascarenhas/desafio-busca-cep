import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

//Utils
import Toast from "./utils/Toast";
import validate from "./utils/Validation";

//Components
import GlobalStyles from "./components/GlobalStyles";
import InputMask from "./components/InputMask";
import Loader from "./components/Loader";
import List from "./components/List";

function App() {
  const [errors, setErrors] = useState({}); //Objeto de erros
  const [showErrors, setShowErrors] = useState(false); //Exibe os erros

  const [isLoading, setIsLoading] = useState(false); //Estado de carregamento

  const [inputValue, setInputValue] = useState(); //Valor inputado após máscara
  const [cep, setCep] = useState(""); //Dados recebidos do backend

  useEffect(() => {
    if (inputValue !== undefined) {
      setErrors(validate(inputValue));
    }
  }, [inputValue]);

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

  const renderList = () => {
    if (cep.status === 200) {
      return <List cep={cep} />;
    } else {
      return "";
    }
  };

  return (
    <>
      <GlobalStyles />
      <Home>
        <h1>BUSCA CEP</h1>
        <InputView>
          <InputMask
            inputValue={inputValue}
            setInputValue={(v) => setInputValue(v)}
          />
          <button onClick={() => handleSubmit()}>Buscar</button>
        </InputView>
        {showErrors && errors.cep && <span>{errors.cep}</span>}

        <ListView>{isLoading ? <Loader /> : renderList()}</ListView>
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
  span {
    color: red;
    font-weight: bold;
  }
`;

const InputView = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 1rem;
  input {
    text-align: center;
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 1px solid #4b4b4b;
    border-radius: 10px 0px 0px 10px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    &:focus {
      outline: none;
    }
  }
  button {
    font-size: 1.5rem;
    border: 1px solid #4b4b4b;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #1a73e8;
    color: white;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    &:hover {
      background: #418cee;
    }
  }
`;

const ListView = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
