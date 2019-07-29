import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon, Badge } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';

const CardItem = (props) => {
    const date = moment(props.item.planDate.slice(0,10)).fromNow()
    return (
        <View>
            <Card
                containerStyle={{ padding: 0 }}
                title={props.item.title}
                image={{ uri: props.item.poster_path }}
                imageStyle={{ height: 320, width: 320 }}>
                <Text style={{fontSize:17,color:'#C24441',fontWeight:'bold',alignSelf:'center'}}>
                I am planning to watch {date}
                </Text>
                <Text style={{fontSize:17,color:'#C24441',fontWeight:'bold',alignSelf:'center'}}>
                {props.item.planDate.slice(0,10)}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button
                        icon={<Icon name="delete" color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10, backgroundColor: "#0facf3" }}
                        title='DELETE WISH'
                        onPress={ () => {
                            axios
                                .delete(`http://34.87.41.89:3001/deleteFavorite/${props.item._id}`)
                                .then(({data}) => {
                                    console.log(data)
                                    props.method()
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }}/>
                </View>
            </Card>
        </View>
    )
}

export default CardItem