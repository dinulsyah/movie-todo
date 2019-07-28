import React, { Component } from 'react'
import { Text, SafeAreaView, StyleSheet, View, TouchableHighlight, TextInput, Picker, Fragment } from 'react-native'
import { FormLabel, Input, FormValidationMessage, ButtonGroup, Button } from 'react-native-elements'
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

const UPDATE_ONE_TV = gql`mutation($id: ID!,$title: String, $popularity: Float, $poster_path: String, $overview:String, $status:String){
    updateTvSeries(_id:$id,title:$title,popularity:$popularity, poster_path:$poster_path,overview:$overview,status:$status)
    {
        title
        popularity
        poster_path
        overview
        status
    }
}`

const UPDATE_ONE_MOVIE = gql`mutation($id: ID!,$title: String, $popularity: Float, $poster_path: String, $overview:String, $status:String){
    updateMovie(_id:$id,title:$title,popularity:$popularity, poster_path:$poster_path,overview:$overview,status:$status)
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

export default class Update extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            title: '',
            overview: '',
            poster_path: '',
            popularity: 0,
            status: '',
            type: '',
            showAlert: false
        }
        this.clear = this.clear.bind(this)
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    componentDidMount() {
        this.setState({
            id: this.props.data._id,
            title: this.props.data.title,
            overview: this.props.data.overview,
            poster_path: this.props.data.poster_path,
            popularity: this.props.data.popularity,
            status: this.props.data.status,
        })
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
        const { showAlert } = this.state;
        var query
        var refetch
        if (this.props.type == 'tv') {
            query = UPDATE_ONE_TV
            refetch = REFETCH_SERIES
        }
        else {
            query = UPDATE_ONE_MOVIE
            refetch = REFETCH_MOVIE
        }

        return (
            <View>
                <View style={style.container}>
                        <Text style={style.title}>Update</Text>
                        <Input label={'Title'} onChangeText={(title) => this.setState({ title })} ref={(input) => {
                            this.textInput = input
                        }} value={this.state.title}/>
                        <Input multiline={true} numberOfLines={4} label={'Overview'} onChangeText={(overview) => this.setState({ overview })} ref={(input) => {
                            this.textOverview = input
                        }} value={this.state.overview}/>
                        <Input label={'Poster_Path'} onChangeText={this.oke} onChangeText={(poster_path) => this.setState({ poster_path })} ref={(input) => {
                            this.textPoster = input
                        }} value={this.state.poster_path}/>
                        <Input label={'Popularity'} onChangeText={this.oke} onChangeText={(popularity) => this.setState({ popularity })} ref={(input) => {
                            this.textPopularity = input
                        }} value={String(this.state.popularity)}/>
                        <Input label={'Status'} onChangeText={this.oke} onChangeText={(status) => this.setState({ status })} ref={(input) => {
                            this.textStatus = input
                        }} value={this.state.status}/>
            </View>
            <Mutation mutation={query} >
                {
                    (updateMovie, { data }) => {
                        return (
                            <Button
                                buttonStyle={style.button}
                                title='UPDATE NOW'
                                onPress={() => {
                                    updateMovie({
                                        variables: {
                                            id: this.state.id,
                                            title: this.state.title,
                                            overview: this.state.overview,
                                            poster_path: this.state.poster_path,
                                            popularity: Number(this.state.popularity),
                                            status: this.state.status,
                                        },
                                        refetchQueries: [{
                                            query: refetch
                                        }]
                                    })
                                    this.textInput.clear()
                                    this.textOverview.clear()
                                    this.textPopularity.clear()
                                    this.textPoster.clear()
                                    this.textStatus.clear()
                                    this.clear()
                                    if (this.props.type == 'tv') {
                                        this.props.navigation.navigate('HomeTv',{
                                            type:'mutate'
                                        })
                                    }
                                    else {
                                        this.props.navigation.navigate('HomeMovie',{
                                            type:'mutate'
                                        })
                                    }
                                }} />
                        )
                    }
                }
            </Mutation>
            </View>
            )
    }
}

const style = StyleSheet.create({
    container: {
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