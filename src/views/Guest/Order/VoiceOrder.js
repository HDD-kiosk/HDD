import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import AudioRecord from "../../../components/AudioRecord";
const KAKAO_TTS_URL = 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize';
const REST_API_KEY = '9063332fecca3b9e512ce29c057add84';

const VoiceOrderWrap = styled.div`
`;

const SttBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: yellow;
  margin-right: 25px;
  cursor: pointer;
`;

const TtsBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: yellow;
  margin-right: 25px;
  cursor: pointer;
`;

function VoiceOrder() {
  const [audioData, setAudioData] = useState(null);
  let STT_TEXT = null;


  function voicePlay(responseAudioData) {
    const context = new AudioContext();

    context.decodeAudioData(responseAudioData, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  }

  const sttBtnClick = (soundFile,e) => {
    console.log('사운드파일은?', soundFile);
    // "soundFile"을 디비로 보낸다
    // 서버에서 STT API를 호출한다 
    //  STT API 결과 값을 가져온다
    //STT_TEXT = 서버에서 뿌려주는 텍스트 값;


  };

  const ttsBtnClick = (e) => {
    const xmlData = `<speak>${STT_TEXT}</speak>`; // 여기에 STT를 넣으면 성공

    axios.post(KAKAO_TTS_URL, xmlData, {

      headers: {
        'Content-Type': 'application/xml',
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
      responseType: 'arraybuffer'

    }).then((response) => {
      voicePlay(response.data);
    });

  };

  return (
    <VoiceOrderWrap>
      <AudioRecord setAudioData={setAudioData} ttsBtnClick={ttsBtnClick} sttBtnClick={sttBtnClick}></AudioRecord>
    </VoiceOrderWrap>
  );
}
export default VoiceOrder;