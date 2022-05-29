import React from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";

const Container = styled.div``;
const StartDate = styled.input``;
const EndDate = styled.input``;
const Header = styled.div`
  margin-bottom: 15px;
`;
const ContentContainer = styled.div`
  background-color: ${Colors.MainYellow};
  padding: 9px;
  border-radius: 10px;
`;
const Wrapper = styled.div`
  background-color: white;
  height: 80vh;
  border-radius: 10px;
  padding: 10px;
`;
const Table = styled.div``;

const Td = styled.td`
  border: 1px solid ${Colors.Gray};
  width: 200px;
  height: 30px;
`;

const Th = styled.th`
  border: 1px solid ${Colors.Gray};
  background-color: ${Colors.DarkGray};
  width: 200px;
  height: 30px;
`;

const Dash = styled.span``;
function CalTable() {
  return (
    <Container>
      <Header>
        <StartDate type="date" />
        <Dash> - </Dash>
        <EndDate type="date" />
      </Header>
      <ContentContainer>
        <Wrapper>
          <Table>
            <table>
              <thead>
                <tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
              </tbody>
            </table>
          </Table>
        </Wrapper>
      </ContentContainer>
    </Container>
  );
}

export default CalTable;
