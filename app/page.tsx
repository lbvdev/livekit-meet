'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

function DemoMeeting() {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  const [homeRoomParticipants, setHomeRoomParticipants] = useState<number | null>(null);
  
  const fetchParticipants = async () => {
    try {
      const response = await fetch('/api/room-participants?roomName=home');
      const data = await response.json();
      setHomeRoomParticipants(data.participantCount);
    } catch (error) {
      console.error('Error fetching participants:', error);
      setHomeRoomParticipants(0);
    }
  };
  
  React.useEffect(() => {
    fetchParticipants();
    const interval = setInterval(fetchParticipants, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };
  return (
    <div className={styles.tabContent}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
        <Link className="lk-button" href="/rooms/home">
          Join room &quot;Home&quot;
          {homeRoomParticipants !== null && (
            <span style={{ fontSize: '1rem', opacity: 0.3, width: '100%', textAlign: 'right' }}>
              {homeRoomParticipants}
            </span>
          )}
        </Link>
        <Link className="lk-button" href="/rooms/second">
          Join room &quot;Second&quot;
          {homeRoomParticipants !== null && (
            <span style={{ fontSize: '1rem', opacity: 0.3, width: '100%', textAlign: 'right' }}>
              {homeRoomParticipants}
            </span>
          )}
        </Link>
      </div>
      <button className="lk-button" onClick={startMeeting}>
        Create private room
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className="header">
          <Image src="/images/livekit-meet-home.svg" alt="LiveKit Meet" width={360} height={45} />
          <h2>
            Open source video conferencing app built on{' '}
            <a href="https://github.com/livekit/components-js?ref=meet" rel="noopener">
              LiveKit&nbsp;Components
            </a>
            ,{' '}
            <a href="https://livekit.io/cloud?ref=meet" rel="noopener">
              LiveKit&nbsp;Cloud
            </a>{' '}
            and Next.js, hosted and modified by{' '}
            <a href="https://lbvo.ru" rel="noopener">
              @lbv_dev
            </a>
            .
          </h2>
        </div>
        <Suspense fallback="Loading">
          <DemoMeeting />
        </Suspense>
      </main>
      <footer data-lk-theme="default">
        Hosted by{' '}
        <a href="https://lbvo.ru" rel="noopener">
          @lbv_dev
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
