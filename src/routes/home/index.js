import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Flex, Grid, Heading, Image, Link } from 'theme-ui';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import { Meta } from '../../components';
import { useLanguage } from '../../contexts';
import { GET_POSTS } from '../../graphql/shared-queries';

import portrait from '../../images/jondarrer-soften-portrait.jpg';

/**
 * Props for the HomePage type
 *
 * @typedef {object} Props
 * @property {Array<string>}} locales The theme to apply to the links
 */

const HomePage = ({ locales }) => {
  const { currentLanguage: lng } = useLanguage();
  const { t } = useTranslation();
  const { data } = useQuery(GET_POSTS, {
    variables: { language: lng },
  });

  return (
    <>
      <Meta locales={locales} pageTitle={t('nav-bar:home', { lng })} />
      <Flex>
        <Container sx={{ maxWidth: '1224px' }}>
          <Grid columns={[1, null, 2]} gap={0}>
            <Box>
              <Image src={portrait} sx={{ display: 'block' }} />
            </Box>
            <Box px={['2', null, '3', '4']} py={['1', null, '2']}>
              <Heading as="h1" px={['0', null, '2', '0']}>
                {t('home-page:hello', { lng })}
              </Heading>
              <Heading as="h2" px={['0', null, '2', '0']}>
                {t('home-page:my-name-is', { lng })}
              </Heading>
              <Box>
                {data?.getPosts.map((post, index) => (
                  <Heading as="h3" key={index} px={['0', null, '2', '0']}>
                    <Link
                      as={RouterLink}
                      to={`${lng === 'ro' ? '/ro' : ''}/blog/${post.id}`}
                    >
                      {post.title}
                    </Link>
                  </Heading>
                ))}
              </Box>
            </Box>
          </Grid>
        </Container>
      </Flex>
    </>
  );
};

export default HomePage;
