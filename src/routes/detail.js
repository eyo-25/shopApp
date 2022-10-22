import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { Nav } from 'react-bootstrap'
import { addCart } from './../store.js'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'

function Detail(props) {
    let {id} = useParams();
    let 찾은상품 = props.shoes.find((x)=>{
        return x.id == id
    })
    let [timeSale , setTimeSale] = useState(true)
    let [num, setNum] = useState('')
    let [탭, 탭변경] = useState(0)
    let [fade1, setFade1] = useState('')
    let dispach = useDispatch()

    useEffect(()=>{ // mount,update시 재렌더링
        let a = setTimeout(()=>{setTimeSale(false)}, 2000)
        return ()=>{
            clearTimeout(a)
        }
    })

    useEffect(()=>{
        if (isNaN(num) == true){
            alert('숫자를 입력하세요');
            document.querySelector('.stock').value = '' 
        }
    }, [num])

    useEffect(()=>{
        setTimeout(()=>{setFade1('end')}, 300)
        return(
            setFade1('')
        )
    },[])

    useEffect(()=>{
        let array = localStorage.getItem('watched');
        let copy = JSON.parse(array)
        copy.push(parseInt(id))
        let set = new Set(copy)
        copy = [...set]
        localStorage.setItem('watched', JSON.stringify( copy ))
      },[])
    
    return(
        <div className={'start'+ fade1}>
            {timeSale == true ? <Timesale/> : null}
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={"https://codingapple1.github.io/shop/shoes"+ (parseInt(찾은상품.id) + 1) +".jpg"} width="100%" />
                    </div>
                    <div className="col-md-6" style={{"margin": "auto 0"}}>
                        <h4 className="pt-5">{props.shoes[찾은상품.id].title}</h4>
                        <p>{props.shoes[찾은상품.id].content}</p>
                        <p>{props.shoes[찾은상품.id].price}원</p>
                        <button className="btn btn-danger" onClick={()=>{dispach(addCart(props.shoes[찾은상품.id]))}}>주문하기</button>
                        <input className='stock' onChange={(e)=>{setNum(e.target.value)}} style={{'display':'flex', 'margin':'20px 0', 'border-radius':'4px'}}/>
                    </div>
                </div>

                <Nav variant="tabs"  defaultActiveKey="link0">
                    <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent 탭={탭}/>
            </div>
        </div>
    )
}

function Timesale(){
    return(
        <div className='timesale alert alert-warning' style={{'textAlign':'center'}}>
            2초이내 클릭시 할인
        </div>
    )
}

function TabContent(props){
    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{ setFade('end') }, 300)
      return ()=>{
        setFade('') //clean up function
      }
      }, [props.탭])
    
    return (
        <div className={'start' + fade}>
            {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][props.탭]}
        </div>
    )
}

function WatchItem (props){
    let copy = ''
    let array2 = localStorage.getItem('watched');
    copy = JSON.parse(array2);
    console.log(copy)
    let ImageLink = styled.a`
    display : flex;
    cursor : pointer;
    `;
  
    if( copy !== null && copy.length > 4 ){
      copy.splice(0, 1)
      localStorage.setItem('watched', JSON.stringify( copy ) );
    }
  
    if( copy !== null ){
      return(
        copy.map((a, i)=>{return(
          <ImageLink onClick={()=>{props.navigate(`/detail/${a}`)} }>
            <li>
                <img src={ "https://codingapple1.github.io/shop/shoes"+ (a + 1) +".jpg" } width="100%" height="100%"/>
            </li>
          </ImageLink>
        )
        })
      )
    }
}

export {Detail, WatchItem};