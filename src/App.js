import React, { useState } from 'react'
import range from 'lodash/range'
import classnames from 'classnames'

import './Styles/App.scss'

const pages = Math.round(Math.random() * 69)
const offset = Math.round(Math.random() * (pages / 3))

const App = () => {
  const [currentPage, setCurrentPage] = useState(Math.round(Math.random() * pages))

  const nextPage = () => setCurrentPage(currentPage + 1)
  const prevPage = () => setCurrentPage(currentPage - 1)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
      </header>
      <div className="pagination">
        <button className="pagination__nav-button" disabled={currentPage === 1} onClick={prevPage}>
          prev
        </button>
        {range(currentPage - offset, currentPage + offset + 1)
          .filter(x => x > 0 && x <= pages)
          .map(x => (
            <button
              className={classnames('pagination__page-button', { '-current': x === currentPage })}
              key={x}
              onClick={() => setCurrentPage(x)}
            >
              {x}
            </button>
          ))}
        <button
          className="pagination__nav-button"
          disabled={currentPage === pages}
          onClick={nextPage}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default App
