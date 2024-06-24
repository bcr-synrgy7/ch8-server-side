import type { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.string('id').primary()
    table.string('name', 255).notNullable()
    table.string('category').notNullable()
    table.float('price').notNullable()
    table.string('image').notNullable()
    table.boolean('onPublish').defaultTo(false)
    table.timestamp('startRent')
    table.timestamp('finishRent')
    table.string('createdBy').notNullable()
    table.string('updatedBy').notNullable()
    table.string('deletedBy').nullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('cars')
}
