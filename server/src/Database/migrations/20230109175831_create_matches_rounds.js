/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('matches_rounds', function (table) {
            table.increments('id').primary();
            table.date('level').notNullable();
            table.integer('match_config_id').references("match_history_config.id").notNullable().onDelete('CASCADE');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('matches_rounds');
};
