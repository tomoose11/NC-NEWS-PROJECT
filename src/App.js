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
import Page404 from './components/page404';

class App extends Component {
  state = {
    topics: [],
    users: [],
    user: '',
    user_id: 0,
    topic: 'Articles'
  };

  componentDidMount = () => {
    // // Get saved data from sessionStorage
    var data = sessionStorage.getItem('user');
    if (data) {
      this.setState({
        user: data
      });
    }

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
            user_id={this.state.user_id}
          />
          <Router>
            <Articles user={this.state.user} path="/" />
            <Articles user={this.state.user} path="/:topic/articles" />
            <Articles user={this.state.user} path="/:update" />
            <SingleArticle
              user_id={this.state.user_id}
              user={this.state.user}
              path="/articles/:article_id"
            />
            <Page404 path="/err" default />
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
        this.setState(
          {
            user: user,
            user_id: userData.user_id
          },
          () => {
            console.log(this.state.user_id);
          }
        );
        sessionStorage.setItem('user', user);
        return console.log('logged in');
      }
    });
  };
}

export default App;
