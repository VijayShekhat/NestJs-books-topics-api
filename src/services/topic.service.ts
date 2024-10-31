import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Topic } from "src/entities/topic.entity";
import { Query } from 'express-serve-static-core';
import { CreateTopicDto } from "src/dtoes/create-topic.dto";
import { UpdateTopicDto } from "src/dtoes/update-topic.dto";
import { Types } from "mongoose";


@Injectable()
export class TopicService {
    constructor(
        @InjectModel(Topic.name)
        private topicModel: mongoose.Model<Topic>
    ) {}


    async findAll(query: Query): Promise<Topic[]> {

        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)
        const topics = await this.topicModel.find().limit(resPerPage).skip(skip)
        return topics
    }

    async findOne(id: string): Promise<Topic> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const topic = await this.topicModel.findById(id);

        if (!topic) {
            console.warn('Topic with ID ${id} not found');
            throw new NotFoundException('Topic not found');
        }

        return topic;
    }

    async create(topic: CreateTopicDto): Promise<Topic> {

        const existingTopic = await this.topicModel.findOne({ name: topic.name });
        if (existingTopic) {
            throw new ConflictException('A topic with this name already exists.');
        }

        const newTopic = await this.topicModel.create(topic)

        return newTopic
    }

    async update(id: string, topic: UpdateTopicDto): Promise<Topic> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const existingTopic = await this.topicModel.findOne({
            name: topic.name,
            _id: { $ne: id } // Exclude the current book's ID
        });
        
        if (existingTopic) {
            throw new ConflictException('A topic with this name already exists.');
        }

        const updatedTopic = await this.topicModel.findByIdAndUpdate(id, topic, {
            new: true,
            runValidators: true,
        })

        if (!updatedTopic) {
            console.warn('Topic with ID ${id} not found');
            throw new NotFoundException('Topic not found');
        }

        return updatedTopic
    }

    async remove(id: string): Promise<Topic> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const deletedTopic = await this.topicModel.findByIdAndDelete(id)

        if (!deletedTopic) {
            console.warn('Topic with ID ${id} not found');
            throw new NotFoundException('Topic not found');
        }

        return deletedTopic
    }

    async validateTopicIds(topicIds: string[]) {
        const invalidIds = [];
    
        for (const id of topicIds) {
          if (!Types.ObjectId.isValid(id)) {
            invalidIds.push(id);
          } else {
            const exists = await this.topicModel.findById(id);
            if (!exists) {
              invalidIds.push(id);
            }
          }
        }
    
        if (invalidIds.length > 0) {
          throw new BadRequestException(`Invalid topic IDs: ${invalidIds.join(', ')}`);
        }
    }

}