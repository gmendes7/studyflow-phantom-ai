
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Menu, X, Home, BookOpen, Map, Calendar, Trophy, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
    { path: '/resumos', label: 'Resumos', icon: BookOpen },
    { path: '/mapas', label: 'Mapas Mentais', icon: Map },
    { path: '/planner', label: 'Planner IA', icon: Calendar },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const handleAuthAction = () => {
    navigate('/auth');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-studyflow-dark/90 backdrop-blur-md border-b border-white/10 z-50" role="navigation" aria-label="Navegação principal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" aria-label="StudyFlow AI - Página inicial">
            <Brain className="h-8 w-8 text-studyflow-neon group-hover:animate-pulse" aria-hidden="true" />
            <span className="text-xl font-bold gradient-text">StudyFlow AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-studyflow-neon/20 text-studyflow-neon glow-effect'
                      : 'text-gray-300 hover:text-studyflow-neon hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300 flex items-center">
                  <User className="h-4 w-4 mr-2" aria-hidden="true" />
                  {user.email}
                </span>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-studyflow-neon text-studyflow-neon hover:bg-studyflow-neon/10"
                  aria-label="Fazer logout"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleAuthAction}
                className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:opacity-90 transition-opacity"
                aria-label="Fazer login ou criar conta"
              >
                <Trophy className="h-4 w-4 mr-2" aria-hidden="true" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-studyflow-neon"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2" role="menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-studyflow-neon/20 text-studyflow-neon'
                        : 'text-gray-300 hover:text-studyflow-neon hover:bg-white/5'
                    }`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {user ? (
                <div className="pt-4 border-t border-white/10">
                  <div className="px-3 py-2 text-sm text-gray-300 flex items-center mb-2">
                    <User className="h-4 w-4 mr-2" aria-hidden="true" />
                    {user.email}
                  </div>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full border-studyflow-neon text-studyflow-neon hover:bg-studyflow-neon/10"
                    aria-label="Fazer logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleAuthAction}
                  className="mt-4 bg-gradient-to-r from-studyflow-neon to-studyflow-cyan w-full"
                  aria-label="Fazer login ou criar conta"
                >
                  <Trophy className="h-4 w-4 mr-2" aria-hidden="true" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
