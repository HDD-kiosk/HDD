import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../firebase";
import Hddlogo from "../../img/hddLogo.png";
import Colors from "../../styles/Colors";
import {
  getAuth,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { async } from "@firebase/util";
import firebase from "firebase/app";

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

const AuthInput = styled.input.attrs({
  type: "button",
  name: "auth",
  value: "전화번호 인증",
})`
  width: 31%;
  padding: 10px 10px 10px;
  background-color: ${Colors.MainYellow};
  border: none;
  font-size: 15px;
  color: white;
  outline: none;
  border-radius: 10px;
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
  const [phoneValue, setPhoneValue] = useState("");
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
    const data = await createUserWithEmailAndPassword(
      authService,
      email,
      password
    );
    authService.signOut();
    navigate("/");
  };

  /*const phoneAuth = (event) => {
    const auth = getAuth();

    authService.languageCode = "ko";
    signInWithPhoneNumber("+82" + phoneValue, window.recaptchaVerifier)
      .then((confirmationResult) => {
        alert("인증요청");
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
          <RLogintText>회원가입</RLogintText>
        </LoginText>
        <Form>
          <RealForm onSubmit={onSubmit}>
            <IntArea>
              이름<br></br>
              <NameInput required></NameInput>
            </IntArea>
            <IntArea>
              이메일<br></br>
              <IdInput required value={email} onChange={onChange}></IdInput>
            </IntArea>
            <IntArea>
              전화번호<br></br>
              <PhoneArea>
                <PhoneInput></PhoneInput>
              </PhoneArea>
            </IntArea>
            <IntArea>
              비밀번호<br></br>
              <PasswordInput
                required
                value={password}
                onChange={onChange}
              ></PasswordInput>
              <HSIXCAPTION>8~16자 이내, 영문과 숫자,특수문자 조합</HSIXCAPTION>
            </IntArea>
            <IntArea>
              비밀번호확인<br></br>
              <PasswordInput></PasswordInput>
            </IntArea>
            <btnArea>
              <Flowbtn>계속하기</Flowbtn>
            </btnArea>
            <IntArea>
              <HFIVECAPTION>
                계속하기를 누름으로써 사용자는 빌드업의 <Alink>이용약관 </Alink>{" "}
                및 <Alink>개인정보 처리방침</Alink>에 동의하는 것입니다.
              </HFIVECAPTION>

              <HFIVECAPTION>
                계정이 이미 있다면{" "}
                <Link to="/">
                  <Alink>로그인</Alink>
                </Link>{" "}
                하러가기
              </HFIVECAPTION>
            </IntArea>
          </RealForm>
        </Form>
      </LoginForm>
    </Container>
  );
}

export default Signup;
