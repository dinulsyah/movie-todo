import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, Button, Icon, Badge} from 'react-native-elements'
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';


const REFETCH_QUERY = gql`
{
  allMovie{
      title
      popularity,
      overview,
      poster_path,
      status,
      createdAt
  }
}
`

export default class Detail extends Component {
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.data) {
            const parse = JSON.parse(this.props.data)
            var data = parse.findOneMovie
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
                        <Mutation mutation={gql`mutation{
                         deleteMovie(_id: "${this.props.item}"){
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
                        {(deleteMovie, { data }) => (
                             <Button
                             icon={<Icon name="delete" color='#ffffff' />}
                             buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10, backgroundColor: "#eb4335" }}
                             title='DELETE NOW'
                             onPress={() => {
                                deleteMovie({
                                    refetchQueries: [{
                                        query: REFETCH_QUERY,
                                        variables:{
                                            awaitRefetchQueries: true
                                        }
                                    }]
                                })
                                this.props.navigation.navigate('HomeMovie')
                            }}/>
                        )}
                    </Mutation>
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