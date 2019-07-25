import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default class Detail extends Component {
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.data) {
            const parse = JSON.parse(this.props.data)
            var data = parse.findOneTvSeries
        }
        return (
            <ScrollView>
                <View style={style.container}>  
                    {
                        <React.Fragment>
                        <Image source={{ uri: data.poster_path}} style={{ height: 400, width: "100%"}}/>
                        </React.Fragment>
                    }
                </View>
                <View style={style.containerDesc}>
                    <Text style={style.title}>{data.title}</Text>
                        <View style={style.descriptionInfo}> 
                            <Text style={style.description}>{data.overview}</Text>
                    </View>
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
    title: {
        fontSize: 40,
        color: 'white',
        fontFamily:'Futura-Medium'
    },
    description: {
        fontSize: 15,
        color: 'white',
        fontFamily:'Futura',
        textAlign:"justify",
        padding:20
    },
    descriptionInfo: {
        paddingTop: 20,
        justifyContent:"flex-start",
        fontFamily:'Futura',
    },
})