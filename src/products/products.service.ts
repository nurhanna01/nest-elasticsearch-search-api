import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @Inject('ELASTICSEARCH_CLIENT') private readonly es: Client,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepo.save(createProductDto);
      await this.es.index({
        index: 'products',
        id: product.id.toString(),
        document: {
          ...product,
          createdAt: new Date(),
        },
      });
      return 'Add new product successfully';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async search(param: {
    keyword: string;
    status: string;
    minPrice: number;
    maxPrice: number;
  }) {
    try {
      const must: any[] = [];
      const filter: any[] = [];

      if (param.keyword) {
        must.push({
          multi_match: {
            query: param.keyword,
            fields: ['name', 'description'],
          },
        });
      }
      if (param.status) {
        filter.push({
          term: {
            status: param.status.toUpperCase(),
          },
        });
      }
      if (param.minPrice || param.maxPrice) {
        filter.push({
          range: {
            price: { gte: param.minPrice, lte: param.maxPrice },
          },
        });
      }

      const result = await this.es.search({
        index: 'products',
        query: {
          bool: {
            must: must,
            filter: filter,
          },
        },
      });

      return result.hits.hits.map((data) => ({
        id: data._id,
        data: data._source,
        score: data._score,
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const update = await this.productRepo.update(id, updateProductDto);
      if (update.affected >= 0) {
        await this.es.update({
          index: 'products',
          id: String(id),
          doc: updateProductDto,
        });
        return 'success';
      }
      return 'failed';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deleteProduct = await this.productRepo.delete(id);
      if (deleteProduct.affected > 0) {
        await this.es.delete({
          index: 'products',
          id: String(id),
        });
        return 'success';
      }
      return 'failed';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
