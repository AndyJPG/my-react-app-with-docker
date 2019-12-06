import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      greeting : ''
    }
  }

  _handleChange(e) {
    this.setState({
      name : e.target.value
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
    .then(response => response.json())
    .then(state => this.setState(state))
  }

  render() {
    console.log(fetch(`/api/greeting?name=andy`).then(response => response.json()));
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={this._handleSubmit.bind(this)}>
            <label htmlFor='name'>Enter your name: </label>
            <input
              id='name'
              type='text'
              value={this.state.name}
              onChange={this._handleChange.bind(this)}
            />
            <button type='submit'>Submit</button>
          </form>
          <p>{this.state.greeting}</p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
