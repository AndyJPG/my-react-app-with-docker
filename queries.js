const Pool = require('pg').Pool
const pool = new Pool({
    user: 'user',
    password: 'postgres',
    host: 'localhost',
    database: 'my-db',
    port: 5432,
})

const getUsers = (req, res) => {
    pool.query(
        'SELECT * FROM users ORDER BY user_id ASC',
        (error, results) => {
            if (error) {
                throw error
            }

            res.status(200).json(results.rows)
        }
    )
}

// GET
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(
        `SELECT * FROM users WHERE user_id = ${id}`,
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        }
    )
}

// POST
const createUser = (req, res) => {
    const { username, last_name, first_name, email } = req.body

    pool.query(
        `INSERT INTO users \
        ( user_id, username, last_name, first_name, email, created_on ) \
        VALUES ( ${username}, ${last_name}, ${first_name}, ${email} )`,
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User added with ID: ${results.insertId}`)
        }
    )
}

// PUT
const updateUser = (req, res) => {
    const user_id = parseInt(req.params.user_id)
    const { first_name } = req.body

    pool.query(
        `UPDATE users SET first_name = ${first_name}`,
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${user_id}`)
        }
    )
}

// DELETE
const deleteUser = (req, res) => {
    const user_id = parseInt(req.params.user_id)

    pool.query(
        `DELETE FROM users WHERE user_id = ${user_id}`,
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User deleted with ID: ${user_id}`)
        }
    )
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}