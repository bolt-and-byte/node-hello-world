// researchPlanSchema.ts
import { jsonSchema } from 'ai';

/**
 * JSON-schema definition for a structured research plan that
 * the Vercel AI SDK can pass to generateObject / streamObject.
 */
export const researchPlanSchema = jsonSchema<{
  research_question: string;
  cycle: 'adhoc' | 'weekly' | 'monthly' | 'quarterly';
  steps: {
    tool:
      | 'deep_research'
      | 'rss_news'
      | 'web_search'
      | 'db_query'
      | 'expert_interview'
      | 'social_listening'
      | 'trend_analysis'
      | 'dataset_download'
      | 'summarize_documents';
    title: string;
    context: string;
    executor: 'automated' | 'human';
    params?: Record<string, unknown>;
  }[];
}>({
  $id: 'https://example.com/llm-structured-research.schema.json',
  title: 'Structured-Research-Request',
  type: 'object',
  required: ['research_question', 'cycle', 'steps'],
  additionalProperties: false,
  properties: {
    research_question: { type: 'string', minLength: 1 },
    cycle: {
      type: 'string',
      enum: ['adhoc', 'weekly', 'monthly', 'quarterly']
    },
    steps: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['tool', 'title', 'context', 'executor'],
        additionalProperties: false,
        properties: {
          tool: {
            type: 'string',
            enum: [
              'deep_research',
              'rss_news',
              'web_search',
              'db_query',
              'expert_interview',
              'social_listening',
              'trend_analysis',
              'dataset_download',
              'summarize_documents'
            ]
          },
          title: { type: 'string', minLength: 1 },
          context: { type: 'string', minLength: 1 },
          executor: { type: 'string', enum: ['automated', 'human'] },
          params: { type: 'object' }
        }
      }
    }
  }
} as const);
