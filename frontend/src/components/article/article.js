import React from 'react';
import './article.css';

const Article = ({ id, img, date, title, description, onEdit, onDelete }) => {

  const handleEdit = () => {
    // Lógica para editar el artículo con el id correspondiente
    const articleData = {img: img, date: date, title: title, description: description};
    onEdit(id, articleData);
  };

  const handleDelete = () => {
    // Lógica para eliminar el artículo con el id correspondiente
    onDelete(id);
  };

  return(
  <div className="article_container">
    <img src={img} alt={title} className="article_image" />
    <div className="article_content">
      <div className="article_header">
        <span className="article_date">{date}</span>
        <div className="article_actions">
          <button className="article_edit_button" title='Editar' onClick={handleEdit}><i className="fa-solid fa-pen-to-square"></i></button>
          <button className="article_delete_button" title='Eliminar' onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <h2 className="article_title">{title}</h2>
      <p className="article_description">{description}</p>
      <button className="article_button">Seguir Leyendo</button>
      <div className="article_social-icons">
        <i className="fa-brands fa-facebook-f"></i>
        <i className="fa-brands fa-x-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
      </div>
    </div>
  </div>
  );
};

export default Article;
