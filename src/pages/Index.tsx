
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Target, Zap, BookOpen, Map, Calendar, Trophy, ArrowRight, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: 'Planner de Estudos IA',
      description: 'Digite o que quer estudar e receba um cronograma personalizado com cards interativos',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Resumos + Flashcards',
      description: 'Cole qualquer texto e gere resumos inteligentes com perguntas para revisão',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Map,
      title: 'Mapas Mentais Animados',
      description: 'Transforme conteúdo em nós conectados com animações fluidas e interativas',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      title: 'Sistema de Conquistas',
      description: 'Ganhe medalhas, badges e acompanhe seu progresso com gamificação',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10k+', label: 'Estudantes Ativos' },
    { number: '50k+', label: 'Resumos Gerados' },
    { number: '25k+', label: 'Mapas Criados' },
    { number: '95%', label: 'Satisfação' }
  ];

  const handleDemoClick = () => {
    setIsDemoOpen(true);
  };

  return (
    <div className="min-h-screen bg-studyflow-dark text-white relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4" role="banner">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-float">
              <Sparkles className="h-4 w-4 text-studyflow-neon mr-2" aria-hidden="true" />
              <span className="text-sm text-white font-medium">Powered by AI • Novo na educação</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">StudyFlow</span>
              <br />
              <span className="text-glow text-white">Estude com IA</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed mobile-optimized font-medium">
              Transforme seus estudos com inteligência artificial. 
              Planos personalizados, resumos inteligentes e mapas mentais que 
              <span className="text-studyflow-neon font-bold"> aceleram seu aprendizado</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 w-full max-w-screen-lg mx-auto px-4">
              <Link to={user ? "/dashboard" : "/auth"} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:opacity-90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
                  aria-label="Começar a usar o StudyFlow AI"
                >
                  <Brain className="h-5 w-5 mr-2" aria-hidden="true" />
                  {user ? 'Ir para Dashboard' : 'Comece a estudar com IA'}
                  <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDemoClick}
                className="border-2 border-white bg-black/30 backdrop-blur-sm text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 w-full sm:w-auto cursor-pointer transition-all duration-200"
                aria-label="Ver demonstração do StudyFlow AI"
              >
                <Play className="h-5 w-5 mr-2" aria-hidden="true" />
                Ver demonstração
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group interactive-element">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white font-medium group-hover:text-studyflow-neon transition-colors text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main id="main-content">
          {/* Features Section */}
          <section className="py-20 px-4" role="region" aria-labelledby="features-heading">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                  <span className="gradient-text">Funcionalidades</span> Poderosas
                </h2>
                <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mobile-optimized font-medium">
                  Ferramentas inteligentes que se adaptam ao seu estilo de aprendizado
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-6 w-full max-w-screen-lg mx-auto p-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-transparent border border-white/20 rounded-lg p-6 flex-1 min-w-0 sm:min-w-[280px] text-center group cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-studyflow-neon/25 hover:border-studyflow-neon/50 focus-within:transform focus-within:-translate-y-2 focus-within:shadow-xl focus-within:shadow-studyflow-neon/25 focus-within:border-studyflow-neon/50"
                      tabIndex={0}
                      role="button"
                      aria-label={`Saiba mais sobre ${feature.title}`}
                    >
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-studyflow-neon transition-colors mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base font-medium">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4" role="region" aria-labelledby="cta-heading">
            <div className="container mx-auto">
              <div className="bg-transparent border border-white/20 rounded-lg p-8 sm:p-12 text-center hover:bg-white/5 hover:border-white/30 transition-all duration-300 ease-out focus-within:bg-white/5 focus-within:border-studyflow-neon/50 glow-effect">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan flex items-center justify-center glow-effect">
                    <Zap className="h-10 w-10 text-white" aria-hidden="true" />
                  </div>
                </div>
                
                <h3 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 gradient-text">
                  Pronto para revolucionar seus estudos?
                </h3>
                
                <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto mobile-optimized font-medium">
                  Junte-se a milhares de estudantes que já estão usando IA para estudar de forma mais inteligente
                </p>
                
                <Link to={user ? "/dashboard" : "/auth"} className="w-full sm:w-auto inline-block">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:opacity-90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
                    aria-label="Começar a usar gratuitamente"
                  >
                    <Star className="h-5 w-5 mr-2" aria-hidden="true" />
                    {user ? 'Continuar estudando' : 'Começar gratuitamente'}
                    <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10" role="contentinfo">
          <div className="container mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Brain className="h-8 w-8 text-studyflow-neon mr-3" aria-hidden="true" />
              <span className="text-2xl font-bold gradient-text">StudyFlow AI</span>
            </div>
            
            <p className="text-white font-medium mb-4">
              Criado por <span className="text-studyflow-neon font-bold">@schjneiderr</span> 👻
            </p>
            
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white font-medium" aria-label="Links do rodapé">
              <a 
                href="#" 
                className="hover:text-studyflow-neon transition-colors interactive-element focus-visible:text-studyflow-neon cursor-pointer min-h-[44px] flex items-center" 
                aria-label="Sobre nós"
              >
                Sobre
              </a>
              <a 
                href="#" 
                className="hover:text-studyflow-neon transition-colors interactive-element focus-visible:text-studyflow-neon cursor-pointer min-h-[44px] flex items-center" 
                aria-label="Entre em contato"
              >
                Contato
              </a>
              <a 
                href="#" 
                className="hover:text-studyflow-neon transition-colors interactive-element focus-visible:text-studyflow-neon cursor-pointer min-h-[44px] flex items-center" 
                aria-label="Política de privacidade"
              >
                Privacidade
              </a>
              <a 
                href="#" 
                className="hover:text-studyflow-neon transition-colors interactive-element focus-visible:text-studyflow-neon cursor-pointer min-h-[44px] flex items-center" 
                aria-label="Termos de uso"
              >
                Termos
              </a>
            </nav>
          </div>
        </footer>
      </div>

      {/* Demo Modal */}
      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="bg-studyflow-dark border border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text flex items-center">
              <Play className="h-6 w-6 mr-2 text-studyflow-neon" />
              Demonstração StudyFlow AI
            </DialogTitle>
            <DialogDescription className="text-white font-medium">
              Veja como nossa IA pode revolucionar seus estudos
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-white mb-1 text-sm">{feature.title}</h4>
                    <p className="text-xs text-white/80 font-medium">{feature.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <p className="text-white font-medium mb-4">
                🚀 Demonstração completa em breve! Cadastre-se para ser notificado.
              </p>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:opacity-90 text-white font-bold w-full sm:w-auto" onClick={() => setIsDemoOpen(false)}>
                  Cadastrar-se Agora
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
