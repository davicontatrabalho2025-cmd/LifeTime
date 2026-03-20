import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Progress } from "../ui/progress";
import { CheckCircle2, XCircle, Loader2, Shield, Mail, User, AlertTriangle } from "lucide-react";
import type { RegistrationData } from "../../pages/Register";

type Props = {
  onNext: () => void;
  data: RegistrationData;
};

type ValidationCheck = {
  id: string;
  label: string;
  status: "pending" | "checking" | "success" | "error";
  message?: string;
};

export function Step4Validation({ onNext, data }: Props) {
  const [checks, setChecks] = useState<ValidationCheck[]>([
    { id: "email", label: "Verificação de e-mail único", status: "pending" },
    { id: "fraud", label: "Detecção de fraude", status: "pending" },
    { id: "data", label: "Validação de dados", status: "pending" },
    { id: "security", label: "Análise de segurança", status: "pending" },
  ]);

  const [currentCheckIndex, setCurrentCheckIndex] = useState(0);
  const [allComplete, setAllComplete] = useState(false);

  useEffect(() => {
    if (currentCheckIndex < checks.length) {
      // Marcar como "checking"
      setChecks(prev => prev.map((check, idx) => 
        idx === currentCheckIndex ? { ...check, status: "checking" } : check
      ));

      // Simular validação
      const timer = setTimeout(() => {
        setChecks(prev => prev.map((check, idx) => {
          if (idx === currentCheckIndex) {
            // Simular possível erro em detecção de fraude (raro)
            if (check.id === "fraud" && Math.random() < 0.1) {
              return {
                ...check,
                status: "error",
                message: "Atividade suspeita detectada. Entre em contato com o suporte."
              };
            }
            return { ...check, status: "success" };
          }
          return check;
        }));

        setCurrentCheckIndex(prev => prev + 1);
      }, 1500 + Math.random() * 1000);

      return () => clearTimeout(timer);
    } else {
      // Todas as verificações completas
      const hasErrors = checks.some(c => c.status === "error");
      if (!hasErrors) {
        setAllComplete(true);
      }
    }
  }, [currentCheckIndex]);

  const progress = ((currentCheckIndex) / checks.length) * 100;
  const hasErrors = checks.some(c => c.status === "error");

  const getIcon = (status: ValidationCheck["status"]) => {
    switch (status) {
      case "pending":
        return <div className="size-5 rounded-full border-2 border-gray-300" />;
      case "checking":
        return <Loader2 className="size-5 text-blue-600 animate-spin" />;
      case "success":
        return <CheckCircle2 className="size-5 text-green-500" />;
      case "error":
        return <XCircle className="size-5 text-red-500" />;
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="size-8 text-blue-600" />
        </div>
        <p className="text-gray-600">
          Estamos validando suas informações automaticamente para garantir a segurança da plataforma.
        </p>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Validando...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Validation Checks */}
      <div className="space-y-4">
        {checks.map((check) => (
          <div 
            key={check.id}
            className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
              check.status === "checking" 
                ? "border-blue-200 bg-blue-50" 
                : check.status === "success"
                ? "border-green-200 bg-green-50"
                : check.status === "error"
                ? "border-red-200 bg-red-50"
                : "border-gray-200"
            }`}
          >
            {getIcon(check.status)}
            <div className="flex-1">
              <p className="font-medium">{check.label}</p>
              {check.status === "checking" && (
                <p className="text-sm text-gray-600 mt-1">Verificando...</p>
              )}
              {check.status === "success" && (
                <p className="text-sm text-green-700 mt-1">✓ Verificação aprovada</p>
              )}
              {check.status === "error" && check.message && (
                <p className="text-sm text-red-700 mt-1">{check.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {allComplete && !hasErrors && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="size-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Todas as validações foram concluídas com sucesso! Seus dados estão seguros.
          </AlertDescription>
        </Alert>
      )}

      {hasErrors && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertDescription>
            Algumas validações falharamsabemos. Por favor, entre em contato com o suporte 
            ou tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      )}

      {/* Anti-Fraud Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>🔒 Sistema Antifraude:</strong> Verificamos padrões suspeitos, e-mails temporários 
          e dados inconsistentes para manter nossa comunidade segura.
        </p>
      </div>

      <Button 
        onClick={onNext} 
        className="w-full" 
        size="lg"
        disabled={!allComplete || hasErrors}
      >
        {allComplete && !hasErrors ? "Continuar" : "Aguarde..."}
      </Button>
    </div>
  );
}
