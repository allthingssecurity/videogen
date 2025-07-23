import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Generic Title Slide
export const TitleSlide: React.FC<{
  title: string;
  subtitle?: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5, fps * 4, fps * 5], [0, 1, 1, 0]);
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
      }}
    >
      <div style={{ opacity: titleOpacity, textAlign: 'center', transform: `scale(${titleScale})` }}>
        <h1
          style={{
            fontSize: '52px',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            marginBottom: '20px',
            lineHeight: '1.2',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <h2
            style={{
              fontSize: '28px',
              color: '#e8f4fd',
              fontWeight: 'normal',
            }}
          >
            {subtitle}
          </h2>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Generic Problem Statement Slide
export const ProblemSlide: React.FC<{
  title: string;
  points: string[];
  description?: string;
}> = ({ title, points, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, fps * 0.5], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        padding: '60px',
      }}
    >
      <div style={{ opacity: headerOpacity }}>
        <h1
          style={{
            fontSize: '42px',
            color: '#ff6b6b',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          {title}
        </h1>
        
        {description && (
          <div
            style={{
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              border: '2px solid #ff6b6b',
              borderRadius: '15px',
              padding: '30px',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '22px', color: 'white', lineHeight: '1.6' }}>
              {description}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {points.map((point, index) => {
          const itemOpacity = interpolate(
            frame,
            [fps * (1 + index * 0.5), fps * (1.5 + index * 0.5)],
            [0, 1]
          );

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #444',
              }}
            >
              <p style={{ fontSize: '22px', color: 'white', margin: 0 }}>
                • {point}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Generic Solution Slide
export const SolutionSlide: React.FC<{
  title: string;
  content: string;
  features?: string[];
}> = ({ title, content, features = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1]);
  const contentOpacity = interpolate(frame, [fps * 1, fps * 1.5], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        padding: '60px',
      }}
    >
      <h1
        style={{
          fontSize: '42px',
          color: '#50c878',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          opacity: titleOpacity,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          opacity: contentOpacity,
          backgroundColor: 'rgba(80, 200, 120, 0.1)',
          border: '2px solid #50c878',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '24px', color: 'white', lineHeight: '1.6' }}>
          {content}
        </p>
      </div>

      {features.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {features.map((feature, index) => {
            const featureOpacity = interpolate(
              frame,
              [fps * (2 + index * 0.3), fps * (2.3 + index * 0.3)],
              [0, 1]
            );

            return (
              <div
                key={index}
                style={{
                  opacity: featureOpacity,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #50c878',
                }}
              >
                <p style={{ fontSize: '20px', color: '#50c878', margin: 0 }}>
                  ✓ {feature}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Generic Bullet Points Slide
export const BulletSlide: React.FC<{
  title: string;
  points: string[];
}> = ({ title, points }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#16213e',
        padding: '60px',
      }}
    >
      <h1
        style={{
          fontSize: '42px',
          color: '#4a90e2',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '50px',
          opacity: titleOpacity,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          marginTop: '20px',
        }}
      >
        {points.map((point, index) => {
          const itemOpacity = interpolate(
            frame,
            [fps * (1 + index * 0.4), fps * (1.4 + index * 0.4)],
            [0, 1]
          );

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                border: '2px solid #4a90e2',
                borderRadius: '12px',
                padding: '25px',
              }}
            >
              <p style={{ fontSize: '24px', color: '#4a90e2', margin: 0 }}>
                • {point}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Generic Comparison Slide
export const ComparisonSlide: React.FC<{
  title: string;
  leftTitle: string;
  rightTitle: string;
  leftPoints: string[];
  rightPoints: string[];
}> = ({ title, leftTitle, rightTitle, leftPoints, rightPoints }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1]);
  const boxesOpacity = interpolate(frame, [fps * 1, fps * 1.5], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0d1421',
        padding: '60px',
      }}
    >
      <h1
        style={{
          fontSize: '42px',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '50px',
          opacity: titleOpacity,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          opacity: boxesOpacity,
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
        }}
      >
        {/* Left Side */}
        <div
          style={{
            width: '400px',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            border: '3px solid #2196f3',
            borderRadius: '15px',
            padding: '30px',
          }}
        >
          <h3
            style={{
              fontSize: '24px',
              color: '#2196f3',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            {leftTitle}
          </h3>
          {leftPoints.map((point, index) => (
            <p
              key={index}
              style={{
                fontSize: '18px',
                color: 'white',
                marginBottom: '10px',
                lineHeight: '1.4',
              }}
            >
              • {point}
            </p>
          ))}
        </div>

        {/* Right Side */}
        <div
          style={{
            width: '400px',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '3px solid #f44336',
            borderRadius: '15px',
            padding: '30px',
          }}
        >
          <h3
            style={{
              fontSize: '24px',
              color: '#f44336',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            {rightTitle}
          </h3>
          {rightPoints.map((point, index) => (
            <p
              key={index}
              style={{
                fontSize: '18px',
                color: 'white',
                marginBottom: '10px',
                lineHeight: '1.4',
              }}
            >
              • {point}
            </p>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Generic Results Slide
export const ResultsSlide: React.FC<{
  title: string;
  results: Array<{ metric: string; value: string; icon?: string }>;
  description?: string;
}> = ({ title, results, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1]);
  const resultsOpacity = interpolate(frame, [fps * 1, fps * 1.5], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a0a',
        padding: '60px',
      }}
    >
      <h1
        style={{
          fontSize: '42px',
          color: '#ffd700',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          opacity: titleOpacity,
        }}
      >
        {title}
      </h1>

      {description && (
        <div
          style={{
            opacity: titleOpacity,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <p style={{ fontSize: '22px', color: 'white', lineHeight: '1.6' }}>
            {description}
          </p>
        </div>
      )}

      <div
        style={{
          opacity: resultsOpacity,
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {results.map((result, index) => {
          const itemOpacity = interpolate(
            frame,
            [fps * (2 + index * 0.3), fps * (2.3 + index * 0.3)],
            [0, 1]
          );

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                border: '2px solid #ffd700',
                borderRadius: '12px',
                padding: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '22px', color: '#ffd700', margin: '0 0 5px 0' }}>
                  {result.metric}
                </h3>
                <p style={{ fontSize: '28px', color: 'white', margin: 0, fontWeight: 'bold' }}>
                  {result.value}
                </p>
              </div>
              <div style={{ fontSize: '36px' }}>
                {result.icon || '📊'}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Generic Conclusion Slide
export const ConclusionSlide: React.FC<{
  title: string;
  content: string;
  callToAction?: string;
}> = ({ title, content, callToAction }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 1], [0, 1]);
  const contentOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1]);
  const ctaOpacity = interpolate(frame, [fps * 2.5, fps * 3.5], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: '60px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '900px' }}>
        <h1
          style={{
            opacity: titleOpacity,
            fontSize: '48px',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '40px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </h1>

        <div
          style={{
            opacity: contentOpacity,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '30px',
            marginBottom: '40px',
          }}
        >
          <p style={{ fontSize: '26px', color: 'white', lineHeight: '1.6' }}>
            {content}
          </p>
        </div>

        {callToAction && (
          <div
            style={{
              opacity: ctaOpacity,
              backgroundColor: '#ffd700',
              color: '#000',
              padding: '20px 40px',
              borderRadius: '50px',
              fontSize: '28px',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            {callToAction}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
