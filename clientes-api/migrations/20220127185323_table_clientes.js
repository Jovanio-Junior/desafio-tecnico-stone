/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('clientes', table => {
        table.increments('id').primary()
        table.string('nome', 100).notNullable()
        table.string('estado').notNullable
        table.string('cpf',11).notNullable().unique()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('clientes')
};
