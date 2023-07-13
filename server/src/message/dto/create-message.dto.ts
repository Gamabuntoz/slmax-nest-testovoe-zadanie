export class CreateMessageDto {
  content: string | null;
  roomId: number;
  file: Buffer;
  fileType: string | null;
}
