export const createUser = 'INSERT INTO users (firstname, lastname, email, password, isadmin) VALUES ($1, $2, $3, $4, $5) returning *';
export const findUserById = 'SELECT * FROM users WHERE id = $1';
export const queryUsersByEmail = 'SELECT * FROM users WHERE email = $1';

// GROUP QUERY
export const 