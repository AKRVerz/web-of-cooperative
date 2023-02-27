import React, { useState } from 'react';
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

const IuranCreate: React.FC<Props> = ({ createIuran }) => {
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
                  <FormControl isInvalid={!!errors.uraian && touched.uraian}>
                    <FormLabel>Uraian</FormLabel>
                    <Input
                      id="uraian"
                      placeholder="uraian"
                      value={values.uraian}
                      onChange={handleChange('uraian')}
                      onBlur={handleBlur('uraian')}
                      {...createUserInput}
                    />
                    {!!errors.uraian && touched.uraian && (
                      <FormErrorMessage>{errors.uraian}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.sumWood && touched.sumWood}>
                    <FormLabel>Batang/Kg</FormLabel>
                    <Input
                      id="sumWood"
                      placeholder="batang/kg"
                      value={values.sumWood}
                      onChange={handleChange('sumWood')}
                      onBlur={handleBlur('sumWood')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.sumWood && touched.sumWood && (
                      <FormErrorMessage>{errors.sumWood}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.harga && touched.harga}>
                    <FormLabel>Harga</FormLabel>
                    <Input
                      id="harga"
                      placeholder="harga"
                      value={values.harga}
                      onChange={handleChange('harga')}
                      onBlur={handleBlur('harga')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.harga && touched.harga && (
                      <FormErrorMessage>{errors.harga}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.masuk && touched.masuk}>
                    <FormLabel>Masuk</FormLabel>
                    <Input
                      id="masuk"
                      placeholder="masuk"
                      value={values.harga * values.sumWood}
                      readOnly
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.masuk && touched.masuk && (
                      <FormErrorMessage>{errors.masuk}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.keluar && touched.keluar}>
                    <FormLabel>Keluar</FormLabel>
                    <Input
                      id="keluar"
                      placeholder="keluar"
                      value={values.keluar}
                      onChange={handleChange('keluar')}
                      onBlur={handleBlur('keluar')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.keluar && touched.keluar && (
                      <FormErrorMessage>{errors.keluar}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.jumlah && touched.jumlah}>
                    <FormLabel>Jumlah</FormLabel>
                    <Input
                      id="jumlah"
                      placeholder="jumlah"
                      value={values.harga * values.sumWood - values.keluar}
                      readOnly
                      // onChange={handleChange("jumlah")}
                      // onBlur={handleBlur("jumlah")}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.jumlah && touched.jumlah && (
                      <FormErrorMessage>{errors.jumlah}</FormErrorMessage>
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
});

type Props = ConnectedProps<typeof connector>;

export default connector(IuranCreate);
