import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';  // Import đúng HttpService từ @nestjs/axios
import { lastValueFrom } from 'rxjs';  // Để chuyển Observable thành Promise
import axios from 'axios';  // Không cần axios nữa nếu bạn sử dụng HttpService

@Injectable()
export class ChatbotService {
  constructor(private readonly httpService: HttpService) {}

  async askQuestion(question: string) {
    try {
      const apiUrl = 'http://127.0.0.1:8000/chat';  // Thay địa chỉ phù hợp với máy của bạn

      // Sử dụng HttpService để gửi POST request
      const response = await lastValueFrom(this.httpService.post(apiUrl, { question }));

      return response.data; // Trả về dữ liệu nhận được từ API Python
    } catch (error) {
      throw new Error('Không thể kết nối đến API Python');
    }
  }
}
