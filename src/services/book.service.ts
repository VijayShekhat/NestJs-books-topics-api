import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Book } from "src/entities/book.entity";
import { Query } from 'express-serve-static-core';
import { CreateBookDto } from "src/dtoes/create-book.dto";
import { UpdateBookDto } from "src/dtoes/update-book.dto";
import { Topic } from "src/entities/topic.entity";
import { TopicService } from "./topic.service";



@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
        @InjectModel(Topic.name)
        private topicModel: mongoose.Model<Topic>,
        private readonly topicService: TopicService
    ) {}

    async findAll(query: Query): Promise<Book[]> {
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
    
        // Initialize the search criteria
        let searchCriteria = {};
    
        // Check if a keyword is provided
        if (query.keyword) {
            const keyword = query.keyword;
    
            // Find topic IDs that match the keyword
            const topicIds = await this.topicModel
                .find({ name: { $regex: keyword, $options: 'i' } })
                .distinct('_id');
                const topicIdsArray = topicIds.map(topic => topic._id.toString()); 

            // Prepare search criteria to include book title and topic IDs
            searchCriteria = {
                topics: { $in: topicIdsArray } // Check if any topic ID is in the book's topics array
            };
        }
    
        // Fetch books based on the search criteria with pagination
        const books = await this.bookModel
            .find(searchCriteria)
            .limit(resPerPage)
            .skip(skip)
            .populate('topics'); // Populate topics if needed

            if (!books) {
                return [];
            }
    
        return books;
    }

    async findOne(id: string): Promise<Book> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const book = await this.bookModel.findById(id).populate('topics');

        if (!book) {
            console.warn('Book with ID ${id} not found');
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    async create(book: CreateBookDto): Promise<Book> {

        const existingBook = await this.bookModel.findOne({ isbn: book.isbn });
        if (existingBook) {
            throw new ConflictException('A book with this ISBN already exists.');
        }

        await this.topicService.validateTopicIds(book.topics);
        
        const newBook = await this.bookModel.create(book)

        return newBook
    }

    async update(id: string, book: UpdateBookDto): Promise<Book> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const existingBook = await this.bookModel.findOne({
            isbn: book.isbn,
            _id: { $ne: id } // Exclude the current book's ID
        });
        
        if (existingBook) {
            throw new ConflictException('A book with this ISBN already exists.');
        }

        await this.topicService.validateTopicIds(book.topics);

        const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        }).populate('topics');

        if (!updatedBook) {
            console.warn('Book with ID ${id} not found');
            throw new NotFoundException('Book not found');
        }

        return updatedBook
    }

    async remove(id): Promise<Book> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const deletedBook = await this.bookModel.findByIdAndDelete(id).populate('topics');

        if (!deletedBook) {
            console.warn('Book with ID ${id} not found');
            throw new NotFoundException('Book not found');
        }

        return deletedBook
    }

    async findAllByTopicId(id): Promise<Book[]>{
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const books = await this.bookModel
            .find({ topics: id })
            .populate('topics');
        
        if(!books.length){
            console.warn('Books with topic ID ${id} not found');
            throw new NotFoundException('Books not found');
        }

        return books


    }
}