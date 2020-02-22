import React, { useState } from 'react'
import range from 'lodash/range'
import classnames from 'classnames'

import './Styles/App.scss'
import MainButton from './Components/buttons'
import SuccessButton from './Components/buttons/SuccessButton'
import DangerButton from './Components/buttons/DangetButton'

const pages = Math.round(Math.random() * 69)
const offset = Math.round(Math.random() * (pages / 3))

const App = () => {
  const [currentPage, setCurrentPage] = useState(Math.round(Math.random() * pages))

  const nextPage = () => setCurrentPage(currentPage + 1)
  const prevPage = () => setCurrentPage(currentPage - 1)

  const abortController = new window.AbortController()

  const getDelayedPosts = async () => {
    await fetch(
      'http://slowwly.robertomurray.co.uk/delay/5000/url/https://jsonplaceholder.typicode.com/posts',
      { signal: abortController.signal },
    )
      .then(resp => resp.text())
      .then(console.log)
      .catch(console.error)
  }
  const getChainedRequest = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(users => {
        const firstUserId = users[0].id
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${firstUserId}`)
      })
      .then(response => response.json())
      .then(posts => console.log(posts))
  }

  const request1 = fetch('https://jsonplaceholder.typicode.com/users').then(resp => resp.json())
  const request2 = fetch(
    'http://slowwly.robertomurray.co.uk/delay/5000/url/https://jsonplaceholder.typicode.com/posts',
  ).then(resp => resp.json())
  const request3 = fetch('https://jsonplaceholder.typicode.com/photos').then(resp => resp.json())

  const getFewRequestInThisSameTime = async () => {
    Promise.all([request1, request2, request3])
      .then(console.log)
  }

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
      <MainButton
        onClick={async () => {
          await getFewRequestInThisSameTime()
        }}
        text="multi rquest button"
      />
      <MainButton
        onClick={async () => {
          console.log('main button')
          await getDelayedPosts()
        }}
        text="main button"
      />
      <SuccessButton
        onClick={async () => {
          console.log('success button')
          await getChainedRequest()
        }}
        text="success button"
      />
      <DangerButton
        onClick={() => {
          console.log('danger button')
          abortController.abort()
        }}
        text="danger button"
      />
    </div>
  )
}

export default App
