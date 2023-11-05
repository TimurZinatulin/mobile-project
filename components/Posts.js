import { Post } from './Post';
import { View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';

function Posts({ posts, refreshing, fetch, navigation }) {
  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetch} />
        }
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FullPost', {
                id: item.id,
                title: item.title,
              })
            }
          >
            <Post
              title={item.title}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Posts;
