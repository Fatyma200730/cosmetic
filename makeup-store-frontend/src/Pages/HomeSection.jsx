import back2 from '../assets/back2.jpeg'
const HomeSection = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Partie gauche : Image */}
      <img
      className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        src={back2}
      />

      {/* Partie droite : Texte */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md text-center md:text-left space-y-6">
          <h1 className="text-5xl font-bold text-pink-500 animate-fade-in-down">
            Welcome to Glewkit
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up">
            Discover the best makeup products for your skin.
          </p>
          <button
            className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-300 animate-fade-in"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;