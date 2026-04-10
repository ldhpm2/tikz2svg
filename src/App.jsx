import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PromptSection from './components/PromptSection';
import EditorWorkspace from './components/EditorWorkspace';
import FilesSection from './components/FilesSection';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

function App() {
  const [tikzCode, setTikzCode] = useState('\\begin{tikzpicture}\n    \\draw (0,0) circle (1);\n\\end{tikzpicture}');
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = (username) => {
    setUser({ username });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="tikz-app">
      {/* Navigation */}
      <Navbar 
        user={user} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout}
      />

      {/* Flash Messages Container Placeholder */}
      <div className="flash-messages-container"></div>

      {/* Main Content */}
      <SearchBar />
      
      <PromptSection onGenerate={setTikzCode} />
      
      <EditorWorkspace tikzCode={tikzCode} onCodeChange={setTikzCode} />
      
      <FilesSection />

      {/* Footer */}
      <Footer />

      {/* Persistent Chatbot Widget */}
      <ChatWidget />

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
