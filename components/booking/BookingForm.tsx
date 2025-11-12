import { useState } from "react";
import axios from "axios";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const BookingForm = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.firstName || !form.lastName) {
      return "Please enter your full name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Please enter a valid email.";
    if (!form.phoneNumber) return "Please enter a phone number.";
    if (!/^[0-9]{12,19}$/.test(form.cardNumber.replace(/\s+/g, ""))) return "Please enter a valid card number.";
    if (!form.expirationDate) return "Please enter card expiration date.";
    if (!/^[0-9]{3,4}$/.test(form.cvv)) return "Please enter a valid CVV.";
    if (!form.street) return "Please enter billing street address.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // Post to API
      const payload = { ...form };
      await axios.post("/api/bookings", payload);
      setSuccess("Booking confirmed! A confirmation email will be sent shortly.");
      setForm(initialForm);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to submit booking. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Detail</h2>
      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label>Phone Number</label>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
          </div>
        </div>

        {/* Payment Info */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label>Card Number</label>
          <input name="cardNumber" value={form.cardNumber} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Expiration Date</label>
            <input name="expirationDate" value={form.expirationDate} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" placeholder="MM/YY" />
          </div>
          <div>
            <label>CVV</label>
            <input name="cvv" value={form.cvv} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" placeholder="123" />
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label>Street Address</label>
          <input name="street" value={form.street} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>City</label>
            <input name="city" value={form.city} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label>State</label>
            <input name="state" value={form.state} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Zip Code</label>
            <input name="zip" value={form.zip} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label>Country</label>
            <input name="country" value={form.country} onChange={handleChange} type="text" className="border p-2 w-full mt-2 rounded" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full disabled:opacity-50">
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {error && <p className="mt-4 text-red-600">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
