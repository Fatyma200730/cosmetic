import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    comment: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('rating', formData.rating);
    formDataToSend.append('comment', formData.comment);
    if (formData.image) formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:8000/api/reviews', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setReviews([response.data, ...reviews]);
      setFormData({ name: '', rating: '', comment: '', image: null });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#f6f7f9]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#242730] mb-8">
          Customer Experiences
        </h2>
        
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover what our community says about our beauty products
        </p>

        {/* Add Review Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#af6768] hover:bg-[#d88c8d] text-white px-8 py-3 rounded-lg transition duration-300"
          >
            Share Your Experience
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#242730]">Write Your Review</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af6768] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star.toString()})}
                      className={`text-2xl ${formData.rating >= star ? 'text-[#af6768]' : 'text-gray-300'} hover:text-[#d88c8d] transition-colors`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <input type="hidden" name="rating" value={formData.rating} required />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Your Review</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af6768] focus:border-transparent"
                  placeholder="Share your honest thoughts about our products..."
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Upload Photo (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <label className="cursor-pointer">
                    <svg className="mx-auto h-10 w-10 text-[#af6768] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="block text-sm text-[#af6768] font-medium">
                      {formData.image ? formData.image.name : 'Click to upload a photo'}
                    </span>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#af6768] hover:bg-[#d88c8d] text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* Reviews Carousel */}
        <div className="mb-16">
          {reviews.length > 0 ? (
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                navigation={{
                  nextEl: '.review-swiper-button-next',
                  prevEl: '.review-swiper-button-prev',
                }}
                spaceBetween={40}  // Increased space between slides
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { 
                    slidesPerView: 2,
                    spaceBetween: 30
                  },
                  1024: { 
                    slidesPerView: 3,
                    spaceBetween: 40
                  },
                }}
                className="px-10 py-6"  // Added padding around swiper
              >
                {reviews.map((review) => (
                  <SwiperSlide key={review.id}>
                    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col mx-2">  
                      <div className="flex items-center mb-4">
                        <div className="bg-[#f6f7f9] text-[#af6768] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                          {review.name ? review.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-[#242730]">{review.name || 'Anonymous'}</h4>
                          <div className="text-[#af6768]">
                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 flex-grow italic">"{review.comment}"</p>
                      {review.image && (
                        <div className="mt-4">
                          <img 
                            src={`http://127.0.0.1:8000/storage/${review.image}`} 
                            alt="Review" 
                            className="w-full h-40 object-cover rounded-md"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="mt-4 text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <button className="review-swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-[#f6f7f9] transition-colors">
                <svg className="w-6 h-6 text-[#af6768]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button className="review-swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-[#f6f7f9] transition-colors">
                <svg className="w-6 h-6 text-[#af6768]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-[#242730]">No reviews yet</h3>
              <p className="mt-2 text-gray-600">
                Be the first to share your experience with our products
              </p>
            </div>
          )}
        </div>

        {/* Review Stats */}
        {reviews.length > 0 && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-[#af6768] mb-2">
                {reviews.length}
              </div>
              <div className="text-gray-600">Total Reviews</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-[#af6768] mb-2">
                {Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)}/5
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-[#af6768] mb-2">
                {reviews.filter(review => review.rating === 5).length}
              </div>
              <div className="text-gray-600">5-Star Reviews</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Review;