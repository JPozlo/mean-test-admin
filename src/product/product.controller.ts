import { Body, Delete, Put } from '@nestjs/common';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){

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
       return this.productService.create({name, image});
    }

    @Put("/:id")
    async update(@Param("id") id: number, @Body() body)
    {
        return this.productService.update(id, body);
    }

    @Delete("/:id")
    async delete(@Param("id") id: number){
        return this.productService.delete(id);
    }

}
