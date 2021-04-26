import { Body, Delete, Inject, Put } from '@nestjs/common';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService,
        @Inject("PRODUCT_SERVICE") private readonly client: ClientProxy){

    }

    @Post("/:id/like")
    async addLike(@Param("id") id: number){
        const product = await this.productService.getProduct(id);

        return await this.productService.update(id, {likes: product.likes + 1})
    }

    @Get("")
    async all(){
        return this.productService.all();
    }

    @Get("/:id")
    async product(@Param("id") id: number){
        return this.productService.getProduct(id);
    }

    @Post()
    async  create(@Body() body){
       const  { name: name, image: image} = body;

       const product = await this.productService.create({name, image});
       this.client.emit("product_create", product);

       return product;
    }

    @Put("/:id")
    async update(@Param("id") id: number, @Body() body)
    {
        await this.productService.update(id, body);

        const product = await this.productService.getProduct(id);
        this.client.emit("product_update", product);

        return product;
    }

    @Delete("/:id")
    async delete(@Param("id") id: number){
        await this.productService.delete(id);

        this.client.emit("product_delete", id);
    }


}
