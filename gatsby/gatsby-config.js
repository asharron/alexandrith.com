/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const globImporter = require('node-sass-glob-importer');

module.exports = {
    siteMetadata: {
        title: 'Alexandrith.com'
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                importer: globImporter()
            }
        },
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
               fonts: [
                   'Nunito'
               ]
            }
        }
    ],
}
