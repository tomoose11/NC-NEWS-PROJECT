import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router, Link } from '@reach/router';
import Articles from './components/Articles';
import * as api from './api/api';

import SingleArticle from './components/SingleArticle';
import Auth from './components/Auth';
import PostArticle from './components/PostAnArticle';

class App extends Component {
  state = {
    topics: [],
    users: [],
    user: '',
    topic: 'Articles'
  };

  componentDidMount = () => {
    api.getTopics().then(data => {
      console.log(data.topics);
      this.setState({
        topics: data.topics
      });
    });
    this.handleUsers();
  };

  render() {
    return (
      <div className="App">
        <Auth findUser={this.findUser} user={this.state.user}>
          <Header handleTopic={this.handleTopic} />
          <Navbar
            handleTopic={this.handleTopic}
            topics={this.state.topics}
            topic={this.state.topic}
          />
          <Router>
            <Articles path="/" />
            <Articles path="/:topic/articles" />
            <Articles path="/:update" />
            <SingleArticle path="/articles/:article_id" />
          </Router>
          <Sidebar />

          <Footer />
        </Auth>
      </div>
    );
  }

  handleTopic = topic => {
    this.setState({ topic: topic }, () => {
      console.log(this.state.topic);
    });
  };

  handleUsers = () => {
    api.getUsers().then(data => {
      console.log(data);
      this.setState({ users: data.users });
    });
  };

  findUser = user => {
    console.log(this.state.users);
    this.state.users.forEach((userData, index) => {
      if (userData.username === user) {
        this.setState({
          user: user
        });
        return console.log('logged in');
      }
    });
  };
}

export default App;
