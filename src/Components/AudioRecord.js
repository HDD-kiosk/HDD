import React, { useState, useCallback } from 'react';
import Colors from '../styles/Colors';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RecAudioBtn = styled.button`
  font-weight: bold;
  font-family: 'Noto Sans';
  background-color: ${Colors.MainYellow};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 80px;
  height: 45px;
  margin-right: 20px;
`;
const SubmitAudioFileBtn = styled.button`
  font-weight: bold;
  font-family: 'Noto Sans';
  background-color: ${Colors.MainYellow};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 80px;
  height: 45px;
`;

const AudioRecord = (props) => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [recordText, setRecordText] = useState('주문시작');
  const navigate = useNavigate();

  let soundFile = null;

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function(e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function(track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function(e) {
            setAudioUrl(e.data);
            setOnRec(true);
            setRecordText('주문시작');
            makeAudioFile(e.data);
          };
        } else {
          setOnRec(false);
          setRecordText('주문완료');
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function(e) {
      setAudioUrl(e.data);
      makeAudioFile(e.data);
      props.setAudioData(e.data);

      setOnRec(true);
      setRecordText('주문시작');
      console.log('오디오레코드.js e.data: ', e.data);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function(track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const makeAudioFile = (audioData) => {
    if (audioData) {
      console.log('URL: ', URL.createObjectURL(audioData)); // 출력된 링크에서 녹음된 오디오 확인 가능
    } else {
      console.log('no audioData');
    }
    // File 생성자를 사용해 파일로 변환
    soundFile = new File([audioData], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio/wav',
    });
    console.log('오디오레코드.js에서사운드파일은?:', soundFile);
    props.sttBtnClick(soundFile, audioData);
    //props.ttsBtnClick();
  };
  const onSubmitAudioFile = () => {
    props.sendOrder();
    //navigate("/나중에알려주세요");
  };

  return (
    <div>
      <RecAudioBtn onClick={onRec ? onRecAudio : offRecAudio}>
        {recordText}
      </RecAudioBtn>
      <SubmitAudioFileBtn onClick={onSubmitAudioFile}>
        주문 확인
      </SubmitAudioFileBtn>
    </div>
  );
};

export default AudioRecord;
