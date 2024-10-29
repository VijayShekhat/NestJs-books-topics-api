import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { TopicController } from './controllers/topic.controller';
import { TopicService } from './services/topic.service';
import { TopicSchema } from './entities/topic.entity';
import { BookSchema } from './entities/book.entity';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 3,
      }
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }]),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])
  ],
  controllers: [AppController, TopicController, BookController],
  providers: [AppService, TopicService, BookService],
})
export class AppModule {}
