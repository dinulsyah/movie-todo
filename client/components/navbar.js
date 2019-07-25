import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import HomeMovie from '../screens/HomeMovie';
import HomeTv from '../screens/HomeTv';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import TvDetail from '../screens/DetailSeries';
import createPage from '../screens/createPage';
import MovieDetail from '../screens/DetailMovie';
import EditPage from '../screens/EditPage'

const movieNavigator = createStackNavigator({
  HomeMovie:{
    screen:HomeMovie
  },
  MovieDetail:{
    screen:MovieDetail
  }
}, {
  initialRouteName:'HomeMovie'
})


const tvNavigator = createStackNavigator({
  HomeTv:{
    screen:HomeTv
  },
  TvDetail:{
    screen:TvDetail
  }
},{
  initialRouteName:'HomeTv'
})

const createNavigator = createStackNavigator({
  Create:{
    screen:createPage
  },
  Edit:{
    screen:EditPage
  }
},{
  initialRouteName:'Create'
})

const mainNavigator = createBottomTabNavigator({
  Movie: {
    screen: movieNavigator,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <Icon
              name="ios-easel"
              color={tintColor}
              size={24}
          />
      )
    })
  },
  TvSeries:{
    screen:tvNavigator,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <Icon
              name="ios-tv"
              color={tintColor}
              size={24}
          />
      )
    })
  },
  Create:{
      screen:createNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="ios-create"
                color={tintColor}
                size={24}
            />
        )
      })
  }
},{
  tabBarOptions: {
    activeTintColor: '#0facf3',
    inactiveTintColor: '#303c42',
  },
})
export default createAppContainer(mainNavigator);