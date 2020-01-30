import React from "react";
import logo from "./logo.svg";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id : 1,
      data : [],
    }
  }

  _fetchUsersData() {

    fetch(`/api/users`)
    .then(res => res.json())
    .then(res => this.setState({
      data: res.data
    }))
    .catch(err => console.log(err));
  }

  _handleChnage(e) {
    this.setState({
      user_id: e.target.value
    });
  }

  _fetchUsersDataById() {
    fetch(`/api/users/byId?user_id=${this.state.user_id}`)
    .then(res => res.json())
    .then(res => this.setState({
      data : res.data
    }))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <label htmlFor="name">Fetch data by ID: </label>
          <input
            id="name"
            type="text"
            value={this.state.user_id}
            onChange={this._handleChnage.bind(this)}
          />

          <button onClick={this._fetchUsersDataById.bind(this)}>Fetch by id</button>
          <button onClick={this._fetchUsersData.bind(this)}>Fetch all users</button>

          <p>
            {this.state.data.map(user =>
              <li>
                {`user_id: ${user.user_id} username: ${user.username} email: ${user.email}`}
              </li>
            )}
          </p>


          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
