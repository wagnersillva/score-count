/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('player_scores', function (table) {
            table.increments('id').primary();
            table.integer('player_id').references("configuration_players.id").notNullable();
            table.string('score');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('player_scores');
};
