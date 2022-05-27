import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Hddlogo from "../../img/hddlogo.png";
import Loopy from "../../img/loopy.png";
import Google from "../../img/googlelogo.png";
import Colors from "../../styles/Colors";
import { authService } from "../../firebase";
import Findpw from "./Findpw";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const Sign = styled.div`
  float: right;
`;
const SignButton = styled.button`
  width: 200px;
  height: 30px;
  background: ${Colors.MainYellow};
  font-size: 15px;
  border: none;
  border-radius: 10px;
  color: ${Colors.White};
  margin-top: 10px;
  margin-right: 5px;
  cursor: pointer;
`;

const Advertise = styled.div``;

const Imgloopy = styled.img.attrs((props) => ({
  src: Loopy,
  wsize: props.size || "100%",
  hsize: props.size || "350px",
}))`
  width: ${(props) => props.wsize};
  height: ${(props) => props.hsize};
`;
const LoginForm = styled.div`
  position: relative;
  display: inline-block;
  top: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 0vh;
`;

const LoginTextForm = styled.div``;
const LoginText = styled.h1`
  font-size: 32px;
  color: black;
  text-align: center;
  margin-bottom: 10px;
`;
//
const Form = styled.div``;
const RealForm = styled.form.attrs((props) => ({
  action: "",
}))``;

const IntArea = styled.div`
  width: 400px;
  position: relative;
  margin-top: 20px;
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

const IdLabel = styled.label.attrs({ for: "id" })`
  position: absolute;
  left: 10px;
  top: 10px;
  font: size 13px;
  color: #999;
  transition: top 0.5s ease;
  top: -2px;
`;

//-2px 추가.
/*${IdInput}:focus & {
  color: #166cea;
}*/

const PwInput = styled.input.attrs({
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

const PwLabel = styled.label.attrs({ for: "pw" })`
  position: absolute;
  left: 10px;
  top: 10px;
  font: size 13px;
  color: #999;
  transition: top 0.5s ease;
  top: -2px;
`;

const Option = styled.div`
  position: relative;
`;
const OptionTwo = styled.div`
  margin-top: 10px;
`;

const CheckboxInput = styled.input.attrs({
  type: "checkbox",
  name: "auto",
  value: "autologin",
})`
  float: left;
  margin-top: 4px;
  margin-right: 5px;
  cursor: pointer;
`;

const Caption = styled.div`
  float: right;
  position: relative;
`;
const CaptionA = styled.a.attrs({ href: "" })`
  margin-top: 3px;
  font-size: 14px;
  color: black;
  text-decoration: none;
`;

const BtnArea = styled.div`
  margin-top: 30px;
`;
const LoginButton = styled.button.attrs({ type: "submit" })`
  width: 100%;
  height: 50px;
  background: ${Colors.MainYellow};
  font-size: 20px;
  color: ${Colors.White};
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;
const GoogleLoginArea = styled.div`
  text-align: center;
`;
const GoogleLoginButton = styled.button.attrs({
  type: "submit",
  name: "google",
})`
  width: 40%;
  height: 30px;
  background: white;
  font-size: 10px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 25px;
  cursor: pointer;
`;
const ImgGoogle = styled.img.attrs((props) => ({
  src: Google,
  size: props.size || "15px",
}))`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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

    try {
      const data = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
    } catch (error) {
      alert("로그인 정보가 틀렸습니다.");
    }
  };
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const modeBtnClick = (e) => {
    openModal();
  };

  return (
    <Container>
      <TopBar>
        <Imglogo></Imglogo>
        <Sign>
          <SignButton onClick={modeBtnClick}>비밀번호 재설정</SignButton>
          <Link to="/signup">
            <SignButton>회원가입</SignButton>
          </Link>
        </Sign>
      </TopBar>
      <Advertise>
        <Imgloopy></Imgloopy>
      </Advertise>
      <LoginForm>
        <LoginTextForm>
          <LoginText>로그인</LoginText>
        </LoginTextForm>
        <Form>
          <RealForm onSubmit={onSubmit}>
            <IntArea>
              <IdInput required value={email} onChange={onChange}></IdInput>
              <IdLabel>이메일을 입력해주세요.</IdLabel>
            </IntArea>
            <IntArea>
              <PwInput required value={password} onChange={onChange}></PwInput>
              <PwLabel>비밀번호를 입력해주세요.</PwLabel>
            </IntArea>
            <Option>
              <OptionTwo>
                <CheckboxInput></CheckboxInput> 자동로그인
              </OptionTwo>
            </Option>
            <BtnArea>
              <LoginButton>로그인</LoginButton>
            </BtnArea>
          </RealForm>
        </Form>
        <GoogleLoginArea>
          <GoogleLoginButton onClick={onSocialClick}>
            <ImgGoogle></ImgGoogle> 구글로 계속하기
          </GoogleLoginButton>
        </GoogleLoginArea>
      </LoginForm>
      <Findpw open={modalOpen} close={closeModal} setWidth={1000}></Findpw>
    </Container>
  );
}
//
export default Login;
