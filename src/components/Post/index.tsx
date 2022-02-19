import React from 'react';

import { Box, useColorModeValue } from 'native-base';
import PostList from './components/List';

const Post = () => {
  return (
    <Box bg={useColorModeValue('blueGray.50', 'blueGray.900')} safeArea>
      <PostList />
    </Box>
  );
};

export default Post;
