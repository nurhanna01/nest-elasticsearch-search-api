import { Client } from '@elastic/elasticsearch';

export const ElasticsearchClient = {
  provide: 'ELASTICSEARCH_CLIENT',
  useFactory: () => {
    return new Client({
      node: 'http://localhost:9200',
    });
  },
};
