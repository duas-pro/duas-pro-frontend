import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Links</h3>
            <ul>
              <li><a href="/home" className="hover:underline">Home</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/contact" className="hover:underline">Impressum</a></li>
              <li><a href="/contact" className="hover:underline">Datenschutzerklärung</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul>
              <li><a href="/about" className="hover:underline">About us</a></li>
              <li><a href="/contact" className="hover:underline">Spenden</a></li>
              <li><a href="/contact" className="hover:underline">Dein Feedback</a></li>
              <li><a href="/contact" className="hover:underline">Developers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Social Media</h3>
            <ul>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
              <li><a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
