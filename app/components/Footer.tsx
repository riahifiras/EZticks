import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2D2C3C] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-around">
          <div>
            <h4 className="text-lg font-semibold mb-4">Company Info</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">FAQs</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Account Support</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Listing Events</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Event Ticketing</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Ticket Purchase Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Concerts & Gigs</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Festivals & Lifestyle</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Business & Networking</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Food & Drinks</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Performing Arts</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Sports & Outdoors</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Exhibitions</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Workshops, Conferences & Classes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Facebook</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Instagram</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Twitter</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Youtube</a></li>
            </ul>
          </div>
          
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>©2024 EZticks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
