import './App.css';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { useState, useEffect } from "react"
import data from "./data.js"
import {WatchItem, Detail} from "./routes/detail"
import styled from 'styled-components'
import axios from 'axios'
import Cart from "./routes/cart"

let ColorBtn = styled.button` //styled-components
  background : ${props => props.bg};
  color : ${props => props.bg == "blue" ? "white" : "black"};
  padding : 8px 20px 10PX 20PX;
  margin : 50px auto;
  display : block;
  border : none;
  font-size : 25px
`;

let ImageLink = styled.a`
  display : flex;
  cursor : pointer;
`;

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [plusBtn, setPlusBtn] = useState(true)
  let copy = ''

  useEffect(()=>{
    let array = localStorage.getItem('watched');
    copy = JSON.parse(array)
    if(copy == null){
      localStorage.setItem('watched', JSON.stringify( [] ))
      console.log(copy)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('counter', 0);
  },[])

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')} }>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/detail/1')} }>Detail</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/cart')} }>Cart</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/event')} }>Event</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Container>
        <Nav className='viewcontain'>
          <div className='viewBox'>
              <h4>최근본<br/>제품</h4>
              <div>
                <ul>
                  <WatchItem navigate={navigate}></WatchItem>
                </ul>
              </div>
          </div>
        </Nav>
      </Container>

      <Routes>
      <Route path="/" element={
        <>
          <div className='main-bg'></div>
            <div className="container">
              <div className="row">
              <ProductMenu shoes = {shoes} navigate={navigate}/>
            </div>
          </div>
          {plusBtn == true ? <PlusBtn shoes={shoes} setShoes={setShoes} setPlusBtn={setPlusBtn}/> : null}
        </>
      }/>
        <Route path="/detail/:id" element={
          <Detail shoes={shoes} navigate={navigate}></Detail>
        }/>
        <Route path="*" element={ <div>없는페이지임</div> } />
        <Route path="/event" element={ <Event/> } >
          <Route path="one" element={ <div>첫 주문시 양배추즙 서비스</div> }></Route>
          <Route path="two" element={ <div>생일기념 쿠폰받기</div> }></Route>
        </Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Routes>
    </div>
  );
}

function Event (){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function ProductMenu (props){
  return(
    props.shoes.map((a, i)=>{return(
      <div className="col-md-4">
        <ImageLink onClick={()=>{props.navigate(`/detail/${i}`)} }>
          <img src={ "https://codingapple1.github.io/shop/shoes" + (i + 1) + ".jpg" } width="80%" />
        </ImageLink>
        <h4>{props.shoes[i].title}</h4>
        <p>{props.shoes[i].price}</p>
      </div>
    )
    })
  )
}

function PlusBtn (props){
  let newArray = [];
  
  return(
    <ColorBtn bg="blue" onClick={(e)=>{
      e.target.innerHTML = 'loading';
      let counter = localStorage.getItem('counter');
      if(counter == 0){
        axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
          newArray = [...props.shoes, ...결과.data];
          localStorage.setItem('counter', parseInt(counter) + 1);
          props.setShoes(newArray);

          e.target.innerHTML = '+';
        })
      }else if(counter == 1){
        axios.get('https://codingapple1.github.io/shop/data3.json').then((결과)=>{
          newArray = [...props.shoes, ...결과.data];
          props.setShoes(newArray);
          localStorage.setItem('counter', parseInt(counter) + 1);
          e.target.innerHTML = '+';
        })
      }
      if(counter == 1){
        props.setPlusBtn(false)
      }
    }}>+</ColorBtn>
  )
}

export default App;
