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
import { pembukuanSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { createPembukuan as _createPembukuan } from 'src/store/actions/resources/pembukuans';
import { errorToastfier } from 'src/utils/toastifier';
import useChakraToast from 'src/hooks/useChakraToast';

const PembukuanCreate: React.FC<Props> = ({ createPembukuan }) => {
  const toast = useChakraToast();
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const create = async (value: Koperasi.Resource.Create['pembukuans']) => {
    setIsRequested(true);

    try {
      await createPembukuan(value);
      toast('Laporan Sudah Ditambahkan');

      return setTimeout(() => {
        Router.push('/dashboard/pembukuan');
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
              tanggal: undefined as unknown as Date,
              uraian: '',
              sumWood: undefined as unknown as number,
              harga: undefined as unknown as number,
              masuk: undefined as unknown as number,
              keluar: undefined as unknown as number,
              cashBack: undefined as unknown as number,
              sumCashBack: undefined as unknown as number,
              shipCost: undefined as unknown as number,
              roadMoney: undefined as unknown as number,
              payBreed: undefined as unknown as number,
              operationalQc: undefined as unknown as number,
              pph: undefined as unknown as number,
              royalti: undefined as unknown as number,
              shu: undefined as unknown as number,
            }}
            validationSchema={pembukuanSchema}
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
                    <FormLabel>Tujuan Pengiriman</FormLabel>
                    <Input
                      id="uraian"
                      placeholder="Tujuan Pengiriman"
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
                    <FormLabel>Jumlah Batang</FormLabel>
                    <Input
                      id="sumWood"
                      placeholder="Jumlah Batang"
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
                    <FormLabel>Harga/Batang</FormLabel>
                    <Input
                      id="harga"
                      placeholder="Harga/Batang"
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
                    <FormLabel>Hasil</FormLabel>
                    <Input
                      id="masuk"
                      placeholder="Hasil"
                      value={values.harga * values.sumWood}
                      readOnly
                      // onChange={handleChange("masuk")}
                      // onBlur={handleBlur("masuk")}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.masuk && touched.masuk && (
                      <FormErrorMessage>{errors.masuk}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cashback</FormLabel>
                    <Input
                      id="cashBack"
                      placeholder="Cashback"
                      value={values.cashBack}
                      onChange={handleChange('cashBack')}
                      onBlur={handleBlur('cashBack')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.cashBack && touched.cashBack && (
                      <FormErrorMessage>{errors.cashBack}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.sumCashBack && touched.sumCashBack}
                  >
                    <FormLabel>Total CashBack</FormLabel>
                    <Input
                      id="sumCashBack"
                      placeholder="Hasil Setelah CashBack"
                      value={values.cashBack * values.sumWood}
                      readOnly
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.sumCashBack && touched.sumCashBack && (
                      <FormErrorMessage>{errors.sumCashBack}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.payBreed && touched.payBreed}
                  >
                    <FormLabel>Bayar Penangkar/Batang</FormLabel>
                    <Input
                      id="payBreed"
                      placeholder="Bayar Penangkar"
                      value={values.payBreed}
                      onChange={handleChange('payBreed')}
                      onBlur={handleBlur('payBreed')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.payBreed && touched.payBreed && (
                      <FormErrorMessage>{errors.payBreed}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.shipCost && touched.shipCost}
                  >
                    <FormLabel>Ongkos Kirim</FormLabel>
                    <Input
                      id="shipCpst"
                      placeholder="Ongkos Kirim"
                      value={values.shipCost}
                      onChange={handleChange('shipCost')}
                      onBlur={handleBlur('shipCost')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.shipCost && touched.shipCost && (
                      <FormErrorMessage>{errors.shipCost}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.roadMoney && touched.roadMoney}
                  >
                    <FormLabel>Uang Jalan</FormLabel>
                    <Input
                      id="roadMoney"
                      placeholder="Uang Jalan"
                      value={values.roadMoney}
                      onChange={handleChange('roadMoney')}
                      onBlur={handleBlur('roadMoney')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.roadMoney && touched.roadMoney && (
                      <FormErrorMessage>{errors.roadMoney}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.pph && touched.pph}>
                    <FormLabel>PPH (1,5%)</FormLabel>
                    <Input
                      id="pph"
                      placeholder="PPH (1,5%)"
                      value={values.harga * values.sumWood * (1.5 / 100)}
                      // onChange={handleChange('pph')}
                      // onBlur={handleBlur('pph')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.pph && touched.pph && (
                      <FormErrorMessage>{errors.pph}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.operationalQc && touched.operationalQc}
                  >
                    <FormLabel>Operasional QC</FormLabel>
                    <Input
                      id="operationalQc"
                      placeholder="Operasional Qc"
                      value={values.sumWood * 1000}
                      // onChange={handleChange('harga')}
                      // onBlur={handleBlur('harga')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.operationalQc && touched.operationalQc && (
                      <FormErrorMessage>
                        {errors.operationalQc}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.royalti && touched.royalti}>
                    <FormLabel>Royalti</FormLabel>
                    <Input
                      id="royalti"
                      placeholder="Royalti"
                      value={values.sumWood * 1000}
                      // onChange={handleChange('harga')}
                      // onBlur={handleBlur('harga')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.royalti && touched.royalti && (
                      <FormErrorMessage>{errors.royalti}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.keluar && touched.keluar}>
                    <FormLabel>Keluar</FormLabel>
                    <Input
                      id="keluar"
                      placeholder="keluar"
                      value={
                        values.payBreed * values.sumWood +
                        values.shipCost +
                        values.roadMoney +
                        values.harga * values.sumWood * (1.5 / 100) +
                        values.sumWood * 1000 +
                        values.sumWood * 1000
                      }
                      // onChange={handleChange('keluar')}
                      // onBlur={handleBlur('keluar')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.keluar && touched.keluar && (
                      <FormErrorMessage>{errors.keluar}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.shu && touched.shu}>
                    <FormLabel>SHU</FormLabel>
                    <Input
                      id="shu"
                      placeholder="SHU"
                      value={
                        values.harga * values.sumWood -
                        values.payBreed * values.sumWood -
                        values.shipCost -
                        values.roadMoney -
                        values.harga * values.sumWood * (1.5 / 100) -
                        values.sumWood * 1000 -
                        values.sumWood * 1000
                      }
                      // onChange={handleChange('keluar')}
                      // onBlur={handleBlur('keluar')}
                      type="number"
                      {...createUserInput}
                    />
                    {!!errors.keluar && touched.keluar && (
                      <FormErrorMessage>{errors.keluar}</FormErrorMessage>
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
  createPembukuan: _createPembukuan,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PembukuanCreate);
