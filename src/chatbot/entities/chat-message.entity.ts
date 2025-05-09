// chatbot/entities/chat-message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  label: string;

  @Column()
  language: string;

  @Column('text')
  context: string;

  @Column('text')
  answer: string;

  @Column({ name: 'start_char' })
  startChar: number;

  @Column({ name: 'end_char' })
  endChar: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
