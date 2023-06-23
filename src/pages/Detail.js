import React from 'react'
import { useParams } from 'react-router-dom'
import { addItem } from './store'
import { useDispatch } from 'react-redux'

export default function Detail(props) {

  const {bests} = props
  //받은 속성을 객체화하기 베스트가 가진 속성들을 사용할 수 있게하기 위해
  const {id} = useParams()
  //기준인 id를 가지고 best가 가지고 있는 모든 파라미터를 사용하겠다는 선언
  // 베스트라는 여러개의 속성이 있으니까 그 속성들을 다 사용하겠다 [id]로 구분해서
  // 상태관리를 위해 props를  상속 받는 것
  //useState를 통해 부모에서만 정보 갱신 가능한것 => 전역 상태관리 라이브러리인 리덕스를 사용해 상태관리를 하는 이유(장바구니)
  
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Detail Page</h2>
      <img src={bests[id].image} alt="" style={{width: 500}}></img>
      <h4>{bests[id].title}</h4>
      <p>{bests[id].price}</p>
      <button onClick={() => 
      dispatch(addItem({id: bests[id].id, title: bests[id].title, count: 1}))
      }>장바구니</button>
    </div>
  )
}
