import React, { useState, useEffect } from "react";
import API from "../util/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/grid";
import { List, ListItem } from "../components/list/list";
import { Input, FormBtn } from "../components/form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  function saveBook (event){
    console.log(books)
    console.log(event.target)
    let savedBook = books.filter(book => book.id === event.target.id)
    API.saveBook({
              title: savedBook[0].volumeInfo.title,
              authors: savedBook[0].volumeInfo.authors,
              description: savedBook[0].volumeInfo.description,
              image: savedBook[0].volumeInfo.imageLinks.smallThumbnail,
              link: savedBook[0].volumeInfo.infoLink
            })
              .then(res => console.log(res))
              .catch(err => console.log(err));
          }

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

    function handleFormSubmit(event) {
        event.preventDefault();
        let search = formObject.book
        console.log(formObject.book)
        search = search.split(' ')
        search = search.join('')

        API.searchBooks(search)
        .then(res =>  setBooks(res.data.items))
        .catch(err => console.log(err)); 
    };


    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <form>
              <Input
                onChange={handleInputChange}
                name="book"
                placeholder="book title"
              />
              <FormBtn
                disabled={!(formObject.book)}
                onClick={handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Col size="lg-12 sm-12">
            {books.length ? (
                <List>
                  {books.map(book => (
                    <div className="card d-flex flex-row justify-content-between align-items-center mx-10">
                      <ListItem key={book._id} className="d-flex">

                            <li>Title:{book.volumeInfo.title}</li>
                            <li>Author(s):{book.volumeInfo.authors}</li>

                        <Link to={"/books/" + book._id}>
                            <li> More Info <a href={book.selfLink}>Here</a></li>
                        </Link>

                        <FormBtn
                          id={book.id}
                          onClick={e => saveBook(e)}
                          >
                         Save Book
                        </FormBtn>
                        
                    </ListItem>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book._id}/>
                    <p className="mx-5">Description:{book.volumeInfo.description}</p>
                  </div>
                  ))}
                </List>
            ) : (
              <h3>No Results</h3>
            )}
          </Col>
      </Container>
    );
  }


export default Books;