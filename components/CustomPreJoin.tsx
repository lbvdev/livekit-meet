'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { LocalUserChoices } from '@livekit/components-react';
import { 
  createLocalTracks, 
  LocalTrack, 
  LocalVideoTrack, 
  LocalAudioTrack, 
  Track,
  facingModeFromLocalTrack 
} from 'livekit-client';
import {
  PageContainer,
  GroupContainer,
  FormContainer,
  SideContainer,

  HeadContainer,
  MediaButtonsGroup,
  MediaInputButton,
  TextInput,
  JoinButton,
  Button,

  VideoContainer,
  CameraOffMessage,

  BackgroundImage,
} from './CustomPreJoin.styles';

const generateGuestUsername = (): string => {
  const randomNumber = Math.floor(Math.random() * 900) + 100;
  return `Guest ${randomNumber}`;
};

interface CustomPreJoinProps {
  onSubmit?: (values: LocalUserChoices) => void;
  onError?: (error: Error) => void;
  defaults?: Partial<LocalUserChoices>;
  joinLabel?: string;
  micLabel?: string;
  camLabel?: string;
  userLabel?: string;
}

export function CustomPreJoin({
  onSubmit,
  onError,
  defaults = {},
  joinLabel = 'Join',
  micLabel = 'Microphone',
  camLabel = 'Camera',
  userLabel = 'Your name',
}: CustomPreJoinProps) {
  const [username, setUsername] = useState(defaults.username || generateGuestUsername());
  const [audioEnabled, setAudioEnabled] = useState(defaults.audioEnabled ?? true);
  const [videoEnabled, setVideoEnabled] = useState(defaults.videoEnabled ?? true);
  const [tracks, setTracks] = useState<LocalTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoTrack = useMemo(
    () => tracks.find(track => track.kind === Track.Kind.Video) as LocalVideoTrack,
    [tracks]
  );

  const audioTrack = useMemo(
    () => tracks.find(track => track.kind === Track.Kind.Audio) as LocalAudioTrack,
    [tracks]
  );

  useEffect(() => {
    const createTracks = async () => {
      try {
        setIsLoading(true);
        const localTracks = await createLocalTracks({
          audio: audioEnabled,
          video: videoEnabled,
        });
        setTracks(localTracks);
      } catch (error) {
        console.error('Error creating tracks:', error);
        if (onError && error instanceof Error) {
          onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (audioEnabled || videoEnabled) {
      createTracks();
    } else {
      tracks.forEach(track => track.stop());
      setTracks([]);
    }

    return () => {
      tracks.forEach(track => track.stop());
    };
  }, [audioEnabled, videoEnabled]);

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      videoTrack.attach(videoRef.current);
    }
    return () => {
      if (videoTrack) {
        videoTrack.detach();
      }
    };
  }, [videoTrack]);

  useEffect(() => {
    if (audioTrack) {
      if (audioEnabled) {
        audioTrack.unmute();
      } else {
        audioTrack.mute();
      }
    }
  }, [audioTrack, audioEnabled]);

  useEffect(() => {
    if (videoTrack) {
      if (videoEnabled) {
        videoTrack.unmute();
      } else {
        videoTrack.mute();
      }
    }
  }, [videoTrack, videoEnabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert('Please, enter your name');
      return;
    }

    const userChoices: LocalUserChoices = {
      username: username.trim(),
      audioEnabled,
      videoEnabled,
      audioDeviceId: audioTrack?.mediaStreamTrack?.getSettings()?.deviceId || '',
      videoDeviceId: videoTrack?.mediaStreamTrack?.getSettings()?.deviceId || '',
    };

    tracks.forEach(track => track.stop());
    
    if (onSubmit) {
      onSubmit(userChoices);
    }
  };

  const facingMode = useMemo(() => {
    if (videoTrack) {
      const { facingMode } = facingModeFromLocalTrack(videoTrack);
      return facingMode;
    }
    return 'undefined';
  }, [videoTrack]);

    return (
      <>
      <PageContainer>
      <SideContainer>
        <FormContainer onSubmit={handleSubmit}>
          <HeadContainer>
            <h1>Ready for meeting?</h1>
            <p>with <b>SeniWave</b>, it will last about <b>30 minutes</b></p>
          </HeadContainer>

          <JoinButton
              type="submit"
              disabled={isLoading || !username.trim()}
            >
            <span>{joinLabel}</span>
          </JoinButton>
        </FormContainer>

        <MediaButtonsGroup>
          <MediaInputButton
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            disabled={isLoading}
            isActive={audioEnabled}
          >
            {audioEnabled ?
            <img src="/icons/mic-on.svg" alt="Microphone ON" />
            : <img src="/icons/mic-off.svg" alt="Microphone OFF" />}
            <span>{micLabel}</span>
          </MediaInputButton>

          <MediaInputButton
            type="button"
            onClick={() => setVideoEnabled(!videoEnabled)}
            disabled={isLoading}
            isActive={videoEnabled}
          >
            {videoEnabled ?
            <img src="/icons/cam-on.svg" alt="Camera ON"/>
            : <img src="/icons/cam-off.svg" alt="Camera OFF"/>}
            <span>{camLabel}</span>
          </MediaInputButton>
          <TextInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={userLabel}
              required
          />
        </MediaButtonsGroup>
      </SideContainer>

      <BackgroundImage src="/background-images/3d.png" alt="3d" width={100} height={100}/>
    </PageContainer>
      <footer data-lk-theme="default">
        Hosted and modified by{' '}
        <a href="https://seniwave.com" rel="noopener">
          SeniWave
        </a>
        . Source code and license on{' '}
        <a href="https://github.com/gromlbv/livekit-meet?ref=meet" rel="noopener">
          GitHub
        </a>
        .
      </footer>
    </>
    
  );
}
