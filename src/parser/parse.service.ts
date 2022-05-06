import { number } from "@hapi/joi";
import { Inject, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from 'axios'
import {Repository} from 'typeorm'
import { Features } from "./entities/features.entity";
import { Group } from "./entities/group.entity";
import { ProductEntity } from "./entities/product.entity";
import { ProductFeatures } from "./entities/product_features.entity";


@Injectable()
export class parseService implements OnApplicationBootstrap{
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,

        @InjectRepository(Features)
        private featuresRepository: Repository<Features>,

        @InjectRepository(Group)
        private groupRepository: Repository<Group>,

        @InjectRepository(ProductFeatures)
        private productFeature: Repository<ProductFeatures>
    ){}
    
    onApplicationBootstrap() {
        Logger.log('parsing started...')
        this.parseProduct()
    }

    async parseProduct(){
        let url = `https://jmart.kz/gw/catalog/v1/products?category_id=2879&show_totals=true`
        const getJSONPage = await axios.get(url)
        const totalPages = getJSONPage.data.data.total_pages;

        const products = [];

        let jsonpage;
        for (let i = 1; i < 3; i++){
            url += `&page=${i}`
            jsonpage = await axios.get(url)
            products.push(...jsonpage.data.data.products)
            await new Promise(r => setTimeout(r, 500));
        }
      
        //product table
        for (let i = 0; i < products.length; i++ ){

            const productName = products[i].product
            const product = this.productRepository.create({Name: productName}) 
            await this.productRepository.save(product)
            // console.log(product)  
            
            for (let f of products[i].product_features){

                const Description = f.description  //brand
                const Variant = f.variant           //apple

                const group = await this.groupRepository.create({ NameGroup:Description})
                await this.groupRepository.save(group)
                console.log(group)
                // console.log(group.id)

                const object = { NameFeatures: Variant,groupId:group.id}
                const features = await this.featuresRepository.create(object)
                const t = await this.featuresRepository.save(features)

                console.log('featureID', t.id, 'productId',product.id) 
                
                const manyTomany = {productId: product.id, featuresId: features.id}
                await this.productFeature.save(manyTomany)


            }   
        }
    }
}