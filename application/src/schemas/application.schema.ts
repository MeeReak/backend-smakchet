import { z } from "zod";

export const formResponseSchema = z.object({
    label: z.string(),
    answer: z.union([z.string(), z.array(z.string())]),
});

export const applyEventRequestBodySchema = z.array(formResponseSchema);
