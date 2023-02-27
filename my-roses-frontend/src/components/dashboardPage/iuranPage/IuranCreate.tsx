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
import { RESOURCE_NAME } from 'src/utils/constant';

const IuranCreate: React.FC<Props> = ({ createIuran, getAllUser }) => {
  const toast = useChakraToast();
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const create = async (value: Koperasi.Resource.Create['mount']) => {
    setIsRequested(true);

    try {
      await createIuran(value);
      toast('Iuran Sudah Ditambahkan');

      return setTimeout(() => {
        Router.push('/dashboard/iuran');
      }, 3000);
    } catch (e) {
      errorToastfier(toast, e);
    }

    setIsRequested(false);
  };

  useEffect(() => {
    (async () => {
      await getAllUser(RESOURCE_NAME.USERS);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DashboardMainContainer>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Laporan
      </Text>
      <DashboardContainer overflow={'auto'}>
        <Flex p={5} flexDirection={'column'} height={'100%'}>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
            Formulir Pembuatan Laporan
          </Text>
          <Formik
            initialValues={{
              createdAdt: undefined as unknown as Date,
              debt: undefined as unknown as number,
              updatedAt: '' as unknown as Date & string,
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
                    isInvalid={!!errors.createdAdt && !!touched.createdAdt}
                  >
                    <FormLabel>Tanggal</FormLabel>
                    <Input
                      id="tanggal"
                      placeholder="tanggal"
                      value={values.createdAdt as unknown as string}
                      onChange={handleChange('tanggal')}
                      onBlur={handleBlur('tanggal')}
                      type="date"
                      {...createUserInput}
                    />
                    {!!errors.createdAdt && touched.createdAdt && (
                      <FormErrorMessage>
                        {errors.createdAdt as string}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isInvalid={!!errors.debt && !!touched.debt}>
                    <FormLabel>Pembayaran</FormLabel>
                    <Input
                      id="pembayaran"
                      placeholder="pembayaran"
                      value={values.debt as unknown as string}
                      onChange={handleChange('pembayaran')}
                      onBlur={handleBlur('pembayaran')}
                      {...createUserInput}
                    />
                    {!!errors.debt && touched.debt && (
                      <FormErrorMessage>
                        {errors.debt as string}
                      </FormErrorMessage>
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
