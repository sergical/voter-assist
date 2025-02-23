'use client';
import { useConversation } from '@11labs/react';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Check, MapIcon, Phone, PhoneOff } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { GoogleMap } from './map/google-map';

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

// Define the voting location type
type VotingLocation = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
};

// VotingLocationMap component
function VotingLocationMap({
  location,
  isOpen,
  onClose,
}: {
  location: VotingLocation | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen && location && !userLocation) {
      // Get user's location when modal opens
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [isOpen, location, userLocation]);

  const handleDistanceCalculated = useCallback(
    (distance: number) => {
      if (location) {
        location.distance = distance;
      }
    },
    [location]
  );

  if (!location) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{location.name}</DialogTitle>
        </DialogHeader>
        <div className="h-[400px] w-full rounded-md border">
          <GoogleMap
            location={location}
            userLocation={userLocation}
            onDistanceCalculated={handleDistanceCalculated}
          />
          <div className="p-4">
            <p className="mb-2">{location.address}</p>
            {location.distance && (
              <p className="text-muted-foreground text-sm">
                Distance: {location.distance.toFixed(1)} km
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Conversation() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [votingLocation, setVotingLocation] = useState<VotingLocation | null>(
    null
  );
  const [isMapOpen, setIsMapOpen] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message: string) => console.log('Message:', message),
    onError: (error: Error) => console.error('Error:', error),
    clientTools: {
      showVotingLocation: ({ location }: { location: VotingLocation }) => {
        setVotingLocation(location);
        setIsMapOpen(true);
        return { success: true, message: 'Map displayed successfully' };
      },
      hideVotingLocation: () => {
        setIsMapOpen(false);
        return { success: true, message: 'Map hidden successfully' };
      },
      getCurrentVotingLocation: () => {
        return votingLocation;
      },
    },
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

  // Example voting location (replace with actual data from your backend)
  const exampleLocation: VotingLocation = {
    name: 'City Hall Voting Center',
    address: '100 Queen Street West, Toronto, ON M5H 2N2',
    latitude: 43.6534,
    longitude: -79.3841,
  };

  const showVotingLocation = useCallback(() => {
    setVotingLocation(exampleLocation);
    setIsMapOpen(true);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[500px] p-4">
      <div className="rounded-3xl">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-center gap-4">
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

              {/* Map Button */}
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={showVotingLocation}
              >
                <MapIcon className="h-5 w-5" />
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

        {/* Status Messages */}
        {(conversation.status !== 'disconnected' ||
          conversation.isSpeaking) && (
          <div className="mt-4 text-center text-muted-foreground text-sm">
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

      {/* Voting Location Map Modal */}
      <VotingLocationMap
        location={votingLocation}
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />
    </div>
  );
}
