import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div style={{ textAlign: 'center', fontSize: 11 }}>
      <div>
        Icons made by{' '}
        <a
          href="https://www.flaticon.com/authors/vectors-market"
          title="Vectors Market"
        >
          Vectors Market
        </a>
        ,{' '}
        <a href="https://www.flaticon.com/authors/vaadin" title="Vaadin">
          Vaadin
        </a>
        , and{' '}
        <a href="https://www.flaticon.com/authors/surang" title="surang">
          surang
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
