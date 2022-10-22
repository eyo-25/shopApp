import {Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { increase, removeCart } from './../store.js'

function Cart(){

    let cartBox = useSelector((state)=>{ return state.cartBox }) //Redux store의 state꺼내는법
    let user = useSelector((state)=>{ return state.user })
    let dispach = useDispatch()
    console.log(cartBox)

    return(
        <div className="container">
            <h4 style={{'textAlign': 'center', 'margin':'15px 0'}}>{user.name}의 장바구니 {user.age}</h4>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartBox.map((a, i)=>{
                            return(
                                <tr>
                                    <td>{cartBox[i].id}</td>
                                    <td>{cartBox[i].name}</td>
                                    <td>{cartBox[i].count}</td>
                                    <td>
                                        <button onClick={()=>{dispach(increase(cartBox[i].id))}}>+</button>
                                        <button onClick={()=>{dispach(removeCart(cartBox[i].id))}}>x</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;