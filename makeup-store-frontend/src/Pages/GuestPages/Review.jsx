import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Neriezza K.",
    rating: 5,
    review: "Love this! Just started using it and...",
    image: "https://images.loox.io/uploads/2020/6/18/4JC1l2QTO.jpg",
  },
  {
    id: 2,
    name: "Rishana A.",
    rating: 5,
    review:
      "I love Alya, thanks to Alya I got clear skin from adult acne, recommend it to all 💕💕",
    image: "https://alyaskin.com.au/cdn/shop/files/AS_JULY_WEB-23.jpg?v=1741166094&width=750",
  },
  {
    id: 3,
    name: "Ameera W.",
    rating: 5,
    review:
      "I've always struggled with finding the right products for my skin and after using Alya Skin, I'm forever grateful!",
    image: "https://images.loox.io/uploads/2023/1/24/tcSl8WpXO.jpg",
  },
];

const Review = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "" });
  const [photo, setPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setRating(0);
      setReview("");
      setUserInfo({ firstName: "", lastName: "", email: "" });
      setPhoto(null);
      setIsOpen(false);
      setSubmitted(false);
      setStep(1);
    }, 2000);
  };

  return (
    <section className="bg-custom-pink py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center pb-5 border-b">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-2xl">★★★★★</span>
            <span className="text-lg font-semibold">798 Reviews</span>
          </div>
          <button onClick={() => setIsOpen(true)} className="bg-custom-burry text-white px-4 py-2 rounded">
            Write a review
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img src={review.image} alt={review.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="font-bold mt-2">{review.name}</h3>
              <p className="text-red-500">★★★★★</p>
              <p className="text-sm mt-2">{review.review}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6 w-[500px]">
          {/* Étape 1 : Choisir la note */}
          {step === 1 && !submitted && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">How would you rate this item?</h2>
              <div className="flex justify-center space-x-2 my-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 cursor-pointer ${rating >= star ? "text-red-500 fill-red-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={handleNext} disabled={rating === 0}>
                Next
              </button>
            </div>
          )}

          {/* Étape 2 : Laisser un avis */}
          {step === 2 && !submitted && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-center">Tell us more!</h2>
              <textarea className="w-full border p-2 rounded resize-none" rows="4" placeholder="Share your experience" value={review} onChange={(e) => setReview(e.target.value)} />
              <button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={handleNext} disabled={!review}>
                Next
              </button>
            </div>
          )}

          {/* Étape 3 : Informations de l'utilisateur */}
          {step === 3 && !submitted && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-center">Your Information</h2>
              <input type="text" placeholder="First Name" className="w-full border p-2 rounded mb-2" value={userInfo.firstName} onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })} />
              <input type="text" placeholder="Last Name" className="w-full border p-2 rounded mb-2" value={userInfo.lastName} onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} />
              <input type="email" placeholder="Email" className="w-full border p-2 rounded mb-2" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full border p-2 rounded" />
              {photo && <img src={URL.createObjectURL(photo)} alt="Uploaded" className="w-20 h-20 object-cover rounded mt-2" />}
              <button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={handleSubmit} disabled={!userInfo.email || !userInfo.firstName || !userInfo.lastName}>
                Done
              </button>
            </div>
          )}

          {/* Confirmation Après Soumission */}
          {submitted && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Thank you!</h2>
              <p>Your review has been submitted.</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          )}
        </div>
      </Dialog>
    </section>
  );
};

export default Review;
