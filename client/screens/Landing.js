import React, {Fragment} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, SafeAreaView} from 'react-native';
import {Video} from 'expo-av';

const { height } = Dimensions.get("window");

export default function Home(props) {
    return (
        <Fragment>
            <Video source={require("../assets/video1.mp4")}  rate={1.0}
            volume={0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.backgroundVideo}/>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Entertainme.
                </Text>
                <Image 
                    source={{uri:"https://broadcastmedia.tv/wp-content/uploads/2018/03/vimeo-icon.png"}}
                    style={{height:100,width:100}}
                />
                <TouchableHighlight
                    style={styles.button} onPress={() => props.go()}>
                    <Text style={{color:'white',  fontFamily:'Futura-Medium', fontSize:12}}> Check Out </Text>
                </TouchableHighlight>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },   
    title:{
        fontSize:35,
        fontFamily:'AlNile-Bold',
        color:"white",
        margin:20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0facf3',
        padding: 15,
        margin:20,
        borderRadius:13
    },
    backgroundVideo:{
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
})