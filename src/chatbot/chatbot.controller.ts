import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

// Định nghĩa DTO cho câu hỏi
class QuestionRequest {
  question: string;
}

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async getAnswer(@Body() data: QuestionRequest) {
    return this.chatbotService.askQuestion(data.question);
  }
}
