// chatbot.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';        // <-- thêm dòng này
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { ChatMessage } from './entities/chat-message.entity';

@Module({
  imports: [
    HttpModule,                                    // <-- và thêm vào imports
    TypeOrmModule.forFeature([ChatMessage]),
  ],
  providers: [ChatbotService],
  controllers: [ChatbotController],
})
export class ChatbotModule {}
