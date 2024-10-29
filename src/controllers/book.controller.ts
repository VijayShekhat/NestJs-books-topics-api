import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BookService } from "src/services/book.service";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Book } from "src/entities/book.entity";
import { CreateBookDto } from "src/dtoes/create-book.dto";
import { UpdateBookDto } from "src/dtoes/update-book.dto";



@Controller('books')
export class BookController{
    constructor(private readonly bookService: BookService){}

    @Get('/topic/:id')
    async getAllByTopicId(@Param('id') id: string): Promise<Book[]>{
        return this.bookService.findAllByTopicId(id)
    }

    @Get()
    async getAll(@Query() query: ExpressQuery): Promise<Book[]>{
        return this.bookService.findAll(query);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Book>{
        return this.bookService.findOne(id)
    }

    @Post()
    async insert(@Body() book: CreateBookDto):Promise<Book>{
        return this.bookService.create(book)
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book>{
        return this.bookService.update(id,book)
    }

    @Delete(':id')
    async removeById(@Param('id') id: string): Promise<Book>{
        return this.bookService.remove(id)
    }
}