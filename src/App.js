import React, { Component } from 'react';
import './App.css';
import Table from './Table';

class App extends Component {

  render() {
    return (
			<div className="root-container">
				<h1>Welcome, please see the data below</h1>
				<Table />
			</div>
    );
  }
}

export default App;
