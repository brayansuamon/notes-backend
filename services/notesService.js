const { faker } = require('@faker-js/faker');

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
        noteId: '12',
      },
      {
        name: 'Note 2',
        description: 'Hello',
        date: '13/10/2023',
        state: 'completed',
        noteId: '22',
      },
    );
  }

  async create(data) {
    const newNote = {
      noteId: faker.string.uuid(),
      ...data,
    };
    this.notes.push(newNote);
    return newNote;
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.notes);
      }, 3000);
    });
  }

  async findOne(id) {
    return this.notes.find((note) => note.noteId === id);
  }

  async update(id, changes) {
    const index = this.notes.findIndex((note) => note.noteId === id);
    if (index === -1) {
      throw new Error('note not found');
    }
    const note = this.notes[index];
    this.notes[index] = { ...note, ...changes };
    return this.notes[index];
  }

  async delete(id) {
    const index = this.notes.findIndex((note) => note.noteId === id);
    if (index === -1) {
      throw new Error('note not found');
    }
    this.notes.splice(index, 1);
    return { id };
  }
}

module.exports = notesService;
