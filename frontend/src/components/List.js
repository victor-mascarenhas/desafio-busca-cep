import styled from "styled-components";

const CepList = ({ cep }) => {
  return (
    <List>
      <Row>
        <h3>CEP:</h3>
        <p>{cep.code}</p>
      </Row>
      <Row>
        <h3>Endereço:</h3>
        <p>{cep.address}</p>
      </Row>
      <Row>
        <h3>Estado:</h3>
        <p>{cep.state}</p>
      </Row>
      <Row>
        <h3>Cidade:</h3>
        <p>{cep.city}</p>
      </Row>
      <Row>
        <h3>Bairro:</h3>
        <p>{cep.district}</p>
      </Row>
    </List>
  );
};

export default CepList;

const List = styled.div`
  border: 1px solid #4b4b4b;
  border-radius: 10px;
  border-bottom: none;
  /* width: 50%; */
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  div:nth-last-child(1) {
    border-radius: 0px 0px 10px 10px;
  }
`;
const Row = styled.div`
  border-bottom: 1px solid #4b4b4b;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1rem 2rem;
  gap: 1rem;
  p {
    align-self: center;
  }
`;
