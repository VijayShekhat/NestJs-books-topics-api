import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BookService } from "src/services/book.service";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Book } from "src/entities/book.entity";
import { CreateBookDto } from "src/dtoes/create-book.dto";
import { UpdateBookDto } from "src/dtoes/update-book.dto";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('books')
@Controller('books')
export class BookController{
    constructor(private readonly bookService: BookService){}

    @ApiResponse({ status: 200, description: 'The books which has specified topic in it has been successfully retrived for page specified page number.' })
    @ApiResponse({ status: 400, description: 'The topic Id is invalid.' })
    @Get('/topic/:id')
    async getAllByTopicId(@Param('id') id: string): Promise<Book[]>{
        return this.bookService.findAllByTopicId(id)
    }

    @ApiResponse({ status: 200, description: 'The books has been successfully retrived for page and keyword specified.' })
    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number.' })
    @ApiQuery({ name: 'keyword', required: false, description: 'keyword to search books which contains topics matched with keyword.' })
    async getAll(@Query() query: ExpressQuery): Promise<Book[]>{
        return this.bookService.findAll(query);
    }

    @ApiResponse({ status: 200, description: 'The book with specified id has been successfully retrived.' })
    @ApiResponse({ status: 404, description: 'The book with specified id is not found.' })
    @ApiResponse({ status: 400, description: 'The book Id is invalid.' })
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Book>{
        return this.bookService.findOne(id)
    }

    @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 409, description: 'A book with this ISBN already exists.' })
    @Post()
    async insert(@Body() book: CreateBookDto):Promise<Book>{
        return this.bookService.create(book)
    }

    @ApiResponse({ status: 200, description: 'The book with specified id is updated successfully.' })
    @ApiResponse({ status: 404, description: 'The book with specified id is not found.' })
    @ApiResponse({ status: 400, description: 'The book Id is invalid.' })
    @ApiResponse({ status: 409, description: 'A book with this ISBN already exists.' })
    @Put(':id')
    async updateById(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book>{
        return this.bookService.update(id,book)
    }

    @ApiResponse({ status: 200, description: 'The book with specified id is deleted successfully.' })
    @ApiResponse({ status: 404, description: 'The book with specified id is not found.' })
    @ApiResponse({ status: 400, description: 'The book Id is invalid.' })
    @Delete(':id')
    async removeById(@Param('id') id: string): Promise<Book>{
        return this.bookService.remove(id)
    }
}