import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Info, Check, X } from "lucide-react";
import type { RegistrationData } from "../../pages/Register";
import { useState } from "react";

type Props = {
  onNext: () => void;
  onUpdate: (data: Partial<RegistrationData>) => void;
  data: RegistrationData;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Step2BasicInfo({ onNext, onUpdate, data }: Props) {
  const [password, setPassword] = useState("");
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      password: data.password || "",
    }
  });

  const watchPassword = watch("password") || "";

  const passwordRequirements = [
    { label: "Mínimo 8 caracteres", valid: watchPassword.length >= 8 },
    { label: "Uma letra maiúscula", valid: /[A-Z]/.test(watchPassword) },
    { label: "Uma letra minúscula", valid: /[a-z]/.test(watchPassword) },
    { label: "Um número", valid: /[0-9]/.test(watchPassword) },
  ];

  const onSubmit = (formData: FormData) => {
    onUpdate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    onNext();
  };

  // Se o usuário escolheu login social, pular esta etapa
  if (data.authMethod !== "email") {
    onUpdate({
      name: "Usuário " + data.authMethod,
      email: `user@${data.authMethod}.com`,
    });
    setTimeout(() => onNext(), 100);
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
      <Alert>
        <Info className="size-4" />
        <AlertDescription>
          Preencha seus dados básicos. Todos os campos são obrigatórios e serão validados.
        </AlertDescription>
      </Alert>

      <div>
        <Label htmlFor="name">Nome Completo *</Label>
        <Input
          id="name"
          type="text"
          placeholder="João Silva"
          {...register("name", { 
            required: "Nome é obrigatório",
            minLength: {
              value: 3,
              message: "Nome deve ter pelo menos 3 caracteres"
            },
            pattern: {
              value: /^[a-záàâãéèêíïóôõöúçñ ]+$/i,
              message: "Nome deve conter apenas letras"
            }
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          {...register("email", { 
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-mail inválido"
            }
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Enviaremos um link de verificação para este e-mail
        </p>
      </div>

      <div>
        <Label htmlFor="password">Senha *</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password", { 
            required: "Senha é obrigatória",
            minLength: {
              value: 8,
              message: "Senha deve ter pelo menos 8 caracteres"
            },
            validate: {
              hasUpperCase: (value) => /[A-Z]/.test(value) || "Deve conter letra maiúscula",
              hasLowerCase: (value) => /[a-z]/.test(value) || "Deve conter letra minúscula",
              hasNumber: (value) => /[0-9]/.test(value) || "Deve conter um número",
            }
          })}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}

        {/* Password Requirements */}
        {watchPassword && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
            <p className="text-sm text-gray-700 mb-2">Requisitos da senha:</p>
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {req.valid ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <X className="size-4 text-gray-400" />
                )}
                <span className={req.valid ? "text-green-700" : "text-gray-600"}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword", { 
            required: "Confirme sua senha",
            validate: (value) => value === watchPassword || "As senhas não coincidem"
          })}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continuar
      </Button>
    </form>
  );
}
