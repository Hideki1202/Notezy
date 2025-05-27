import React from 'react';
import styles from '../App.module.css';
import { NoteInterface } from '../models/note.ts';

function Note({ color, title, content, background_color }: NoteInterface) {
  return (
    <div 
      className={styles.note} 
      style={{ backgroundColor: background_color, color:color }}
    >
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

export default Note;
