import React, { Component } from 'react'
import { Text, SafeAreaView , StyleSheet, View, TouchableHighlight, TextInput, Picker, Fragment} from 'react-native'
import { FormLabel, Input, FormValidationMessage, ButtonGroup,Button} from 'react-native-elements'
import { Mutation , Query} from "react-apollo";
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

const UPDATE_ONE_MOVIE = gql`
    mutation($id: ID!,$title: String, $popularity: Float, $poster_path: String, $overview:String, $status:String){
    updateMovie(_id:$id,title:$title,popularity:$popularity, poster_path:$poster_path,overview:$overview,status:$status)
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

export default class Update extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:null,
            title: '',
            overview: '',
            poster_path: '',
            popularity: 0,
            status: '',
            type:''
        }
    }

    componentDidMount(){
        this.setState({
            id:this.props.data._id,
            title: this.props.data.title,
            overview:this.props.data.overview,
            poster_path:this.props.data.poster_path,
            popularity: this.props.data.popularity,
            status: this.props.data.status,
        })
    }

    render() {
        var query
        var refetch
        if(this.props.type == 'tv'){
            query = UPDATE_ONE_TV
            refetch = REFETCH_SERIES
        }
        else{
            query = UPDATE_ONE_MOVIE
            refetch = REFETCH_MOVIE
        }
        return (
        <View style={{flex: 1, borderWidth: 1, borderColor: 'black', alignItems: 'center', marginTop:30}}>
            <Text style={{fontSize:20}}>Update</Text>
            <TextInput 
                style={styles.form}
                onChangeText={(text) => this.setState({ title: text})}
                value={this.state.title}
                width={300}
                height={50}
          />
          <Text>Image : </Text>
          <TextInput
            style={styles.form}
            onChangeText={(text) => this.setState({ poster_path: text })}
            value={this.state.poster_path}
            width={300}
            height={50}
          />
          <Text>popularity : </Text>
          <TextInput
            style={styles.form}
            onChangeText={(text) => this.setState({ popularity: Number(text) })}
            value={String(this.state.popularity)}
            width={300}
            height={50}
          />
          <Text>overview : </Text>
          <TextInput
            style={styles.form}
            onChangeText={(text) => this.setState({ overview: text })}
            value={this.state.overview}
            width={300}
            height={50}
          />
          <Text>Status : </Text>
          <TextInput
            style={styles.form}
            onChangeText={(text) => this.setState({ status: text })}
            value={this.state.status}
            width={300}
            height={50}
          />
          <Mutation mutation={query}>
          {
                (updateMovie, { data }) => {
                        return (
                            <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10, backgroundColor: "#0facf3" , height:50}}
                            title='UPDATE NOW'
                            onPress={() => {
                                updateMovie({
                                    variables: {
                                        id:this.state.id,
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
                                if(this.props.type  == 'tv'){
                                    this.props.navigation.navigate('HomeTv')
                                }
                                else{
                                    this.props.navigation.navigate('HomeMovie')
                                }
                            }}/>
                        )
                    }
                }
          </Mutation>
      </View>)
    }
}

const styles = StyleSheet.create({
    container : {
      marginTop: 20
    },  
    form : {
      height: 40,
      borderWidth: 1,
      borderColor: 'grey'
    }
  })

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