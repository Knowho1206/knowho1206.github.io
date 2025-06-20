import React, { use, useState, useRef, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import background from './assets/background.png';
import dormitory from './assets/dormitory.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaCalendar } from 'react-icons/fa';
import { IoPersonSharp, IoCall } from 'react-icons/io5';
import { FaUserGroup, FaTrophy } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
<a
    href='d-inline mx-2bg-body-tertiary mb-3'
    ref={ref}
    onClick={(e) => {
    e.preventDefault();
    onClick(e);
    }}
    className='nav-link'
    style={{ cursor: 'pointer' }}
>
    {children}
    &#x25bc;
</a>
));

function Main() {
const introRef = useRef(null);

const CustomMenu = React.forwardRef(
({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');
    return (
    <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
    >
        <Form.Control
        autoFocus
        className='mx-3 my-2 w-auto'
        placeholder='프로젝트명 검색...'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        />
        <ul className='list-unstyled mb-0'>
        {React.Children.toArray(children).filter(
            (child) =>
            !value || child.props.children.toLowerCase().startsWith(value),
        )}
        </ul>
    </div>
    );
    },
);
return (
    <div className='App'>
    {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className='bg-body-tertiary mb-3 fixed-top'>
        <Container fluid>
            <Navbar.Brand>Knowho's Portpolio</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement='end'
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Knowho's Portpolio
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link onClick={() => {if (introRef.current) {introRef.current.scrollIntoView({ behavior: 'smooth' })} }}>자기소개</Nav.Link>
                    <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' variant='secondary'>
                        프로젝트
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                        <Dropdown.Item eventKey='1' href='/projects/1'>파이썬 웹사이트 크롤링</Dropdown.Item>
                        <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
                        <Dropdown.Item eventKey='3'>Orange</Dropdown.Item>
                        <Dropdown.Item eventKey='4'>Red-Orange</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                <Nav.Link>학습 현황</Nav.Link>
                <Nav.Link>미래 계획</Nav.Link>
                </Nav>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
        </Navbar>
        ))}
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
        <br/><br/>
        <h1 ref={introRef} style={{fontWeight:'bolder'}}>About Me</h1>
        <div className='intro'>
        <div className='intro-info'><IoPersonSharp/> <span className='label'>이름</span> <span className='value'>강노율</span></div>
        <div className='intro-info'><FaCalendar/> <span className='label'>생년월일</span> <span className='value'>09.12.06</span></div>
        <div className='intro-info'><FaUserGroup/> <span className='label'>소속</span> <span className='value'>신성고등학교 프론</span></div>
        <div className='intro-info'><IoCall/> <span className='label'>연락처</span> <span className='value'>010-8100-0004</span></div>
        <div className='intro-info'><MdEmail/> <span className='label'>이메일</span> <span className='value'>yuntanx495@gmail.com</span></div>
        <div className='intro-info'><FaTrophy/> <span className='label'>입상</span> <span className='value'>2023학년도<br/>정보올림피아드<br/>장려상</span></div>
        </div>
        <div className='projects'>
        <br/>
        <h2 style={{fontWeight:'bolder'}}>프로젝트</h2>
        <table className='projects-table'>
            <tbody>
            <tr>
                <td className='rounded shadow p-3 bg-white'><Link to='/projects/1' className='projects-content'>해리포터 기숙사 배정 프로그램<Image src={dormitory} fluid/></Link></td>
                <td className='rounded shadow p-3 bg-white'><Link to='/projects/2' className='projects-content'>MBTI 챗봇</Link></td>
            </tr>
            <tr>
                <td className='rounded shadow p-3 bg-white'><Link to='/projects/3' className='projects-content'>파이썬 웹사이트 크롤링</Link></td>
                <td className='rounded shadow p-3 bg-white'><Link to='/projects/4' className='projects-content'>파이썬 번역기</Link></td>
            </tr>
            <tr>
                <td className='rounded shadow p-3 bg-white'><Link to='/projects/5' className='projects-content'>AI에 적합한 요소 예측</Link></td>
                <td className='rounded shadow p-3 bg-white'><Link to='/projects/6' className='projects-content'>인공지능 스피커</Link></td>
            </tr>
            </tbody>
        </table>
        <br/>
        </div>
    </div>
    );
}

export default Main;