import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";

const filters = ["Top Villa", "Self Checkin", "Pet Friendly", "Luxury", "Beachfront"];

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-cover bg-center h-96 flex flex-col justify-center items-center text-white" style={{ backgroundImage: 'url("https://example.com/hero-image.jpg")' }}>
        <h1 className="text-5xl font-bold mb-4">Find your favorite place here!</h1>
        <p className="text-xl">The best prices for over 2 million properties worldwide.</p>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto my-6 flex space-x-4 overflow-x-auto px-4">
        {filters.map((filter, idx) => (
          <button key={idx} className="px-4 py-2 bg-blue-500 text-white rounded-full whitespace-nowrap hover:bg-blue-600">
            {filter}
          </button>
        ))}
      </section>

      {/* Listing Section */}
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {PROPERTYLISTINGSAMPLE.map((property: PropertyProps, idx: number) => (
          <div key={idx} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-lg">{property.name}</h2>
              <p className="text-gray-500">{property.address.city}, {property.address.country}</p>
              <p className="mt-2 font-semibold">${property.price}</p>
              <p className="text-yellow-500">Rating: {property.rating}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
