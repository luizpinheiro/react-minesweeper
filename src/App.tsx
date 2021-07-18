import React from 'react'

import MineSweeper from './components/MineSweeper'
import GlobalStyles from './globalStyles'

function App() {
  return (
    <>
      <GlobalStyles />
      <MineSweeper />
    </>
  )
}

export default React.memo(App)
