'use client';

import React from 'react';
import styles from '../styles/DeviceErrorPopup.module.css';

export interface DeviceErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  error: Error | null;
  errorType?: 'camera' | 'microphone' | 'general';
}

export function DeviceErrorPopup({ isOpen, onClose, error, errorType = 'general' }: DeviceErrorPopupProps) {
  if (!isOpen || !error) return null;

  const getErrorTitle = () => {
    switch (errorType) {
      case 'camera':
        return 'Access to the camera is denied';
      case 'microphone':
        return 'Access to the microphone is denied';
      default:
        return 'Device error';
    }
  };

  const getErrorMessage = () => {
    if (error.message.includes('Requested device not found')) {
      return 'Device not found. Please check your camera/microphone connection and grant permission to access it.';
    }
    if (error.message.includes('Permission denied')) {
      return 'Access to the device is denied. Please grant access to your camera/microphone in the browser settings.';
    }
    if (error.message.includes('NotAllowedError')) {
      return 'Access to the device is not allowed. Please click "Allow" when requesting access to your camera/microphone.';
    }
    return error.message || 'An unknown error occurred with the device.';
  };

  const getIcon = () => {
    switch (errorType) {
      case 'camera':
        return '📹';
      case 'microphone':
        return '🎤';
      default:
        return '⚠️';
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.icon}>{getIcon()}</span>
          <h3 className={styles.title}>{getErrorTitle()}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.message}>{getErrorMessage()}</p>
          
          <div className={styles.solutions}>
            <h4>Possible solutions:</h4>
            <ul>
              <li>Check if the device is connected and working</li>
              <li>Grant permission to access the device in the browser settings</li>
              <li>Refresh the page and try again</li>
              <li>Check if another application is using the device</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footer}>
          <button className={styles.retryButton} onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
