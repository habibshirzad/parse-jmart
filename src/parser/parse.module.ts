import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Features } from './entities/features.entity';
import { Group } from './entities/group.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductFeatures } from './entities/product_features.entity';
import { parseService } from './parse.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity,Features,Group,ProductFeatures])],
    providers: [parseService]
})
export class parseModule {}



