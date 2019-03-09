import React from 'react'

function searchLogic(cards) {
  console.log('hello')
}

export default function SearchBar({ cards }) {
  return (
    <section>
      <input type="text" onInput={searchLogic(cards)} />
    </section>
  )
}
