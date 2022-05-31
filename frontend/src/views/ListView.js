import styled from "styled-components";
import Loader from "../components/Loader";
import List from "../components/List";

const ListView = ({ data, isLoading }) => {
  const renderList = () => {
    if (data.status === 200) {
      return <List cep={data} />;
    } else {
      return "";
    }
  };

  return <Container>{isLoading ? <Loader /> : renderList()}</Container>;
};

export default ListView;

const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
