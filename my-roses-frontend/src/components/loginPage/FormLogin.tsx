import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  Text,
  useDisclosure,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine, RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { connect, ConnectedProps } from 'react-redux';
import { errorToastfier } from 'src/utils/toastifier';
import { userLogin as _userLogin } from 'src/store/actions/currentUser';
import { USER_ROLE } from 'src/utils/constant';
import useChakraToast from 'src/hooks/useChakraToast';
import router from 'next/router';

const FormLogin: ReactFC<Props> = ({ userLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const toast = useChakraToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const interText = {
    fontFamily: 'Inter',
    fontSize: '0.938rem',
  };

  const generateRole = () =>
    _.map(USER_ROLE, (role, key) => (
      <option key={key} value={role}>
        {_.map(role.split('_'), (r) => _.capitalize(r)).join(' ')}
      </option>
    ));

  const login = async (
    values: Pick<
      Koperasi.Resource.ResourceStructure['users'],
      'email' | 'password' | 'role'
    >
  ) => {
    try {
      const result = await userLogin(values);

      switch (result.role) {
        case USER_ROLE.ADMIN:
          router.push('/dashboard');
          break;
        case USER_ROLE.CORE:
          router.push('/');
        default:
          router.push('/');
          break;
      }
    } catch (e) {
      errorToastfier(toast, e);
    }
  };

  return (
    <React.Fragment>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Box
          alignItems="center"
          borderRadius="1.25rem"
          textAlign="center"
          bg="white"
          justifyContent={'center'}
          p={8}
          width="100%"
          mx={5}
        >
          <Formik
            initialValues={{
              email: '',
              password: '',
              role: USER_ROLE.MEMBER,
            }}
            onSubmit={login}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <VStack spacing={5} borderRadius="20px">
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <InputGroup borderColor={'royalRed.200'}>
                      <InputLeftElement pointerEvents="none">
                        <BiUser color="gray.300" />
                      </InputLeftElement>
                      <Input
                        id="email"
                        placeholder="email"
                        boxShadow="lg"
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                    </InputGroup>
                    {!!errors.email && touched.email && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <RiLockPasswordLine color="gray.300" />
                      </InputLeftElement>
                      <Input
                        id="password"
                        placeholder="Password"
                        size="md"
                        borderColor={'royalRed.200'}
                        boxShadow="lg"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      <InputRightElement>
                        {passwordVisible ? (
                          <RiEyeOffFill
                            onClick={() => setPasswordVisible(false)}
                            color="gray.300"
                          />
                        ) : (
                          <RiEyeFill
                            onClick={() => setPasswordVisible(true)}
                            color="gray.300"
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {!!errors.password && touched.password && (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.role && touched.role}>
                    <InputGroup>
                      <Select
                        id="kategori"
                        placeholder="-Masuk Sebagai-"
                        color={'royalBlack.100'}
                        borderColor={'royalRed.200'}
                        boxShadow="lg"
                        value={values.role}
                        onChange={handleChange('role')}
                        onBlur={handleBlur('role')}
                      >
                        {generateRole()}
                      </Select>
                    </InputGroup>
                    {!!errors.role && touched.role && (
                      <FormErrorMessage>{errors.role}</FormErrorMessage>
                    )}
                  </FormControl>
                  <Box
                    as="button"
                    borderRadius="md"
                    bg={'royalRed.200'}
                    color="white"
                    px={4}
                    h={10}
                    type="submit"
                  >
                    Login
                  </Box>

                  <Flex
                    justifyContent={'center'}
                    cursor={'pointer'}
                    onClick={onOpen}
                  >
                    <Text {...interText} color={'royalRed.200'}>
                      Lupa Kata Sandi?
                    </Text>
                  </Flex>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <Divider mt={5} variant={'solid'} />
          <ModalBody>
            <Text textAlign={'center'} {...interText} mt={5} mb={5}>
              Silahkan Hubungi Pihak Koperasi
            </Text>
          </ModalBody>
          <Divider variant={'solid'} />
          <ModalFooter>
            <Button
              bg={'royalRed.200'}
              color={'white'}
              mr={3}
              onClick={onClose}
              _hover={{
                background: 'royalRed.200',
                color: 'white',
              }}
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

const connector = connect(null, {
  userLogin: _userLogin,
});

type Props = ConnectedProps<typeof connector>;

export default connector(FormLogin);
