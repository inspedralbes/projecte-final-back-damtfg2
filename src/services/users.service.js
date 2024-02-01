const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getUsers(){
    const rows = await db.query(
      `SELECT * FROM user` 
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }

async function getUserById(id){
    const row = await db.query(
        `SELECT * FROM user
        WHERE id = ?`,
        id
    );
    const data = helper.emptyOrRows(row);
  
    return {
      data
    }
}

async function getUsernames() {
    const rows = await db.query(
        `SELECT username FROM user`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
}

  async function insertUser(user) {
    const result = await db.query(
        `INSERT INTO user
        (username, password)
        VALUES
        (?, ?)`,
        [user.username, user.password]
    )
    let message = 'Error in creating user';
  
    if (result.affectedRows) {
      message = 'User created successfully';
    }
  
    return {message};
    }

    async function updateUser(id, user) {
        const result = await db.query(
            `UPDATE user SET username=?, password=?
            WHERE id=?`,
            [user.username, user.password,
            id]
        )
        let message = 'Error in updating user';

        if (result.affectedRows) {
            message = 'User updated successfully';
        }
        return {message};
    }
    async function deleteUser(id) {
        const result = await db.query(
            `DELETE FROM user WHERE id=?`,
            id
        )
        let message = 'Error in deleting user';

        if (result.affectedRows) {
            message = 'User deleted successfully';
        }
        return {message};
    }

    module.exports = {
        getUsers,
        insertUser,
        getUserById,
        getUsernames,
        updateUser,
        deleteUser
      }

 