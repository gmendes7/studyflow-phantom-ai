
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Target, Zap, BookOpen, Map, Calendar, Trophy, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

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

  return (
    <div className="min-h-screen bg-studyflow-dark text-white relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4" role="banner">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-float">
              <Sparkles className="h-4 w-4 text-studyflow-neon mr-2" aria-hidden="true" />
              <span className="text-sm">Powered by AI • Novo na educação</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">StudyFlow</span>
              <br />
              <span className="text-glow">Estude com IA</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed mobile-optimized">
              Transforme seus estudos com inteligência artificial. 
              Planos personalizados, resumos inteligentes e mapas mentais que 
              <span className="text-studyflow-ghost"> aceleram seu aprendizado</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to={user ? "/dashboard" : "/auth"}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:scale-105 transition-transform duration-300 glow-effect text-lg px-8 py-6 w-full sm:w-auto"
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
                className="border-studyflow-neon text-studyflow-neon hover:bg-studyflow-neon/10 text-lg px-8 py-6 w-full sm:w-auto"
                aria-label="Ver demonstração do StudyFlow AI"
              >
                <Target className="h-5 w-5 mr-2" aria-hidden="true" />
                Ver demonstração
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4" role="region" aria-labelledby="features-heading">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Funcionalidades</span> Poderosas
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mobile-optimized">
                Ferramentas inteligentes que se adaptam ao seu estilo de aprendizado
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                  >
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}>
                        <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-studyflow-neon transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 text-center leading-relaxed text-sm sm:text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4" role="region" aria-labelledby="cta-heading">
          <div className="container mx-auto">
            <Card className="bg-gradient-to-r from-studyflow-neon/20 to-studyflow-cyan/20 backdrop-blur-sm border-studyflow-neon/30 glow-effect">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan flex items-center justify-center animate-pulse-glow">
                    <Zap className="h-10 w-10 text-white" aria-hidden="true" />
                  </div>
                </div>
                
                <h3 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 gradient-text">
                  Pronto para revolucionar seus estudos?
                </h3>
                
                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto mobile-optimized">
                  Junte-se a milhares de estudantes que já estão usando IA para estudar de forma mais inteligente
                </p>
                
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:scale-105 transition-transform duration-300 text-lg px-8 py-6 w-full sm:w-auto"
                    aria-label="Começar a usar gratuitamente"
                  >
                    <Star className="h-5 w-5 mr-2" aria-hidden="true" />
                    {user ? 'Continuar estudando' : 'Começar gratuitamente'}
                    <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10" role="contentinfo">
          <div className="container mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Brain className="h-8 w-8 text-studyflow-neon mr-3" aria-hidden="true" />
              <span className="text-2xl font-bold gradient-text">StudyFlow AI</span>
            </div>
            
            <p className="text-gray-400 mb-4">
              Criado por <span className="text-studyflow-neon font-semibold">@schjneiderr</span> 👻
            </p>
            
            <nav className="flex justify-center space-x-6 text-gray-400" aria-label="Links do rodapé">
              <a href="#" className="hover:text-studyflow-neon transition-colors" aria-label="Sobre nós">Sobre</a>
              <a href="#" className="hover:text-studyflow-neon transition-colors" aria-label="Entre em contato">Contato</a>
              <a href="#" className="hover:text-studyflow-neon transition-colors" aria-label="Política de privacidade">Privacidade</a>
              <a href="#" className="hover:text-studyflow-neon transition-colors" aria-label="Termos de uso">Termos</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
