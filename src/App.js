import React, { use, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import background from './assets/background.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';

function App() {
  let [title, setTitle] = useState(['파이썬 번역기', '웹페이지 크롤링', 'MBTI 챗봇', '해리포터 기숙사 배정 프로그램', 'AI 예측 프로그램']);
  let [thumbUp, setThumbUp] = useState(0);
  let [search, setSearch] = useState("");
  const filteredTitle = title.filter(item => item.toLowerCase().includes(search.toLowerCase()));
  const transRef = useRef(null);
  const contactRef = useRef(null);
  
  return (
     <>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Knowho's Portpolio</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action2">자기소개</Nav.Link>
                  <NavDropdown
                    title="프로젝트"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        ))}
        <Image src={background} fluid/>
        <div
        style={{
          position: 'absolute',
          top: 72, left: 0, right: 0, bottom: 49,
          background: 'rgba(0, 0, 0, 0.71)',
          pointerEvents: 'none'
        }}
      />
      <List topic={title[0]} func={() => setThumbUp(thumbUp + 1) } thumb={thumbUp}/>
      <List topic={title[1]} func={() => setThumbUp(thumbUp + 1) } thumb={thumbUp}/>
      <List topic={title[2]} func={() => setThumbUp(thumbUp + 1) } thumb={thumbUp}/>
      <List topic={title[3]} func={() => setThumbUp(thumbUp + 1) } thumb={thumbUp}/>
      <div style={{ height: '500px' }}></div>
      <div ref={transRef}>여기로 이동합니다</div>
      <List topic={title[4]} func={() => setThumbUp(thumbUp + 1) } thumb={thumbUp}/>

    </>

  );
}

function List({topic, func, thumb}){
  return (
    <div className="list">
        <h3> { topic } <Button variant='light' onClick={func}>👍</Button>{ thumb }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
  );
}

export default App;
