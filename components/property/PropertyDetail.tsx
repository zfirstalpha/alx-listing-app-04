import React from "react";
import { PropertyProps } from "@/interfaces";

interface Props {
  property: PropertyProps;
}

const PropertyDetail: React.FC<Props> = ({ property }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <img src={property.image} alt={property.name} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
          <p className="text-gray-500 mb-4">{property.address.city}, {property.address.state}, {property.address.country}</p>

          <div className="flex items-center space-x-4 mb-4">
            <p className="text-2xl font-semibold">${property.price}</p>
            <p className="text-yellow-500">Rating: {property.rating}</p>
            {property.discount && property.discount.length > 0 && (
              <span className="ml-2 text-sm text-green-600">{property.discount}% off</span>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Categories</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {property.category.map((cat, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{cat}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Offers</h3>
            <ul className="list-disc list-inside mt-2">
              <li>Beds: {property.offers.bed}</li>
              <li>Showers: {property.offers.shower}</li>
              <li>Occupants: {property.offers.occupants}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
