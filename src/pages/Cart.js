import React from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux'; 
//useDispatch = state를 변경시키는 훅
//useSelector = state를 가져오는 훅
import { changeName, changeYear, deleteItem, addCount, subCount } from './store';
//deleteItem 추가됐는지 확인

//★ 장바구니 내에 총금액이 얼마인지 표시할 내용 추가하기, 서브토탈도 추가 / map안에서 하게되면 총계가 계속 나오니 아마도 map 밖에서 하도록...?

export default function Cart() {
  // const state = useSelector((state) => {return state})
  const state = useSelector((state) => state) //모든 state를 다 가져오는 법, state를 사용하기 위함
  //name만 원하면 state.user이렇게 가져오면 되는 것, 원하는 것만 가져올 수도 있음
  //store에 있는 상태를 변경시킬 useState값을 가져오는 역할을 useSelector라는 훅이 함
  const dispatch = useDispatch() //state 값을 변경하는 아이, dispatch를 통해 변경함수 호출
  
  //변경함수 적용, 임폴트시키고 dispatch + (변경할 셋터 함수) 넣어주면 됨
  return (
    <div>
      <h2><span style={{color: 'blue', fontWeight: 'bold'}}>({state.user.name})</span>님의 장바구니</h2>
      <button onClick={() => dispatch(changeName())}>닉네임보이기</button>
      <h3>회원가입기간 : {state.user.memberYear} 년</h3>
      <button onClick={() => dispatch(changeYear(1))}>+</button>
      <button onClick={() => dispatch(changeYear(-1))}>-</button>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>개수</th>
          <th>변경</th>
        </tr>
      </thead>
      <tbody>
        {
          state.cart.map((item, i) => {
            return (
              <tr key={i}>
                <td>{state.cart[i].id}</td> 
                <td>{state.cart[i].title}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button onClick={() => dispatch(addCount(state.cart[i].id))}>+</button>
                  <button onClick={() => dispatch(subCount(state.cart[i].id))}>-</button>
                  <button onClick={() => dispatch(deleteItem(state.cart[i].id))}>삭제</button>
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

//cart[i] 객체가 아닌 배열로 받아야함
