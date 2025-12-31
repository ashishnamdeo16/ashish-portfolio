import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = (darkModeFlag: any) => {
  return (
    <footer
      className={`text-center text-sm py-6 space-y-2 ${
        darkModeFlag ? "text-slate-400" : "text-gray-500"
      }`}
    >
      <div className="flex justify-center gap-4 mb-2">
        <a href="https://github.com/ashishnamdeo16" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
          <FaGithub size={25} />
        </a>
        <a href="https://www.linkedin.com/in/ashishnamdeo16/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaLinkedin size={25} />
        </a>
        <a href="https://www.instagram.com/ashish_namdeoo/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <FaInstagram size={25} />
        </a>
      </div>
      <div>© 2025 Ashish Namdeo. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
