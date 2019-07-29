import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Fragment } from 'react-native';
import CardItemMovie from '../components/Cardwish'
import { SearchBar, Avatar, Header } from 'react-native-elements';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation'

export default class wishList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            data: []
        }
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData(){
        console.log('masuk reload')
        axios
        .get(`http://localhost:3001/favorite`)
        .then(({ data }) => {
            this.setState({
                data:data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        if (this.state.data) {
            var filteredItem = this.state.data.filter(
                (item) => {
                    const Movies = item.title.toLowerCase()
                    return Movies.indexOf(this.state.text.toLowerCase()) !== -1;
                }
            );
        }
        return (
            <ScrollView>
                <NavigationEvents
                    onWillFocus={() => {
                        this.getData()
                    }}
                />
                <View style={styles.headContainer}>
                    <Text style={styles.title}>
                        EnterTainme.
                    </Text>
                    <Avatar
                        rounded
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                        }}
                    />
                </View>
                <SearchBar
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholder={'search here..'}
                    lightTheme={true} />
                <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                    <View>
                        <View style={styles.bodyContainer}>
                            {
                                filteredItem && filteredItem.map((element, index) => {
                                    return <CardItemMovie item={element} navigation={this.props.navigation} key={index} index={index} method={this.getData}></CardItemMovie>
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headContainer: {
        minHeight: 80,
        backgroundColor: "#0facf3",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    bodyCard: {
        width: "50%",
        height: 250,
        backgroundColor: '#f1e9da',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
    },
    title: {
        color: 'white',
        fontFamily: 'Futura',
        fontSize: 30
    }
})