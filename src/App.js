import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router, Link } from '@reach/router';
import Articles from './components/Articles';
import * as api from './api/api';
import ArticlesForTopic from './components/ArticlesForTopic';

class App extends Component {
  state = {
    topics: []
  };

  componentDidMount = () => {
    api.getTopics().then(data => {
      console.log(data.topics);
      this.setState({
        topics: data.topics
      });
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar topics={this.state.topics} />
        <Router>
          <Articles path="/" />
          <ArticlesForTopic path="/:topic/articles" />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }
}

export default App;
