import React, {Component,Fragment} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/navbar';
import Home from './screens/Landing';
import {ApolloProvider} from 'react-apollo';
import client from './api/api'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      landing:true
    }
    this.changeState = this.changeState.bind(this)
  }

  changeState(){
    this.setState({
      landing:false
    })
  }

  render() {
    return (
      <ApolloProvider client={client}>
          {
            (this.state.landing) 
            ? <Home go={this.changeState}/>
            : <Navbar/> 
          }
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});