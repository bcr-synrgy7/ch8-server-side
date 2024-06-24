import type { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('roles', (table: Knex.TableBuilder) => {
    table.string('id').primary()
    table.string('userRole').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('roles')
}
