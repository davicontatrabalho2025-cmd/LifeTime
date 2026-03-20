import { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Award,
  Target,
  Info,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

type Transaction = {
  id: number;
  type: "earned" | "spent";
  amount: number;
  description: string;
  date: string;
  relatedUser?: string;
  className?: string;
};

export function Credits() {
  const [totalCredits] = useState(5);
  const [creditsEarned] = useState(0);
  const [creditsSpent] = useState(0);

  const transactions: Transaction[] = [
    {
      id: 1,
      type: "earned",
      amount: 5,
      description: "Bônus de boas-vindas",
      date: "2026-03-20 10:30",
    },
  ];

  const upcomingEarnings = [
    {
      id: 1,
      className: "Design Thinking Básico",
      student: "João Santos",
      date: "22 Mar 2026",
      credits: 1,
      status: "Confirmado",
    },
  ];

  const weeklyGoal = 5;
  const currentWeekProgress = 0;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Meus Créditos</h1>
          <p className="text-gray-600">
            Gerencie seus créditos e acompanhe transações
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700">Saldo Atual</p>
              <Clock className="size-5 text-blue-600" />
            </div>
            <p className="text-4xl mb-1">{totalCredits}</p>
            <p className="text-sm text-gray-600">créditos disponíveis</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Ganho</p>
              <TrendingUp className="size-5 text-green-600" />
            </div>
            <p className="text-4xl mb-1">{creditsEarned}</p>
            <p className="text-sm text-gray-600">ensinando</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Gasto</p>
              <TrendingDown className="size-5 text-orange-600" />
            </div>
            <p className="text-4xl mb-1">{creditsSpent}</p>
            <p className="text-sm text-gray-600">aprendendo</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Meta Semanal</p>
              <Target className="size-5 text-purple-600" />
            </div>
            <p className="text-4xl mb-1">
              {currentWeekProgress}/{weeklyGoal}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width: `${(currentWeekProgress / weeklyGoal) * 100}%`,
                }}
              />
            </div>
          </Card>
        </div>

        {/* How Credits Work */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <Info className="size-4 text-blue-600" />
          <AlertDescription className="text-gray-700">
            <strong>Como funciona:</strong> 1 hora ensinando = 1 crédito | 1
            crédito = 1 hora de aprendizado. Essa é a base da economia do
            conhecimento LifeTime!
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="transactions" className="mb-8">
          <TabsList>
            <TabsTrigger value="transactions">Histórico</TabsTrigger>
            <TabsTrigger value="upcoming">Próximos Ganhos</TabsTrigger>
            <TabsTrigger value="analytics">Análise</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl mb-4">Histórico de Transações</h3>
              {transactions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Créditos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <Badge
                            variant={
                              tx.type === "earned" ? "default" : "secondary"
                            }
                            className="gap-1"
                          >
                            {tx.type === "earned" ? (
                              <>
                                <ArrowUpRight className="size-3" />
                                Ganho
                              </>
                            ) : (
                              <>
                                <ArrowDownLeft className="size-3" />
                                Gasto
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{tx.description}</p>
                            {tx.relatedUser && (
                              <p className="text-sm text-gray-500">
                                com {tx.relatedUser}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(tx.date).toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              tx.type === "earned"
                                ? "text-green-600 font-medium"
                                : "text-orange-600 font-medium"
                            }
                          >
                            {tx.type === "earned" ? "+" : "-"}
                            {tx.amount}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="size-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma transação ainda</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl mb-4">
                Próximos Créditos a Receber
              </h3>
              {upcomingEarnings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEarnings.map((earning) => (
                    <div
                      key={earning.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">
                          {earning.className}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Aluno: {earning.student}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Calendar className="size-4" />
                          {earning.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{earning.status}</Badge>
                        <p className="text-2xl text-green-600 mt-2">
                          +{earning.credits}
                        </p>
                        <p className="text-sm text-gray-500">créditos</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award className="size-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum crédito pendente</p>
                  <Button variant="outline" className="mt-4">
                    Criar Nova Aula
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl mb-4">Distribuição de Créditos</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Créditos Disponíveis</span>
                      <span className="font-medium">{totalCredits}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Créditos Ganhos</span>
                      <span className="font-medium">{creditsEarned}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Créditos Gastos</span>
                      <span className="font-medium">{creditsSpent}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-600 h-3 rounded-full"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                <h3 className="text-xl mb-4">Dicas para Ganhar Créditos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full size-6 flex items-center justify-center text-sm shrink-0">
                      1
                    </div>
                    <p className="text-sm">
                      Crie aulas sobre suas habilidades mais fortes
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full size-6 flex items-center justify-center text-sm shrink-0">
                      2
                    </div>
                    <p className="text-sm">
                      Mantenha uma agenda flexível e horários variados
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full size-6 flex items-center justify-center text-sm shrink-0">
                      3
                    </div>
                    <p className="text-sm">
                      Peça avaliações para aumentar sua reputação
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full size-6 flex items-center justify-center text-sm shrink-0">
                      4
                    </div>
                    <p className="text-sm">
                      Seja pontual e profissional em todas as aulas
                    </p>
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Economy Explanation */}
        <Card className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-4">A Economia do Conhecimento</h2>
            <p className="text-lg opacity-90 mb-6">
              O LifeTime resolve o problema do "conhecimento bloqueado" por
              cursos caros, criando uma economia colaborativa baseada no tempo.
              Aqui, o tempo é a moeda universal que democratiza o acesso à
              educação, independente do nível econômico.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Clock className="size-12 mx-auto mb-3" />
                <h3 className="text-xl mb-2">Tempo como Moeda</h3>
                <p className="text-sm opacity-90">
                  Seu tempo ensinando vale tanto quanto o de qualquer outro
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="size-12 mx-auto mb-3" />
                <h3 className="text-xl mb-2">Sem Barreiras</h3>
                <p className="text-sm opacity-90">
                  Acesse conhecimento sem limitações financeiras
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <TrendingUp className="size-12 mx-auto mb-3" />
                <h3 className="text-xl mb-2">Economia Justa</h3>
                <p className="text-sm opacity-90">
                  Todos contribuem e todos se beneficiam igualmente
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
