import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Public()
  @Get('status')
  status() {
    return this.chatService.getStatus();
  }

  @Public()
  @Post()
  async chat(@Body() dto: ChatRequestDto) {
    const reply = await this.chatService.chat(dto.messages);
    return { reply };
  }
}
