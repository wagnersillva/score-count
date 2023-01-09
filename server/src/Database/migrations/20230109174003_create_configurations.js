/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('configuration_users', function (table) {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('score_type', 255).notNullable();
            table.integer('amount_of_matches').notNullable();
            table.date('create_at');
            table.date('last_use');
            table.integer("user_id").references("users.id").notNullable().onDelete('CASCADE');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('configuration_users');
};
