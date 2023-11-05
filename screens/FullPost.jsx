import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';
import axios from 'axios';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

const FullPost = ({ route, navigation }) => {
  const [data, setData] = React.useState();
  const [refreshing, setRefreshing] = React.useState(true);
  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get('https://65467497fe036a2fa955b804.mockapi.io/posts/' + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении статей');
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  if (refreshing) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: data.imageUrl }} />
      <PostText>{data.text}</PostText>
    </View>
  );
};

export default FullPost;
