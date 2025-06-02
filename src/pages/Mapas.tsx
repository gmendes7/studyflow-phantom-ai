
import React, { useState, useRef, useEffect } from 'react';
import { Map, Plus, Download, Share, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Mapas = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [nodes, setNodes] = useState<Array<{id: string, text: string, x: number, y: number, level: number, parent?: string}>>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

  const generateMindMap = async () => {
    if (!topic.trim()) {
      toast({
        title: "Tópico necessário",
        description: "Por favor, insira um tópico para gerar o mapa mental.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulação de geração de mapa mental
    setTimeout(() => {
      const centerX = 400;
      const centerY = 300;
      
      const mockNodes = [
        { id: '1', text: topic, x: centerX, y: centerY, level: 0 },
        { id: '2', text: 'Conceito Principal 1', x: centerX - 200, y: centerY - 100, level: 1, parent: '1' },
        { id: '3', text: 'Conceito Principal 2', x: centerX + 200, y: centerY - 100, level: 1, parent: '1' },
        { id: '4', text: 'Conceito Principal 3', x: centerX, y: centerY + 150, level: 1, parent: '1' },
        { id: '5', text: 'Subtópico A', x: centerX - 300, y: centerY - 50, level: 2, parent: '2' },
        { id: '6', text: 'Subtópico B', x: centerX - 100, y: centerY - 200, level: 2, parent: '2' },
        { id: '7', text: 'Subtópico C', x: centerX + 300, y: centerY - 50, level: 2, parent: '3' },
        { id: '8', text: 'Subtópico D', x: centerX + 100, y: centerY - 200, level: 2, parent: '3' },
      ];
      
      setNodes(mockNodes);
      setIsGenerating(false);
      
      toast({
        title: "Mapa mental criado!",
        description: "Seu mapa mental foi gerado com sucesso.",
      });
    }, 2000);
  };

  const getNodeColor = (level: number) => {
    const colors = [
      '#a855f7', // Central (purple)
      '#06b6d4', // Level 1 (cyan)
      '#10b981', // Level 2 (green)
      '#f59e0b', // Level 3 (orange)
    ];
    return colors[level] || '#6b7280';
  };

  const renderConnections = () => {
    return nodes.map(node => {
      if (!node.parent) return null;
      
      const parent = nodes.find(n => n.id === node.parent);
      if (!parent) return null;
      
      return (
        <line
          key={`line-${node.id}`}
          x1={parent.x}
          y1={parent.y}
          x2={node.x}
          y2={node.y}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className="animate-pulse"
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-studyflow-dark text-white relative">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Mapas Mentais</span> Interativos
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Transforme qualquer tópico em um mapa mental visual e interativo, 
              gerado automaticamente com inteligência artificial
            </p>
          </div>

          {/* Input Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-studyflow-neon" />
                Criar Novo Mapa Mental
              </CardTitle>
              <CardDescription>
                Digite um tópico e a IA criará um mapa mental estruturado para você
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Ex: Sistema Solar, Revolução Francesa, Programação..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && generateMindMap()}
                />
                <Button
                  onClick={generateMindMap}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:opacity-90"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Gerar Mapa
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mind Map Visualization */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Map className="h-5 w-5 mr-2 text-studyflow-neon" />
                  Mapa Mental Interativo
                </CardTitle>
                {nodes.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-studyflow-neon text-studyflow-neon hover:bg-studyflow-neon/10"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-studyflow-cyan text-studyflow-cyan hover:bg-studyflow-cyan/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {nodes.length === 0 && !isGenerating && (
                <div className="text-center py-16 text-gray-400">
                  <Map className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Nenhum mapa mental criado ainda</p>
                  <p>Digite um tópico acima para começar</p>
                </div>
              )}

              {isGenerating && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan animate-pulse flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-white animate-spin" />
                  </div>
                  <p className="text-studyflow-neon text-lg">Criando mapa mental com IA...</p>
                </div>
              )}

              {nodes.length > 0 && (
                <div className="relative w-full h-[600px] bg-black/20 rounded-lg overflow-hidden">
                  <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    viewBox="0 0 800 600"
                    className="w-full h-full"
                  >
                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                      </linearGradient>
                      <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                      </radialGradient>
                    </defs>

                    {/* Render connections */}
                    {renderConnections()}

                    {/* Render nodes */}
                    {nodes.map((node, index) => (
                      <g key={node.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.level === 0 ? 50 : 35}
                          fill={getNodeColor(node.level)}
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="2"
                          className="hover:scale-110 transition-transform cursor-pointer"
                          style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))' }}
                        />
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.level === 0 ? 50 : 35}
                          fill="url(#nodeGradient)"
                        />
                        <text
                          x={node.x}
                          y={node.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize={node.level === 0 ? "14" : "12"}
                          fontWeight={node.level === 0 ? "bold" : "normal"}
                          className="pointer-events-none"
                        >
                          {node.text.length > 15 ? `${node.text.substring(0, 15)}...` : node.text}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mapas;
