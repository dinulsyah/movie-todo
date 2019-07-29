import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import MoviePage from './MoviePage'
import { NavigationEvents } from 'react-navigation'
import AwesomeAlert from 'react-native-awesome-alerts';

const GET_ALL_MOVIES = gql`{
    allMovie {
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

export default class HomeMovie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showAlert: false ,
            showUpdate: false
        };
    };

    showUpdate = () => {
        this.setState({
            showUpdate: true
        });
    };

    hideUpdate = () => {
        this.setState({
            showUpdate: false
        });
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

    componentDidMount(){
        this.showAlert()
    }

    render() {
        const { showAlert } = this.state;
        const { showUpdate } = this.state;
        return (
            <View>
                <Query
                    query={GET_ALL_MOVIES}>
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
                                                this.showUpdate()
                                                this.props.navigation.setParams({
                                                    type:null
                                                })
                                            }
                                        }}
                                    />
                                    {loading && <ActivityIndicator style={styles.container} size="large" color="#e5e5e5" />}
                                    {!loading && data && <MoviePage data={data} navigation={this.props.navigation}></MoviePage>}
                                    {!loading && error && <Text>{JSON.stringify(error)}</Text>}
                                </View>
                            )
                        }
                    }
                </Query>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Welcome Back to Entertainme"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    confirmText="Okay"
                    confirmButtonColor="#0facf3"
                    showConfirmButton={true}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />
                 <AwesomeAlert
                    show={showUpdate}
                    showProgress={false}
                    title="Sucessfully Updating Data"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    confirmText="Okay"
                    confirmButtonColor="#0facf3"
                    showConfirmButton={true}
                    onConfirmPressed={() => {
                        this.hideUpdate();
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