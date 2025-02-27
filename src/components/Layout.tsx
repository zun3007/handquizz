import { ReactNode } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const headerBg = useColorModeValue('white', 'gray.800');
  const headerShadow = useColorModeValue('sm', 'none');
  const logoColor = useColorModeValue('primary.500', 'primary.300');
  const footerBg = useColorModeValue('neutral.50', 'gray.900');

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box>
      {/* Header */}
      <Box
        as='header'
        bg={headerBg}
        color='primary.600'
        py={4}
        shadow={headerShadow}
        position='sticky'
        top='0'
        zIndex='sticky'
        borderBottom='1px'
        borderColor='neutral.100'
      >
        <Container maxW='container.xl'>
          <Flex justify='space-between' align='center'>
            <Flex align='center' className='fade-in' gap={4}>
              <Box
                as={FaBrain}
                size='28px'
                color={logoColor}
                transition='transform 0.3s ease'
                _hover={{ transform: 'scale(1.1)' }}
              />
              <Heading as='h1' size='lg' ml={2} fontWeight='bold'>
                AI Hand Quiz
              </Heading>
            </Flex>
            <Flex gap={6}>
              <Link
                as={RouterLink}
                to='/'
                fontWeight='600'
                position='relative'
                p={2}
                color={isActive('/') ? 'primary.600' : 'gray.600'}
                _hover={{
                  textDecoration: 'none',
                  color: 'primary.500',
                  _after: {
                    width: '100%',
                  },
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isActive('/') ? '100%' : '0%',
                  height: '2px',
                  bg: 'primary.500',
                  transition: 'width 0.3s ease',
                }}
              >
                Home
              </Link>
              <Link
                as={RouterLink}
                to='/leaderboard'
                fontWeight='600'
                position='relative'
                p={2}
                color={isActive('/leaderboard') ? 'primary.600' : 'gray.600'}
                _hover={{
                  textDecoration: 'none',
                  color: 'primary.500',
                  _after: {
                    width: '100%',
                  },
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isActive('/leaderboard') ? '100%' : '0%',
                  height: '2px',
                  bg: 'primary.500',
                  transition: 'width 0.3s ease',
                }}
              >
                Leaderboard
              </Link>
              <Image
                src='https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png'
                alt='FPT University Logo'
                height='40px'
                mr={2}
                transition='transform 0.3s ease'
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box as='main' py={8} minH='calc(100vh - 180px)' className='slide-up'>
        <Container maxW='container.xl'>{children}</Container>
      </Box>

      {/* Footer */}
      <Box
        as='footer'
        bg={footerBg}
        py={6}
        borderTop='1px'
        borderColor='neutral.100'
      >
        <Container maxW='container.xl'>
          <Flex direction='column' align='center' textAlign='center'>
            <Text fontSize='sm' color='gray.500'>
              &copy; {new Date().getFullYear()} AI Hand Quiz. All rights
              reserved.
            </Text>
            <Text fontSize='sm' color='gray.500' mt={1}>
              Developed by Group 3 - CSI106 FPT University
            </Text>
            <Text fontSize='xs' color='gray.500' mt={1}>
              Based on Andrew Ng's "AI for Everyone" course materials.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
