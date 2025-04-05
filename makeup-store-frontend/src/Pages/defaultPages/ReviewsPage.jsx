import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaStar, FaUser, FaComment, FaPaperPlane, FaImage, FaRegStar, FaRegSmile } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Axios.get("http://localhost:8000/api/reviews");
        const lastFiveReviews = response.data.slice(-5).reverse();
        setReviews(lastFiveReviews);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Veuillez sélectionner une note");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", "Client anonyme");
      formData.append("rating", rating);
      formData.append("comment", comment);
      if (image) formData.append("image", image);

      const response = await Axios.post("http://localhost:8000/api/reviews", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReviews((prev) => [response.data, ...prev.slice(0, 4)]);
      setRating(0);
      setComment("");
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#242730] tracking-tight">Vos Avis Comptent</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Partagez votre expérience et aidez-nous à améliorer nos services
          </p>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-[#af6768] p-3 rounded-lg mr-4">
                <FaComment className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-[#242730]">Donnez votre avis</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              {/* Rating Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Votre note</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-3xl transition-all duration-200 ${
                        (hoverRating || rating) >= star
                          ? "text-yellow-400 transform scale-110"
                          : "text-gray-300"
                      }`}
                    >
                      {(hoverRating || rating) >= star ? <FaStar /> : <FaRegStar />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Votre commentaire</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Décrivez votre expérience..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#af6768] focus:border-transparent"
                  rows="4"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Ajouter une photo</label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#af6768] transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="text-2xl text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Cliquez pour télécharger</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {previewImage && (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all ${
                    isSubmitting
                      ? "bg-[#af6768]/70 cursor-not-allowed"
                      : "bg-[#af6768] hover:bg-[#d88c8d] shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <FaPaperPlane className="mr-3" />
                    {isSubmitting ? "Publication en cours..." : "Publier mon avis"}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <div>
          <div className="flex items-center mb-8">
            <div className="bg-[#242730] p-3 rounded-lg mr-4">
              <FaComment className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-[#242730]">Derniers avis clients</h2>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaRegSmile className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-[#242730] mb-2">Aucun avis pour le moment</h3>
              <p className="text-gray-500">Soyez le premier à partager votre expérience !</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="bg-[#faf0f0] p-3 rounded-full mr-4">
                        <FaUser className="text-[#af6768]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-[#242730]">
                            {review.name || "Client anonyme"}
                          </h3>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`text-lg ${
                                  star <= review.rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">{review.comment}</p>
                        
                        {review.image && (
                          <div className="mt-4">
                            <img
                              src={`http://localhost:8000/storage/${review.image}`}
                              alt="Avis client"
                              className="rounded-lg max-w-xs max-h-48 object-cover shadow-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;