import React, { Component, Fragment } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import CardItemMovie from '../components/CardItemMovie'
import { SearchBar, Avatar, Header} from 'react-native-elements';

export default class TvPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            data:[]
        }
    }

    componentDidMount(){
        this.setState({
            data:this.props.data
        })
    }

    componentDidUpdate(prevProps){
        if (prevProps.data !== this.props.data) {
            this.setState({
                data:this.props.data
            })
          }
    }

    render() {
        if (this.state.data.allMovie) {
            var filteredItem = this.state.data.allMovie.filter(
                (item) => {
                    const Movies = item.title.toLowerCase()
                    return Movies.indexOf(this.state.text.toLowerCase()) !== -1;
                }
            );
        }
        return (
            <ScrollView>
            <Fragment>
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
                                    return <CardItemMovie item={element} navigation={this.props.navigation} key={index} index={index}></CardItemMovie>
                                })
                            }
                        </View>
                    </View>
                </View>
            </Fragment>
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
