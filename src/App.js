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
import SingleArticle from './components/SingleArticle';
import Auth from './components/Auth';

class App extends Component {
  state = {
    topics: [],
    users: [],
    user: ''
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
          <Header />
          <Navbar topics={this.state.topics} />
          <Router>
            <Articles path="/" />
            <Articles path="/:topic/articles" />
            <SingleArticle path="/articles/:article_id" />
          </Router>
          <Sidebar />

          <Footer />
        </Auth>
      </div>
    );
  }

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
