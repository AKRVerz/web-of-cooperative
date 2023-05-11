import _ from 'lodash';
import React, { useEffect, useState } from 'react';
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
import Router, { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Form } from 'formik';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import {
  DashboardContainer,
  DashboardMainContainer,
} from 'src/components/baseComponent';
import { updateIuranSchema } from 'src/utils/formSchema';
import { buttonStyle, createUserInput } from 'src/utils/styles';
import { RESOURCE_NAME } from 'src/utils/constant';
import { updateIuran as _updateIuran } from 'src/store/actions/resources/iurans';
import { errorToastfier } from 'src/utils/toastifier';
import useIdQuery from 'src/hooks/useIdQuery';
import useGetDataById from 'src/hooks/useGetdataById';
import useChakraToast from 'src/hooks/useChakraToast';
import { getAllUser as _getAllUser } from 'src/store/actions/resources/users';

const IuranUpdate: React.FC<Props> = ({ updateIuran, getAllUser }) => {
  const router = useRouter();
  const queryId = router.query.iuranId as never;
  const toast = useChakraToast();
  const iuran = useGetDataById(RESOURCE_NAME.IURANS, queryId);
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const update = async (value: Partial<Resource.Update['mounts']>) => {
    setIsRequested(true);

    try {
      await updateIuran(queryId, value);
      toast('Iuran berhasil diperbarui');

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
      {iuran ? (
        <React.Fragment>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Data Member
          </Text>
          <DashboardContainer overflow={'auto'}>
            <Flex p={5} flexDirection={'column'} height={'100%'}>
              <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={3}>
                Formulir Pembaruan Iuran
              </Text>
              <Formik
                initialValues={{
                  createdAt: undefined as unknown as Date,
                  debt: undefined as unknown as number,
                }}
                validationSchema={updateIuranSchema}
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
                      <FormControl isInvalid={!!errors.debt && !!touched.debt}>
                        <FormLabel>Pembayaran</FormLabel>
                        <Input
                          id="pembayaran"
                          placeholder="pembayaran"
                          value={values.debt}
                          onChange={handleChange('debt')}
                          onBlur={handleBlur('debt')}
                          type="number"
                          maxLength={16}
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
        </React.Fragment>
      ) : null}
    </DashboardMainContainer>
  );
};

const connector = connect(null, {
  updateIuran: _updateIuran,
  getAllUser: _getAllUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(IuranUpdate);
