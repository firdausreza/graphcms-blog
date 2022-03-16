import { request, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            excerpt
            slug
            title
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }  
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetail($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        excerpt
        slug
        title
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
        comments(orderBy: createdAt_ASC) {
          createdAt
          name
          comment
        }
      }
    }  
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.post
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        slug
        createdAt
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getRelatedPosts = async (categories, slug) => {
  const query = gql`
    query GetPosts($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } },
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        slug
        createdAt
      }
    }
  `

  const result = await request(graphqlAPI, query, { categories, slug })

  return result.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories() {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.categories
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })

  return result.json()
}