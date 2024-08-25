import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-3 mt-auto">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Sathish Kumar. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
