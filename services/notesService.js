const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const getConnection = require('../libs//postgres');

class notesService {
  constructor() {
    this.notes = [];
    this.generate();
  }

  generate() {
    //Generate notes
    this.notes.push(
      {
        name: 'Note 1',
        description: 'Hello 2',
        date: '20/05/2023',
        state: 'pending',
        noteId: faker.string.uuid(),
        isBlock: faker.datatype.boolean(),
      },
      {
        name: 'Note 2',
        description: 'Hello',
        date: '13/10/2023',
        state: 'completed',
        noteId: faker.string.uuid(),
        isBlock: faker.datatype.boolean(),
      },
    );
  }

  async create(data) {
    const newNote = {
      noteId: faker.string.uuid(),
      ...data,
      isBlock: faker.datatype.boolean(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM tasks');
    return rta.rows;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(this.notes);
    //   }, 3000);
    // });
  }

  async findOne(id) {
    // const name = this.getTotal(); --> Middleware error

    const note = this.notes.find((note) => note.noteId === id);
    if (!note) {
      throw boom.notFound('Note not found');
    }
    if (note.isBlock) {
      throw boom.conflict('Note is block');
    }
    return note;
  }

  async update(id, changes) {
    const index = this.notes.findIndex((note) => note.noteId === id);
    if (index === -1) {
      //Boom send the number of error
      throw boom.notFound('Note not found');
    }
    const note = this.notes[index];
    this.notes[index] = { ...note, ...changes };
    return this.notes[index];
  }

  async delete(id) {
    const index = this.notes.findIndex((note) => note.noteId === id);
    if (index === -1) {
      throw new Error('Note not found');
    }
    this.notes.splice(index, 1);
    return { id };
  }
}

module.exports = notesService;
