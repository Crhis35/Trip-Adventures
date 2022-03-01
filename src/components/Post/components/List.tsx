import React from 'react';
import {
  Text,
  Center,
  Box,
  Icon,
  Divider,
  AspectRatio,
  Stack,
  HStack,
  Image,
  FlatList,
  VStack,
  Skeleton,
  Heading,
  Spinner,
} from 'native-base';
import SearchBar from '../../SearchBar';
import { useInfinitePostQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';
import { BaseUrl } from '../../../shared/constants';
import dayjs from 'dayjs';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const WIDTH = width;

const PostList = () => {
  const {
    currentUser: { jwt },
  } = useAppSelector((state) => state.user);
  const { t } = useTranslation('common');
  const {
    data: postList,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinitePostQuery(
    {
      endpoint: BaseUrl,
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
    },
    'pagination',
    {
      pagination: {
        pageSize: 2,
      },
    },
    {
      onError: (error) => {
        console.error(error);
      },
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if (lastPage?.posts?.meta.pagination) {
          const page = lastPage.posts.meta.pagination.page;
          const total = lastPage.posts.meta.pagination.total;
          const pageSize = lastPage.posts.meta.pagination.pageSize;

          if (page * pageSize < total) {
            return {
              pagination: {
                page: page + 1,
                pageSize: 2,
              },
            };
          }
        }
      },
    }
  );

  const posts = postList?.pages.map(({ posts }) => posts?.data).flat();
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

  const renderFooter = () => {
    if (!isFetchingNextPage) return <Divider m="10" />;
    return (
      <HStack marginY="10" space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          {t('states.loading')}
        </Heading>
      </HStack>
    );
  };

  return (
    <Center w="100%">
      {posts && posts.length > 0 ? (
        <FlatList
          w="85%"
          data={posts}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={SearchBar}
          keyExtractor={(_, idx) => `post-${idx}`}
          ItemSeparatorComponent={() => <Divider my="5" />}
          ListFooterComponent={renderFooter}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0}
          renderItem={({ item }) => (
            <Box
              shadow="1"
              rounded="lg"
              _light={{
                bg: 'muted.100',
              }}
              _dark={{ bg: 'gray.700' }}
            >
              <AspectRatio w="100%" ratio={1.5}>
                <Carousel
                  data={item?.attributes?.images?.data || []}
                  contentContainerStyle={{
                    width: '100%',
                  }}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH}
                  showsHorizontalScrollIndicator
                  shouldRasterizeIOS
                  renderItem={({ item: image }) => (
                    <Image
                      source={{
                        uri: `${BaseUrl.replace('/graphql', '')}${
                          image?.attributes?.url
                        }`,
                      }}
                      size="100%"
                      alt="image base"
                    />
                  )}
                />
              </AspectRatio>
              <Text bold position="absolute" color="coolGray.50" top="0" m="4">
                NEWS
              </Text>
              <Stack space="2" p="4">
                <Text color="gray.400">
                  {dayjs(item?.attributes?.createdAt).format('MMMM D, YYYY')}
                </Text>
                <Heading size={['md', 'lg', 'md']} fontWeight="medium">
                  {item?.attributes?.title}
                </Heading>
                <Text isTruncated noOfLines={4}>
                  {item?.attributes?.description}
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
        <Text>No post yet</Text>
      )}
    </Center>
  );
};

export default PostList;
