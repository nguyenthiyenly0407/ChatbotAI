// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';  // Import đúng HttpService từ @nestjs/axios
// import { lastValueFrom } from 'rxjs';  // Để chuyển Observable thành Promise
// import axios from 'axios';  // Không cần axios nữa nếu bạn sử dụng HttpService

// @Injectable()
// export class ChatbotService {
//   constructor(private readonly httpService: HttpService) {}

//   async askQuestion(question: string) {
//     try {
//       const apiUrl = 'http://127.0.0.1:8000/chat';  // Thay địa chỉ phù hợp với máy của bạn

//       // Sử dụng HttpService để gửi POST request
//       const response = await lastValueFrom(this.httpService.post(apiUrl, { question }));

//       return response.data; // Trả về dữ liệu nhận được từ API Python
//     } catch (error) {
//       throw new Error('Không thể kết nối đến API Python');
//     }
//   }
// }
// chatbot.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat-message.entity';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ChatMessage)
    private readonly chatRepo: Repository<ChatMessage>,
  ) {}

  async askQuestion(question: string) {
    try {
      const apiUrl = 'http://127.0.0.1:8000/chat';
      const response = await lastValueFrom(
        this.httpService.post(apiUrl, { question }),
      );
      const data = response.data;

      // Tạo entity từ JSON trả về
      const msg = this.chatRepo.create({
        question: data.question,
        label: data.label,
        language: data.language,
        context: data.context,
        answer: data.answer,
        startChar: data.start_char,
        endChar: data.end_char,
      });

      // Lưu vào DB
      const saved = await this.chatRepo.save(msg);

      // Trả về JSON gốc kèm ID & timestamp (nếu cần)
      return {
        id: saved.id,
        question: saved.question,
        label: saved.label,
        language: saved.language,
        context: saved.context,
        answer: saved.answer,
        start_char: saved.startChar,
        end_char: saved.endChar,
        created_at: saved.createdAt,
      };
    } catch (error) {
      throw new Error('Không thể kết nối đến API Python hoặc lưu vào DB');
    }
  }
  async getAnswerById(id: number): Promise<{ answer: string }> {
    const msg = await this.chatRepo.findOne({
      where: { id },
      select: ['answer'],
    });

    if (!msg) {
      throw new NotFoundException(`Không tìm thấy message với id=${id}`);
    }

    return { answer: msg.answer };
  }
}
