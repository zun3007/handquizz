import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { HandGesture } from '../types';
import { useWebcam } from '../hooks/useWebcam';
import { useHandGesture } from '../hooks/useHandGesture';

interface QuizProps {
  currentQuestion: {
    id: number;
    question: string;
    options: string[];
  };
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswerIndex: number | null;
  onSelectAnswer: (index: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  score?: number;
  totalPossibleScore?: number;
}

export const Quiz = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswerIndex,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
  score = 0,
  totalPossibleScore = 0,
}: QuizProps) => {
  // Set up webcam
  const {
    videoRef,
    isWebcamReady,
    error: webcamError,
    startWebcam,
    stopWebcam,
  } = useWebcam();

  // Set up hand gesture detection
  const { gesture, isDetecting, startDetection, stopDetection } =
    useHandGesture(videoRef as React.RefObject<HTMLVideoElement>);

  // Simple notification state instead of toast
  const [notification, setNotification] = useState<{
    message: string;
    type: string;
  } | null>(null);

  // Ref to track if we've already handled a gesture
  const lastHandledGestureRef = useRef<HandGesture | null>(null);

  // Progress percentage
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Theme colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const questionBg = useColorModeValue('blue.50', 'blue.900');
  const progressBg = useColorModeValue('gray.200', 'gray.600');
  const progressFill = useColorModeValue('primary.500', 'primary.300');
  const notificationSuccessBg = useColorModeValue('green.100', 'green.900');
  const notificationInfoBg = useColorModeValue('blue.100', 'blue.900');
  const notificationSuccessColor = useColorModeValue('green.800', 'green.200');
  const notificationInfoColor = useColorModeValue('blue.800', 'blue.200');
  const instructionsBg = useColorModeValue('blue.50', 'blue.900');
  const instructionsBorderColor = useColorModeValue('blue.100', 'blue.700');
  const errorBg = useColorModeValue('red.50', 'red.900');
  const errorColor = useColorModeValue('red.600', 'red.200');
  const scoreBg = useColorModeValue('green.50', 'green.900');

  // Calculate score percentage and set color
  const scorePercentage =
    totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;

  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'green';
    if (scorePercentage >= 60) return 'blue';
    if (scorePercentage >= 40) return 'yellow';
    if (scorePercentage > 0) return 'orange';
    return 'gray';
  };

  const scoreColor = getScoreColor();

  // Display notification
  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 1500);
  };

  // Start webcam and detection when component mounts
  useEffect(() => {
    startWebcam();
    return () => {
      stopWebcam();
      stopDetection();
    };
  }, []);

  // Start detection once webcam is ready
  useEffect(() => {
    if (isWebcamReady && !isDetecting) {
      startDetection();
    }
  }, [isWebcamReady, isDetecting]);

  // Handle gestures
  useEffect(() => {
    if (
      gesture === HandGesture.UNKNOWN ||
      gesture === lastHandledGestureRef.current
    ) {
      return;
    }

    // Update the last handled gesture
    lastHandledGestureRef.current = gesture;

    // Reset last handled gesture after a timeout
    const timeoutId = setTimeout(() => {
      lastHandledGestureRef.current = null;
    }, 1000);

    // Handle different gestures
    switch (gesture) {
      case HandGesture.ONE:
        handleSelectAnswer(0);
        break;
      case HandGesture.TWO:
        handleSelectAnswer(1);
        break;
      case HandGesture.THREE:
        handleSelectAnswer(2);
        break;
      case HandGesture.FOUR:
        handleSelectAnswer(3);
        break;
      case HandGesture.THUMB_UP:
        if (selectedAnswerIndex !== null) {
          onNextQuestion();
          showNotification('Moving to next question', 'info');
        }
        break;
    }

    return () => clearTimeout(timeoutId);
  }, [gesture, selectedAnswerIndex]);

  const handleSelectAnswer = (index: number) => {
    if (currentQuestion.options.length <= index) {
      return;
    }

    onSelectAnswer(index);
    showNotification(`Selected option ${index + 1}`, 'success');
  };

  return (
    <Container maxW='container.xl' py={6} className='fade-in'>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr auto' }}
        gap={4}
        mb={6}
        className='slide-up'
      >
        <GridItem>
          <Heading size='md' mb={3} color='primary.600'>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Heading>
          <Box
            width='100%'
            height='8px'
            bg={progressBg}
            borderRadius='full'
            overflow='hidden'
          >
            <Box
              width={`${progressPercentage}%`}
              height='100%'
              bg={progressFill}
              borderRadius='full'
              transition='width 0.5s ease-in-out'
            />
          </Box>
        </GridItem>
        <GridItem>
          <Stat
            bg={scoreBg}
            p={3}
            borderRadius='md'
            borderWidth={1}
            borderColor={`${scoreColor}.200`}
            textAlign='center'
            position='relative'
            overflow='hidden'
          >
            <Box
              position='absolute'
              bottom='0'
              left='0'
              height='4px'
              width={`${scorePercentage}%`}
              bg={`${scoreColor}.500`}
              transition='width 0.5s'
            />
            <StatLabel fontWeight='medium'>Current Score</StatLabel>
            <StatNumber color={`${scoreColor}.600`}>
              {score} / {totalPossibleScore}
              {totalPossibleScore > 0 && (
                <Text as='span' fontSize='md' ml={2} fontWeight='normal'>
                  ({scorePercentage}%)
                </Text>
              )}
            </StatNumber>
          </Stat>
        </GridItem>
      </Grid>

      {notification && (
        <Box
          p={3}
          bg={
            notification.type === 'success'
              ? notificationSuccessBg
              : notificationInfoBg
          }
          color={
            notification.type === 'success'
              ? notificationSuccessColor
              : notificationInfoColor
          }
          borderRadius='md'
          mb={4}
          textAlign='center'
          className='fade-in'
          fontWeight='medium'
        >
          {notification.message}
        </Box>
      )}

      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 350px' }}
        gap={{ base: 6, lg: 8 }}
      >
        <GridItem className='slide-up' style={{ animationDelay: '0.2s' }}>
          <Box
            p={6}
            borderWidth={1}
            borderRadius='lg'
            boxShadow='md'
            bg={cardBg}
            h='100%'
            transition='all 0.3s ease'
            _hover={{
              boxShadow: 'lg',
            }}
          >
            <VStack align='stretch' spacing={5}>
              <Box p={4} bg={questionBg} borderRadius='md' mb={2}>
                <Heading size='lg' mb={2} color='gray.700'>
                  {currentQuestion.question}
                </Heading>
              </Box>

              <Box>
                {currentQuestion.options.map((option, index) => (
                  <Box
                    key={index}
                    mb={3}
                    transition='all 0.2s ease'
                    transform={
                      selectedAnswerIndex === index ? 'scale(1.02)' : 'scale(1)'
                    }
                  >
                    <Button
                      size='lg'
                      w='100%'
                      h='auto'
                      py={3}
                      variant={
                        selectedAnswerIndex === index ? 'solid' : 'outline'
                      }
                      colorScheme={
                        selectedAnswerIndex === index ? 'primary' : 'gray'
                      }
                      onClick={() => handleSelectAnswer(index)}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                      }}
                      _active={{
                        transform: 'translateY(0)',
                      }}
                      transition='all 0.2s'
                    >
                      <Flex w='100%' align='center'>
                        <Badge
                          borderRadius='full'
                          px={2}
                          py={1}
                          colorScheme={
                            selectedAnswerIndex === index ? 'primary' : 'gray'
                          }
                          mr={3}
                          fontSize='md'
                        >
                          {index + 1}
                        </Badge>
                        <Text fontSize='md' textAlign='left'>
                          {option}
                        </Text>
                      </Flex>
                    </Button>
                  </Box>
                ))}
              </Box>

              <Flex justifyContent='space-between' mt={4}>
                <Button
                  onClick={onPreviousQuestion}
                  isDisabled={currentQuestionIndex === 0}
                  colorScheme='gray'
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'sm',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition='all 0.2s'
                >
                  Previous
                </Button>
                <Button
                  onClick={onNextQuestion}
                  isDisabled={selectedAnswerIndex === null}
                  colorScheme='primary'
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'sm',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition='all 0.2s'
                >
                  {currentQuestionIndex === totalQuestions - 1
                    ? 'Finish'
                    : 'Next'}
                </Button>
              </Flex>
            </VStack>
          </Box>
        </GridItem>

        <GridItem className='slide-up' style={{ animationDelay: '0.3s' }}>
          <VStack spacing={4} align='stretch'>
            <Box
              position='relative'
              width='100%'
              height={{ base: '240px', lg: '220px' }}
              borderWidth={2}
              borderColor='primary.400'
              overflow='hidden'
              borderRadius='lg'
              boxShadow='md'
            >
              <video
                ref={videoRef}
                style={{
                  width: '100%',
                  height: '100%',
                  transform: 'scaleX(-1)',
                  objectFit: 'cover',
                }}
                autoPlay
                playsInline
                muted
              />
              <Box
                position='absolute'
                bottom={2}
                left={2}
                bg='rgba(0, 0, 0, 0.7)'
                color='white'
                px={3}
                py={1}
                borderRadius='md'
                fontSize='sm'
                fontWeight='medium'
              >
                {gesture !== HandGesture.UNKNOWN
                  ? `Detected: ${gesture}`
                  : 'No gesture detected'}
              </Box>
            </Box>

            <Box
              bg={instructionsBg}
              p={4}
              borderRadius='md'
              boxShadow='sm'
              borderWidth={1}
              borderColor={instructionsBorderColor}
            >
              <Text fontWeight='bold' mb={2} color='primary.600'>
                Hand Gesture Controls:
              </Text>
              <VStack align='start' spacing={2} fontSize='sm'>
                <Flex align='center'>
                  <Badge mr={2} colorScheme='blue'>
                    ✊
                  </Badge>
                  <Text>One finger - Select option 1</Text>
                </Flex>
                <Flex align='center'>
                  <Badge mr={2} colorScheme='blue'>
                    ✌️
                  </Badge>
                  <Text>Two fingers - Select option 2</Text>
                </Flex>
                <Flex align='center'>
                  <Badge mr={2} colorScheme='blue'>
                    ✋
                  </Badge>
                  <Text>Three fingers - Select option 3</Text>
                </Flex>
                <Flex align='center'>
                  <Badge mr={2} colorScheme='blue'>
                    🤟
                  </Badge>
                  <Text>Four fingers - Select option 4</Text>
                </Flex>
                <Flex align='center'>
                  <Badge mr={2} colorScheme='green'>
                    👍
                  </Badge>
                  <Text>Thumbs up - Confirm & next question</Text>
                </Flex>
              </VStack>
            </Box>

            {webcamError && (
              <Box
                bg={errorBg}
                p={4}
                borderRadius='md'
                color={errorColor}
                fontWeight='medium'
              >
                <Text>{webcamError}</Text>
                <Text fontSize='sm' mt={1}>
                  Please ensure your camera is connected and you've granted
                  permission.
                </Text>
              </Box>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};
