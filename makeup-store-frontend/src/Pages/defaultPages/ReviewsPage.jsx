import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaStar, FaUser, FaComment, FaPaperPlane } from 'react-icons/fa';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupérer les avis à partir du backend avec le token JWT
  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token'); // Récupérer le token
      if (!token) return;

      try {
        const response = await Axios.get('http://localhost:8000/api/reviews', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data); // Mettre à jour l'état avec les avis
      } catch (error) {
        console.error('Erreur lors de la récupération des avis:', error.response || error.message);
      }
    };

    fetchReviews();
  }, []);

  // Fonction pour ajouter un avis
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Vous devez être connecté pour ajouter un avis.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await Axios.post(
        'http://localhost:8000/api/reviews',
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews((prevReviews) => [response.data, ...prevReviews]); // Ajouter l'avis au début de la liste
      setRating(1);
      setComment('');
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error.response || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour afficher les étoiles
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#242730] mb-8">Avis des clients</h2>

      {/* Formulaire pour ajouter un avis */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-[#242730] mb-4 flex items-center">
          <FaComment className="mr-2" /> Ajouter un avis
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FaStar className="mr-2" /> Évaluation (1 à 5)
            </label>
            <div className="flex space-x-2">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={`p-2 rounded-full ${index < rating ? 'bg-[#af6768] text-white' : 'bg-gray-200 text-gray-700'} hover:bg-[#d88c8d] transition duration-300`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FaComment className="mr-2" /> Commentaire
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Votre avis"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af6768]"
              rows="4"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#af6768] text-white px-4 py-2 rounded-lg hover:bg-[#d88c8d] transition duration-300 flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" />
            {isSubmitting ? 'Envoi en cours...' : 'Ajouter l\'avis'}
          </button>
        </form>
      </div>

      {/* Liste des avis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-[#242730] mb-4 flex items-center">
          <FaComment className="mr-2" /> Tous les avis
        </h3>
        {reviews.length === 0 ? (
          <p className="text-center text-gray-600">Aucun avis n'a été ajouté pour le moment.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FaUser className="text-gray-700" />
                <p className="font-semibold text-[#242730]">{review.user?.name || 'Utilisateur inconnu'}</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
