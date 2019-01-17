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
          <img src={'https://placekitten.com/182/268'}/>
          <div className={'quote-container'}>
            <blockquote>
              <p>{ this.state.quote.quote }</p>
            </blockquote>
            <cite>
              <span>Movie:</span><br/>
              { this.state.quote.author }
            </cite>
          </div>
          <hr/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>{ this.renderQuote() }</div>
    )
  }
}