import styled from 'styled-components';


export const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;

  height: 100vh;
  width: 100vw;
  overflow: hidden;
  gap: 1rem;
`;


export const GroupContainer = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '4rem'};
`;

export const FormContainer = styled.form<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '4rem'};
`;

export const SideContainer = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding-top: 8rem;
  padding-bottom: 9rem;
  padding-left: 9rem;
  padding-right: 0;

  gap: 2rem;

  @media (max-width: 1200px) {
    padding-top: 2rem;
    padding-bottom: 6rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  padding: 1rem 1.5rem;
  width: fit-content;

  color: var(--text-color);
  background: rgba(255, 255, 255, 0.24);
  border-radius: 12px;
  border: none;

  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1{
    margin: 0;
    max-width: 90vw;

    font-size: 64px;
    font-weight: 700;
    color: var(--text-color);
  }
  
  p{
    margin: 0;
    max-width: 70vw;

    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    color: rgba(255, 255, 255, 0.5);
    
    b{
      color: var(--text-color);
      font-weight: 500;
    }
  }
`;


export const JoinButton = styled.button<{ disabled?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 1.25rem;

  padding: 1.5rem 3rem;
  width: fit-content;

  border-radius: 99px;
  background: var(--secondary-color);
  border: none;

  cursor: pointer;
  transition: opacity 0.2s ease;

  span{
    color: var(--text-color);
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const MediaButtonsGroup = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const MediaInputButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  height: 3rem;
  padding: 1rem 1.25rem;

  border-radius: 12px;
  background: ${props => props.isActive ?
  'var(--secondary-color)'
  : 'rgba(255, 255, 255, 0.24)'};
  border: none;

  transition: background 0.2s;

  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: ${props => props.isActive ? 'var(--secondary-05-color)' : 'rgba(255, 255, 255, 0.2)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  img{
    -webkit-user-drag: none;
  }
`;


export const TextInput = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 16px;
`;



export const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  
  video {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const CameraOffMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: #333;
  color: var(--text-color);
  border-radius: 8px;
  
  p {
    margin: 0;
    font-size: 1rem;
  }
`;


export const BackgroundImage = styled.img`
  max-width: min(50%, 1200px);
  width: fit-content;
  height: 100vh;

  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

  object-fit: cover;
  object-position: left;
`;

export const CodeInputContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.75rem;
  width: fit-content;
`;

export const CodeInput = styled.input`
  width: fit-content;
  height: 5.5rem;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 2rem;
  padding: 0 1rem 0 2rem;
  
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  opacity: 0;
  
  backdrop-filter: blur(10px);
  
  transition: all 0.2s ease;

  &:invalid {
    border-color: #ff4444;
  }
`;

export const CodeSquares = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  display: flex;
  gap: 0.5rem;
  pointer-events: none;
  z-index: 1;
`;

export const CodeSquare = styled.div<{ isFilled?: boolean; isActive?: boolean }>`
  position: relative;

  width: 4.5rem;
  height: 5.5rem;
  border: 2px solid ${props => 
    props.isActive 
      ? 'rgba(255, 255, 255, 0.6)' 
      : props.isFilled 
        ? 'rgba(255, 255, 255, 0.4)' 
        : 'rgba(255, 255, 255, 0.2)'
  };
  border-radius: 12px;
  background: ${props => 
    props.isActive
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'transparent'
  };
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 32px;
  font-weight: 600;
  color: var(--text-color);
  
  transition: all 0.2s ease;

  &::after{
    content: '';
    position: absolute;
    top: 20%;
    left: calc(50% - 2px);
    width: 2px;
    height: 60%;

    background: var(--text-color);
    border-radius: 12px;

    opacity: ${props =>
      props.isActive ? props.isFilled ? 0.0 : 0.5 : 0 };

    transition: opacity 0.2s ease;
  }
`;
