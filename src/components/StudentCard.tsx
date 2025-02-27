import { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Image,
  Flex,
  useColorModeValue,
  keyframes,
} from '@chakra-ui/react';

// Define the animation keyframes
const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% { transform: scaleY(1); }
  45% { transform: scaleY(1); }
  50% { transform: scaleY(0.1); }
  55% { transform: scaleY(1); }
`;

// Props for the StudentCard component
interface StudentCardProps {
  name: string;
  studentId: string;
  isFormComplete: boolean;
}

// The cute robot character that tracks cursor
const CuteRobot = ({ isHappy }: { isHappy: boolean }) => {
  // State for eye tracking
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Setup cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate mouse position as percentage of viewport
      const mouseXPercent = e.clientX / viewportWidth;
      const mouseYPercent = e.clientY / viewportHeight;

      // Limit the eye movement range (max 3px in any direction)
      const maxMovement = 3;
      const xMovementLeft = (mouseXPercent - 0.5) * maxMovement * 2;
      const yMovementLeft = (mouseYPercent - 0.5) * maxMovement * 2;
      const xMovementRight = (mouseXPercent - 0.5) * maxMovement * 2;
      const yMovementRight = (mouseYPercent - 0.5) * maxMovement * 2;

      // Update eye positions
      setLeftEyePosition({ x: xMovementLeft, y: yMovementLeft });
      setRightEyePosition({ x: xMovementRight, y: yMovementRight });
    };

    // Setup blinking at random intervals
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds

    // Add event listener for mouse movements
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up events and intervals on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  // Animation for bouncing when happy
  const bounceAnimation = isHappy
    ? `${bounce} 2s ease-in-out infinite`
    : 'none';

  // Colors
  const robotColor = '#4A90E2'; // Blue
  const robotAccentColor = '#2A5A9D'; // Darker blue
  const eyeColor = '#FFFFFF'; // White
  const pupilColor = '#2C3E50'; // Dark blue-gray
  const metalColor = '#E0E0E0'; // Light silver
  const antennaColor = '#F44336'; // Red for antenna

  return (
    <Box
      position='relative'
      width='100%'
      height='160px'
      bg='#87CEFA' // Light blue background
      borderRadius='md'
      overflow='hidden'
      boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
      animation={bounceAnimation}
    >
      {/* Robot head */}
      <Box
        position='absolute'
        width='120px'
        height='90px'
        bg={robotColor}
        borderRadius='20px'
        top='30px'
        left='50%'
        transform='translateX(-50%)'
        boxShadow={`0 5px 15px rgba(0,0,0,0.1), inset 0 -5px 0 ${robotAccentColor}`}
        zIndex={3}
      >
        {/* Robot face plate */}
        <Box
          position='absolute'
          width='100px'
          height='70px'
          bg={metalColor}
          borderRadius='15px'
          top='10px'
          left='50%'
          transform='translateX(-50%)'
          boxShadow='inset 0 2px 5px rgba(0,0,0,0.1)'
        />

        {/* Left eye */}
        <Box
          position='absolute'
          width='25px'
          height='25px'
          bg={eyeColor}
          borderRadius='full'
          border='2px solid #ccc'
          top='25px'
          left='30px'
          boxShadow='inset 0 -2px 0 rgba(0,0,0,0.1)'
          overflow='hidden'
          animation={isBlinking ? `${blink} 0.2s ease-out` : undefined}
        >
          {/* Left pupil that follows cursor */}
          <Box
            position='absolute'
            width='12px'
            height='12px'
            bg={pupilColor}
            borderRadius='full'
            top='50%'
            left='50%'
            transform={`translate(calc(-50% + ${leftEyePosition.x}px), calc(-50% + ${leftEyePosition.y}px))`}
            transition='transform 0.1s ease'
          />
        </Box>

        {/* Right eye */}
        <Box
          position='absolute'
          width='25px'
          height='25px'
          bg={eyeColor}
          borderRadius='full'
          border='2px solid #ccc'
          top='25px'
          right='30px'
          boxShadow='inset 0 -2px 0 rgba(0,0,0,0.1)'
          overflow='hidden'
          animation={isBlinking ? `${blink} 0.2s ease-out` : undefined}
        >
          {/* Right pupil that follows cursor */}
          <Box
            position='absolute'
            width='12px'
            height='12px'
            bg={pupilColor}
            borderRadius='full'
            top='50%'
            left='50%'
            transform={`translate(calc(-50% + ${rightEyePosition.x}px), calc(-50% + ${rightEyePosition.y}px))`}
            transition='transform 0.1s ease'
          />
        </Box>

        {/* Mouth - changes based on mood */}
        {isHappy ? (
          // Happy smile
          <Box
            position='absolute'
            width='50px'
            height='20px'
            border='3px solid #555'
            borderRadius='0 0 30px 30px'
            borderTop='none'
            bottom='15px'
            left='50%'
            transform='translateX(-50%)'
          />
        ) : (
          // Neutral expression
          <Box
            position='absolute'
            width='30px'
            height='3px'
            bg='#555'
            borderRadius='full'
            bottom='22px'
            left='50%'
            transform='translateX(-50%)'
          />
        )}

        {/* Antenna */}
        <Box
          position='absolute'
          width='5px'
          height='20px'
          bg='#555'
          top='-20px'
          left='50%'
          transform='translateX(-50%)'
        >
          <Box
            position='absolute'
            width='10px'
            height='10px'
            bg={antennaColor}
            borderRadius='full'
            top='-5px'
            left='50%'
            transform='translateX(-50%)'
            boxShadow='0 0 10px rgba(244,67,54,0.7)'
          />
        </Box>
      </Box>

      {/* Robot body */}
      <Box
        position='absolute'
        width='80px'
        height='30px'
        bg={robotColor}
        borderRadius='10px'
        bottom='20px'
        left='50%'
        transform='translateX(-50%)'
        boxShadow={`0 5px 15px rgba(0,0,0,0.1), inset 0 -3px 0 ${robotAccentColor}`}
      >
        {/* Control panel */}
        <Flex
          position='absolute'
          width='50px'
          justify='space-between'
          top='10px'
          left='50%'
          transform='translateX(-50%)'
        >
          <Box width='8px' height='8px' borderRadius='full' bg='red' />
          <Box width='8px' height='8px' borderRadius='full' bg='yellow' />
          <Box width='8px' height='8px' borderRadius='full' bg='green' />
        </Flex>
      </Box>

      {/* Left arm */}
      <Box
        position='absolute'
        width='10px'
        height='40px'
        bg={robotColor}
        borderRadius='5px'
        bottom='35px'
        left='80px'
        transform='rotate(25deg)'
        transformOrigin='top'
        boxShadow={`2px 2px 0 ${robotAccentColor}`}
      />

      {/* Right arm */}
      <Box
        position='absolute'
        width='10px'
        height='40px'
        bg={robotColor}
        borderRadius='5px'
        bottom='35px'
        right='80px'
        transform='rotate(-25deg)'
        transformOrigin='top'
        boxShadow={`-2px 2px 0 ${robotAccentColor}`}
      />
    </Box>
  );
};

// The main StudentCard component
export const StudentCard = ({
  name,
  studentId,
  isFormComplete,
}: StudentCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('orange.500', 'orange.400');
  const textColor = useColorModeValue('blue.800', 'blue.300');

  return (
    <Box
      maxW='280px'
      borderWidth='8px'
      borderRadius='lg'
      overflow='hidden'
      borderColor={borderColor}
      bg={cardBg}
      boxShadow='lg'
      p={4}
      className='fade-in'
      transform='translateY(0)'
      transition='transform 0.3s ease, box-shadow 0.3s ease'
      _hover={{
        boxShadow: 'xl',
        transform: 'translateY(-5px)',
      }}
    >
      {/* FPT University Logo and Header */}
      <Flex justifyContent='space-between' alignItems='center' mb={3}>
        <Box width='80px'>
          <Image
            src={`${import.meta.env.BASE_URL}fpt_logo.png`}
            alt='FPT University Logo'
            height='35px'
            objectFit='contain'
            fallbackSrc='https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png'
          />
        </Box>
        <Box textAlign='right'>
          <Text
            color='orange.500'
            fontWeight='bold'
            fontSize={{ base: 'lg', md: 'xl' }}
          >
            TRƯỜNG ĐẠI HỌC FPT
          </Text>
        </Box>
      </Flex>

      {/* World map background - subtle gradient */}
      <Box
        width='100%'
        height='8px'
        bgGradient='linear(to-r, gray.100, gray.300, gray.100)'
        my={1}
        borderRadius='full'
      />

      {/* Cute Robot Character */}
      <CuteRobot isHappy={isFormComplete} />

      {/* Student Information */}
      <Box mt={5} textAlign='center'>
        <Text
          color={textColor}
          fontWeight='bold'
          fontSize='xl'
          fontFamily="'Plus Jakarta Sans', sans-serif"
        >
          {name || 'Your Name'}
        </Text>
        <Text
          color={textColor}
          fontSize='lg'
          fontFamily='monospace'
          letterSpacing='wider'
          mt={1}
        >
          {studentId || 'SE123456'}
        </Text>
      </Box>

      {/* Student ID Card Label */}
      <Box
        bgGradient='linear(to-r, orange.400, orange.500, orange.400)'
        color='white'
        px={4}
        py={2}
        borderRadius='md'
        textAlign='center'
        mt={4}
        fontWeight='bold'
        boxShadow='0 2px 4px rgba(0, 0, 0, 0.2)'
        letterSpacing='wider'
      >
        STUDENT ID CARD
      </Box>
    </Box>
  );
};
