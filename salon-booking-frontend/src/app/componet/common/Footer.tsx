"use client";

export default function Footer() {
  return(
    <footer id="contact" className="bg-gray-700 border-t border-gray-900 pt-16 pb-8 px-8">
         <div className="container mx-auto max-w-6xl">
        
        {/* The Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap:12 lg:gap-50 mb-12">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-sans">Saloon</h2>
            <p className="text-white text-sm ">
              Redefining the grooming experience with precision, style, and modern technology. Book your transformation today.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:ml-15 mt-3 md:mt-0">
            <h3 className="font-bold text-sky-100 mb-4 uppercase text-sm tracking-widest">Links</h3>
            <ul className="flex flex-col gap-2 text-white">
              <li><a href="#home" className="hover:text-sky-600 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-sky-600 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-sky-600 transition-colors">Services</a></li>
            </ul>
          </div>

          {/* Col 3: Socials */}
          <div className="mt-3 md:mt-0">
            <h3 className="font-bold text-sky-100 mb-4 uppercase text-sm tracking-widest">Connect</h3>
            <ul className="flex flex-col gap-2 text-white">
              <li>
                <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sky-600 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sky-600 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691V11.41h3.129V8.797c0-3.1 1.892-4.788 4.657-4.788 1.325 0 2.463.099 2.795.143v3.241l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.311h3.59l-.467 3.296h-3.123V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                  Facebook
                </a>
              </li>
              <li className="flex items-center gap-2 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-sky-600">
                  <path d="M20.52 3.48C18.2 1.16 15.09 0 11.83 0 5.3 0 .06 5.24.06 11.78c0 2.08.55 4.1 1.6 5.88L0 24l6.56-1.72c1.64.9 3.48 1.38 5.28 1.38 6.53 0 11.77-5.24 11.77-11.78 0-3.25-1.16-6.36-3.09-8.4zM12 21.8c-1.65 0-3.24-.44-4.62-1.27l-.33-.2-3.9 1.02 1.04-3.8-.22-.35C2.2 15.63 1.8 13.76 1.8 11.8 1.8 6.2 6.27 1.8 11.83 1.8c2.96 0 5.74 1.15 7.83 3.23 2.08 2.09 3.24 4.86 3.24 7.84 0 5.61-4.47 10.23-10.9 10.23zm5.45-7.4c-.3-.15-1.8-.88-2.07-.98-.28-.1-.47-.15-.66.15s-.76.98-.93 1.18c-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.28-.02-.43.13-.57.14-.14.31-.37.46-.55.15-.2.2-.34.3-.56.1-.22.05-.42-.02-.58-.07-.15-.66-1.6-.9-2.2-.24-.6-.48-.52-.66-.52h-.56c-.2 0-.52.07-.8.39-.28.32-1.06 1.04-1.06 2.52 0 1.48 1.09 2.92 1.24 3.12.15.2 2.14 3.35 5.18 4.7.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.1 1.8-.73 2.05-1.44.24-.7.24-1.3.17-1.44-.07-.15-.26-.23-.55-.38z" />
                </svg>
                WhatsApp: +94 xxx xxx xxx
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Ashan Dhanushka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}