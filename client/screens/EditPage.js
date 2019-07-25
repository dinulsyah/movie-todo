import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, SafeAreaView, ActivityIndicator} from 'react-native';
import { gql } from "apollo-boost";
import { Query} from "react-apollo";
import Update from '../components/Update';

const GET_ONE_MOVIE = gql`
  query($id: ID!){
      findOneMovie(_id:$id)
          {
              _id
              title
              popularity,
              overview,
              poster_path,
              tag,
              status,
              createdAt
          }
}`

const GET_ONE_SERIES = gql`
query TvSeries($id: ID!) {
    findOneTvSeries(_id:$id)
        {
            _id
            title
            popularity,
            overview,
            poster_path,
            tag,
            status,
            createdAt
        }
}`

export default class createPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            overview: '',
            poster_path: '',
            popularity: '',
            status: '',
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.clear = this.clear.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }
    
    clear() {
        this.setState({
            title: '',
            overview: '',
            poster_path: '',
            popularity: '',
            status: '',
        })
    }

    render() {
        const itemId = this.props.navigation.getParam('itemId')
        if(this.props.navigation.getParam('query') === 'tv'){    
            var graphQuery = GET_ONE_SERIES
            var condition = "tv"
        }
        else{
            var graphQuery = GET_ONE_MOVIE
            var condition = "movie"
        }
        return (
            <Query
                    query={graphQuery}
                    variables={{
                        id: itemId
                    }}
                >
                {
                    ({loading,error,data}) => {
                        return(
                            <View>
                            { loading && <ActivityIndicator style={style.container} size="large" color="#e5e5e5"/>}
                            { !loading && data && <View>{
                                (condition === 'movie')
                                ?
                                <Update data={data.findOneMovie} type={'movie'} navigation={this.props.navigation}></Update>
                                :
                                <Update data={data.findOneTvSeries} type={'tv'} navigation={this.props.navigation}></Update>
                                }
                                </View>
                            }
                            {!loading && error && <Text>Failed to Get Data...</Text>}
                            </View>
                        )
                    }
                }
                </Query>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    title: {
        fontSize: 24,
        color: '#303c42',
        fontFamily: 'Futura-Medium',
        paddingBottom: 30
    },
    input: {
        paddingVertical: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0facf3',
        padding: 15,
        margin: 20,
        borderRadius: 13
    },
})
