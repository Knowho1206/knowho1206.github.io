"use client";

import React, {useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import background from '../public/background.png';
import Image from 'next/image';
import { FaCalendar } from 'react-icons/fa';
import { IoPersonSharp, IoCall } from 'react-icons/io5';
import { FaUserGroup, FaTrophy } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import dormitory from '../public/dormitory.png';
import ue5 from '../public/ue5.png';
import mc from '../public/minecraft.png';
import shinsungin from '../public/shinsungin.png';
import crawling from '../public/crawling.png';
import mbti from '../public/mbti.png';
import translator from '../public/translator.png';
import noimg from '../public/noImage.jpg';

function Cards({url = noimg, title, text, num}) {
        return(
            <div className="card projects-table">
                <Image src={url} className="card-img-top image" alt="thumbnail" fill objectFit="cover"/>
                <div className="card-body" style={{"width": "200px"}}>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                    <a href={`/projects/${num}`} className="btn btn-primary">보러가기</a>
                </div>
            </div>
        )
    }

export default function Home() {
    const introRef = useRef(null);
    return (
        <div className="App">
            <div style={{ position: 'relative', width: '100vw', height: '62vh'}}>
            <Image src={background} fluid className='background'/>
            <div
            style={{
                position: 'absolute',
                zIndex: '1',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(34, 40, 49, 0.71)',
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'contain'
            }}>
            </div>
            <h1 className='overlay-text'>- 강노율 -<br/>개발자 지망생 포트폴리오</h1>
            <hr className='overlay-divider'/>
            </div>
            <br/><br ref={introRef}/>
            <h1 style={{fontWeight:'bolder'}}>About Me</h1>
            <div className='intro'>
                <div className='intro-info'><IoPersonSharp/> <span className='label'>이름</span> <span className='value'>강노율</span></div>
                <div className='intro-info'><FaCalendar/> <span className='label'>생년월일</span> <span className='value'>09.12.06</span></div>
                <div className='intro-info'><FaUserGroup/> <span className='label'>소속</span> <span className='value'>신성고등학교 프론</span></div>
                <div className='intro-info'><IoCall/> <span className='label'>연락처</span> <span className='value'>010-8100-0004</span></div>
                <div className='intro-info'><MdEmail/> <span className='label'>이메일</span> <span className='value'>yuntanx495@gmail.com</span></div>
                <div className='intro-info'><FaTrophy/> <span className='label'>입상</span> <span className='value'>2023학년도<br/>정보올림피아드<br/>장려상</span></div>
            </div>
            <h2 style={{fontWeight:'bolder', backgroundColor: '#DDDDDD', marginBottom: 0, paddingTop:'35px'}}>프로젝트</h2>
            <div className='projects'>
                <span className='project-table'>
                    <Cards
                    title="인공지능 스피커" 
                    text="사람의 얼굴을 AI가 분석해서 기숙사를 배정해주는 웹사이트"
                    num={1}
                    />
                </span>
                <span className='project-table'>
                    <Cards
                    title="AI에 적합한 요소 예측" 
                    text="사람의 얼굴을 AI가 분석해서 기숙사를 배정해주는 웹사이트"
                    num={2}
                    />
                </span>
                <span className='project-table'>
                    <Cards url={translator} 
                    title="번역기" 
                    text="파이썬의 tkinter와 구글 번역기 라이브러리를 이용하여 만든 간의 번역기"
                    num={3}
                    />
                </span>
                <span className='project-table'>
                    <Cards url={crawling} 
                    title="웹 크롤링" 
                    text="웹 사이트에 있는 정보를 가져오는 프로그램"
                    num={4}
                    />
                </span>
                <span className='project-table'>
                    <Cards url={mbti} 
                    title="MBTI 챗봇" 
                    text="AI가 질문하는 것에 대해 대답하면 사용자의 MBTI를 추론해주는 웹사이트"
                    num={5}
                    />
                </span>
                <span className='project-table'>
                    <Cards url={dormitory} 
                    title="해리포터 기숙사 배정 프로그램" 
                    text="사람의 얼굴을 AI가 분석해서 기숙사를 배정해주는 웹사이트"
                    num={6}
                    />
                </span>
                <span className='project-table'>
                    <Cards url={shinsungin}
                    title="신성인 애플리케이션 개발" 
                    text="학사 일정, 급식 메뉴, 커뮤니티 등의 기능을 탑제할 앱 [개발중]"
                    num={7}
                    />
                </span>
                <span className='project-table'>
                    <Cards url={ue5}
                    title="Unreal Engine 5 개발" 
                    text="UE5를 이용하여 영상 및 게임 제작 [개발중]"
                    num={8}
                    />
                </span>
                <span className='project-table'>
                    <Cards url={mc}
                    title="마인크래프트 모드 개발" 
                    text="마인크래프트 모드를 자바를 이용하여 개발 [개발중]"
                    num={9}
                    />
                </span>
                <br/>
            </div>
        </div>
    );
}
