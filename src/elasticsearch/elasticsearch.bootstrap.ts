import { elasticsearchClient } from './elasticsearch.client';

export async function bootstrapProductIndex() {
  const index = 'products';

  const exists = await elasticsearchClient.indices.exists({ index });

  if (!exists) {
    await elasticsearchClient.indices.create({
      index,
      mappings: {
        properties: {
          id: { type: 'keyword' },
          name: { type: 'text', analyzer: 'my_analyzer' },
          description: { type: 'text', analyzer: 'my_analyzer' },
          status: { type: 'keyword' },
          price: { type: 'integer' },
          createdAt: { type: 'date' },
        },
      },
      settings: {
        analysis: {
          analyzer: {
            my_analyzer: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['indo_stop', 'lowercase'],
            },
          },
          filter: {
            indo_stop: {
              type: 'stop',
              stopwords: '_indonesian_',
            },
          },
        },
      },
    });
  }
}
