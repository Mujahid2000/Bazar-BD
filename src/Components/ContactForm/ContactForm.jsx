import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto  pb-20 pt-60 px-4 flex flex-col md:flex-row gap-8">
      {/* Contact Information Section */}
     
      <div className="md:w-1/3 space-y-8 p-9 rounded-lg shadow-md">
        {/* Call To Us Section */}
        <div className="space-y-4 ">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Call To Us</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">We are available 24/7, 7 days a week.</p>
            <p className="text-sm text-gray-600">Phone: +8801611112222</p>
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Write To Us Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Write To US</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-sm text-gray-600">Emails: customer@exclusive.com</p>
            <p className="text-sm text-gray-600">Emails: support@exclusive.com</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="md:w-2/3 p-9 shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email *"
              className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone *"
              className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={6}
            className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;