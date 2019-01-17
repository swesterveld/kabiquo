import React, { Component } from 'react'

import * as request from 'superagent'

export default class Quote extends Component {
  state = {
    quote: null
  }

  componentDidMount() {
    this.fetchQuote()
  }

  setQuote(fetchedQuote) {
    this.setState({
      quote: fetchedQuote[0]
    })
  }

  fetchQuote() {
    request
      .get("https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=movies")
      .set("X-RapidAPI-Key", process.env.REACT_APP_API_KEY) // stored in the .env file
      .then(response => this.setQuote(response.body))
      .catch(console.error)
  }

  renderQuote() {
    if (this.state.quote === null) {
      return 'Loading quote...'
    }
    else {
      return (
        <div>
          <h2 className={'quote'}>{ this.state.quote.quote }</h2>
          <h3 className={'author'}>(from the movie: { this.state.quote.author })</h3>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Quote</h1>
        <div>{ this.renderQuote() }</div>
      </div>
    )
  }
}