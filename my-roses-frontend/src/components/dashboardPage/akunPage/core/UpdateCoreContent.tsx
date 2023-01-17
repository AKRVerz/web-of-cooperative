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

const UpdateCoreContent: React.FC<Props> = ({ updateUser }) => {
  const queryId = useIdQuery();
  const toast = useChakraToast();
  const core = useGetDataById(RESOURCE_NAME.USERS, queryId);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const update = async (value: Partial<Resource.Update['users']>) => {
    setIsRequested(true);

    try {
      await updateUser(queryId, value);
      toast('Core berhasil diperbarui');

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
      {core ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data Core
          </Text>
          <DashboardContainer overflow={'auto'}>
            <Flex p={5} flexDirection={'column'} height={'100%'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
                Formulir Pembaruan Akun Core
              </Text>
              <Formik
                initialValues={{
                  email: core?.email,
                  username: core?.username,
                  noKtp: core?.noKtp,
                  alamat: core?.alamat,
                  tanggal: undefined as unknown as Date,
                  password: core?.password,
                  role: USER_ROLE.CORE,
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
                      <FormControl
                        isInvalid={!!errors.tanggal && !!touched.tanggal}
                      >
                        <FormLabel>Tanggal</FormLabel>
                        <Input
                          id="tanggal"
                          placeholder="tanggal"
                          value={values.tanggal as unknown as string}
                          onChange={handleChange('tanggal')}
                          onBlur={handleBlur('tanggal')}
                          type="date"
                          {...createUserInput}
                        />
                        {!!errors.tanggal && touched.tanggal && (
                          <FormErrorMessage>
                            {errors.tanggal as string}
                          </FormErrorMessage>
                        )}
                      </FormControl>
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
                      <FormControl isInvalid={!!errors.noKtp && touched.noKtp}>
                        <FormLabel>No KTP</FormLabel>
                        <Input
                          id="noktp"
                          placeholder="No KTP"
                          value={values.noKtp}
                          onChange={handleChange('noKtp')}
                          onBlur={handleBlur('noKtp')}
                          type="number"
                          {...createUserInput}
                        />
                        {!!errors.noKtp && touched.noKtp && (
                          <FormErrorMessage>{errors.noKtp}</FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.alamat && touched.alamat}
                      >
                        <FormLabel>Alamat</FormLabel>
                        <Input
                          id="alamat"
                          placeholder="Alamat"
                          value={values.alamat}
                          onChange={handleChange('alamat')}
                          onBlur={handleBlur('alamat')}
                          {...createUserInput}
                        />
                        {!!errors.alamat && touched.alamat && (
                          <FormErrorMessage>{errors.alamat}</FormErrorMessage>
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

export default connector(UpdateCoreContent);
