'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
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
} from '@/components/CustomPreJoin.styles';
import { CodeInputComponent } from '@/components/CodeInputComponent';

function DemoMeeting() {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  const [roomName, setRoomName] = useState('');

  const joinMeeting = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!roomName.trim()) {
      alert('Please enter the room code');
      return;
    }
    
    if (e2ee) {
      router.push(`/rooms/${roomName.trim()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${roomName.trim()}`);
    }
  }
  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };
  return (
    <PageContainer>
      <SideContainer>
        <FormContainer gap="2rem" onSubmit={joinMeeting}>
          <HeadContainer>
            <h1>Search for your meeting</h1>
            <p><b>Continue with your code from email</b></p>
          </HeadContainer>

          <CodeInputComponent 
            value={roomName} 
            onChange={setRoomName}
            placeholder=""
            autoFocus
          />

          <JoinButton type="submit">
            <span>Next</span>
          </JoinButton>
        </FormContainer>
        <Button onClick={startMeeting}>
          Create new private room
        </Button>
      </SideContainer>

      <BackgroundImage src="/background-images/3d.png" alt="3d" width={100} height={100}/>
    </PageContainer>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <Suspense fallback="Loading">
          <DemoMeeting />
        </Suspense>
      </main>
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
