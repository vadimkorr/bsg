import logo from './logo.svg'
import './App.css'

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { getLayout, getShipTypes, getNormalizedLayout } from './utils/layout'
import { useResize } from './utils/useResize'
import { Board } from './components/Board/Board'
import { Scores } from './components/Scores/Scores'
import { Ships } from './components/Ships/Ships'

function App() {
  const dispatch = useDispatch()

  const boardWrapper = useRef(null)
  const { squareSize } = useResize(boardWrapper)

  useEffect(() => {
    dispatch({
      type: 'SAVE_LAYOUT',
      payload: {
        layout: getNormalizedLayout(getLayout()),
        shipTypes: getShipTypes(),
      },
    })
  }, [dispatch])

  return (
    <div className="app-container">
      <div className="status-container">
        <div className="score-wrapper">
          <Scores />
        </div>
        <div className="ships-wrapper">
          <Ships />
        </div>
      </div>
      <div className="board-wrapper" ref={boardWrapper}>
        <div
          style={{
            height: `${squareSize}px`,
            width: `${squareSize}px`,
          }}
        >
          <Board />
        </div>
      </div>
    </div>
  )
}

export default App
