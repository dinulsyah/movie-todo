import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, SafeAreaView, ActivityIndicator} from 'react-native';
import { FormLabel, Input, FormValidationMessage, ButtonGroup } from 'react-native-elements'
import { gql } from "apollo-boost";
import { Mutation , Query} from "react-apollo";
import Update from '../components/Update'

const ADD_MOVIE = gql`
mutation($title: String, $popularity: Float, $poster_path: String, $overview:String, $status:String){
    createMovie(title:$title,popularity:$popularity, poster_path:$poster_path
    overview:$overview,
    status:$status
    ){
      title
      popularity
      poster_path
      overview
      status
    }
}`

const ADD_SERIES = gql`
mutation($title: String, $popularity: Float, $poster_path: String, $overview:String, $status:String){
    createTvSeries(title:$title,popularity:$popularity, poster_path:$poster_path,overview:$overview,status:$status)
    {
    title
    popularity
    poster_path
    overview
    status
    }
}`

const REFETCH_MOVIE = gql` {
    allMovie{
      _id
      title
      overview
      popularity
      poster_path
      status
    }
  }`


const REFETCH_SERIES = gql`{
    allTvSeries{
      _id
      title
      overview
      popularity
      poster_path
      status
    }
  }`

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
            tag: '',
            selectedIndex: 1
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.clear = this.clear.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    clear() {
        console.log('masuk')
        this.setState({
            title: '',
            overview: '',
            poster_path: '',
            popularity: '',
            status: '',
            tag: '',
            selectedIndex: 1
        })
    }

    render() {
        const buttons = ['Movie', 'TvSeries']
        const { selectedIndex } = this.state
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        if(this.props.navigation.getParam('query') === 'tv'){    
            var graphQuery = GET_ONE_SERIES
            var condition = "tv"
        }
        else{
            var graphQuery = GET_ONE_MOVIE
            var condition = "movie"
        }
        return (
            (!itemId) ?
            <Fragment>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 50, marginTop:30}}
                />
                {
                    (this.state.selectedIndex === 1)
                        ? <Mutation mutation={ADD_SERIES}>
                            {
                                (addSeries, { data }) => {
                                    return (
                                        <Fragment>
                                            <View style={style.container}>
                                                <Text style={style.title}>Create New Movie or Tv Series</Text>
                                                <Input label={'Title'} onChangeText={(title) => this.setState({ title })}/>
                                                <Input multiline={true} numberOfLines={4} label={'Overview'} onChangeText={(overview) => this.setState({ overview })} />
                                                <Input label={'Poster_Path'} onChangeText={this.oke} onChangeText={(poster_path) => this.setState({ poster_path })} />
                                                <Input label={'Popularity'} onChangeText={this.oke} onChangeText={(popularity) => this.setState({ popularity })} />
                                                <Input label={'Status'} onChangeText={this.oke} onChangeText={(status) => this.setState({ status })} />
                                            </View>
                                            <TouchableHighlight
                                                style={style.button} onPress={() => {
                                                    addSeries({
                                                        variables: {
                                                            title: this.state.title,
                                                            overview: this.state.overview,
                                                            poster_path: this.state.poster_path,
                                                            popularity: Number(this.state.popularity),
                                                            status: this.state.status
                                                        },
                                                        refetchQueries: [{
                                                            query: REFETCH_SERIES
                                                        }]
                                                    })
                                                    this.props.navigation.navigate('HomeTv')
                                                }}>
                                                <Text style={{ color: 'white', fontFamily: 'Futura-Medium', fontSize: 15 }}> Create </Text>
                                            </TouchableHighlight>
                                        </Fragment>)
                                }
                            }
                        </Mutation>
                        : <Mutation mutation={ADD_MOVIE}>
                            {
                                (addMovie, { data }) => {
                                    return (
                                        <Fragment>
                                            <View style={style.container}>
                                                <Text style={style.title}>Create New Movie or Tv Series</Text>
                                                <Input label={'Title'} onChangeText={(title) => this.setState({ title })} value={this.state.title}/>
                                                <Input multiline={true} numberOfLines={4} label={'Overview'} onChangeText={(overview) => this.setState({ overview })} />
                                                <Input label={'Poster_Path'} onChangeText={this.oke} onChangeText={(poster_path) => this.setState({ poster_path })} />
                                                <Input label={'Popularity'} onChangeText={this.oke} onChangeText={(popularity) => this.setState({ popularity })} />
                                                <Input label={'Status'} onChangeText={this.oke} onChangeText={(status) => this.setState({ status })} />
                                            </View>
                                            <TouchableHighlight
                                                style={style.button} onPress={() => {
                                                    addMovie({
                                                        variables: {
                                                            title: this.state.title,
                                                            overview: this.state.overview,
                                                            poster_path: this.state.poster_path,
                                                            popularity: Number(this.state.popularity),
                                                            status: this.state.status,
                                                        },
                                                        refetchQueries: [{
                                                            query: REFETCH_MOVIE
                                                        }]
                                                    })
                                                    this.props.navigation.navigate('HomeMovie')
                                                }}>
                                                <Text style={{ color: 'white', fontFamily: 'Futura-Medium', fontSize: 15 }}> Create </Text>
                                            </TouchableHighlight>
                                        </Fragment>
                                    )
                                }
                            }
                        </Mutation>
                }
            </Fragment>
            : <Query
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
