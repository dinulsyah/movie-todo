import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, WebView, Platform } from 'react-native';
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Card, Button, Icon, Badge, PricingCard, Rating } from 'react-native-elements';
import axios from 'axios';
import DateTimePicker from "react-native-modal-datetime-picker";

const REFETCH_QUERY = gql`{
    allTvSeries{
        title
        popularity,
        overview,
        poster_path,
        status,
        createdAt
    }
  }`

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeId: '',
            isDateTimePickerVisible: false,
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:3000/youtube', {
                headers: {
                    annotate: this.props.data.findOneTvSeries.title + 'trailer'
                }
            })
            .then(({ data }) => {
                this.setState({
                    youtubeId: data.items[0].id.videoId
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleDatePicked = date => {
        axios
            .post('http://34.87.41.89:3001/addFavorite',{
                title:this.props.data.findOneTvSeries.title,
                planDate:date,
                poster_path:this.props.data.findOneTvSeries.poster_path
            })
            .then(({data}) => {
                console.log(data)
                this.hideDateTimePicker();
            })
            .catch((err) => {
                this.hideDateTimePicker();
            })
      };

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
     
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    render() {
        const { showAlert } = this.state;
        
        if (this.props.data) {
            var data = this.props.data.findOneTvSeries
        }
        return (
            <ScrollView>
                <View style={style.container}>
                    {
                        <React.Fragment>
                            <Image source={{ uri: data.poster_path }} style={{ height: 400, width: "100%" }} />
                        </React.Fragment>
                    }
                </View>
                <View style={style.containerDesc}>
                    <Text style={style.title}>{data.title}</Text>
                    <View style={style.descriptionInfo}>
                        <Text style={style.description}>{data.overview}</Text>
                        <Text style={{ alignSelf: 'center', color: 'white' }}>Popularity</Text>
                        <Rating
                            imageSize={30}
                            readonly
                            startingValue={data.popularity}
                        />
                        <View style={{ height: 300 }}>
                            <WebView
                                style={style.WebViewContainer}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: `https://www.youtube.com/embed/${this.state.youtubeId}` }}
                            />
                        </View>
                    </View>

                </View>
                <View style={style.containerDesc2}>

                    <Mutation mutation={gql`mutation{
                         deleteTvSeries(_id: "${this.props.item}"){
                            _id
                            title
                            overview
                            poster_path
                            popularity
                            status
                            createdAt
                            updatedAt
                        }
                    }`}>
                        {(deleteTvSeries, { data }) => (
                            <Button
                                icon={<Icon name="delete" color='#ffffff' />}
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10, backgroundColor: "#eb4335" }}
                                title='DELETE NOW'
                                onPress={() => {
                                    deleteTvSeries({
                                        // refetchQueries: [{
                                        //     query: REFETCH_QUERY,
                                        //     variables:{
                                        //         awaitRefetchQueries: true
                                        //     }
                                        // }]
                                    })
                                    this.props.navigation.navigate('HomeTv', {
                                        type: 'mutate'
                                    })
                                }} />
                        )}
                    </Mutation>
                    <Button icon={<Icon name="movie" color='#ffffff' />} title="TvSeries to Watch" onPress={this.showDateTimePicker} style={{top:20}}/>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </View>
            </ScrollView>
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
    containerDesc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0facf3",
        paddingTop: 20,
        paddingBottom: 40
    },
    containerDesc2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#393D3F",
        paddingTop: 20,
        paddingBottom: 40
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'Futura-Medium'
    },
    description: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Futura',
        textAlign: "justify",
        padding: 20
    },
    descriptionInfo: {
        paddingTop: 20,
        justifyContent: "flex-start",
        fontFamily: 'Futura',
    },
    WebViewContainer: {
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
    }
})