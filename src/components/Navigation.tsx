
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

  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className="fixed top-0 w-full bg-studyflow-dark/95 backdrop-blur-md border-b border-white/10 z-50" 
      role="navigation" 
      aria-label="Navegação principal"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group interactive-element" 
            aria-label="StudyFlow AI - Página inicial"
            onClick={closeMenu}
          >
            <Brain className="h-8 w-8 text-studyflow-neon group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            <span className="text-xl font-bold gradient-text">StudyFlow AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 interactive-element min-h-[44px] ${
                    isActive
                      ? 'bg-studyflow-neon/20 text-studyflow-neon glow-effect border border-studyflow-neon/30'
                      : 'text-medium-contrast hover:text-studyflow-neon hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center text-sm text-medium-contrast bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                  <User className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span className="font-medium">{user.email}</span>
                </div>
                <Button 
                  onClick={handleSignOut}
                  className="btn-secondary min-h-[44px]"
                  aria-label="Fazer logout"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleAuthAction}
                className="btn-primary ml-4"
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
              className="text-medium-contrast hover:text-studyflow-neon interactive-element min-h-[44px] min-w-[44px]"
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
          <div id="mobile-menu" className="md:hidden py-4 border-t border-white/10 bg-studyflow-dark/95 backdrop-blur-md">
            <div className="flex flex-col space-y-2" role="menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 interactive-element min-h-[44px] ${
                      isActive
                        ? 'bg-studyflow-neon/20 text-studyflow-neon border border-studyflow-neon/30'
                        : 'text-medium-contrast hover:text-studyflow-neon hover:bg-white/5'
                    }`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              {user ? (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="px-4 py-3 text-sm text-medium-contrast flex items-center bg-white/5 rounded-lg border border-white/10">
                    <User className="h-4 w-4 mr-2" aria-hidden="true" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <Button 
                    onClick={handleSignOut}
                    className="btn-secondary w-full min-h-[48px]"
                    aria-label="Fazer logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/10">
                  <Button 
                    onClick={handleAuthAction}
                    className="btn-primary w-full min-h-[48px]"
                    aria-label="Fazer login ou criar conta"
                  >
                    <Trophy className="h-4 w-4 mr-2" aria-hidden="true" />
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
