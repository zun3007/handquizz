import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaUser, FaIdCard } from 'react-icons/fa';
import { Student } from '../types';
import { api } from '../services/api';
import { StudentCard } from './StudentCard';

interface StudentFormProps {
  onSubmit: (student: Student) => void;
}

export const StudentForm = ({ onSubmit }: StudentFormProps) => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [nameError, setNameError] = useState('');
  const [studentIdError, setStudentIdError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const formBg = useColorModeValue('white', 'gray.700');
  const formShadow = useColorModeValue('lg', 'dark-lg');
  const inputBg = useColorModeValue('white', 'gray.800');
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' }) as
    | 'column'
    | 'row';

  useEffect(() => {
    // Check if the form is complete to update the frog's emotion
    const validateStudentId =
      studentId.trim() && api.validateStudentId(studentId.trim());
    setIsFormComplete(!!name.trim() && !!validateStudentId);
  }, [name, studentId]);

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate student ID
    if (!studentId.trim()) {
      setStudentIdError('Student ID is required');
      isValid = false;
    } else if (!api.validateStudentId(studentId.trim())) {
      setStudentIdError(
        'Student ID must be 2 letters followed by 6 digits (e.g., SE123456)'
      );
      isValid = false;
    } else {
      setStudentIdError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Create student object
    const student: Student = {
      name: name.trim(),
      studentId: studentId.trim().toUpperCase(),
    };

    try {
      onSubmit(student);
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      direction={flexDirection}
      align='stretch'
      justify='center'
      gap={8}
      mt={12}
      className='fade-in'
    >
      {/* Student ID Card - Now on the left */}
      <Box display='flex' alignItems='center' justifyContent='center' flex={1}>
        <StudentCard
          name={name}
          studentId={studentId}
          isFormComplete={isFormComplete}
        />
      </Box>

      {/* Registration Form - Now on the right */}
      <Box
        maxW='md'
        p={8}
        borderWidth='1px'
        borderRadius='xl'
        boxShadow={formShadow}
        bg={formBg}
        className='fade-in'
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        transform='translateY(0)'
        transition='transform 0.3s ease, box-shadow 0.3s ease'
        _hover={{
          boxShadow: 'xl',
          transform: 'translateY(-5px)',
        }}
        flex={1}
      >
        <VStack align='stretch' spacing={6}>
          <Box textAlign='center' className='slide-up'>
            <Heading
              as='h2'
              size='xl'
              textAlign='center'
              color='primary.500'
              fontWeight='bold'
              mb={2}
            >
              AI Quiz Registration
            </Heading>

            <Text textAlign='center' color='gray.600'>
              Enter your name and student ID to begin the AI quiz
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl isInvalid={!!nameError} id='name'>
                <FormLabel fontWeight='medium'>Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={FaUser} color='gray.400' />
                  </InputLeftElement>
                  <Input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter your full name'
                    bg={inputBg}
                    _focus={{
                      borderColor: 'primary.400',
                      boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)',
                    }}
                    _hover={{
                      borderColor: 'primary.300',
                    }}
                  />
                </InputGroup>
                {nameError && <FormErrorMessage>{nameError}</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={!!studentIdError} id='studentId'>
                <FormLabel fontWeight='medium'>Student ID</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={FaIdCard} color='gray.400' />
                  </InputLeftElement>
                  <Input
                    type='text'
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                    placeholder='e.g., SE123456'
                    bg={inputBg}
                    _focus={{
                      borderColor: 'primary.400',
                      boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)',
                    }}
                    _hover={{
                      borderColor: 'primary.300',
                    }}
                  />
                </InputGroup>
                {studentIdError && (
                  <FormErrorMessage>{studentIdError}</FormErrorMessage>
                )}
              </FormControl>

              <Button
                mt={6}
                colorScheme='primary'
                type='submit'
                isLoading={isSubmitting}
                size='lg'
                w='full'
                fontWeight='semibold'
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition='all 0.2s'
                loadingText='Submitting...'
              >
                Start Quiz
              </Button>
            </Stack>
          </form>
        </VStack>
      </Box>
    </Flex>
  );
};
