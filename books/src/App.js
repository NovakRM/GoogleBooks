import './App.css';
import React, { useState } from 'react'
import { InputGroup, Input, InputGroupAddon, Button, Spinner } from 'reactstrap'
import axios from 'axios'
import BookCard from './Components/BookCard/BookCard'

function App() {
  //state
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])

  const removeExtraSpace = s =>
  s
  .trim()
  .split(/ +/)
  .join(" ");

  //search
  const handleSubmit = () => {
    setLoading(true)
    removeExtraSpace(query)
    axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(res => {
      // console.log(res.data)
      if (res.data.items.length > 0){
        setCards(res.data.items)
        setLoading(false)
      }
    }).catch(err =>{
      console.log(err)
      setLoading(true)
    })
  }

  //build data for cards
  const handleCards = () => {
    const items = cards.map((item, i)=>{
      let thumbnail = ''
      if(item.volumeInfo.imageLinks.thumbnail) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail
      }

      return(
        <div 
          className="col-lg-4"
          key={item.id}
        >
          <BookCard 
            thumbnail={ thumbnail}
            title={ item.volumeInfo.title}
            pageCount={item.volumeInfo.pageCount}
            language={item.volumeInfo.lanugage} 
            authors={item.volumeInfo.authors} 
            publisher={item.volumeInfo.publisher} 
            description={item.volumeInfo.description}
            previewLink={item.volumeInfo.previewLink} 
            infoLink={item.volumeInfo.infoLink} 
          />
        </div>
      )
    })

    if(loading){
      return(
        <div className="d-flex justify-content-center mt-3">
          < Spinner />
        </div>
      )
      } else {
        return(
        <div className="container my-5">
          <div className="row">{ items}</div>
        </div>
      )
    }
  }

  //search / heading, pull out into component
  const mainHeader = () => {
    return (
      <div className="mainImage d-flex justify-content-center align-items-center flex-column">
        <div className="filter">
          <h1 className="heading display-2 text-center text-white mb-3">
            Google Library
          </h1>
        </div>
        <div className="search">
          <InputGroup size="lg" className="mb-3">
            <Input placeholder="search by title" value={query} onChange={e=>setQuery(e.target.value)}/>
            <InputGroupAddon addonType="append" onClick={handleSubmit}>
            <Button>
              <i class="fas fa-search"></i>
            </Button>
          </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    )
  }
  return (
    <div className="w-100 h-100">
      {mainHeader()}
      {handleCards()}
    </div>
  );
}

export default App;
