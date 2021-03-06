import React, { Component, Fragment } from 'react'
import { Text, View, StyleSheet, Image , ScrollView} from 'react-native'
import CardItem from '../components/CardItem'
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
        if (this.state.data.allTvSeries) {
            var filteredItem = this.state.data.allTvSeries.filter(
                (item) => {
                    const TvSeries = item.title.toLowerCase()
                    return TvSeries.indexOf(this.state.text.toLowerCase()) !== -1;
                }
            );
        }
        return (
            <ScrollView>
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
                                    return <CardItem item={element} navigation={this.props.navigation} key={index} index={index}></CardItem>
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
    bodyContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
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
        fontFamily: 'AlNile-Bold',
        fontSize: 30
    }
})
