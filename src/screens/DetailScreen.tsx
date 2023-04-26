import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ScrollViewBase, ActivityIndicator } from 'react-native';

//import { Movie, MovieFull } from '../interfaces/movieInerface';

import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

const screenHeight = Dimensions.get('screen').height

export const DetailScreen = ({route, navigation}: Props) => {

const movie = route.params 
const uri =`https://image.tmdb.org/t/p/w500${movie.poster_path}`;

 const {isLoading, cast, movieFull} =useMovieDetails(movie.id); 

console.log(isLoading)


  return (
    <ScrollView>
    <View 
      style={styles.imageContainer}
    >
      <View style={styles.imageBorders}>
        <Image 
        source={{uri}}
        style={styles.posterImage}
        />
      </View>
    </View>
    <View style={styles.marginContainer}>
      <Text style={styles.subTitle}>{movie.original_title}</Text>
      <Text style={styles.title}>{movie.title}</Text>
     </View>
    
      { isLoading
         ? <ActivityIndicator  size={30} color="grey" style={{marginTop : 20}}/>
         : <MovieDetails movieFull={movieFull !} cast={cast}/>
        }
        
        {/* <Icon
        name="star-half-outline"
        size={50}
        color='blue'

      /> */}

      {/* boton para cerrar */}
      <View style={styles.backButton}>
      <TouchableOpacity
        onPress={() => navigation.pop()}
      >
      <Icon 
        color='white'
        name='arrow-back-outline'
        size={60}
        
      />
      </TouchableOpacity>
      </View>
    </ScrollView>
  )}

  const styles = StyleSheet.create({
    imageContainer : {
      width: '100%',
      height: screenHeight * 0.7,
     // paddingBottom: 15,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      //borderRadius:18,
      shadowOpacity: 0.9,
      shadowRadius: 6.27,
      
      elevation: 8,
      
    
    },
    posterImage :{
      flex: 1,
      
    },
    
    marginContainer: {
      marginHorizontal : 20,
      marginTop: 20,
    },

    subTitle: {
     fontSize: 10,
     opacity: 0.8
    },

    title : {
      fontSize: 20,
      fontWeight: 'bold'
    },
    imageBorders : {
      flex: 1,
      overflow: 'hidden',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25
    
    },
    backButton: {
      position: 'absolute',
      zIndex: 999,
      elevation: 9,
      top: 30,
      left: 5
    }

  
  })

  