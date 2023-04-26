import React, { useEffect, useContext } from 'react'
import { ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { Carousel } from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { nowPlaying, popular, topRated, upcoming, isloading } = useMovies();
  const { setMainColors } = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary, secondary] = await getImageColors(uri);
    setMainColors({ primary, secondary });
    console.log(primary, secondary);
  };

  useEffect(() => {
   if ( nowPlaying.length > 0){
    getPosterColors(0)
  }

  }, [nowPlaying])
  

  if (isloading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='blue' size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{ marginTop: top + 20 }}>
          {/* carrusel principal */}
          <View style={{ height: 440 }}>
            <Carousel
              sliderWidth={windowWidth}
              itemWidth={300}
              data={nowPlaying}
              renderItem={({ item }: any) => <MoviePoster movie={item} />}
              inactiveSlideOpacity={0.9}
              onSnapToItem={(index) => getPosterColors(index)}
            />
          </View>

          <HorizontalSlider title='Popular' movies={popular} />
          <HorizontalSlider title='Top Rated' movies={topRated} />
          <HorizontalSlider title='Upcoming' movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
