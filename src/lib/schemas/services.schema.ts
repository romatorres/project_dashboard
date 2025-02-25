import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "O título é obrigatório!"),
  description: z.string().min(1, "Descreva o projeto!"),
  imageUrl: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().min(1, "Escolha a ordem do projeto"),
  isActive: z.boolean(),
});
