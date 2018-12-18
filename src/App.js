import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Articles from './components/Articles';
import * as api from './api/api';
import SingleArticle from './components/SingleArticle';
import Auth from './components/Auth';
import Page404 from './components/page404';

class App extends Component {
  state = {
    topics: [],
    users: [],
    user: '',
    user_id: 0,
    topic: 'Articles',
    loggedIn: false
  };

  componentDidMount = () => {
    var data = sessionStorage.getItem('user');
    var data2 = sessionStorage.getItem('userid');
    if (data) {
      this.setState({
        user: data
      });
    }
    if (data2) {
      this.setState({
        user_id: data2
      });
    }

    api.getTopics().then(data => {
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
          <Header
            handleLogout={this.handleLogout}
            user={this.state.user}
            handleTopic={this.handleTopic}
          />
          <Navbar
            handleTopic={this.handleTopic}
            topics={this.state.topics}
            topic={this.state.topic}
            user_id={this.state.user_id}
            user={this.state.user}
          />
          <Router>
            <Articles user={this.state.user} path="/" />
            <Articles user={this.state.user} path="/:topic/articles" />
            <Articles
              user={this.state.user}
              path="articles/afterpost/:update"
            />
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
    this.setState({ topic: topic }, () => {});
  };

  handleUsers = () => {
    api.getUsers().then(data => {
      this.setState({ users: data.users });
    });
  };

  handleLogout = () => {
    this.setState({
      user: '',
      user_id: 0,
      loggedIn: false
    });
    sessionStorage.setItem('user', '');
  };

  findUser = user => {
    this.state.users.forEach((userData, index) => {
      if (userData.username === user) {
        this.setState({
          user: user,
          user_id: userData.user_id,
          loggedIn: true
        });
        sessionStorage.setItem('userid', userData.user_id);
        sessionStorage.setItem('user', user);
        return;
      }
    });
    if (this.state.users.length > 1) {
      setTimeout(() => {
        if (!this.state.loggedIn) {
          alert('this user does not exist');
        }
      });
    } else {
      alert('loading');
    }
  };
}

export default App;
