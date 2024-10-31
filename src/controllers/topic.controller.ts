import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TopicService } from "src/services/topic.service";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Topic } from "src/entities/topic.entity";
import { CreateTopicDto } from "src/dtoes/create-topic.dto";
import { UpdateTopicDto } from "src/dtoes/update-topic.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('topics')
@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService){}

    @ApiResponse({ status: 200, description: 'The topics has been successfully retrived for page specified.' })
    @Get()
    async getAll(@Query() query: ExpressQuery): Promise<Topic[]>{
        return this.topicService.findAll(query);
    }

    @ApiResponse({ status: 200, description: 'The topic with specified id has been successfully retrived.' })
    @ApiResponse({ status: 404, description: 'The topic with specified id is not found.' })
    @ApiResponse({ status: 400, description: 'The topic Id is invalid.' })
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Topic>{
        return this.topicService.findOne(id)
    }

    @ApiResponse({ status: 201, description: 'The topic has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 409, description: 'A topic with this name already exists.' })
    @Post()
    async insert(@Body() topic: CreateTopicDto):Promise<Topic>{
        return this.topicService.create(topic)
    }

    @ApiResponse({ status: 200, description: 'The topic with specified id is updated successfully.' })
    @ApiResponse({ status: 404, description: 'The topic with specified id is not found.' })
    @ApiResponse({ status: 400, description: 'The topic Id is invalid.' })
    @ApiResponse({ status: 409, description: 'A topic with this name already exists.' })
    @Put(':id')
    async updateById(@Param('id') id: string, @Body() topic: UpdateTopicDto): Promise<Topic>{
        return this.topicService.update(id,topic)
    }

    @ApiResponse({ status: 200, description: 'The topic with specified id is deleted successfully.' })
    @ApiResponse({ status: 404, description: 'The topic with specified id is not found.' })
    @ApiResponse({ status: 400, description: 'The topic Id is invalid.' })
    @Delete(':id')
    async removeById(@Param('id') id: string): Promise<Topic>{
        return this.topicService.remove(id)
    }
}