import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Colors from "../../styles/Colors";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const modalShow = keyframes`
    from{
        opacity: 0;
        margin-top: -50px;
    }
    to{
        opacity: 1;
        margin-top: 0;
    }
`;
const modalBgShow = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const OpenModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  animation: ${modalBgShow} 0.3s;
  justify-content: center;
  width: ${(props) => props.width};
`;

const Section = styled.div`
  width: ${(props) => props.width};
  margin:0 auto;
  border-radius: 0.3rem;
  background-color: #FFFFFF;   /* hdd로가서 글로벌로바꾸기*/
  animation: ${modalShow} 0.3s;
  overflow: hidden;
  border: 2px solid #FFCC00;    /* hdd로가서 글로벌로바꾸기*/
  `;

const TopBar = styled.div``;

const TitleText = styled.h3`
  font-size: 30px;
  color: black;
  text-align: center;
  margin-bottom: 10px;
`;

const IntArea = styled.div`
  width: 400px;
  position: relative;
  margin-top: 10px;
  text-align: center;
`;

const Form = styled.div``;
const RealForm = styled.form.attrs((props) => ({
  action: "",
}))``;

const EmailInput = styled.input.attrs({
  type: "text",
  name: "email",
  id: "email",
  autocomplete: "off",
  placeholder: "이메일을 입력하세요",
})`
  width: 70%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  color: black;
  outline: none;
`;
const Findbtn = styled.button.attrs({
  type: "submit",
})`
  width: 40%;
  height: 30px;
  background: ${Colors.MainYellow};
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const CloseBtn = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
`;

const Findpw = (props) => {
  const { open, close, setWidth } = props;
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);

  const FindbtnClick = (e) => {
    if (inputValue != "") {
      try {
        const auth = getAuth();
        sendPasswordResetEmail(auth, inputValue);
        alert("이메일 전송");
      } catch (error) {}
    }
  };
  return (
    <>
      {open ? (
        <OpenModal width={setWidth}>
          <Section>
            <TopBar>
              <TitleText>비밀번호 재설정</TitleText>
              <CloseBtn onClick={close}>&times;</CloseBtn>
            </TopBar>
            <Form>
              <RealForm>
                <IntArea>
                  <EmailInput
                    onChange={(event) => setInputValue(event.target.value)}
                  ></EmailInput>
                </IntArea>
                <IntArea>
                  <Findbtn onClick={FindbtnClick}>재설정</Findbtn>
                </IntArea>
              </RealForm>
            </Form>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};

export default Findpw;
