import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Project1.css';

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

function Project1() {
    const [showCode1, setShowCode1] = useState(false);
    const [showCode2, setShowCode2] = useState(false);
    const [showCode3, setShowCode3] = useState(false);
    return (
        <div style={{backgroundColor:'#222222'}}>
            <h1 className='text'>해리포터 기숙사 배정 프로그램</h1>
            <h2 ></h2>
            <button class="btn btn-secondary" onClick={() => setShowCode1(!showCode1)}>{showCode1 ? "코드1 숨기기" : "코드1 보기"}</button>
            <button class="btn btn-secondary code" onClick={() => setShowCode2(!showCode2)}>{showCode2 ? "코드2 숨기기" : "코드2 보기"}</button>
            <button class="btn btn-secondary code" onClick={() => setShowCode3(!showCode3)}>{showCode3 ? "코드3 숨기기" : "코드3 보기"}</button>
            {showCode1 && (
            <SyntaxHighlighter language="python" style={vscDarkPlus}>
            {code1}
            </SyntaxHighlighter>
            )}
            {showCode2 && (
            <SyntaxHighlighter language="python" style={vscDarkPlus}>
            {code2}
            </SyntaxHighlighter>
            )}
            {showCode3 && (
            <SyntaxHighlighter language="python" style={vscDarkPlus}>
            {code3}
            </SyntaxHighlighter>
            )}
        </div>
    );
}

export default Project1;