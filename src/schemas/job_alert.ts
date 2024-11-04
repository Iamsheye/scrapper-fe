import { z } from "zod";

export const createJobAlertSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  search: z.string().min(2, "Role must be at least 2 characters"),
  description: z.string().optional(),
  includeWords: z.array(z.string()).optional(),
  omitWords: z.array(z.string()).optional(),
});

export const editJobAlertSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  includeWords: z.array(z.string()).optional(),
  omitWords: z.array(z.string()).optional(),
});
