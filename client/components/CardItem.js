import React from 'react';
import { View } from 'react-native';
import { Card, Button, Icon, Badge } from 'react-native-elements'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const CardItem = (props) => {
    const REFETCH_QUERY = gql`
      {
        allTvSeries{
            title
            popularity,
            overview,
            poster_path,
            status,
            createdAt
        }
      }
    `
    return (
        <View>
            <Card
                containerStyle={{ padding: 0 }}
                title={props.item.title}
                image={{ uri: props.item.poster_path }}
                imageStyle={{ height: 320, width: 320 }}>
                <Badge value={props.item.status} textStyle={{ fontSize: 13 }} status="primary" />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button
                        icon={<Icon name="movie" color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10, backgroundColor: "#0facf3" }}
                        title='VIEW NOW'
                        onPress={() => props.navigation.navigate("TvDetail", {
                            itemId: props.item._id
                        })} />
                    <Mutation mutation={gql`mutation{
                         deleteTvSeries(_id: "${props.item._id}" ) {
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
                    {(deleteTvSeries, { data }) => (
                             <Button
                             icon={<Icon name="delete" color='#ffffff' />}
                             buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10, backgroundColor: "#eb4335" }}
                             title='DELETE NOW'
                             onPress={() => {
                                deleteTvSeries({
                                    refetchQueries: [{
                                        query: REFETCH_QUERY
                                    }]
                                })
                            }}/>
                        )}
                    </Mutation>
                </View>
            </Card>
        </View>
    )
}

export default CardItem