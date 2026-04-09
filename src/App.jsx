import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PromptSection from './components/PromptSection';
import EditorWorkspace from './components/EditorWorkspace';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

function App() {
  const [tikzCode, setTikzCode] = useState('\\begin{tikzpicture}\n    \\draw (0,0) circle (1);\n\\end{tikzpicture}');

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <Navbar />

      <main>
        {/* Search Header */}
        <SearchBar />

        {/* AI Generation Section */}
        <PromptSection onGenerate={setTikzCode} />

        {/* Editor & Preview Workspace */}
        <EditorWorkspace tikzCode={tikzCode} onCodeChange={setTikzCode} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
