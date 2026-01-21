import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ElasticsearchClient } from 'src/elasticsearch/elasticsearch';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ElasticsearchClient],
  exports: ['ELASTICSEARCH_CLIENT'],
})
export class ProductsModule {}
