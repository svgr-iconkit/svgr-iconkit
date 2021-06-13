import styled from "styled-components";

const Toolbar = styled.div`
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    margin-bottom: 10px;
    padding: 10px;
    flex-direction: row;
    justify-content: space-between;
    position: sticky;
    top: 0;
  }
`;
export default Toolbar;
