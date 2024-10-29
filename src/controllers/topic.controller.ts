import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TopicService } from "src/services/topic.service";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Topic } from "src/entities/topic.entity";
import { CreateTopicDto } from "src/dtoes/create-topic.dto";
import { UpdateTopicDto } from "src/dtoes/update-topic.dto";



@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService){}

    @Get()
    async getAll(@Query() query: ExpressQuery): Promise<Topic[]>{
        return this.topicService.findAll(query);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Topic>{
        return this.topicService.findOne(id)
    }

    @Post()
    async insert(@Body() topic: CreateTopicDto):Promise<Topic>{
        return this.topicService.create(topic)
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() topic: UpdateTopicDto): Promise<Topic>{
        return this.topicService.update(id,topic)
    }

    @Delete(':id')
    async removeById(@Param('id') id: string): Promise<Topic>{
        return this.topicService.remove(id)
    }
}