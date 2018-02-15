import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class MyBooks extends Component{

  state = {
    books: []
  }

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    updateBookList: PropTypes.func.isRequired
  }


 componentDidMount() {
   BooksAPI.getAll().then((result) => {
     this.props.updateBookList(result)
     this.setState({ books: result })
   })
 }

 changeShelf = (book, shelf) => {
   BooksAPI.update(book, shelf).then((result)=> {
     var updatedBookList = this.state.books.filter((b) => b.title !== book.title)
     book.shelf = shelf
     updatedBookList.push(book)
     this.setState({
       books: updatedBookList
     })
   })
 }

  render() {
    const { onChangeShelf } = this.props
    const { books } = this.state
    return(
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                    {books.filter((book) => book.shelf === 'currentlyReading').map(
                        (book) => (
                          <Book key={book.id} onChangeShelf={onChangeShelf} book={book}/>
                        )
                      )
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                  {books.filter((book) => book.shelf === 'wantToRead').map(
                      (book) => (
                        <Book key={book.id} onChangeShelf={onChangeShelf} book={book}/>
                      )
                    )
                  }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                  {books.filter((book) => book.shelf === 'read').map(
                      (book) => (
                        <Book key={book.id} onChangeShelf={onChangeShelf} book={book}/>
                      )
                    )
                  }

                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
          to='/search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooks
