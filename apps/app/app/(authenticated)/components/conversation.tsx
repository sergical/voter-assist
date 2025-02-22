'use client';
import { useConversation } from '@11labs/react';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Check, Phone, PhoneOff } from 'lucide-react';
import { useCallback, useState } from 'react';

const languages = [
  {
    value: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
  {
    value: 'es',
    label: 'Español',
    flag: '🇪🇸',
  },
  {
    value: 'fr',
    label: 'Français',
    flag: '🇫🇷',
  },
  {
    value: 'ru',
    label: 'Русский',
    flag: '🇷🇺',
  },
  {
    value: 'uk',
    label: 'Українська',
    flag: '🇺🇦',
  },
];

export function Conversation() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
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
        overrides: {
          agent: {
            language: selectedLanguage.value,
          },
        },
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation, getSignedUrl, selectedLanguage]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="mx-auto w-full max-w-[500px] p-4">
      <div className="rounded-3xl bg-card p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h2 className="mb-2 font-semibold text-card-foreground text-xl">
              Need help?
            </h2>

            <div className="flex items-center gap-4">
              {/* Voice Chat Button */}
              <Button
                variant={
                  conversation.status === 'connected'
                    ? 'destructive'
                    : 'default'
                }
                size="lg"
                className="rounded-full"
                onClick={
                  conversation.status === 'connected'
                    ? stopConversation
                    : startConversation
                }
              >
                {conversation.status === 'connected' ? (
                  <>
                    <PhoneOff className="mr-2 h-5 w-5" />
                    End chat
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-5 w-5" />
                    Voice chat
                  </>
                )}
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-input"
                  >
                    <span className="text-xl">{selectedLanguage.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.value}
                      className="flex items-center gap-2"
                      onSelect={() => setSelectedLanguage(lang)}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {selectedLanguage.value === lang.value && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Status Messages (only show when relevant) */}
        {(conversation.status !== 'disconnected' ||
          conversation.isSpeaking) && (
          <div className="mt-4 text-muted-foreground text-sm">
            {conversation.status === 'connecting' && <p>Connecting...</p>}
            {conversation.status === 'connected' && (
              <p>
                {conversation.isSpeaking
                  ? 'Assistant is speaking...'
                  : 'Listening...'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
