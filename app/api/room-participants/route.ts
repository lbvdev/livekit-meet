import { RoomServiceClient } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export async function GET(request: NextRequest) {
  try {
    const roomName = request.nextUrl.searchParams.get('roomName');
    
    if (!roomName) {
      return new NextResponse('Missing required query parameter: roomName', { status: 400 });
    }

    if (!LIVEKIT_URL || !API_KEY || !API_SECRET) {
      return new NextResponse('LiveKit configuration is missing', { status: 500 });
    }

    const roomService = new RoomServiceClient(LIVEKIT_URL, API_KEY, API_SECRET);
    const participants = await roomService.listParticipants(roomName);
    const participantCount = participants.length;
    
    return NextResponse.json({
      roomName: roomName,
      participantCount: participantCount,
      maxParticipants: 0
    });

  } catch (error) {
    console.error('Error getting room participants:', error);
    
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    
    return new NextResponse('Internal server error', { status: 500 });
  }
}
