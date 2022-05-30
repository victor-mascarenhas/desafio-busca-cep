import { useEffect, useRef } from "react";

const InputMask = ({ inputValue, setInputValue }) => {
  const inputRef = useRef();

  const inputHandler = (e) => {
    const cepMask = inputRef.current.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,3})(\d{0,3})/);
    inputRef.current.value = !cepMask[2]
      ? cepMask[1]
      : `${cepMask[1]}.${cepMask[2]}${`${cepMask[3] ? `-${cepMask[3]}` : ""}`}`;
    const onlyNumbers = inputRef.current.value.replace(/(\D)/g, "");
    setInputValue(onlyNumbers);
  };

  useEffect(() => {
    inputHandler(); // eslint-disable-next-line
  }, [inputValue]);
  return (
    <input
      type="text"
      name="cep"
      ref={inputRef}
      onChange={inputHandler}
      placeholder="Digite seu CEP"
    ></input>
  );
};

export default InputMask;
