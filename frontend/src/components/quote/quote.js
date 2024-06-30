import React from 'react';
import './quote.css';

const Quote = ({ id, img, author, text, date, onEdit, onDelete }) => {

  const handleEdit = () => {
    // Lógica para editar la cita con el id correspondiente
    const quoteData = { img: img, author: author, text: text, date: date };
    onEdit(id, quoteData);
  };

  const handleDelete = () => {
    // Lógica para eliminar la cita con el id correspondiente
    onDelete(id);
  };

  return (
    <div className="quote_container">
      <img src={img} alt={author} className="quote_image" />
      <h2 className="quote_author">{author}</h2>
      <div className="quote_icon_left"><i className="fa-solid fa-quote-left"></i></div>
      <p className="quote_text">{text}</p>
      <div className="quote_icon_right"><i className="fa-solid fa-quote-right"></i></div>
      <span className="quote_date">{date}</span>
      <div className="quote_actions">
          <button className="quote_edit_button" title='Editar' onClick={handleEdit}><i className="fa-solid fa-pen-to-square"></i></button>
          <button className="quote_delete_button" title='Eliminar' onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
        </div>
    </div>
  );
};

export default Quote;
