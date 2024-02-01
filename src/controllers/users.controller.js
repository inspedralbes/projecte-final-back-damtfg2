const users = require('../services/users.service.js');

async function getUsers(req, res, next) {
    try {
        res.json(await users.getUsers());
    } catch (err) {
        console.error(`Error while getting user`, err.message);
        next(err);
    }
  }
  async function getUserById(req, res, next) {
    try {
        res.json(await users.getUserById(req.params.id));
    } catch (err) {
        console.error(`Error while getting user`, err.message);
        next(err);
    }
  }
  async function getUsernames(req, res, next) {
    try {
        res.json(await users.getUsernames());
    } catch (err) {
        console.error(`Error while getting user`, err.message);
        next(err);
    }
  }
  
  async function insertUser(req, res, next) {
    try {
      res.json(await users.insertUser(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  }
  
  async function updateUser(req, res, next) {
    try {
      res.json(await users.updateUser(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
  }
  
  async function deleteUser(req, res, next) {
    try {
      res.json(await users.deleteUser(req.params.id));
    } catch (err) {
      console.error(`Error while deleting user`, err.message);
      next(err);
    }
  }
  
  module.exports = {
    getUsers,
    getUserById,
    getUsernames,
    insertUser,
    updateUser,
    deleteUser
  };