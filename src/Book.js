import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static PropTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render(){
    const {book, onChangeShelf} = this.props

    return(
      <li key={book.title}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail?`${book.imageLinks.thumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf || "none"} onChange={(event) => onChangeShelf(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          { book.authors ? (
              book.authors.map((author) => (
                <div key={author} className="book-authors">{author}</div>
              ))
            ) : ("")
          }
        </div>
      </li>
    )
  }
}



export default Book
