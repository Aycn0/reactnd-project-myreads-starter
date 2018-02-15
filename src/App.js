import React from 'react'
import MyBooks from './MyBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import ErrorPage404 from './ErrorPage404'
import './App.css'
import { Route, Switch } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  updateBookList = (list) => {
    this.setState({
      books:list
    })
  }

 changeShelf = (book, shelf) => {
   BooksAPI.update(book, shelf).then((result)=> {
     // result is which books are in which list (currentlyReading, wantToRead, read)
     var updatedBookList = this.state.books.filter((b) => b.title !== book.title)
     book.shelf = shelf
     updatedBookList.push(book)
     this.setState({
       books: updatedBookList
     })
   })
 }

  render() {
    return (
      <div className="app">
        <Switch>
                <Route path='/search' render={() => (
                  <Search
                    onChangeShelf={this.changeShelf}
                    booksOnShelf={this.state.books}
                  />
                )}/>

                <Route exact path='/' render={() => (
                  <MyBooks
                    onChangeShelf={this.changeShelf}
                    updateBookList={this.updateBookList}
                  />
                )}/>

                <Route component={ErrorPage404}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
