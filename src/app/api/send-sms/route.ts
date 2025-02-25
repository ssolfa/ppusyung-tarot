import { MESSAGE_TEMPLATES } from '@/constants/constants';
import { getRandomImageId } from '@/utils/getRandomImageId';
import coolsms, { Message } from 'coolsms-node-sdk';

interface MessageErrorResponse {
  code: string;
  message: string;
}

interface MessageRequestBody {
  phoneNumber: string;
  name: string;
  messageType?: 'SMS' | 'MMS';
  fortuneIndex?: number;
}

const messageService = new coolsms(process.env.COOLSMS_API_KEY!, process.env.COOLSMS_API_SECRET!);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MessageRequestBody;
    const { phoneNumber, name } = body;
    let messageType: 'SMS' | 'MMS' = 'MMS';

    let imageId: string | undefined;

    if (messageType === 'MMS') {
      try {
        imageId = getRandomImageId();
      } catch (error) {
        console.error('Failed to get image ID:', error);
        messageType = 'SMS';
      }
    }

    const messageText = MESSAGE_TEMPLATES.FORTUNE.text(name);

    const message: Message = {
      to: phoneNumber,
      from: process.env.SENDER_PHONE!,
      text: messageText,
      autoTypeDetect: false,
      type: messageType,
    };

    if (messageType === 'MMS' && imageId) {
      message.imageId = imageId;
      message.subject = '[YOURSSU] 오늘의 운세를 확인하세요';
    }

    const result = await messageService.sendOne(message);

    return Response.json({ success: true, result });
  } catch (error) {
    const errorMessage = error as MessageErrorResponse;

    return Response.json({
      success: false,
      error: errorMessage.message || '메시지 전송에 실패했습니다.',
    });
  }
}
