const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-base text-gray-500">
              &copy; {currentYear} Auth Template System. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Built with Laravel, Next.js, and Tailwind CSS
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;