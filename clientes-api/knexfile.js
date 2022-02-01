// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = require('../database/dbSQL')
module.exports = {
  client: 'pg',
  connection: config,
  searchPath: ['knex', 'public'],
  seeds: {
    directory: './seeds'
  }
};