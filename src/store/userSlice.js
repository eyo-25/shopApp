import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : { name : 'kim', age : 20 },
    reducers : {
      changeName(state){
        state.name = 'Park'
      },
      changeAge(state){
        state.age += 1
      }
    }
})

export let { changeName, changeAge } = user.actions

export default user;