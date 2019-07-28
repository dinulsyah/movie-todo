import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import TvPage from './TvPage';
import { NavigationEvents } from 'react-navigation'
import AwesomeAlert from 'react-native-awesome-alerts';

const GET_ALL_SERIES = gql`{
    allTvSeries{
        _id
        title
        popularity
        overview
        poster_path
        tag
        status
        createdAt
      }
}`

export default class HomeTv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
        };
    };

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


    render() {
        const { showAlert } = this.state;
        return (
                <View>
                    <Query query={GET_ALL_SERIES}>
                        {
                            ({ loading, error, data, refetch }) => {
                                return (
                                    <View>
                                        <NavigationEvents
                                            onWillFocus={() => {
                                                refetch()
                                                const alert = this.props.navigation.getParam('type');
                                                if (alert === 'mutate') {
                                                    console.log('masukkk')
                                                    this.showAlert()
                                                    this.props.navigation.setParams({
                                                        type:null
                                                    })
                                                }
                                            }}
                                        />
                                        {loading && <ActivityIndicator style={styles.container} size="large" color="#e5e5e5" />}
                                        {!loading && data && <TvPage data={data} navigation={this.props.navigation}></TvPage>}
                                        {!loading && error && <Text>Failed to Get Data...</Text>}
                                    </View>
                                )
                            }
                        }
                    </Query>
                    <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Sucessfully Updating Data"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    confirmText="Okay"
                    confirmButtonColor="#0facf3"
                    showConfirmButton={true}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    },
})
