import React, { useEffect, useState } from 'react';
import Note from './components/Note.tsx';
import { getNotes, saveNote } from './services/NotesService.tsx';
import { NoteInterface } from './models/note.ts';
import Modal from './components/Modal.tsx';

function App() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const notesFromApi = await getNotes();
    setNotes(notesFromApi);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: NoteInterface = {
      title,
      content,
      background_color: bgColor,
      color: textColor,
    };

    await saveNote(formData);
    await fetchNotes(); 

    setTitle('');
    setContent('');
    setBgColor('#ffffff');
    setTextColor('#000000');
    setModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
          {/* FORMULÁRIO */}
          <div style={{ marginLeft: '50px' }}>
            <h1>Publique sua nota!</h1>
            <form onSubmit={handleSubmit}>
              <p>Título</p>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

              <p>Conteúdo</p>
              <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

              <p>Cor de fundo</p>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />

              <p>Cor de texto</p>
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />

              <br />
              <br />
              <button type="submit">Salvar</button>
            </form>
          </div>

          {/* PRÉ-VISUALIZAÇÃO */}
          <div
            style={{
              marginRight: '150px',
              display: 'flex',
              marginTop: '50px',
              justifyContent: 'center',
            }}
          >
            <Note
              title={title || 'Pré-visualização'}
              content={content || 'Escreva algo...'}
              background_color={bgColor}
              color={textColor}
            />
          </div>
        </div>
      </Modal>

      {/* LISTA DE NOTAS */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          border: '15px solid brown',
          padding: '10px',
          margin: '50px',
          flexWrap: 'wrap',
        }}
      >
        {notes.map((note, index) => (
          <Note
            key={index}
            background_color={note.background_color}
            color={note.color}
            title={note.title}
            content={note.content}
          />
        ))}
      </div>

      {/* BOTÃO CRIAR NOTA */}
      <button
        onClick={() => setModalOpen(true)}
        style={{
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
          justifyContent: 'center',
        }}
      >
        <span>Criar Nota</span>
      </button>
    </div>
  );
}

export default App;
