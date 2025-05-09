// import { Module } from '@nestjs/common';
// import { ChatbotController } from './chatbot/chatbot.controller';
// import { ChatbotService } from './chatbot/chatbot.service';
// import { HttpModule } from '@nestjs/axios';
// import axios from 'axios'
// @Module({
//   imports: [HttpModule],  
//   controllers: [ChatbotController],
//   providers: [ChatbotService],
// })
// export class AppModule {}
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChatMessage } from './chatbot/entities/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      // hoặc IP server của bạn
      port: 5432,
      username: 'postgres',
      password: 'abc123',
      database: 'chatbotAI',
      entities: [ChatMessage],
      synchronize: true,      // Chỉ dùng dev; production nên dùng migration
    }),
    ChatbotModule,
  ],
})
export class AppModule {}
