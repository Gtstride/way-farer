/* eslint-disable no-console */
import pool from '../config.js';

const users = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        email CHARACTER VARYING(255) UNIQUE NOT NULL,
        password CHARACTER VARYING(128) NOT NULL,
        first_name CHARACTER VARYING(255) NOT NULL,
        last_name CHARACTER VARYING(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )`;
/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createUsersTable() {
  try {
    const create = await pool.query(users);
    console.log(`userTable: ${create[0].command}PED and ${create[1].command}D`);
    // console.log('userTable', create);
  } catch (error) {
    console.log(`userTable ${error}`);
  }
}
