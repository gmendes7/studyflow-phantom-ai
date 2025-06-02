
import React, { useState } from 'react';
import { BookOpen, Upload, Sparkles, Download, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Resumos = () => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumo, setResumo] = useState('');
  const [flashcards, setFlashcards] = useState<Array<{pergunta: string, resposta: string}>>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Texto necessário",
        description: "Por favor, insira um texto para gerar o resumo.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulação de API - substituir por integração real com OpenAI
    setTimeout(() => {
      const mockResumo = `
# Resumo Inteligente

## Pontos Principais:
- **Conceito 1**: Explicação detalhada do primeiro conceito abordado no texto
- **Conceito 2**: Desenvolvimento do segundo ponto importante
- **Conceito 3**: Análise do terceiro elemento central

## Ideias Centrais:
O texto apresenta uma análise abrangente sobre o tema proposto, destacando aspectos fundamentais que contribuem para o entendimento completo da matéria.

## Conclusões:
As informações apresentadas demonstram a importância de compreender os conceitos de forma integrada e sistemática.
      `;

      const mockFlashcards = [
        {
          pergunta: "Qual é o primeiro conceito abordado no texto?",
          resposta: "O primeiro conceito refere-se à explicação detalhada do ponto inicial apresentado."
        },
        {
          pergunta: "Como os conceitos se relacionam entre si?",
          resposta: "Os conceitos apresentam uma relação integrada que contribui para o entendimento sistemático."
        },
        {
          pergunta: "Qual é a principal conclusão do texto?",
          resposta: "A principal conclusão destaca a importância da compreensão integrada dos conceitos."
        }
      ];

      setResumo(mockResumo);
      setFlashcards(mockFlashcards);
      setIsGenerating(false);
      
      toast({
        title: "Resumo gerado!",
        description: "Seu resumo e flashcards foram criados com sucesso.",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência.",
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
              <span className="gradient-text">Resumos</span> + Flashcards IA
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Cole seu texto ou faça upload de um PDF e receba resumos inteligentes 
              com flashcards para otimizar sua revisão
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-studyflow-neon" />
                  Conteúdo para Análise
                </CardTitle>
                <CardDescription>
                  Cole seu texto ou faça upload de um arquivo para gerar o resumo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Cole aqui o texto que você quer resumir... 
                  
Por exemplo: conceitos de física, história, literatura, ou qualquer conteúdo acadêmico."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                />
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-studyflow-neon to-studyflow-cyan hover:opacity-90 flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Gerar Resumo IA
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-studyflow-neon text-studyflow-neon hover:bg-studyflow-neon/10"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-studyflow-neon" />
                  Resultado Gerado
                </CardTitle>
                <CardDescription>
                  Resumo inteligente e flashcards para revisão
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!resumo && !isGenerating && (
                  <div className="text-center py-12 text-gray-400">
                    <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Digite ou cole um texto e clique em "Gerar Resumo IA" para começar</p>
                  </div>
                )}

                {isGenerating && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-studyflow-neon to-studyflow-cyan animate-pulse flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white animate-spin" />
                    </div>
                    <p className="text-studyflow-neon">Analisando conteúdo com IA...</p>
                  </div>
                )}

                {resumo && (
                  <Tabs defaultValue="resumo" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/10">
                      <TabsTrigger value="resumo" className="data-[state=active]:bg-studyflow-neon">
                        Resumo
                      </TabsTrigger>
                      <TabsTrigger value="flashcards" className="data-[state=active]:bg-studyflow-neon">
                        Flashcards
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="resumo" className="mt-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">Seu Resumo</h3>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(resumo)}
                              className="border-studyflow-neon text-studyflow-neon hover:bg-studyflow-neon/10"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-studyflow-neon text-studyflow-neon hover:bg-studyflow-neon/10"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap text-gray-300 font-sans">
                            {resumo}
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="flashcards" className="mt-4">
                      <div className="space-y-4">
                        {flashcards.map((card, index) => (
                          <Card key={index} className="bg-white/5 border-white/20 hover:bg-white/10 transition-colors">
                            <CardContent className="p-4">
                              <div className="mb-3">
                                <span className="text-sm text-studyflow-neon font-semibold">Pergunta {index + 1}:</span>
                                <p className="mt-1 font-medium">{card.pergunta}</p>
                              </div>
                              <div>
                                <span className="text-sm text-studyflow-cyan font-semibold">Resposta:</span>
                                <p className="mt-1 text-gray-300">{card.resposta}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumos;
