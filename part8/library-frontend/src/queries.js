import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const BOOK_DETAIL = gql`
  fragment BookDetail on Book {
    title
    published
    author {
      name
      born
      bookCount
      id
    }
    genres
    id
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetail
    }
  }
  ${BOOK_DETAIL}
`

export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetail
    }
  }
  ${BOOK_DETAIL}
`

export const EDIT_AUTHOR = gql`
  mutation editBirthYear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetail
    }
  }
  ${BOOK_DETAIL}
`
