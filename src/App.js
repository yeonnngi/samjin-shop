//import logo from './logo.svg';
//깃헙 배포시에는 주석 다 지워버리기
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './pages/productData';
import About from './pages/About';
import Detail from './pages/Detail';
import Cart from './pages/Cart';


/* import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; */
//▼ 한꺼번에 작성해주는 법
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
//라우터를 쓰기위해 Routes, Route, Link를 쓰는데  클릭하면 위치로 옮겨주는 useNavigate를 사용하겠다
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; //state값을 사용하기 위해 useSelector
import { addItem } from './pages/store';


function App() {

  const navigate = useNavigate()
  const [bests] = useState(data)
  const state = useSelector((state) => state)
  const dispatch = useDispatch() //useDispatch를 통해 상태변경함수 action을 호출하겠다
  //data는 useState로 받아서 쓰겠다

  return (
    <div className="App">
      
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => {navigate('process.env.PUBLIC_URL')}}>Samjin_Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}} >Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about/info')}}>Information</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='process.env.PUBLIC_URL' element={
          <Container>
            <img src={process.env.PUBLIC_URL + '/images/visual_main_01.jpg'} alt="vm"/>
            <h2>Best 상품</h2>
          <Row>
            {
              bests.map((best, index) => {
                return (
                  <Col key={index}>
                    <Link to={`detail/${index}`}>
                      <img src={best.image} alt="product_img" style={{width: 280}}/>
                      <h4>{best.title}</h4>
                      <p>{best.desc}</p>
                      <p>{best.price}</p>
                    </Link>
                    <button onClick={() => { 
                      dispatch(addItem({id: best.id, title: best.title, count: 1})) //key, keyvalue, count는 데이터와 함께 같이 넘겨줘야해서 cart, store가 아닌 여기서 해주기
                    }}>장바구니</button>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
        }/>

      {/* 내가 누른 값이 무엇인지 그것에 대한 데이터가 불려져서 나타나게 되는 것 */}
        <Route path='about' element={<About/>}>
          <Route path='info' element={<div>Information</div>}/>
          <Route path='loca' element={<div>Location</div>}/>
        </Route>
        <Route path='detail/:id' element={<Detail bests={bests} />}></Route>
        {/* 디테일 페이지를 id 개수만큼 만들어 놓은것 만들어놓은것은 디테일이라는 props를 이미 전송해놓은 것 */}
        <Route path='cart' element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
