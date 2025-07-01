import React from 'react';
import { MousePointer } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-500 text-white py-4 px-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <MousePointer className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">pontocom</h1>
              <p className="text-sm uppercase tracking-wider opacity-90">
                INFORMÁTICA E DESIGN GRÁFICO
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="hover:text-red-200 transition-colors">
              Início
            </a>
            <a href="#quem-somos" className="hover:text-red-200 transition-colors">
              Quem Somos?
            </a>
            <a href="#servicos" className="hover:text-red-200 transition-colors">
              Os Nossos Serviços
            </a>
            <a href="#aspectos-gerais" className="hover:text-red-200 transition-colors">
              Aspectos Gerais
            </a>
            <a href="#fale-connosco" className="hover:text-red-200 transition-colors">
              Fale Connosco
            </a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Content placeholder */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bem-vindos ao pontocom
          </h2>
          <p className="text-lg text-gray-600">
            Sua empresa de informática e design gráfico de confiança.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;