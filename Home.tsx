import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Alert, AlertDescription } from "../ui/alert";
import { GraduationCap, Building2 } from "lucide-react";
import type { RegistrationData } from "../../pages/Register";

type Props = {
  onNext: () => void;
  onUpdate: (data: Partial<RegistrationData>) => void;
  data: RegistrationData;
};

type FormData = {
  institution: string;
  userType: "teacher" | "learner" | "both";
};

export function Step3AdditionalInfo({ onNext, onUpdate, data }: Props) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    defaultValues: {
      institution: data.institution || "",
      userType: data.userType || "both",
    }
  });

  const onSubmit = (formData: FormData) => {
    onUpdate({
      institution: formData.institution,
      userType: formData.userType,
    });
    onNext();
  };

  const userType = watch("userType");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
      <Alert>
        <GraduationCap className="size-4" />
        <AlertDescription>
          Essas informações nos ajudam a personalizar sua experiência na plataforma LifeTime.
        </AlertDescription>
      </Alert>

      <div>
        <Label htmlFor="institution">Instituição / Organização *</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 size-5 text-gray-400" />
          <Input
            id="institution"
            type="text"
            placeholder="Ex: Universidade Federal, Empresa XYZ, Autônomo"
            className="pl-10"
            {...register("institution", { 
              required: "Instituição é obrigatória",
              minLength: {
                value: 2,
                message: "Nome muito curto"
              }
            })}
          />
        </div>
        {errors.institution && (
          <p className="text-sm text-red-500 mt-1">{errors.institution.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Pode ser sua universidade, empresa ou "Autônomo"
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Como você pretende usar o LifeTime? *</Label>
        <RadioGroup
          value={userType}
          onValueChange={(value) => setValue("userType", value as "teacher" | "learner" | "both")}
        >
          <div className="space-y-3">
            <label 
              htmlFor="teacher"
              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                userType === "teacher" 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value="teacher" id="teacher" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Apenas ensinar</p>
                <p className="text-sm text-gray-600">
                  Quero compartilhar meus conhecimentos e ganhar créditos
                </p>
              </div>
            </label>

            <label 
              htmlFor="learner"
              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                userType === "learner" 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value="learner" id="learner" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Apenas aprender</p>
                <p className="text-sm text-gray-600">
                  Quero aprender novas habilidades usando créditos
                </p>
              </div>
            </label>

            <label 
              htmlFor="both"
              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                userType === "both" 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value="both" id="both" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Ensinar e aprender</p>
                <p className="text-sm text-gray-600">
                  Quero participar da troca de conhecimento completa (Recomendado)
                </p>
                {userType === "both" && (
                  <div className="mt-2 px-3 py-2 bg-green-100 text-green-800 rounded text-sm">
                    ⭐ Opção mais popular! Aproveite ao máximo a plataforma
                  </div>
                )}
              </div>
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>💡 Você sabia?</strong> Usuários que ensinam E aprendem têm 3x mais engajamento 
          na plataforma e constroem redes de conhecimento mais fortes.
        </p>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continuar para Validação
      </Button>
    </form>
  );
}
