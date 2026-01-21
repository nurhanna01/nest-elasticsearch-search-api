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

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
