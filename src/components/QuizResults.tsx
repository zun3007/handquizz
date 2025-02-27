import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaClock, FaTrophy, FaRedo } from 'react-icons/fa';

interface QuizResultsProps {
  score: number;
  timeTaken: number; // in seconds
  totalQuestions: number;
  studentName: string;
  onRetakeQuiz: () => void;
  isSaving: boolean;
  saveError: string | null;
}

export const QuizResults = ({
  score,
  timeTaken,
  totalQuestions,
  studentName,
  onRetakeQuiz,
  isSaving,
  saveError,
}: QuizResultsProps) => {
  // Format the time taken
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Get appropriate message based on score
  const getMessage = (score: number): string => {
    if (score >= 90) return 'Excellent! You are an AI expert!';
    if (score >= 70) return 'Great job! You have a solid understanding of AI!';
    if (score >= 50) return 'Good effort! You know the basics of AI.';
    return 'Keep learning! AI is a fascinating field.';
  };

  const cardBg = useColorModeValue('white', 'gray.700');
  const greenBg = useColorModeValue('green.50', 'green.900');
  const yellowBg = useColorModeValue('yellow.50', 'yellow.900');
  const redBg = useColorModeValue('red.50', 'red.900');
  const blueBg = useColorModeValue('blue.50', 'blue.900');
  const purpleBg = useColorModeValue('purple.50', 'purple.900');
  const blueIconColor = useColorModeValue('#3182CE', '#90CDF4');
  const purpleIconColor = useColorModeValue('#805AD5', '#D6BCFA');

  // Determine score background color based on score
  const scoreBg = score >= 70 ? greenBg : score >= 50 ? yellowBg : redBg;
  const scoreColor =
    score >= 70 ? 'green.500' : score >= 50 ? 'yellow.500' : 'red.500';

  return (
    <Container maxW='container.md' py={8} className='fade-in'>
      <VStack align='stretch'>
        <Box textAlign='center' className='slide-up'>
          <Heading size='xl' mb={2} color='primary.500'>
            Quiz Completed!
          </Heading>
          <Text fontSize='lg' color='gray.600'>
            {getMessage(score)}
          </Text>
        </Box>

        <Box
          p={6}
          borderWidth={1}
          borderRadius='lg'
          boxShadow='lg'
          bg={cardBg}
          transition='transform 0.3s ease, box-shadow 0.3s ease'
          _hover={{
            transform: 'translateY(-5px)',
            boxShadow: 'xl',
          }}
          className='slide-up'
          style={{ animationDelay: '0.2s' }}
        >
          <VStack align='stretch'>
            <Box textAlign='center'>
              <Heading size='md' color='gray.600'>
                {studentName}'s Results
              </Heading>
            </Box>

            <Box p={4} borderRadius='md' bg={scoreBg}>
              <Box textAlign='center'>
                <Text fontSize='lg'>Your Score</Text>
                <Text fontSize='4xl' color={scoreColor} fontWeight='bold'>
                  {score}%
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  {Math.round((score / 100) * totalQuestions)} out of{' '}
                  {totalQuestions} questions correct
                </Text>
              </Box>
            </Box>

            <Box height='1px' bg='gray.200' my={4}></Box>

            <Flex justify='center' gap={4}>
              <Box
                p={4}
                borderRadius='md'
                flex='1'
                bg={blueBg}
                transition='transform 0.3s ease'
                _hover={{
                  transform: 'scale(1.05)',
                }}
              >
                <VStack>
                  <Box>
                    <FaClock size={28} color={blueIconColor} />
                  </Box>
                  <Box textAlign='center'>
                    <Text fontSize='sm'>Time Taken</Text>
                    <Text fontSize='2xl' fontWeight='bold'>
                      {formatTime(timeTaken)}
                    </Text>
                  </Box>
                </VStack>
              </Box>

              <Box
                p={4}
                borderRadius='md'
                flex='1'
                bg={purpleBg}
                transition='transform 0.3s ease'
                _hover={{
                  transform: 'scale(1.05)',
                }}
              >
                <VStack>
                  <Box>
                    <FaTrophy size={28} color={purpleIconColor} />
                  </Box>
                  <Box textAlign='center'>
                    <Text fontSize='sm'>Achievement</Text>
                    <Text fontSize='2xl' fontWeight='bold'>
                      {score >= 90
                        ? 'Master'
                        : score >= 70
                        ? 'Expert'
                        : score >= 50
                        ? 'Apprentice'
                        : 'Beginner'}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Flex>

            {saveError && (
              <Box
                p={3}
                bg={redBg}
                color='red.500'
                borderRadius='md'
                mt={4}
                className='fade-in'
              >
                <Text>{saveError}</Text>
                <Text fontSize='sm'>
                  Your results couldn't be saved to the leaderboard.
                </Text>
              </Box>
            )}

            {isSaving && (
              <Box
                p={3}
                bg={blueBg}
                color='blue.500'
                borderRadius='md'
                mt={4}
                className='fade-in'
              >
                <Text>Saving your results to the leaderboard...</Text>
              </Box>
            )}

            <Button
              colorScheme='primary'
              size='lg'
              onClick={onRetakeQuiz}
              mt={4}
              transition='all 0.2s ease'
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'md',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
            >
              <Flex align='center'>
                Take Another Quiz
                <Box as={FaRedo} ml={2} />
              </Flex>
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
