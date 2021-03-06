import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../firebase";
import Hddlogo from "../../img/hddlogo.png";
import Colors from "../../styles/Colors";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Container = styled.body`
  position: relative;
`;

const TopBar = styled.div``;

const Imglogo = styled.img.attrs((props) => ({
  src: Hddlogo,
  size: props.size || "50px",
}))`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const LoginForm = styled.div`
  position: relative;
  display: inline-block;
  top: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 0vh;
`;

const LoginText = styled.div``;

const RLogintText = styled.h1`
  font-size: 32px;
  color: black;
  text-align: center;
  margin-bottom: 60px;
`;

const Form = styled.div`
  position: relative;
`;

const RealForm = styled.form.attrs((props) => ({
  action: "",
}))``;

const IntArea = styled.div`
  width: 400px;
  position: relative;
  margin-top: 10px;
`;

const NameInput = styled.input.attrs({
  type: "text",
  name: "name",
  id: "name",
  autocomplete: "off",
})`
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  color: black;
  outline: none;
`;

const IdInput = styled.input.attrs({
  type: "email",
  name: "email",
  id: "email",
  autocomplete: "off",
})`
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  color: black;
  outline: none;
`;

const PhoneArea = styled.div``;

const PhoneInput = styled.input.attrs({
  type: "text",
  name: "phone",
  id: "phone",
  autocomplete: "off",
})`
  width: 100%;
  padding: 20px 10px 10px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  color: black;
  outline: none;
`;

const PasswordInput = styled.input.attrs({
  type: "password",
  name: "password",
  id: "password",
  autocomplete: "off",
})`
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  color: black;
  outline: none;
`;

const HSIXCAPTION = styled.h6`
  margin-top: 0px;
  opacity: 0.4;
`;

const HFIVECAPTION = styled.h5`
  opacity: 0.6;
  margin-top: 20px;
`;

const Alink = styled.span`
  color: purple;
  text-decoration-line: underline;
`;

const btnArea = styled.div`
  margin-top: 30px;
`;

const Flowbtn = styled.button.attrs({
  type: "submit",
})`
  cursor: pointer;
  width: 100%;
  height: 50px;
  background: ${Colors.MainYellow};
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 25px;
  margin-top: 20px;
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  auth.languageCode = "ko";
  const navigate = useNavigate();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(authService, email, password);
    authService.signOut();
    navigate("/");
  };

  /*const phoneAuth = (event) => {
    const auth = getAuth();

    authService.languageCode = "ko";
    signInWithPhoneNumber("+82" + phoneValue, window.recaptchaVerifier)
      .then((confirmationResult) => {
        alert("????????????");
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {});
  };*/

  return (
    <Container>
      <TopBar>
        <Imglogo></Imglogo>
      </TopBar>
      <LoginForm>
        <LoginText>
          <RLogintText>????????????</RLogintText>
        </LoginText>
        <Form>
          <RealForm onSubmit={onSubmit}>
            <IntArea>
              ??????<br></br>
              <NameInput required></NameInput>
            </IntArea>
            <IntArea>
              ?????????<br></br>
              <IdInput required value={email} onChange={onChange}></IdInput>
            </IntArea>
            <IntArea>
              ????????????<br></br>
              <PhoneArea>
                <PhoneInput></PhoneInput>
              </PhoneArea>
            </IntArea>
            <IntArea>
              ????????????<br></br>
              <PasswordInput
                required
                value={password}
                onChange={onChange}
              ></PasswordInput>
              <HSIXCAPTION>8~16??? ??????, ????????? ??????,???????????? ??????</HSIXCAPTION>
            </IntArea>
            <IntArea>
              ??????????????????<br></br>
              <PasswordInput></PasswordInput>
            </IntArea>
            <btnArea>
              <Flowbtn>????????????</Flowbtn>
            </btnArea>
            <IntArea>
              <HFIVECAPTION>
                ??????????????? ??????????????? ???????????? ???????????? <Alink>???????????? </Alink>{" "}
                ??? <Alink>???????????? ????????????</Alink>??? ???????????? ????????????.
              </HFIVECAPTION>

              <HFIVECAPTION>
                ????????? ?????? ?????????{" "}
                <Link to="/">
                  <Alink>?????????</Alink>
                </Link>{" "}
                ????????????
              </HFIVECAPTION>
            </IntArea>
          </RealForm>
        </Form>
      </LoginForm>
    </Container>
  );
}

export default Signup;
