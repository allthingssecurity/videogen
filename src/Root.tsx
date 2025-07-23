import React from 'react';
import { Composition } from 'remotion';

// Default composition - will be dynamically replaced when generating videos
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DefaultVideo"
        component={() => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              textAlign: 'center',
            }}
          >
            🎬 Video Generator Ready
            <br />
            <span style={{ fontSize: '24px', color: '#888' }}>
              Send JSON to /generate-video
            </span>
          </div>
        )}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
