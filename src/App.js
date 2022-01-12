import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [pictures, setPictures] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [newPictures, setNewPictures] = useState(false)
  const mounted = useRef(false)

  const fetchPictures = async () => {
    setLoading(true)
    const pageUrl = `&page=${page}`
    const queryUrl = `&query=${query}`
    let url
    if (query) {
      url = `${searchUrl}${clientID}${pageUrl}${queryUrl}`
    } else {
      url = `${mainUrl}${clientID}${pageUrl}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()

      setPictures((oldData) => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldData, ...data.results]
        } else {
          return [...oldData, ...data]
        }
      })
      // console.log(data)
      // console.log(url)
      setNewPictures(false)
      setLoading(false)
    } catch (error) {
      setNewPictures(false)
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPictures()
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newPictures) return
    if (loading) return
    console.log('second')
    setPage((oldpage) => {
      return oldpage + 1
    })
  }, [newPictures])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query) {
      return
    }
    if (page === 1) {
      fetchPictures()
    }
    setPage(1)
  }
  const event = () => {
    if (
      !loading &&
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 2
    ) {
      setNewPictures(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            className='form-input'
            placeholder='search'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {pictures.map((picture) => {
            return <Photo key={picture.id} {...picture} />
          })}
        </div>
        {loading && <h2 className='loading'>loading...</h2>}
      </section>
    </main>
  )
}

export default App
