/* eslint-disable no-console */
import pool from 'pg';

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        email CHARACTER VARYING(255) UNIQUE REQUIRED NOT NULL,
        password CHARACTER VARYING(50) NOT NULL,
        first_name CHARACTER VARYING(255) NOT NULL,
        last_name CHARACTER VARYING(255) NOT NULL,
        created DATE
        )`;
/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createUsersTable() {
  try {
    const create = await pool.query(usersTable);
    console.log(`userTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`userTable ${error}`);
  }
}
