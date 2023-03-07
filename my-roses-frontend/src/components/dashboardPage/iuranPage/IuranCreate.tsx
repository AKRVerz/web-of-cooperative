import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  DashboardContainer,
  DashboardMainContainer,
} from 'src/components/baseComponent';
import { iuranSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { createIuran as _createIuran } from 'src/store/actions/resources/iurans';
import { errorToastfier } from 'src/utils/toastifier';
import useChakraToast from 'src/hooks/useChakraToast';
import { getAllUser as _getAllUser } from 'src/store/actions/resources/users';
import AutoComplete from 'src/components/baseComponent/AutoComplete';

const IuranCreate: React.FC<Props> = ({ createIuran, getAllUser }) => {
  const toast = useChakraToast();
  const [keyword, setKeyword] = useState('');
  const [userId, setUserId] = useState<number>();
  const [isError, setIsError] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const create = async (value: Koperasi.Resource.Create['mount']) => {
    if (!userId) return;

    setIsRequested(true);

    Object.assign(value, {
      userId,
    });

    try {
      await createIuran(value);
      toast('Iuran Sudah Ditambahkan');

      return setTimeout(() => {
        Router.push('/dashboard/iuran');
      }, 1000);
    } catch (e) {
      errorToastfier(toast, e);
      setIsRequested(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllUser('limit=all');
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DashboardMainContainer>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Iuran
      </Text>
      <DashboardContainer overflow={'auto'}>
        <Flex p={5} flexDirection={'column'} height={'100%'}>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
            Formulir Pembuatan Iuran
          </Text>
          <Formik
            initialValues={{
              createdAt: undefined as unknown as Date,
              debt: undefined as unknown as number,
            }}
            validationSchema={iuranSchema}
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
                  <FormControl
                    isInvalid={!!errors.createdAt && !!touched.createdAt}
                  >
                    <FormLabel>Tanggal</FormLabel>
                    <Input
                      id="tanggal"
                      placeholder="tanggal"
                      value={values.createdAt as unknown as string}
                      onChange={handleChange('createdAt')}
                      onBlur={handleBlur('createdAt')}
                      type="date"
                      {...createUserInput}
                    />
                    {!!errors.createdAt && touched.createdAt && (
                      <FormErrorMessage>
                        {errors.createdAt as string}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!isError && !!isTouched}>
                    <FormLabel>Nama Orang Tua</FormLabel>
                    <AutoComplete
                      keyword={keyword}
                      setKeyword={setKeyword}
                      setUserId={setUserId}
                      setIsError={setIsError}
                      setIsTouched={setIsTouched}
                      onFocus={() => setIsTouched(true)}
                      isRequired
                    />
                    {!_.isEmpty(isError) && isTouched && (
                      <FormErrorMessage>{isError}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.debt && !!touched.debt}>
                    <FormLabel>Pembayaran</FormLabel>
                    <Input
                      id="pembayaran"
                      placeholder="pembayaran"
                      value={values.debt}
                      onChange={handleChange('debt')}
                      onBlur={handleBlur('debt')}
                      {...createUserInput}
                    />
                    {!!errors.debt && touched.debt && (
                      <FormErrorMessage>{errors.debt}</FormErrorMessage>
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
  createIuran: _createIuran,
  getAllUser: _getAllUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(IuranCreate);
