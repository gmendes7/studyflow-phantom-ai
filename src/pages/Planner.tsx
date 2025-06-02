
import React, { useState } from 'react';
import { Calendar, Clock, Target, Plus, CheckCircle, Circle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  subject: string;
  duration: string;
  day: string;
  time: string;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Planner = () => {
  const [subject, setSubject] = useState('');
  const [timeAvailable, setTimeAvailable] = useState('');
  const [examDate, setExamDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [schedule, setSchedule] = useState<Task[]>([]);
  const { toast } = useToast();

  const generateSchedule = async () => {
    if (!subject.trim() || !timeAvailable || !examDate) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos para gerar o cronograma.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulação de geração de cronograma com IA
    setTimeout(() => {
      const mockSchedule: Task[] = [
        {
          id: '1',
          title: 'Fundamentos Básicos',
          subject: subject,
          duration: '2h',
          day: 'Segunda',
          time: '19:00',
          completed: false,
          difficulty: 'easy'
        },
        {
          id: '2',
          title: 'Conceitos Intermediários',
          subject: subject,
          duration: '1.5h',
          day: 'Terça',
          time: '20:00',
          completed: false,
          difficulty: 'medium'
        },
        {
          id: '3',
          title: 'Exercícios Práticos',
          subject: subject,
          duration: '3h',
          day: 'Quarta',
          time: '18:30',
          completed: false,
          difficulty: 'medium'
        },
        {
          id: '4',
          title: 'Revisão Geral',
          subject: subject,
          duration: '2h',
          day: 'Quinta',
          time: '19:30',
          completed: false,
          difficulty: 'easy'
        },
        {
          id: '5',
          title: 'Tópicos Avançados',
          subject: subject,
          duration: '2.5h',
          day: 'Sexta',
          time: '19:00',
          completed: false,
          difficulty: 'hard'
        },
        {
          id: '6',
          title: 'Simulado Final',
          subject: subject,
          duration: '1h',
          day: 'Sábado',
          time: '14:00',
          completed: false,
          difficulty: 'hard'
        }
      ];
      
      setSchedule(mockSchedule);
      setIsGenerating(false);
      
      toast({
        title: "Cronograma criado!",
        description: "Seu plano de estudos personalizado foi gerado com sucesso.",
      });
    }, 2500);
  };

  const toggleTask = (taskId: string) => {
    setSchedule(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const completedTasks = schedule.filter(task => task.completed).length;
  const totalTasks = schedule.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-studyflow-dark text-white relative">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Planner</span> Inteligente
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Crie cronogramas de estudo personalizados com IA. 
              Organize seu tempo e maximize seus resultados
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-studyflow-neon" />
                    Criar Cronograma
                  </CardTitle>
                  <CardDescription>
                    Preencha as informações para gerar seu plano personalizado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Matéria/Assunto</label>
                    <Input
                      placeholder="Ex: Matemática, História, Inglês..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tempo disponível por dia</label>
                    <Select value={timeAvailable} onValueChange={setTimeAvailable}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Selecione o tempo" />
                      </SelectTrigger>
                      <SelectContent className="bg-studyflow-dark border-white/20">
                        <SelectItem value="1h">1 hora</SelectItem>
                        <SelectItem value="2h">2 horas</SelectItem>
                        <SelectItem value="3h">3 horas</SelectItem>
                        <SelectItem value="4h">4+ horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data da prova/objetivo</label>
                    <Input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  
                  <Button
                    onClick={generateSchedule}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:opacity-90"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Gerando cronograma...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Gerar Plano IA
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Progress Card */}
              {schedule.length > 0 && (
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-studyflow-neon" />
                      Progresso
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {Math.round(progress)}%
                      </div>
                      <div className="text-sm text-gray-400">
                        {completedTasks} de {totalTasks} tarefas concluídas
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Schedule Section */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-studyflow-neon" />
                    Cronograma Semanal
                  </CardTitle>
                  <CardDescription>
                    Seu plano de estudos personalizado gerado com IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {schedule.length === 0 && !isGenerating && (
                    <div className="text-center py-16 text-gray-400">
                      <Calendar className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Nenhum cronograma criado ainda</p>
                      <p>Preencha os campos ao lado para gerar seu plano de estudos</p>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan animate-pulse flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-white animate-spin" />
                      </div>
                      <p className="text-studyflow-neon text-lg">Criando cronograma personalizado...</p>
                    </div>
                  )}

                  {schedule.length > 0 && (
                    <div className="space-y-4">
                      {schedule.map((task, index) => (
                        <Card 
                          key={task.id} 
                          className={`bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300 ${
                            task.completed ? 'opacity-75' : ''
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleTask(task.id)}
                                  className="p-0 h-auto hover:bg-transparent"
                                >
                                  {task.completed ? (
                                    <CheckCircle className="h-6 w-6 text-studyflow-neon" />
                                  ) : (
                                    <Circle className="h-6 w-6 text-gray-400 hover:text-studyflow-neon transition-colors" />
                                  )}
                                </Button>
                                
                                <div>
                                  <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                                    {task.title}
                                  </h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                    <span className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      {task.day}
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      {task.time} ({task.duration})
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getDifficultyColor(task.difficulty)} text-white`}>
                                  {getDifficultyLabel(task.difficulty)}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
