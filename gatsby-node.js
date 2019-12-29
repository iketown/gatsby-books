// create pages dynamically
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const bookTemplate = path.resolve(`src/templates/bookTemplate.js`)
  return graphql(`
    query MyQuery {
      allBook {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const books = result.data.allBook.edges
    books.forEach(book => {
      createPage({
        path: `/book/${book.node.id}`,
        component: bookTemplate,
        context: { bookId: book.node.id },
      })
    })
  })
}
