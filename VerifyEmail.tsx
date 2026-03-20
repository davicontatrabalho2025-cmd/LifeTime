import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { User, X, Plus, Sparkles } from "lucide-react";
import type { RegistrationData } from "../../pages/Register";

type Props = {
  onNext: () => void;
  onUpdate: (data: Partial<RegistrationData>) => void;
  data: RegistrationData;
};

type FormData = {
  bio: string;
};

export function Step6ProfileSetup({ onNext, onUpdate, data }: Props) {
  const [skills, setSkills] = useState<string[]>(data.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [interests, setInterests] = useState<string[]>(data.interests || []);
  const [interestInput, setInterestInput] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      bio: data.bio || "",
    }
  });

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim()) && skills.length < 10) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim()) && interests.length < 10) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const onSubmit = (formData: FormData) => {
    onUpdate({
      bio: formData.bio,
      skills,
      interests,
      profileComplete: true,
    });
    onNext();
  };

  const suggestedSkills = ["JavaScript", "Python", "Design", "Marketing", "Inglês", "Fotografia"];
  const suggestedInterests = ["Programação", "Arte", "Música", "Negócios", "Idiomas", "Fitness"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="size-8 text-purple-600" />
        </div>
        <p className="text-gray-600">
          Personalize seu perfil para que outros membros saibam mais sobre você e suas habilidades.
        </p>
      </div>

      <Alert>
        <Sparkles className="size-4" />
        <AlertDescription>
          Um perfil completo aumenta em até 5x as chances de conexões na plataforma!
        </AlertDescription>
      </Alert>

      {/* Bio */}
      <div>
        <Label htmlFor="bio">Sobre você (opcional)</Label>
        <Textarea
          id="bio"
          placeholder="Conte um pouco sobre você, suas experiências e o que você adora fazer..."
          rows={4}
          maxLength={500}
          {...register("bio", {
            maxLength: {
              value: 500,
              message: "Biografia muito longa (máximo 500 caracteres)"
            }
          })}
        />
        {errors.bio && (
          <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Máximo 500 caracteres
        </p>
      </div>

      {/* Skills */}
      <div>
        <Label>Habilidades que você pode ensinar (opcional)</Label>
        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            placeholder="Ex: Python, Design Gráfico, Violão..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={addSkill}
            disabled={skills.length >= 10}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {skills.length === 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Sugestões:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map((skill) => (
                <Button
                  key={skill}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSkills([...skills, skill])}
                >
                  <Plus className="mr-1 size-3" />
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2">
          {skills.length}/10 habilidades adicionadas
        </p>
      </div>

      {/* Interests */}
      <div>
        <Label>O que você gostaria de aprender? (opcional)</Label>
        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            placeholder="Ex: Fotografia, Espanhol, Yoga..."
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addInterest();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={addInterest}
            disabled={interests.length >= 10}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {interests.map((interest) => (
              <Badge key={interest} variant="outline" className="px-3 py-1">
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {interests.length === 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Sugestões:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedInterests.map((interest) => (
                <Button
                  key={interest}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setInterests([...interests, interest])}
                >
                  <Plus className="mr-1 size-3" />
                  {interest}
                </Button>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2">
          {interests.length}/10 interesses adicionados
        </p>
      </div>

      <div className="flex gap-3">
        <Button 
          type="button"
          variant="outline" 
          className="flex-1"
          onClick={() => {
            onUpdate({ skills: [], interests: [], bio: "" });
            onNext();
          }}
        >
          Pular por enquanto
        </Button>
        <Button type="submit" className="flex-1">
          Continuar
        </Button>
      </div>
    </form>
  );
}
