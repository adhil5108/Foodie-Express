 function Footer() {
  return (
    <footer className="mt-16 bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        
      
        <div>
          <h2 className="text-xl font-bold text-brand mb-3">TastyBite</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Serving happiness, one bite at a time   
            Explore our wide range of dishes and savor every flavor!
          </p>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-brand transition">Home</a></li>
            <li><a href="/menu" className="hover:text-brand transition">Menu</a></li>
            <li><a href="/about" className="hover:text-brand transition">About Us</a></li>
            
          </ul>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/faq" className="hover:text-brand transition">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-brand transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-brand transition">Terms & Conditions</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Get in Touch</h3>
          <p className="text-sm text-gray-600">📍 Kochi, Kerala, India</p>
          <p className="text-sm text-gray-600">📞 +91 98765 43210</p>
          <p className="text-sm text-gray-600">✉️ support@tastybite.in</p>
          <div className="flex gap-3 mt-3">
            <a href="#" className="text-gray-500 hover:text-brand transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-brand transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-brand transition">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

    
      <div className="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TastyBite. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer;