import React from 'react';
import {
  Heading,
  Center,
  Box,
  Icon,
  Divider,
  Text,
  AspectRatio,
  Stack,
  HStack,
  Image,
  FlatList,
  VStack,
  Skeleton,
  ScrollView,
} from 'native-base';
import SearchBar from '../../SearchBar';
import { usePostQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';
import { BaseUrl } from '../../../shared/constants';
import Header from '../../../shared/Header/index';
import dayjs from 'dayjs';

{
  /* <Image
source={{
  uri: `${BaseUrl.replace('/graphql', '')}${
    item.attributes?.images?.data[0].attributes?.url
  }`,
}}
size="100%"
alt="image base"
/> */
}

const PostList = () => {
  const {
    currentUser: { jwt },
  } = useAppSelector((state) => state.user);

  const { data: postList, isLoading } = usePostQuery({
    endpoint: BaseUrl,
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    },
  });
  const posts = postList?.posts?.data;
  if (isLoading)
    return (
      <Center w="100%" h="100%">
        <VStack
          w="90%"
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        >
          <Skeleton h="40" />
          <Skeleton.Text px="4" />
          <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
        </VStack>
        <VStack
          w="90%"
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        >
          <Skeleton h="40" />
          <Skeleton.Text px="4" />
          <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
        </VStack>
      </Center>
    );

  return (
    <Center w="100%">
      {posts && posts.length > 0 ? (
        <FlatList
          maxW="350"
          w="100%"
          data={posts}
          ListFooterComponent={<Divider m="10" />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={SearchBar}
          keyExtractor={(_, idx) => `post-${idx}`}
          ItemSeparatorComponent={() => <Divider my="5" />}
          renderItem={({ item }) => (
            <Box
              shadow="2"
              rounded="lg"
              _light={{ bg: 'coolGray.50' }}
              _dark={{ bg: 'gray.700' }}
            >
              <AspectRatio w="100%" ratio={1.5}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  scrollEventThrottle={200}
                  decelerationRate="fast"
                  pagingEnabled
                  snapToAlignment="center"
                  _contentContainerStyle={{
                    w: '100%',
                  }}
                >
                  {item.attributes?.images?.data.map((image, idx) => (
                    <Image
                      source={{
                        uri: `${BaseUrl.replace('/graphql', '')}${
                          image?.attributes?.url
                        }`,
                      }}
                      key={`images-${idx}`}
                      size="100%"
                      alt="image base"
                    />
                  ))}
                </ScrollView>
              </AspectRatio>
              <Text bold position="absolute" color="coolGray.50" top="0" m="4">
                NEWS
              </Text>
              <Stack space="2" p="4">
                <Text color="gray.400">
                  {dayjs(item.attributes?.createdAt).format('MMMM D, YYYY')}
                </Text>
                <Heading size={['md', 'lg', 'md']} fontWeight="medium">
                  {item.attributes?.title}
                </Heading>
                <Text isTruncated noOfLines={4}>
                  {item.attributes?.description}
                </Text>
              </Stack>
              <HStack space="3" px="4" pb="4">
                <Icon
                  name="md-menu"
                  _light={{ color: 'emerald.800' }}
                  _dark={{ color: 'emerald.300' }}
                />
                <Text
                  _light={{ color: 'emerald.800' }}
                  _dark={{ color: 'emerald.300' }}
                >
                  Find out more
                </Text>
              </HStack>
            </Box>
          )}
        />
      ) : (
        <Header>No post yet</Header>
      )}
    </Center>
  );
};

export default PostList;
