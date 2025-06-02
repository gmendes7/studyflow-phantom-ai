
import React, { useState } from 'react';
import { Brain, BookOpen, Map, Calendar, Trophy, Plus, Clock, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [weeklyProgress] = useState(68);
  const [dailyStreak] = useState(12);
  
  const recentActivities = [
    { 
      type: 'resumo', 
      title: 'História do Brasil - República', 
      time: '2h atrás',
      score: 95 
    },
    { 
      type: 'mapa', 
      title: 'Biologia - Sistema Nervoso', 
      time: '1 dia atrás',
      score: 88 
    },
    { 
      type: 'planner', 
      title: 'Cronograma de Matemática', 
      time: '2 dias atrás',
      score: 92 
    }
  ];

  const achievements = [
    { icon: '🏆', name: 'Primeira Semana', description: 'Complete 7 dias seguidos' },
    { icon: '📚', name: 'Leitor Voraz', description: '50 resumos criados' },
    { icon: '🧠', name: 'Mestre Mental', description: '25 mapas mentais' },
    { icon: '⚡', name: 'Raio de Estudos', description: 'Sequência de 10 dias' }
  ];

  const quickActions = [
    {
      title: 'Criar Resumo',
      description: 'Gere resumos inteligentes',
      icon: BookOpen,
      path: '/resumos',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Mapa Mental',
      description: 'Visualize conhecimento',
      icon: Map,
      path: '/mapas',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Planner IA',
      description: 'Organize seus estudos',
      icon: Calendar,
      path: '/planner',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-studyflow-dark text-white relative">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Bem-vindo de volta! <span className="gradient-text">🎯</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Continue sua jornada de aprendizado com IA
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{weeklyProgress}%</div>
                <div className="text-sm text-gray-400">Meta Semanal</div>
                <Progress value={weeklyProgress} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{dailyStreak}</div>
                <div className="text-sm text-gray-400">Dias Seguidos</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">24</div>
                <div className="text-sm text-gray-400">Resumos Criados</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">1,240</div>
                <div className="text-sm text-gray-400">XP Total</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Plus className="h-6 w-6 mr-2 text-studyflow-neon" />
              Ações Rápidas
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.path}>
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-studyflow-neon transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {action.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-studyflow-neon" />
                  Atividades Recentes
                </CardTitle>
                <CardDescription>Seu progresso nos últimos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan flex items-center justify-center mr-3">
                          {activity.type === 'resumo' && <BookOpen className="h-5 w-5 text-white" />}
                          {activity.type === 'mapa' && <Map className="h-5 w-5 text-white" />}
                          {activity.type === 'planner' && <Calendar className="h-5 w-5 text-white" />}
                        </div>
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-gray-400">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-studyflow-neon font-semibold">
                        {activity.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-studyflow-neon" />
                  Conquistas
                </CardTitle>
                <CardDescription>Badges e medalhas desbloqueadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center group">
                      <div className="text-2xl mb-2 group-hover:animate-bounce">
                        {achievement.icon}
                      </div>
                      <div className="font-medium text-sm mb-1">
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {achievement.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
