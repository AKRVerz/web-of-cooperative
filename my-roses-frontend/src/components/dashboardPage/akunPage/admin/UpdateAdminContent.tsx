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
import { adminSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';
import { updateUser as _updateUser } from 'src/store/actions/resources/users';
import { errorToastfier } from 'src/utils/toastifier';
import useIdQuery from 'src/hooks/useIdQuery';
import useGetDataById from 'src/hooks/useGetdataById';
import useChakraToast from 'src/hooks/useChakraToast';

const UpdateAdminContent: React.FC<Props> = ({ updateUser }) => {
  const queryId = useIdQuery();
  const toast = useChakraToast();
  const admin = useGetDataById(RESOURCE_NAME.USERS, queryId);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<Resource.Update['users']>) => {
    setIsRequested(true);

    try {
      await updateUser(queryId, value);
      toast('Admin berhasil diperbarui');

      return setTimeout(() => {
        Router.push('/dashboard/akun/admins');
      }, 3000);
    } catch (e) {
      errorToastfier(toast, e);
    }

    setIsRequested(false);
  };

  return (
    <DashboardMainContainer>
      {admin ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data Admin
          </Text>
          <DashboardContainer overflow={'auto'}>
            <Flex p={5} flexDirection={'column'} height={'100%'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
                Formulir Pembaruan Akun Admin
              </Text>
              <Formik
                initialValues={{
                  email: admin?.email,
                  username: admin?.username,
                  password: admin?.password,
                  role: USER_ROLE.ADMIN,
                }}
                validationSchema={adminSchema}
                onSubmit={update}
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
                        <FormLabel>email</FormLabel>
                        <Input
                          id="email"
                          placeholder="email"
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
                          id="username"
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
                      type={'submit'}
                      disabled={isRequested}
                    >
                      Update
                    </Button>
                  </Form>
                )}
              </Formik>
            </Flex>
          </DashboardContainer>
        </React.Fragment>
      ) : null}
    </DashboardMainContainer>
  );
};

const connector = connect(null, {
  updateUser: _updateUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UpdateAdminContent);
