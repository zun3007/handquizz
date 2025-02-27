import { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, Flex, Badge } from '@chakra-ui/react';
import { api } from '../services/api';
import { LeaderboardEntry } from '../types';

export const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const data = await api.getTopScores(100);
        setEntries(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge colorScheme='green'>Excellent</Badge>;
    if (score >= 70) return <Badge colorScheme='blue'>Good</Badge>;
    if (score >= 50) return <Badge colorScheme='yellow'>Fair</Badge>;
    return <Badge colorScheme='red'>Needs Improvement</Badge>;
  };

  return (
    <Container maxW='container.lg' py={8}>
      <Box textAlign='center' mb={8}>
        <Heading size='xl' color='blue.600'>
          AI Quiz Leaderboard
        </Heading>
        <Text color='gray.600' mt={2}>
          Top performers in the AI for Everyone quiz
        </Text>
      </Box>

      {isLoading ? (
        <Flex justifyContent='center' my={10}>
          <Box
            position='relative'
            width='40px'
            height='40px'
            animation='spin 1s linear infinite'
          >
            <Box
              position='absolute'
              top='0'
              width='16px'
              height='16px'
              borderRadius='full'
              bg='blue.500'
            />
          </Box>
        </Flex>
      ) : error ? (
        <Box p={4} bg='red.50' color='red.500' borderRadius='md' my={4}>
          <Text>{error}</Text>
        </Box>
      ) : entries.length === 0 ? (
        <Box p={4} bg='blue.50' borderRadius='md' textAlign='center'>
          <Text>No quiz attempts yet. Be the first to take the quiz!</Text>
        </Box>
      ) : (
        <Box overflowX='auto' boxShadow='md' borderRadius='lg'>
          <Box as='table' width='100%' style={{ borderCollapse: 'collapse' }}>
            <Box as='thead' bg='gray.50'>
              <Box as='tr'>
                <Box as='th' width='50px' p={3} textAlign='left'>
                  Rank
                </Box>
                <Box as='th' p={3} textAlign='left'>
                  Name
                </Box>
                <Box as='th' p={3} textAlign='left'>
                  Student ID
                </Box>
                <Box as='th' p={3} textAlign='right'>
                  Score
                </Box>
                <Box as='th' p={3} textAlign='right'>
                  Time
                </Box>
                <Box as='th' p={3} textAlign='left'>
                  Completed
                </Box>
              </Box>
            </Box>
            <Box as='tbody'>
              {entries.map((entry, index) => (
                <Box
                  as='tr'
                  key={entry.id}
                  borderTop='1px solid'
                  borderColor='gray.200'
                >
                  <Box as='td' p={3} fontWeight='bold'>
                    {index + 1}
                  </Box>
                  <Box as='td' p={3}>
                    {entry.name}
                  </Box>
                  <Box as='td' p={3}>
                    <Text fontFamily='monospace'>{entry.studentId}</Text>
                  </Box>
                  <Box as='td' p={3} textAlign='right'>
                    <Flex justifyContent='flex-end' alignItems='center' gap={2}>
                      {entry.score}% {getScoreBadge(entry.score)}
                    </Flex>
                  </Box>
                  <Box as='td' p={3} textAlign='right'>
                    {formatTime(entry.timeTaken)}
                  </Box>
                  <Box as='td' p={3}>
                    {formatDate(entry.date)}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};
