/* eslint-disable no-console */
import pool from '../config.js';

const trip = `DROP TABLE IF EXISTS received CASCADE;
CREATE TABLE trip (
  id SERIAL PRIMARY KEY NOT NULL,
  bus_id INTEGER NULL,
  origin CHARACTER VARYING(500) NOT NULL,
  destination CHARACTER VARYING(500) NOT NULL,
  trip_date DATE NOT NULL,
  fare CHARACTER VARYING(50) NULL,
  status CHARACTER VARYING(50) NULL,
  created_on DATE NOT NULL
)`;

/**
 * Function representing tripTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createTripTable() {
  try {
    const create = await pool.query(trip);
    console.log(`trip                                                                                                                         Table: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(error);
  }
}
