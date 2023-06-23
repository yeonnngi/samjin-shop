import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
//브라우저 라우터가 감싸고 있는 안에서 라우터를 App(최종적으로 랜더링을 넘기는 곳)에서 사용할 수 있도록 하겠다
import { Provider } from 'react-redux'; //provider로 전역관리 하겠다
import store from './pages/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode> //이전 사용하던 리액트 명령어를 허용하지 않겠다, 아무것도 틀린게 없는데 오류가 뜰경우 지워주기
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
