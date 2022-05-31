import styled from "styled-components";
import InputMask from "../components/InputMask";
import validate from "../utils/Validation";
import { useEffect } from "react";

const InputView = ({
  inputValue,
  setInputValue,
  submit,
  errors,
  showErrors,
  setErrors,
}) => {
  useEffect(() => {
    if (inputValue !== undefined) {
      setErrors(validate(inputValue));
    }
  }, [inputValue, setErrors]);

  return (
    <Container>
      <Search>
        <InputMask inputValue={inputValue} setInputValue={setInputValue} />
        <button onClick={() => submit()}>Buscar</button>
      </Search>
      {showErrors && errors.cep && <span>{errors.cep}</span>}
    </Container>
  );
};

export default InputView;
const Container = styled.div`
  span {
    margin-top: 1rem;
    color: red;
    font-weight: bold;
  }
`;

const Search = styled.div`
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
