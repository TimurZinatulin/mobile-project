import axios from 'axios';
import React from 'react';
import { View } from 'react-native';
import { Loading } from '../components/Loading';
import Posts from '../components/Posts';

export const Home = ({ navigation }) => {
  const [items, setItems] = React.useState();
  const [refreshing, setRefreshing] = React.useState(true);

  const fetchPosts = () => {
    setRefreshing(true);

    axios
      .get('https://65467497fe036a2fa955b804.mockapi.io/posts')
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении статей');
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (refreshing) {
    return <Loading />;
  }

  return (
    <View>
      <Posts
        posts={items}
        refreshing={refreshing}
        fetch={fetchPosts}
        navigation={navigation}
      />
    </View>
  );
};
