import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import MoviePage from './MoviePage'
import { NavigationEvents } from 'react-navigation'

const GET_ALL_MOVIES = gql`{
    allMovie {
        _id
        title
        popularity
        overview
        poster_path
        tag
        status
        createdAt
    }
}`

export default class HomeMovie extends Component {
    render() {
        return (
            <View>
                <Query
                query={GET_ALL_MOVIES}>
                {
                    ({loading,error,data,refetch}) => {
                        return(
                            <View>
                            <NavigationEvents
                                onWillFocus={() => {
                                    // console.log('tertriggerrrr refetch')
                                    // console.log(data)
                                    refetch()
                                }}
                            /> 
                            {loading && <Text>Loading</Text>}
                            {!loading && data && <MoviePage data={data} navigation={this.props.navigation}></MoviePage>}
                            {!loading && error && <Text>{JSON.stringify(error)}</Text>}
                            </View>
                        )
                    }
                }
                </Query>
            </View>
        )
    }
}
