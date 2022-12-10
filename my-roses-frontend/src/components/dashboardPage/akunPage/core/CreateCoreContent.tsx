import React, { useState } from 'react';
import {
  Flex,
  Text,
  VStack,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import {
  DashboardContainer,
  DashboardMainContainer,
} from 'src/components/baseComponent';
import { userSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { USER_ROLE } from 'src/utils/constant';
import { createUser as _createUser } from 'src/store/actions/resources/users';
import { errorToastfier } from 'src/utils/toastifier';
import useChakraToast from 'src/hooks/useChakraToast';

const CreateCoreContent: React.FC<Props> = ({ createUser }) => {
  const toast = useChakraToast();
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const create = async (value: Koperasi.Resource.Create['users']) => {
    setIsRequested(true);

    try {
      await createUser(value);
      toast('Core berhasil ditambahkan');

      return setTimeout(() => {
        Router.push('/dashboard/akun/cores');
      }, 3000);
    } catch (e) {
      errorToastfier(toast, e);
    }

    setIsRequested(false);
  };

  return (
    <DashboardMainContainer>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Data Core
      </Text>
      <DashboardContainer overflow={'auto'}>
        <Flex p={5} flexDirection={'column'} height={'100%'}>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
            Formulir Pembuatan Akun Core
          </Text>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              role: USER_ROLE.CORE,
            }}
            validationSchema={userSchema}
            onSubmit={create}
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
                <VStack spacing={2} py={2}>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      {...createUserInput}
                    />
                    {!!errors.email && touched.email && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input
                      id="userName"
                      placeholder="Username"
                      value={values.username}
                      onChange={handleChange('username')}
                      onBlur={handleBlur('username')}
                      {...createUserInput}
                    />
                    {!!errors.username && touched.username && (
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        type={isPassVisible ? 'text' : 'password'}
                        {...createUserInput}
                      />
                      <InputRightElement>
                        {isPassVisible ? (
                          <RiEyeOffFill
                            onClick={() => setIsPassVisible(false)}
                            color="gray.300"
                          />
                        ) : (
                          <RiEyeFill
                            onClick={() => setIsPassVisible(true)}
                            color="gray.300"
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {!!errors.password && touched.password && (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                </VStack>
                <Button
                  {...buttonStyle.confirmation}
                  fontFamily="poppins"
                  fontSize={'0.813rem'}
                  px={10}
                  borderRadius={6}
                  _focus={{ border: 'none' }}
                  type="submit"
                  disabled={isRequested}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </DashboardContainer>
    </DashboardMainContainer>
  );
};

const connector = connect(null, {
  createUser: _createUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CreateCoreContent);
