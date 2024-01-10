const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
// const { models } = require('./../libs/sequelize');

// const getConnection = require('../libs//postgres');
// const pool = require('../libs/postgresPool');
// const sequelize = require('../libs/sequelize');

class notesService {
  constructor() {
    //Bring the connection with pool
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newNote = await models.Note.create(data);
    return newNote;
  }

  async find() {
    const rta = await models.Note.findAll();
    return rta;
    // --------------------------------------
    //Solutions with query
    // const query = 'SELECT * FROM notes';
    //Sequelize connection
    // const [data] = await sequelize.query(query);
    // return data;
    // ----------------------------------------
    //Pool Connection
    // const rta = await this.pool.query(query);
    // return rta.rows;
    // -----------------------------------------
    //Normal connection
    // const client = await getConnection();
    // const rta = await client.query(query);
    // return rta.rows;
    // -----------------------------------------
    //Without connect to the server
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(this.notes);
    //   }, 3000);
    // });
  }

  async findOne(id) {
    // const name = this.getTotal(); --> Middleware error

    const note = await models.Note.findByPk(id);
    if (!note) {
      throw boom.notFound('Note not found');
    }
    if (note.isBlock) {
      throw boom.conflict('Note is block');
    }
    return note;
  }

  async update(id, changes) {
    const note = await this.findOne(id);
    const rta = await note.update(changes);
    return rta;
  }

  async delete(id) {
    const note = await this.findOne(id);
    await note.destroy();
    return { id };
  }
}

module.exports = notesService;
