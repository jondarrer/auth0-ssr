/* eslint-disable max-statements */
import { gql } from '@apollo/client';
// import schema from '../schema.graphql';
import fetch from 'cross-fetch';

import {
  i18n,
  getPostInfo,
  getRoutes,
  filterPostsByLanguage,
  orderPostsByDate,
} from '../utils';

export const typeDefs = gql`
  schema {
    query: Query
  }

  type PostInfo {
    id: ID!
    title: String
    description: String
    author: String
    datePosted: String
    tags: String
    picture: String
    language: String
    fileName: String
    markdown: String
  }

  type User {
    id: ID!
    givenName: String
    familyName: String
    nickname: String
    fullName: String
    picture: String
    locale: String
    updatedAt: String
    email: String
  }

  enum AscDescOrder {
    asc
    desc
  }

  enum Language {
    en
    ro
  }

  type Query {
    getPosts(language: Language!, dateOrder: AscDescOrder): [PostInfo]
    getPost(language: Language!, postId: String): PostInfo
    getUser: User
  }
`;

let postInfos;

export const resolvers = {
  Query: {
    getPosts: async (_a, { language, dateOrder }, _context) => {
      if (!postInfos) {
        postInfos = {};
        const t = await i18n;
        getRoutes()
          .filter(
            (route) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              route.startsWith('/blog/') || route.startsWith('/ro/blog/')
          )
          .forEach((route) => {
            const postId = route.substr(route.lastIndexOf('/') + 1);
            const res = getPostInfo(postId, language, t);
            postInfos[postId] = res;
          });
      }
      const filtered = filterPostsByLanguage(postInfos, language);
      return orderPostsByDate(filtered, dateOrder);
    },
    getPost: async (_a, { language, postId }, _context) => {
      const t = await i18n;
      return getPostInfo(postId, language, t);
    },
    getUser: async () => {
      try {
        const url = 'http://localhost:3000/api/user-info';
        const result = await fetch(url);
        console.log('resolvers', {
          url,
          result,
          status: result.status,
          statusText: result.statusText,
          text: await result.text(),
        });
        const user = await result.json();
        console.log('resolvers', { user });
        const response = {
          givenName: user.given_name,
          familyName: user.family_name,
          nickname: user.nickname,
          fullName: user.name,
          picture: user.picture,
          locale: user.locale,
          updatedAt: user.updated_at,
          email: user.email,
        };
        console.log('resolvers', { response });
        return response;
      } catch (error) {
        console.log('resolvers', { error });
      }
      return {};
    },
  },
};
