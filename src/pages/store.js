import { configureStore, createSlice } from "@reduxjs/toolkit";
//configureStore : 내가 만든 스테이트 내 보내는것 전체적인 환경 만들어줌
//createSlice 스테이트를 관리하기 위해 스테이트를 생성하는 것

//state 만들기, 이름은 마음대로 생성 가능
const user = createSlice({ //state생성
  name: 'user',
  //initialState: '홍길동', 
  initialState: {name: '홍길동', memberYear: 1}, 
  //초기값

  //변경 함수를 만드는 법 createSlice안에 reducers이름으로 객체함수를 하나 더 생성하고 그 안에 변경 내용을 적어주면 되는것
  reducers: {
    /* changeName(){
      return '이순신'
    }//, 사용해서 여러개의 변경내용 적용 가능 */
    /* changeName(state) {
      return state + ' : Green' //자기가 가지고 있는 값을 받아서 변경하겠다
    } */
    changeName(state){
      state.name = state.name + ' : Green'
      //객체나 배열은 메모리에 저장이 되므로 저장된 메모리값을 가져오면 되기때문에 리턴으로 돌릴 필요가 없다, 단일값의 경우에는 리턴이 필요
    },
    changeYear(state, action){//변경하는 값이라 action을 많이 사용
      state.memberYear += action.payload
      //내가 지금 가지고 있는 id와 들어오는 id값이 일치한다면 true를 return -> 그 true의 인덱스를 findIndex가 찾아서 index에 넣어줌 -> -1보다 크다면 수량이 존재하는 것(제일 작은 인덱스가 0) 0보다 작다면 존재하지 않는 인덱스이기 때문에 push시켜주면 되는 것
      //값을 변경하기 때문에 dataState와 함께 그걸 변경할 수있는 action을 넣어줘야함 그래야 변경함수 사용 가능, 변경함수는 단순히 값을 어떻게 처리하는게 아니라 메모리 값 자체를 변경시켜주는 것, action은 변경함수를 지칭, 호출에 의해 함수 변경을 처리하는게 action의 역할 디스패치가 어떤 메세지를 넣어 변경을 +1 -1 등 요청함 -> 그 요청을 받는게 payload, 변경함수를 받을때는 payload 짝지처럼 써야함 뭐를 변경해야할지에 대한 메세지를 payload가 받는거기 때문에 변경내용을 알기위해 payload를 꼭 함께 써줘야하는것
      //객체 형식으로 여러개 작성 가능
    }//스테이트 값을 사용할 경우에는 state라고만 써주면 되고 스테이스 값을 사용하며 변경까지 필요할때는 action.payload를 꼭 같이 써줘야한다 action=변경함수 지칭 변수.payload
  }
}) //createSlice

//user의 변경함수다 actions=변경함수, user의 변경함수를 내보내겠다
//내가 변경할 함수 만들었으면 export 내보내줘야 하는데 보낼 함수 나열해주고 디스트럭쳐링에 의해 user.actions user라는 애가 가지고 있는 변경함수들이다 라는 뜻으로 사용 
export const { changeName, changeYear } = user.actions

//createSlice를 사용해 state 생성
const cart = createSlice({
  name: 'cart',
  initialState: [], //처음엔 비어있다가 값을 생성해야 나오는 장바구니, 항목에 대해 구분할 수 있는 id를 같이 받을 것
  reducers: {
    addItem(state, action) { //addItem이라는 상태변경 함수 추가 state라는 상태값과 이걸 변경할 수 있는 함수 액션을 받겠다
      //state.push(action.payload) //디스패치로 에드아이템을 호출 -> 호출한 상태서 추가되는걸 액션(상태변경함수)가 받게됨 그 액션의 페이로드는 정보를 뜻함
      const index = state.findIndex((findId) => { return findId.id === action.payload.id})
      if(index > -1) {
        state[index].count++
      } else {
          state.push(action.payload)
      }
    }, //addItem , 중괄호 벗어나면 변수 리셋되므로 
    deleteItem(state, action){
      const index = state.findIndex((findId) => { return findId.id === action.payload})
      //비교대상이 아니라 내가 그 버튼을 눌렀을때 그 버튼에 해당하는 정보가 필요하기 때문에 id붙일 필요 없음
      state.splice(index, 1)
    }, //deleteItem
    addCount(state, action){
      const index = state.findIndex((findId) => {return findId.id === action.payload})
        state[index].count++
    }, //addCount
    subCount(state, action){
      const index = state.findIndex((findId) => {return findId.id === action.payload})
      if(state[index].count > 1) state[index].count--
    } //subCount
  }
})

//addItem  action.payload가 받는 거는 id title count 3가지가 들어옴 그중 id를 받아서 findId로 받은 값중 해당 id의 인덱스를 찾아내는거라 id가 붙게됨
//deleteItem은 클릭한 버튼의 id만 action.payload로 전송 , 받는거 자체가 id이기 떄문에 뒤에 id를 붙이면 안되는 것



//setter 상태변경 함수를 만들어 addItem이 실행되기위해서는 현재 상태와 reducers라는 action이 있어야함, dispatch와 짝지
export const { addItem, deleteItem, addCount, subCount } = cart.actions

//다른 컴포넌트에서 가져다 쓸 수(import) 있도록 state 내보내기
export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer //cart라는 state를 만들었으니 추가해주기 -> useSelector를 사용해 얘를 끌어다 쓰게 되는 것 useSelector와 짝지
  }
})