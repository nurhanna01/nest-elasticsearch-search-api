import { elasticsearchClient } from './elasticsearch.client';

export async function bootstrapProductIndex() {
  const index = 'products';

  const exists = await elasticsearchClient.indices.exists({ index });

  if (!exists) {
    await elasticsearchClient.indices.create({
      index,
      mappings: {
        properties: {
          name: { type: 'text' },
          description: { type: 'text' },
          status: { type: 'keyword' },
          price: { type: 'integer' },
          createdAt: { type: 'date' },
        },
      },
    });
  }
}
