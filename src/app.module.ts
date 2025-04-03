import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot/chatbot.controller';
import { ChatbotService } from './chatbot/chatbot.service';
import { HttpModule } from '@nestjs/axios';
import axios from 'axios'
@Module({
  imports: [HttpModule],  // Cần thêm HttpModule
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class AppModule {}
