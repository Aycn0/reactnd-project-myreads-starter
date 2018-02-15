import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class Search extends Component{

  state = {
    query: '',
    display_list: [],
    noResultsFound: false
  }

  static PropTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelf: PropTypes.array.isRequired
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if (query.length === 0){
      this.clearResults()
    }
    else{
      BooksAPI.search(query).then((foundBooks) => {
           if(foundBooks.error){
             this.clearResults()
             this.setState({
               noResultsFound: true
             })
           }
           else {
             for (var i=0; i< this.props.booksOnShelf.length; i++){
               var book = this.props.booksOnShelf[i]
               for ( var j=0; j<foundBooks.length; j++){
                 if ( book.id === foundBooks[j].id){
                   foundBooks[j].shelf = book.shelf
                 }
                 if (!foundBooks[j].authors){
                   foundBooks[j].authors=[]
                 }
               }
             }
             this.setState({
               display_list: foundBooks,
               noResultsFound: false
             })

           }
         })
      }
  }
  clearResults = () => {
    this.setState({
      display_list: [],
    })
  }

  render(){
    const { onChangeShelf } = this.props
    const { query, display_list, noResultsFound } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
          to="/"
          className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

        { noResultsFound ? (
            <text>No Results Found</text>
          ) : (
              display_list.map((book) => (
                <Book key={book.id} onChangeShelf={onChangeShelf} book={book}/>
              )
            )
          )
        }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
