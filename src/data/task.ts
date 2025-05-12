import z from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  isDeleted: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;
