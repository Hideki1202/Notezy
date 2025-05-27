import React from 'react';
import Note from './components/Note.tsx';
import { NoteInterface } from './models/note.ts';

const notes: NoteInterface[] = [
  {
    color: 'red',
    title: 'Nota 1',
    content: 'Conteúdo da nota 1',
  },
  {
    color: 'blue',
    title: 'Nota 2',
    content: 'Conteúdo da nota 2',
  },
  {
    color: 'green',
    title: 'Nota 3',
    content: 'Conteúdo da nota 3',
  },
];

function App() {
  return (
    <div>
      <div style=
      {{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        border: '15px solid brown',
        padding: '10px',
        margin: '50px'
      }}>
        {notes.map((note) => (
          <Note
            color={note.color}
            title={note.title}
            content={note.content}
          />
        ))}
      </div>
      <button style=
      {{
        backgroundColor: 'red',
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        width: '100px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span> Criar Nota </span>
      </button>
    </div>
  );
}

export default App;