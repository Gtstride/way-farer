/* eslint-disable no-console */
import 'dotenv/config';
import bcryptjs from 'bcryptjs';
import pool from '../config.js/config';


const sql = 'insert into users (email, password, first_name, last_name, is_admin) values ($1, $2, $3, $4, $5)';

const password = process.env.ADMINPASS;
// console.log('PASS', password);

const saltRounds = 10;

const newPassword = bcryptjs.hashSync(password, saltRounds);

const email = process.env.EMAIL;

const variables = [email, newPassword, 'admin', 'admin', true];


/**
 * Class representing InsertAdminHandler
 * @class InsertAdminHandler
 */

/**
     * Create Admin Account
     * @static
     * @param {statement} sql - query to create table in db
     * @param {Array} variables - values inputted into the sql statement
     * @returns {object} representing success or failure
     */
export default async function seedAdmin() {
  try {
    const result = await pool.query(sql, variables);
    console.log(`Users ${result.command}ED`);
  } catch (error) {
    console.log(`seedUsers ${error}`);
  }
}
