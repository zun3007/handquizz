import { Box, Heading, Container } from '@chakra-ui/react';
import { Leaderboard } from '../components/Leaderboard';

export const LeaderboardPage = () => {
  return (
    <Container maxW='container.xl' py={8}>
      <Box textAlign='center' mb={8}>
        <Heading as='h1' size='xl' mb={2}>
          AI Hand Quiz Leaderboard
        </Heading>
        <Heading as='h2' size='md' fontWeight='normal' color='gray.600'>
          Top Performers
        </Heading>
      </Box>

      <Box bg='white' p={6} rounded='md' shadow='md'>
        <Leaderboard />
      </Box>
    </Container>
  );
};
