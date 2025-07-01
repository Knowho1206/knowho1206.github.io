"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef} from 'react'
import "./globals.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

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
export default function RootLayout({ children }) {
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
    <html lang="en">
      <body>
        {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className='bg-body-tertiary mb-3 fixed-top'>
            <Container fluid>
                <Navbar.Brand>Knowho's Portfolio</Navbar.Brand>
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
                            <Dropdown.Item eventKey='1' href='/projects/1'>해리포터 기숙사 배정 프로그램</Dropdown.Item>
                            <Dropdown.Item eventKey='2' href='/projects/2'>MBTI 챗봇</Dropdown.Item>
                            <Dropdown.Item eventKey='3' href='/projects/3'>파이썬 웹사이트 크롤링</Dropdown.Item>
                            <Dropdown.Item eventKey='4' href='/projects/4'>파이썬 번역기</Dropdown.Item>
                            <Dropdown.Item eventKey='5' href='/projects/5'>AI에 적합한 요소 예측</Dropdown.Item>
                            <Dropdown.Item eventKey='6' href='/projects/6'>인공지능 스피커</Dropdown.Item>
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
        {children}
      </body>
    </html>
  );
}
