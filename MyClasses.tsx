import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Clock, Users, GraduationCap, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl mb-6">
              <span className="text-blue-600">LifeTime:</span> Transforme Tempo em Conhecimento
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Uma plataforma colaborativa onde 1 hora ensinando = 1 crédito para aprender. 
              Democratize o acesso à educação através da economia do conhecimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate("/register")}
              >
                Começar Agora
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate("/login")}
              >
                Já tenho conta
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758525861742-fef623c2ad2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWJvcmF0aXZlJTIwbGVhcm5pbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NzQwMzA0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Collaborative Learning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Clock className="size-7 text-blue-600" />
            </div>
            <h3 className="text-2xl mb-4">Tempo como Moeda</h3>
            <p className="text-gray-600">
              1 hora ensinando = 1 crédito. Use seus créditos para aprender qualquer habilidade na plataforma.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Users className="size-7 text-purple-600" />
            </div>
            <h3 className="text-2xl mb-4">Comunidade Colaborativa</h3>
            <p className="text-gray-600">
              Conecte-se com pessoas que querem ensinar e aprender. Construa relacionamentos significativos.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <GraduationCap className="size-7 text-green-600" />
            </div>
            <h3 className="text-2xl mb-4">Educação Democratizada</h3>
            <p className="text-gray-600">
              Sem barreiras financeiras. Acesse conhecimento independente do seu nível econômico.
            </p>
          </Card>
        </div>

        {/* How it Works */}
        <div className="mt-24">
          <h2 className="text-4xl text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="text-xl mb-2">Cadastre-se Gratuitamente</h4>
                  <p className="text-gray-600">Crie sua conta em minutos usando e-mail ou redes sociais.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="text-xl mb-2">Ensine e Ganhe Créditos</h4>
                  <p className="text-gray-600">Compartilhe suas habilidades e acumule créditos de tempo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="text-xl mb-2">Use Créditos para Aprender</h4>
                  <p className="text-gray-600">Troque seus créditos por aulas de qualquer habilidade disponível.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760793226972-970b00864204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbm93bGVkZ2UlMjBzaGFyaW5nJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3NDAzMDQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Knowledge Sharing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl mb-4">Pronto para Começar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se à comunidade LifeTime e transforme seu tempo em conhecimento
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8"
            onClick={() => navigate("/register")}
          >
            Criar Conta Gratuita
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
