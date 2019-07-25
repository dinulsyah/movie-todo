import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import DetailPage from './DetailPageMovie';

const GET_ONE_SERIES = gql`
query($id: ID!){
    findOneMovie(_id:$id)
        {
            title
            popularity,
            overview,
            poster_path,
            tag,
            status,
            createdAt
        }
}`

export default class Detail extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        return (
            <ScrollView>
                <Query
                    query={GET_ONE_SERIES}
                    variables={{
                        id: itemId
                    }}
                >
                {
                    ({loading,error,data}) => {
                        return(
                            <View>
                            { loading && <ActivityIndicator style={style.container} size="large" color="#e5e5e5"/>}
                            { !loading && data &&  <DetailPage data={JSON.stringify(data)} navigation={this.props.navigation}></DetailPage>
                            }
                            {!loading && error && <Text>Failed to Get Data...</Text>}
                            </View>
                        )
                    }
                }
                </Query>
            </ScrollView>
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
})