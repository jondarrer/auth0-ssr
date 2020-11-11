/* eslint-disable max-statements */
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../graphql/shared-queries';

import { Box, Container, Flex, Grid, Heading, Image, Text } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import { useLanguage } from '../../contexts';

const ProfilePage = () => {
  const { currentLanguage: lng } = useLanguage();
  const { t } = useTranslation();

  const response = useQuery(GET_USER, { variables: {} });

  console.log('ProfilePage', { response });

  const { data, error, loading } = response;

  if (error) {
    console.log(error);
    return null;
  }

  if (loading) {
    return null;
  }

  const { fullName, picture, email } = data?.getUser;

  return (
    <>
      <Flex>
        <Container
          sx={{ maxWidth: '1224px' }}
          px={['2', null, '3', '4']}
          py={['1', null, '2']}
        >
          <Heading as="h1">{t('meta:profile-page-title', { lng })}</Heading>
          <Box>
            <Grid columns={[1, null, '128px auto']} gap={2}>
              {picture ? <Image src={picture} mt={[0, null, 4]} /> : <Box />}
              <Box>
                <Heading as="h2" mt={[0, null, 4]}>
                  {fullName}
                </Heading>
                <Text as="p" mb={2}>
                  {email}
                </Text>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default ProfilePage;
