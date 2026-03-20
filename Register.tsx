import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type Props = {
  onNext: () => void;
  email?: string;
};

export function Step5EmailSent({ onNext, email }: Props) {
  const [resendCooldown, setResendCooldown] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResend = () => {
    if (resendCooldown > 0) return;
    
    toast.success("E-mail de verificação reenviado!");
    setResendCooldown(60); // 60 segundos de cooldown
  };

  const handleSimulateVerification = () => {
    // Simular clique no link de verificação
    toast.success("E-mail verificado com sucesso!");
    setEmailVerified(true);
    
    // Auto-avançar após 1 segundo
    setTimeout(() => onNext(), 1000);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="size-10 text-blue-600" />
      </div>

      <div>
        <h3 className="text-2xl mb-2">Verifique seu e-mail</h3>
        <p className="text-gray-600">
          Enviamos um link de verificação para:
        </p>
        <p className="text-lg mt-2">
          <strong>{email || "seu@email.com"}</strong>
        </p>
      </div>

      {!emailVerified ? (
        <>
          <Alert>
            <Mail className="size-4" />
            <AlertDescription>
              Clique no link enviado para seu e-mail para continuar. 
              O link expira em 24 horas.
            </AlertDescription>
          </Alert>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <p className="text-sm text-gray-700">
              Não recebeu o e-mail?
            </p>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li>• Verifique sua caixa de spam ou lixo eletrônico</li>
              <li>• Confirme se o e-mail está correto</li>
              <li>• Aguarde alguns minutos e tente reenviar</li>
            </ul>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={resendCooldown > 0}
          >
            <RefreshCw className="mr-2 size-4" />
            {resendCooldown > 0 
              ? `Reenviar em ${resendCooldown}s` 
              : "Reenviar e-mail"
            }
          </Button>

          {/* Simulação - Remover em produção */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Para fins de demonstração:</p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleSimulateVerification}
            >
              Simular Verificação de E-mail
            </Button>
          </div>
        </>
      ) : (
        <>
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="size-4 text-green-600" />
            <AlertDescription className="text-green-800">
              E-mail verificado com sucesso! Redirecionando...
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}
