import { Test, TestingModule } from '@nestjs/testing';
import { Elasticsearch } from './elasticsearch';

describe('Elasticsearch', () => {
  let provider: Elasticsearch;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Elasticsearch],
    }).compile();

    provider = module.get<Elasticsearch>(Elasticsearch);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
