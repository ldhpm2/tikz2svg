import React from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PromptSection from './components/PromptSection';
import EditorWorkspace from './components/EditorWorkspace';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <Navbar />

      <main>
        {/* Search Header */}
        <SearchBar />

        {/* AI Generation Section */}
        <PromptSection />

        {/* Editor & Preview Workspace */}
        <EditorWorkspace />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
