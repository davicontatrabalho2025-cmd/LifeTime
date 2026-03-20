import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  CheckCircle2, 
  User, 
  Mail, 
  Building2, 
  GraduationCap,
  Lightbulb,
  Shield,
  Trophy
} from "lucide-react";
import type { RegistrationData } from "../../pages/Register";

type Props = {
  onComplete: () => void;
  data: RegistrationData;
};

export function Step7Review({ onComplete, data }: Props) {
  const getUserTypeLabel = () => {
    switch (data.userType) {
      case "teacher": return "Ensinar";
      case "learner": return "Aprender";
      case "both": return "Ensinar e Aprender";
      default: return "Não definido";
    }
  };

  const getAuthMethodLabel = () => {
    switch (data.authMethod) {
      case "google": return "Google";
      case "microsoft": return "Microsoft";
      case "email": return "E-mail";
      default: return "E-mail";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="size-10 text-green-600" />
        </div>
        <h3 className="text-3xl mb-2">Tudo pronto!</h3>
        <p className="text-gray-600">
          Revise suas informações antes de finalizar o cadastro
        </p>
      </div>

      {/* User Info Summary */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
            <User className="size-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-2xl mb-1">{data.name || "Nome não definido"}</h4>
            <p className="text-gray-600">{data.email || "E-mail não definido"}</p>
          </div>
          <Badge variant="secondary" className="mt-1">
            <Shield className="mr-1 size-3" />
            Verificado
          </Badge>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Método de autenticação</p>
              <p className="font-medium">{getAuthMethodLabel()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building2 className="size-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Instituição</p>
              <p className="font-medium">{data.institution || "Não informado"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="size-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Objetivo na plataforma</p>
              <p className="font-medium">{getUserTypeLabel()}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Info */}
      {(data.bio || data.skills?.length || data.interests?.length) && (
        <Card className="p-6">
          <h4 className="text-lg mb-4">Perfil</h4>
          
          {data.bio && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Sobre você</p>
              <p className="text-gray-700">{data.bio}</p>
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="size-4 text-gray-400" />
                <p className="text-sm text-gray-500">Habilidades para ensinar</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {data.interests && data.interests.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="size-4 text-gray-400" />
                <p className="text-sm text-gray-500">Interesses em aprender</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Welcome Benefits */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <h4 className="text-lg mb-4 flex items-center gap-2">
          <CheckCircle2 className="size-5 text-blue-600" />
          Benefícios de boas-vindas
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
              1
            </div>
            <div>
              <p className="font-medium">5 créditos de boas-vindas</p>
              <p className="text-sm text-gray-600">Para começar sua jornada de aprendizado</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
              2
            </div>
            <div>
              <p className="font-medium">Acesso ao guia de introdução</p>
              <p className="text-sm text-gray-600">Aprenda como maximizar seu tempo na plataforma</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
              3
            </div>
            <div>
              <p className="font-medium">Comunidade de apoio</p>
              <p className="text-sm text-gray-600">Conecte-se com mentores e outros aprendizes</p>
            </div>
          </li>
        </ul>
      </Card>

      {/* Terms and Complete */}
      <div className="space-y-4">
        <p className="text-sm text-gray-600 text-center">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e{" "}
          <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
        </p>

        <Button 
          onClick={onComplete} 
          className="w-full" 
          size="lg"
        >
          <CheckCircle2 className="mr-2 size-5" />
          Finalizar Cadastro
        </Button>
      </div>
    </div>
  );
}
