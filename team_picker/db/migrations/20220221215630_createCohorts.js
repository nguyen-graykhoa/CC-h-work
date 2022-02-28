
exports.up = function(knex) {
  return knex.schema.createTable('cohorts', table => {
      table.increments('id').primary();
      table.string('logo_url');
      table.string('name');
      table.string('members', 450);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cohorts');
};
