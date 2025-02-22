'use client';
import { useConversation } from '@11labs/react';
import { useCallback } from 'react';

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message: string) => console.log('Message:', message),
    onError: (error: Error) => console.error('Error:', error),
  });

  const getSignedUrl = useCallback(async (): Promise<string> => {
    const response = await fetch('/api/get-signed-url');
    if (!response.ok) {
      throw new Error(`Failed to get signed url: ${response.statusText}`);
    }
    const { signedUrl } = await response.json();
    return signedUrl;
  }, []);

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const signedUrl = await getSignedUrl();

      // Start the conversation with your agent
      await conversation.startSession({
        signedUrl,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation, getSignedUrl]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          type="button"
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="rounded bg-red-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>
  );
}
