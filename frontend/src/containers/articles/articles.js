import React, { useState, useEffect } from 'react';
import './articles.css';
import { Article, AddArticleModal, EditArticleModal } from '../../components';

const Articles = () => {
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(6);
    const [articles, setArticles] = useState([]);
    const [showAddArticleModal, setShowAddArticleModal] = useState(false);
    const [showEditArticleModal, setShowEditArticleModal] = useState(false);

    useEffect(() => {
        const updateArticlesPerPage = () => {
            const width = window.innerWidth;
            if (width < 600) {
                setArticlesPerPage(3);
            } else if (width < 1024) {
                setArticlesPerPage(4);
            } else {
                setArticlesPerPage(6);
            }
        };

        updateArticlesPerPage();
        window.addEventListener('resize', updateArticlesPerPage);
        return () => window.removeEventListener('resize', updateArticlesPerPage);
    }, []);

    useEffect(() => {
        fetch('http://localhost:3003/articles/')
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    const sortedArticles = [...articles].sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.date) - new Date(b.date);
        } else {
            return new Date(b.date) - new Date(a.date);
        }
    });

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedArticles.length / articlesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        setCurrentPage(1);
    };

    const handleAddArticleClick = () => {
        setShowAddArticleModal(true);
    };

    const updateArticles = async () => {
        await fetch('http://localhost:3003/articles/')
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching articles:', error));
    };

    const handleCloseAddArticleModal = () => {
        setShowAddArticleModal(false);
        updateArticles();
    };

    const handleEditArticle = (id, articleData) => {
        setShowEditArticleModal({ show: true, id, ...articleData });
    };    

    const handleCloseEditArticleModal = () => {
        setShowEditArticleModal(false);
        updateArticles();
    };

    const handleDeleteArticle = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Obtener el token JWT del localStorage
            const response = await fetch(`http://localhost:3003/articles/${id}`, {
                method: 'DELETE', // Método DELETE para eliminar el artículo
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token en las cabeceras
                },
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('Artículo eliminado correctamente:', data);
                alert('Artículo eliminado correctamente.');
                updateArticles();
            } else {
                // console.error('Error al eliminar artículo:', data);
                alert('Error al eliminar artículo. Asegúrese de haber iniciado sesión.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className='articles_background' id='articles'>
            <div className='articles_container'>
                <h1>Últimos artículos sobre Inteligencia Artificial</h1>
                <div className='articles_button-add-article'>
                    <button onClick={handleAddArticleClick}><i className="fa-solid fa-plus"></i></button>
                </div>
                <div className='articles_sort'>
                    <label>Ordenar por fecha: </label>
                    <select onChange={handleSortChange} value={sortOrder}>
                        <option value='desc'>Más recientes</option>
                        <option value='asc'>Más antiguos</option>
                    </select>
                </div>
                <div className='articles_container-articles'>
                    {currentArticles.map((article, index) => (
                        <Article
                            key={index}
                            id={article.id}
                            img={article.img}
                            date={article.date}
                            title={article.title}
                            description={article.description}
                            onEdit={handleEditArticle}
                            onDelete={handleDeleteArticle}
                        />
                    ))}
                </div>
                <div className='articles_pagination'>
                    {pageNumbers.map(number => (
                        <button key={number} onClick={() => paginate(number)} className={`page_item ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                    ))}
                </div>
            </div>
            <AddArticleModal show={showAddArticleModal} onClose={handleCloseAddArticleModal} />
            <EditArticleModal show={showEditArticleModal} id={showEditArticleModal?.id} articleData={showEditArticleModal} onClose={handleCloseEditArticleModal} />
        </div>
    );
}

export default Articles;
