import { useEffect, useState } from 'react';
import { Box, Heading, Text, Avatar, VStack, Container } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { loadData } from '../utils/localstore';
import { Heroku } from '../utils/herokuLink';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = loadData('user');
    if (userData) {
      fetchUserData(userData._id);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${Heroku}/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (!user) {
    return <Layout><Text>Loading...</Text></Layout>;
  }

  return (
    <Layout>
      <Container maxW="container.md" py={10}>
        <VStack spacing={6} align="center">
          <Avatar size="2xl" src={user.profilePic} name={user.firstName} />
          <Heading>{user.firstName}</Heading>
          <Box>
            <Text><strong>Course:</strong> {user.course}</Text>
            <Text><strong>Email:</strong> {user.email}</Text>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
}