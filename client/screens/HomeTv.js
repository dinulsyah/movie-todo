import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import TvPage from './TvPage';

const GET_ALL_SERIES = gql`{
    allTvSeries{
        _id
        title
        popularity,
        overview,
        poster_path,
        tag,
        status,
        createdAt
      }
}`

export default class HomeTv extends Component {
    render() {
        return (
            <ScrollView>
            <View>
                <Query
                query={GET_ALL_SERIES}
                >
                {
                    ({loading,error,data}) => {
                        return(
                            <View>
                            { loading && <ActivityIndicator style={styles.container} size="large" color="#e5e5e5"/>}
                            { !loading && data && <TvPage data={JSON.stringify(data)} navigation={this.props.navigation}></TvPage>}
                            {!loading && error && <Text>Failed to Get Data...</Text>}
                            </View>
                        )
                    }
                }
                </Query>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop:50
    },
})
