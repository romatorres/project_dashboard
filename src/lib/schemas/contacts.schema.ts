import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório!"),
  email: z.string().min(1, "O e-mail é obrigatório!"),
  message: z.string().min(1, "Mensagem obrigatória!"),
});
