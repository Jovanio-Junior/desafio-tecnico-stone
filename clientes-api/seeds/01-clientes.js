/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
let seedJson = require('../seedsGerar')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clientes').del()
    .then(function () {
      // Inserts seed entries
      return knex('clientes').insert(seedJson);
    });
};