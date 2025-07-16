import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Project6.css';
import dormitory from '../assets/dormitory.png';
import Image from 'react-bootstrap/Image';

const code1 = `#AI 모델 생성
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical
import numpy as np
import tensorflow as tf
import pandas as pd

np.random.seed(3)
tf.random.set_seed(3)

data=pd.read_csv('dormitory.csv')
data=pd.DataFrame(data)

x=data.iloc[:,0:1]
y=data.iloc[:,1]

encoder=LabelEncoder()
encoder.fit(y)
y_encoded=to_categorical(encoder.transform(y))

model=Sequential()
model.add(Dense(4, input_dim=1, activation='leaky_relu'))
model.add(Dense(30, input_dim=4, activation='leaky_relu'))
model.add(Dropout(0.5))
model.add(Dense(100, input_dim=30, activation='leaky_relu'))
model.add(Dense(50, input_dim=100, activation='leaky_relu'))
model.add(Dense(4, input_dim=50, activation='leaky_relu'))

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(x, y_encoded, epochs=10000, batch_size=6)

loss, acc=model.evaluate(x, y_encoded)
model.save('harry_model.h5')

x_predict=model.predict([0.0444444])
print(x_predict)
print(np.augmax(x_predict))`;
const code2 = `#AI 모듈을 분석하는 코드

import glob
import os
import sys
import requests
import json
import math
import pandas as pd
#얼굴 비율 구하기
def getdist(res):
    result = json.loads(res)
    result = result.get("faces")[0]
    result = result.get("landmark")
    if result == None:
          return
    #눈 좌표
    left_eye_x = result.get("leftEye").get('x')
    left_eye_y = result.get("leftEye").get('x')
    right_eye_x = result.get("rightEye").get('x')
    right_eye_y = result.get("rightEye").get('x')

    #눈과 코 길이를 위한 좌표
    center_eye_x = (left_eye_x+right_eye_x)/2
    center_eye_y = (right_eye_y+left_eye_y)/2
    nose_x = result.get("nose").get('x')
    nose_y = result.get("nose").get('y')

    #입
    left_mouth_x = result.get("leftMouth").get('x')
    right_mouth_x = result.get("rightMouth").get('x')
    left_mouth_y = result.get("leftMouth").get('y')
    right_mouth_y = result.get("rightMouth").get('y')
    center_mouth_x = (left_mouth_x+right_mouth_x)/2
    center_mouth_y = (left_mouth_y+right_mouth_y)/2

    #눈과 눈사이, 미간과 코, 코와 입 거리
    eye_dist = math.sqrt( math.pow(left_eye_x - right_eye_x, 2) + math.pow(left_eye_y - right_eye_y, 2))
    nose_dist = math.sqrt( math.pow(nose_x - center_eye_x, 2) + math.pow(nose_y - center_eye_y, 2))
    mouth_dist = math.sqrt( math.pow(nose_x - center_mouth_x, 2) + math.pow(nose_y - center_mouth_y, 2))

    #print(eye_dist)
    #print(nose_dist)

    ratio = eye_dist/nose_dist/mouth_dist
    return ratio
#api연동 및 이미지 전송
def getMyFace(image):
		client_id = "비밀"
		client_secret = "비밀"
		url = "https://openapi.naver.com/v1/vision/face" #얼굴감지
		#url = "https://openapi.naver.com/v1/vision/celebrity" // 유명인 얼굴인식
		files = {'image': open(image, 'rb')}
		headers = {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
		response = requests.post(url,  files=files, headers=headers)
		rescode = response.status_code
		#print(rescode)
		if(rescode==200):
		      return getdist(response.text)
		else:
		      return print("Error Code:" + rescode)`;
const code3 = `# AI 바탕으로 분석
from django.shortcuts import render
import numpy as np
from .forms import FileUploadForm
from .models import FileUpload
from mysite.settings import MEDIA_ROOT
from .ai_predict import getMyFace, getdist
from tensorflow.keras.models import load_model

dom = ''
imgpath = ''
info = ''

def fileupload(request):
    global dom
    global imgpath
    global info

    if request.method == "POST":
        img = request.FILES['imgfile']
        fileupload = FileUpload(
            imgfile = img
        )
        fileupload.save()
        getDormitory(img)
        dic_img = [fileupload]
        fileuploadForm = FileUploadForm
        context = {
            'fileuploadForm':fileuploadForm,
            'dormitory':dom,
            'page_obj':dic_img,
            'info':info
        }
        return render(request, "fileupload.html", context)
    else:
        fileuploadForm = FileUploadForm
        context = {
            'fileuploadForm':fileuploadForm
        }
        return render(request, "fileupload.html", context)

def getDormitory(img):
		global dom
		global imgpath
		global info
		
		path = MEDIA_ROOT+"\\"+str(img)
		model = load_model('C:/Users/(유저 이름)/PycharmProjects/pythonProject/blog/harry_model.h5')
		x_predict = model.predict([getMyFace(path)])
		x_predict = np.argmax(x_predict)
		if x_predict == 0:
		    dom = "Gryfindor"
		    info = "당신은 대마법사가 될 가능성이 있습니다 당장 오세요"
		elif x_predict == 3:
		    dom = "Hufflepuff"
		    info = "당신은 마법에 소질이 없는듯 하군요 걍 학원 다니세요"
		elif x_predict == 2:
		    dom = "Slytherin"
		    info = "당신은 나쁜 사람이에요"
		else:
		    dom = "Revenclaw"
		    info = "마법보단 공부에 소질이 있습니다"`;

function Project6() {
    const [showCode1, setShowCode1] = useState(false);
    const [showCode2, setShowCode2] = useState(false);
    const [showCode3, setShowCode3] = useState(false);
    return (
        <div className="container">
            <div className="left-pane">
                <div>
                    <div class="mac-window-controls">
                        <div class="mac-control-button close"></div>
                        <div class="mac-control-button minimize"></div>
                        <div class="mac-control-button maximize"></div>
                    </div>
                    <Image src={dormitory} fluid className="image6" />
                </div>
                <br />
                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check" id="btncheck1" autocomplete="off" />
                    <label className="btn btn-outline-secondary" for="btncheck1" onClick={() => setShowCode1(!showCode1)}>{showCode1 ? "코드1 숨기기" : "코드1 보기"}</label>

                    <input type="checkbox" className="btn-check" id="btncheck2" autocomplete="off" />
                    <label className="btn btn-outline-secondary" for="btncheck2" onClick={() => setShowCode2(!showCode2)}>{showCode2 ? "코드2 숨기기" : "코드2 보기"}</label>

                    <input type="checkbox" className="btn-check" id="btncheck3" autocomplete="off" />
                    <label className="btn btn-outline-secondary" for="btncheck3" onClick={() => setShowCode3(!showCode3)}>{showCode3 ? "코드3 숨기기" : "코드3 보기"}</label>
                </div>
                <div className="main">
                    <div class="mac-window-controls">
                        <div class="mac-control-button close"></div>
                        <div class="mac-control-button minimize"></div>
                        <div class="mac-control-button maximize"></div>
                    </div>
                    <div className="text">
                        <h1 id="-">호그와트 기숙사 배정 프로젝트 </h1>
                        <h6>2023.4~2023.5</h6>
                        <br />
                        <h2 id="-">프로젝트 개요</h2>
                        <p>본 프로그램은 사용자의 사진을 인공지능 기술로 분석하여 호그와트 마법학교의 네 기숙사(그리핀도르, 슬리데린, 후플푸프, 래번클로) 중 하나를 배정해 드리는 프로그램입니다.</p>
                        <h2 id="-">기술적 특징</h2>
                        <ul>
                            <li>고급 이미지 인식 AI 기술 활용</li>
                            <li>사용자 얼굴 특성 및 표정 분석 알고리즘 적용</li>
                            <li>호그와트 기숙사별 특성에 맞춘 맞춤형 배정 시스템</li>
                        </ul>
                        <h2 id="-">사용 방법</h2>
                        <ol>
                            <li>프로그램 접속 후 사용자 본인의 얼굴이 명확히 보이는 사진을 업로드합니다.</li>
                            <li>AI 시스템이 사진을 분석하는 동안 잠시 대기합니다.</li>
                            <li>분석 완료 후 배정된 호그와트 기숙사 결과를 확인합니다.</li>
                            <li>필요시 결과를 저장하거나 공유할 수 있습니다.</li>
                        </ol>
                        <h2 id="-">프로젝트의 의의</h2>
                        <p>이 프로젝트를 만듦으로써 AI 사용법을 익힐 수 있었고, flask, django, tensorflow, ngrok같은 파이썬 라이브러리들의 사용법을 익힐 수 있었습니다.</p>
                        <h2 id="-">이용 안내 사항</h2>
                        <ul>
                            <li>본 프로그램은 엔터테인먼트 목적으로 개발되었습니다.</li>
                            <li>업로드된 사진은 기숙사 배정 분석 외 다른 목적으로 저장되거나 활용되지 않습니다.</li>
                            <li>프로그램 이용 시 <strong>개인정보 보호정책에 동의하신 것으로 간주됩니다.</strong></li>
                        </ul>
                        <h2 id="-">면책 조항</h2>
                        <p><strong>본 프로젝트는 &#39;해리 포터&#39; 시리즈의 팬 콘텐츠로, Warner Bros. Entertainment Inc. 및 J.K. 롤링의 공식 인증을 받지 않았습니다. 관련 지적 재산권은 해당 권리자에게 있습니다.</strong></p>
                        <br />
                    </div>
                </div>
            </div>
            <div className="right-pane">
                {showCode1 && (
                    <div className="code-container">
                        <div className="mac-window-controls">
                            <div className="mac-control-button close" />
                            <div className="mac-control-button minimize" />
                            <div className="mac-control-button maximize" />
                        </div>
                        <SyntaxHighlighter className="code" language="python" style={{ margin: "0", ...vscDarkPlus }}>
                            {code1}
                        </SyntaxHighlighter>
                    </div>
                )}
                {showCode2 && (
                    <div className="code-container">
                        <div className="mac-window-controls">
                            <div className="mac-control-button close" />
                            <div className="mac-control-button minimize" />
                            <div className="mac-control-button maximize" />
                        </div>
                        <SyntaxHighlighter language="python" style={vscDarkPlus} className="code">
                            {code2}
                        </SyntaxHighlighter>
                    </div>
                )}
                {showCode3 && (
                    <div className="code-container">
                        <div className="mac-window-controls">
                            <div className="mac-control-button close" />
                            <div className="mac-control-button minimize" />
                            <div className="mac-control-button maximize" />
                        </div>
                        <SyntaxHighlighter language="python" style={vscDarkPlus} className="code">
                            {code3}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        </div >
    );
}

export default Project6;