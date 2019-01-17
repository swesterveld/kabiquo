import React, { Component } from 'react'

import * as request from 'superagent'

import './Quote.css'

const QUOTE_API_URL = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/'

export default class Quote extends Component {
  state = {
    quote: null
  }

  componentDidMount() {
    this.fetchData()
  }

  setQuote(fetchedQuote) {
    this.setState({
      quote: fetchedQuote[0]
    })
  }

  fetchData() {
    request
      .get(QUOTE_API_URL)
      .set("X-RapidAPI-Key", process.env.REACT_APP_RAPID_API_KEY) // stored in the .env file
      .query({ cat: 'movies' })
      .then(response => this.setQuote(response.body))
      .catch(console.error)
  }

  renderQuote() {
    if (this.state.quote === null) {
      return 'Loading quote...'
    }
    else {
      return (
        <div className={'movie-quote group right'}>
          <img src={'https://placekitten.com/182/268'} alt={'movie poster'}/>
          <div className={'quote-container'}>
            <blockquote>
              <p>{ this.state.quote.quote }</p>
            </blockquote>
            <cite>
              <span>Movie</span><br/>
              { this.state.quote.author }
            </cite>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={'centered-component'}>
        { this.renderQuote() }
      </div>
    )
  }
}