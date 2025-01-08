import { z } from "zod";

export const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  telefone: z.string().min(14, "Telefone inválido"),
  valor_entrada: z.string().min(1, "Valor de entrada é obrigatório"),
  data_nascimento: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  cpf: z.string().min(14, "CPF inválido"),
  carro_troca: z.enum(["true", "false"]),
  cnh: z.enum(["true", "false"]),
});