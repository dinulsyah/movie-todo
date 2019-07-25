import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

export default function Home(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Entertainme.
            </Text>
            <Image 
                source={{uri:"https://cdn0.iconfinder.com/data/icons/geek-4/24/Star-Trek_logo_geek_movie-512.png"}}
                style={{height:200,width:200,}}
            />
            <TouchableHighlight
                style={styles.button} onPress={() => props.go()}>
                <Text style={{color:'white',  fontFamily:'Futura-Medium', fontSize:15}}> Check Out </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#e5e5e5"
    },   
    title:{
        fontSize:40,
        fontFamily:'Futura-Medium',
        color:"#303c42",
        margin:20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0facf3',
        padding: 15,
        margin:20,
        borderRadius:13
    },
})