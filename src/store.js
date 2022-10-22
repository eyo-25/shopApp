import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let cartBox = createSlice({
  name : 'cartbox', //네임작명 필수 state하나가 slice
  initialState : [
              {id : 0, name : 'White and Black', count : 2},
              {id : 2, name : 'Grey Yordan', count : 1}
            ],
  reducers : {
    increase(state, action){
      let num = state.findIndex((item)=>{return item.id == action.payload})
      state[num].count++
    },
    addCart(state, action){
      let addItem = action.payload
      let num = state.findIndex((item)=>{return item.id == addItem.id})
      if(num < 0){
        state.push({id : addItem.id, name : addItem.title, count : 1})
      } else {state[num].count++}
    },
    removeCart(state, action){
      let removeItem = action.payload
      let num = state.findIndex((item)=>{return item.id == removeItem.id})
      state.splice(num, 1)
    }
  }
})

export let { increase, addCart, removeCart} = cartBox.actions

export default configureStore({
  reducer: { 
    cartBox : cartBox.reducer, //모든 컴포넌트들이 스테이트 공유
    user : user.reducer,
   }
}) 