/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('configuration_players', function (table) {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.integer("configuration_id").references("configuration_users.id").notNullable().onDelete('CASCADE');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('configuration_players');
};
