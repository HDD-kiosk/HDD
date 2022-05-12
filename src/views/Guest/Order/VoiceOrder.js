import fs from "fs";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import AudioRecord from "../../../components/AudioRecord";

const KAKAO_STT_URL = 'https://kakaoi-newtone-openapi.kakao.com/v1/recognize';
const KAKAO_TTS_URL = 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize';
const REST_API_KEY = '9063332fecca3b9e512ce29c057add84';

//네이버API
const clientId = 'nbnxyzypfz';
const clientSecret = 'kIVzb8bR8rRTt6DqU4Bo3WpRwtEDwKa45Me4f4fQ';


const VoiceOrderWrap = styled.div`
`;
const Header = styled.div`
`;
const TextLabel = styled.p`
   color: red;
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

  //const fs = require('AudioFile');
  //const fs = require('fs');
  //fs.createReadStream('../../../img/heykakao.wav');


  function voicePlay(audioData) {
    const context = new AudioContext();

    context.decodeAudioData(audioData, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  }

  ///////////////////////////////////////////////////////////////
 
  const request = require('request');
  
  // language => 언어 코드 ( Kor, Jpn, Eng, Chn )
  function stt(language, filePath) {
      const url = `https://naveropenapi.apigw-pub.fin-ntruss.com/recog/v1/stt?lang=${language}`;
      const requestConfig = {
          url: url,
          method: 'POST',
          headers: {
              'Content-Type': 'application/octet-stream',
              'X-NCP-APIGW-API-KEY-ID': clientId,
              'X-NCP-APIGW-API-KEY': clientSecret
          },
          body: fs.createReadStream(filePath)
      };
  
      request(requestConfig, (err, response, body) => {
          if (err) {
              console.log(err);
              return;
          }
  
          console.log(response.statusCode);
          console.log(body);
      });
  }
  
  
////////////////////////////////////////////////////////////////////


  const sttBtnClick = (e) => {

    //console.log('stt보이스오더',audioData);

    // axios.post(KAKAO_STT_URL, AudioFile, {
    //   headers: {
    //     //'Content-Type': 'application/octet-stream',
    //     //Authorization: `KakaoAK ${REST_API_KEY}`,

    //     'Content-Type': 'application/octet-stream',
    //     Authorization: `KaKaoAK ${REST_API_KEY}`,
    //   }
    // }).then((response) => {
    //   console.log(response);
    // });
    /////////////////////////////////////////////////////////////////////////////


    stt('Kor', '../../../img/heykakao.wav');

  };

  const ttsBtnClick = (e) => {
    const xmlData = '<speak>테스트</speak>'; // 여기에 STT를 넣으면 성공 const조심?

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
      <Header>
        <TextLabel>aa</TextLabel>
      </Header>

      <AudioRecord setAudioData={setAudioData}  > </AudioRecord>

      <SttBtn onClick={sttBtnClick} >STT버튼이다</SttBtn>
      <TtsBtn onClick={ttsBtnClick} >TTS버튼이다</TtsBtn>

    </VoiceOrderWrap>
  );
}

export default VoiceOrder;