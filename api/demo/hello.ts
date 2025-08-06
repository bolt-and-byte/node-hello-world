
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod/v4'
export const recipeSchema = z
    .object({
      name: z.string(),
      ingredients: z.array(
          z.object({
            name: z.string(),
            amount: z.string(),
          })
      ),
    })
    .strict();
export type Recipe = z.infer<typeof recipeSchema>;


export const maxDuration = 120;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  //const question = req.body.question
  const prompt = ""

  const result = await generateObject({
    model: openai('gpt-4o'),
    providerOptions: {
      openai: {
        structuredOutputs: true,
      },
    },
    schemaName: 'recipe',
    schemaDescription: 'A recipe for lasagna.',
    schema: recipeSchema,
    prompt: 'Generate a lasagna recipe.',
  });

  return res.json(result.object)
}
