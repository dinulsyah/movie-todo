import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, SafeAreaView, ActivityIndicator} from 'react-native';
import { FormLabel, Input, FormValidationMessage, ButtonGroup } from 'react-native-elements'
import { gql } from "apollo-boost";
import { Mutation , Query} from "react-apollo";

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

const REFETCH_MOVIE = gql`{
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

class createPage extends Component {
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
        console.log(selectedIndex)
        this.setState({ selectedIndex })
    }

    clear() {
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
        return (
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
                                                <Text style={style.title}>Create New Tv Series</Text>
                                                <Input label={'Title'} onChangeText={(title) => this.setState({ title })} ref={(input) => {
                                                    this.textInput = input
                                                }}/>
                                                <Input multiline={true} numberOfLines={4} label={'Overview'} onChangeText={(overview) => this.setState({ overview })} ref={(input) => {
                                                    this.textOverview = input
                                                }}/>
                                                <Input label={'Poster_Path'} onChangeText={this.oke} onChangeText={(poster_path) => this.setState({ poster_path })} ref={(input) => {
                                                    this.textPoster = input
                                                }}/>
                                                <Input label={'Popularity'} onChangeText={this.oke} onChangeText={(popularity) => this.setState({ popularity })} ref={(input) => {
                                                    this.textPopularity = input
                                                }}/>
                                                <Input label={'Status'} onChangeText={this.oke} onChangeText={(status) => this.setState({ status })} ref={(input) => {
                                                    this.textStatus = input
                                                }}/>
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
                                                    this.textInput.clear()
                                                    this.textOverview.clear()
                                                    this.textPopularity.clear()
                                                    this.textPoster.clear()
                                                    this.textStatus.clear()
                                                    this.clear()
                                                    this.props.navigation.navigate('HomeTv',{
                                                        type:'mutate'
                                                    })
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
                                                <Text style={style.title}>Create New Movie</Text>
                                                <Input label={'Title'} onChangeText={(title) => this.setState({ title })} value={this.state.title} ref={(input) => {
                                                    this.textInputM = input
                                                }}/>
                                                <Input multiline={true} numberOfLines={4} label={'Overview'} onChangeText={(overview) => this.setState({ overview })} ref={(input) => {
                                                    this.textOverviewM = input
                                                }}/>
                                                <Input label={'Poster_Path'} onChangeText={this.oke} onChangeText={(poster_path) => this.setState({ poster_path })} ref={(input) => {
                                                    this.textPosterM = input
                                                }}/>
                                                <Input label={'Popularity'} onChangeText={this.oke} onChangeText={(popularity) => this.setState({ popularity })} ref={(input) => {
                                                    this.textPopularityM = input
                                                }}/>
                                                <Input label={'Status'} onChangeText={this.oke} onChangeText={(status) => this.setState({ status })} ref={(input) => {
                                                    this.textStatusM = input
                                                }}/>
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
                                                        refetchQueries:[{
                                                            query:REFETCH_MOVIE,
                                                        }]
                                                    })
                                                    this.textInputM.clear()
                                                    this.textOverviewM.clear()
                                                    this.textPopularityM.clear()
                                                    this.textPosterM.clear()
                                                    this.textStatusM.clear()
                                                    this.clear()
                                                    this.props.navigation.navigate('HomeMovie',{
                                                        type:'mutate'
                                                    })
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
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
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
export default createPage