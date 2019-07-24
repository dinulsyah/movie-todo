const gql = require('graphql')
const movieSchema = require('./types/movies')
const tvSchema = require('./types/tvseries')
const redis = require('redis')
const client = redis.createClient()
const movieHost = 'http://localhost:3001/movies'
const tvHost = 'http://localhost:3002/tv'
const axios = require('axios')

const Schema = new gql.GraphQLSchema({
    query: new gql.GraphQLObjectType({
        name: 'GrapQhL_TV_MOVIE',
        fields:{
            allMovie:{
                type: new gql.GraphQLList(movieSchema),
                async resolve(){
                    return await new Promise((resolve, reject) => {
                      client.get('Movie', async (err, reply) => {
                        if(err) {
                          reject(err)
                        }
                        else {
                          if(reply) {
                            const response = JSON.parse(reply)
                            resolve(response.movies)
                          }
                          else {
                            const { data } = await axios.get(movieHost)
                            client.set('Movie', JSON.stringify(data),'EX', 60),
                            resolve(data.movies)
                          }
                        }
                      })
                    })
                }
            },
            allTvSeries:{
                type: new gql.GraphQLList(tvSchema),
                async resolve(){
                    return await new Promise((resolve,reject) => {
                        client.get('TvSeries', async (err, reply) => {
                            if(err) {
                              reject(err)
                            }
                            else {
                              if(reply) {
                                const response = JSON.parse(reply)
                                resolve(response.series)
                              }
                              else {
                                const { data } = await axios.get(tvHost)
                                client.set('TvSeries', JSON.stringify(data),'EX', 60),
                                resolve(data.series)
                              }
                            }
                          })
                    })
                }
            },
            findOneMovie:{
                type: movieSchema,
                args:{
                    _id:{type:new gql.GraphQLNonNull(gql.GraphQLID)}
                },
                async resolve(_previous, args) {
                    const { data } = await axios.get(`${movieHost}/${args._id}`)
                    return data
                }
            },
            findOneTvSeries:{
                type: tvSchema,
                args:{
                    _id:{type:new gql.GraphQLNonNull(gql.GraphQLID)}
                },
                async resolve(_previous, args) {
                    const { data } = await axios.get(`${tvHost}/${args._id}`)
                    return data
                }
            }
        }
    }),
    mutation: new gql.GraphQLObjectType({
        name:'GrapQhL_TV_MOVIE_MUT',
        fields:{
            createMovie:{
                type:movieSchema,
                args:{
                    title: {type:gql.GraphQLString},
                    popularity: {type: gql.GraphQLFloat},
                    "poster_path": { type: gql.GraphQLString},
                    tag: { type: gql.GraphQLList(gql.GraphQLString)},
                    overview: {type: gql.GraphQLString},
                    status: {type: gql.GraphQLString}
                },
                async resolve(_previous,args){
                    const { data } = await axios.post(movieHost, args)
                    const movies = await axios.get(movieHost)
                    client.set('Movie', JSON.stringify(movies.data), 'EX', 60)
                    return data.createdMovie
                }
            },
            updateMovie:{
                type:movieSchema,
                args:{
                    _id: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
                    title: {type:gql.GraphQLString},
                    popularity: {type: gql.GraphQLFloat},
                    "poster_path": { type: gql.GraphQLString},
                    tag: { type: gql.GraphQLList(gql.GraphQLString)},
                    overview: {type: gql.GraphQLString},
                    status: {type: gql.GraphQLString}
                },
                async resolve(_previous,args){
                    const { data } = await axios.put(`${movieHost}/${args._id}`, args)
                    const movies = await axios.get(movieHost)
                    client.set('Movie', JSON.stringify(movies.data), 'EX', 60)
                    return data.updatedMovie
                }
            },
            deleteMovie:{
                type:movieSchema,
                args:{
                    _id:{type:new gql.GraphQLNonNull(gql.GraphQLID)}
                },
                async resolve(_previous,args){
                    const { data } = await axios.delete(`${movieHost}/${args._id}`)
                    const movies = await axios.get(movieHost)
                    client.set('Movie', JSON.stringify(movies.data), 'EX', 60)
                    return data.deletedMovie
                }
            },
            createTvSeries:{
                type:tvSchema,
                args:{
                    title: {type:gql.GraphQLString},
                    popularity: {type: gql.GraphQLFloat},
                    "poster_path": { type: gql.GraphQLString},
                    tag: { type: gql.GraphQLList(gql.GraphQLString)},
                    overview: {type: gql.GraphQLString},
                    status: {type: gql.GraphQLString}
                },
                async resolve(_previous,args){
                    const { data } = await axios.post(tvHost, args)
                    const tvSeries = await axios.get(tvHost)
                    client.set('Movie', JSON.stringify(tvSeries.data), 'EX', 60)
                    return data.createdTvSeries
                }
            },
            updateTvSeries:{
                type:tvSchema,
                args:{
                    _id: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
                    title: {type:gql.GraphQLString},
                    popularity: {type: gql.GraphQLFloat},
                    "poster_path": { type: gql.GraphQLString},
                    tag: { type: gql.GraphQLList(gql.GraphQLString)},
                    overview: {type: gql.GraphQLString},
                    status: {type: gql.GraphQLString}
                },
                async resolve(_previous,args){
                    const { data } = await axios.put(`${tvHost}/${args._id}`, args)
                    const tvSeries = await axios.get(tvHost)
                    client.set('Movie', JSON.stringify(tvSeries.data), 'EX', 60)
                    return data.updatedTvSeries
                }
            },
            deleteTvSeries:{
                type:tvSchema,
                args:{
                    _id:{type:new gql.GraphQLNonNull(gql.GraphQLID)}
                },
                async resolve(_previous,args){
                    const { data } = await axios.delete(`${tvHost}/${args._id}`)
                    const tvSeries = await axios.get(tvHost)
                    client.set('Movie', JSON.stringify(tvSeries.data), 'EX', 60)
                    return data.deletedTvSeries
                }
            }
        }
    })
})

module.exports = Schema