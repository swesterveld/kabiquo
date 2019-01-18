import React, { Component } from 'react'

import * as request from 'superagent'

import './Quote.css'

const OMDB_API_URL = 'https://www.omdbapi.com/'
const QUOTE_API_URL = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/'

export default class Quote extends Component {
  state = {
    quote: null,
    movie: null
  }

  componentDidMount() {
    this.fetchData()
  }

  setQuote(fetchedQuote) {
    this.setState({
      quote: fetchedQuote[0]
    })
  }

  setMovie(fetchedMovie) {
    this.setState({
      movie: fetchedMovie
    })
  }

  fetchData() {
    request
      .get(QUOTE_API_URL)
      .set("X-RapidAPI-Key", localStorage.getItem('REACT_APP_RAPID_API_KEY') || process.env.REACT_APP_RAPID_API_KEY) // stored in the .env file
      .query({ cat: 'movies' })
      .then(response => this.setQuote(response.body))
      .then(_ => this.fetchMovie(this.state.quote.author))
      .catch(console.error)
  }

  fetchMovie(title) {
    // first adapt title to OMDb format
    const movie_title = title.split(' ').join('-')
    console.log(`title: ${movie_title}`)

    request
      .get(OMDB_API_URL)
      .query({ apikey: localStorage.getItem('REACT_APP_OMDB_API_KEY') || process.env.REACT_APP_OMDB_API_KEY})
      .query({ t: movie_title })
      .query({ type: 'movie' })
      .then(response => this.setMovie(response.body))
      .catch(console.error)
  }

  renderQuote() {
    if (this.state.quote === null || this.state.movie === null) {
      return 'Loading data...'
    }
    else {
      return (
        <div className={'movie-quote group right'}>
          <img src={ this.state.movie['Poster'] } alt={'movie poster'}/>
          <div className={'quote-container'}>
            <blockquote>
              <p>{ this.state.quote['quote'] }</p>
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