const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));

// Store for tracking render jobs
const renderJobs = new Map();

// Component templates mapping
const COMPONENT_TEMPLATES = {
  title: (props) => `
    <TitleSlide 
      title="${props.title || props.content}"
      subtitle="${props.subtitle || ''}"
    />`,
  
  problem_statement: (props) => `
    <ProblemSlide 
      title="${props.title}"
      points={${JSON.stringify(props.points || [])}}
      description="${props.description || ''}"
    />`,
  
  solution: (props) => `
    <SolutionSlide 
      title="${props.title}"
      content="${props.content}"
      features={${JSON.stringify(props.features || [])}}
    />`,
  
  bullet_points: (props) => `
    <BulletSlide 
      title="${props.title}"
      points={${JSON.stringify(props.points || [])}}
    />`,
  
  comparison: (props) => `
    <ComparisonSlide 
      title="${props.title}"
      leftTitle="${props.leftTitle || 'Option A'}"
      rightTitle="${props.rightTitle || 'Option B'}"
      leftPoints={${JSON.stringify(props.leftPoints || [])}}
      rightPoints={${JSON.stringify(props.rightPoints || [])}}
    />`,
  
  results: (props) => `
    <ResultsSlide 
      title="${props.title}"
      results={${JSON.stringify(props.results || [])}}
      description="${props.description || ''}"
    />`,
  
  conclusion: (props) => `
    <ConclusionSlide 
      title="${props.title || 'Conclusion'}"
      content="${props.content}"
      callToAction="${props.callToAction || ''}"
    />`
};

// Generate video component from JSON
function generateVideoComponent(videoData, videoId) {
  const { sections = [] } = videoData;
  
  let currentFrame = 0;
  const sequences = sections.map((section, index) => {
    const duration = (section.duration || 5) * 30; // Convert seconds to frames (30fps)
    const component = COMPONENT_TEMPLATES[section.type];
    
    if (!component) {
      throw new Error(`Unknown section type: ${section.type}`);
    }
    
    const sequence = `
      <Sequence from={${currentFrame}} durationInFrames={${duration}}>
        ${component(section)}
      </Sequence>`;
    
    currentFrame += duration;
    return sequence;
  }).join('\n');

  return { sequences, totalDuration: currentFrame, videoId };
}

// Update files for Remotion
function updateRootFile(videoId, sequences, totalDuration) {
  // Create the video component
  const componentCode = `
import React from 'react';
import {
  AbsoluteFill,
  Sequence,
} from 'remotion';
import {
  TitleSlide,
  ProblemSlide,
  SolutionSlide,
  BulletSlide,
  ComparisonSlide,
  ResultsSlide,
  ConclusionSlide
} from '../components/GenericSlides';

export const ${videoId}Video = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      ${sequences}
    </AbsoluteFill>
  );
};
`;

  // Create the root file
  const rootCode = `
import React from 'react';
import { Composition } from 'remotion';
import { ${videoId}Video } from './generated/${videoId}';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="${videoId}Video"
        component={${videoId}Video}
        durationInFrames={${totalDuration}}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
`;

  // Write files
  fs.writeFileSync(path.join(__dirname, 'src/generated', `${videoId}.tsx`), componentCode);
  fs.writeFileSync(path.join(__dirname, 'src/Root.tsx'), rootCode);
}

// API Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Video Generator API is running',
    timestamp: new Date().toISOString()
  });
});

app.post('/generate-video', async (req, res) => {
  try {
    const videoData = req.body;
    const jobId = uuidv4();
    const videoId = `Video${jobId.replace(/-/g, '')}`;
    
    // Validate input
    if (!videoData.sections || !Array.isArray(videoData.sections)) {
      return res.status(400).json({ 
        error: 'Invalid input: sections array is required' 
      });
    }

    // Store job status
    renderJobs.set(jobId, { status: 'processing', progress: 25 });

    // Generate component
    const { sequences, totalDuration } = generateVideoComponent(videoData, videoId);
    updateRootFile(videoId, sequences, totalDuration);
    
    // Update job status
    renderJobs.set(jobId, { status: 'rendering', progress: 50 });
    
    // Render video
    const outputPath = path.join(__dirname, 'public/videos', `${jobId}.mp4`);
    const renderCommand = `npx remotion render ${videoId}Video ${outputPath} --codec h264`;
    
    exec(renderCommand, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error('Render error:', error);
        renderJobs.set(jobId, { 
          status: 'error', 
          error: error.message,
          progress: 0 
        });
        return;
      }
      
      // Success!
      renderJobs.set(jobId, { 
        status: 'completed', 
        progress: 100,
        videoUrl: `/videos/${jobId}.mp4`,
        duration: Math.ceil(totalDuration / 30)
      });
    });

    res.json({ 
      jobId,
      status: 'processing',
      message: 'Video generation started',
      estimatedTime: '2-5 minutes'
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate video',
      details: error.message 
    });
  }
});

app.get('/status/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = renderJobs.get(jobId);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  res.json(job);
});

app.get('/example', (req, res) => {
  res.json({
    title: "Sample Video",
    sections: [
      {
        type: "title",
        title: "Amazing AI Breakthrough",
        subtitle: "Revolutionary Technology",
        duration: 5
      },
      {
        type: "problem_statement",
        title: "Current Challenges",
        points: [
          "Slow processing speed",
          "High operational costs", 
          "Limited accuracy"
        ],
        description: "Today's AI systems face significant limitations",
        duration: 10
      },
      {
        type: "solution",
        title: "Our Innovation",
        content: "Introducing next-generation AI that solves these problems",
        features: ["10x faster processing", "90% cost reduction", "99% accuracy"],
        duration: 10
      },
      {
        type: "results",
        title: "Impressive Results",
        results: [
          { metric: "Speed Improvement", value: "10x faster", icon: "🚀" },
          { metric: "Cost Reduction", value: "90%", icon: "💰" },
          { metric: "Accuracy", value: "99%", icon: "🎯" }
        ],
        duration: 8
      },
      {
        type: "conclusion",
        title: "The Future is Here",
        content: "Join us in revolutionizing AI technology for everyone",
        callToAction: "Get Started Today",
        duration: 5
      }
    ]
  });
});

app.get('/component-types', (req, res) => {
  res.json({
    availableTypes: Object.keys(COMPONENT_TEMPLATES),
    description: "Available video section types",
    examples: {
      title: "Main title slide with optional subtitle",
      problem_statement: "List problems with bullet points",
      solution: "Present solution with features",
      bullet_points: "Simple bullet point list",
      comparison: "Side-by-side comparison",
      results: "Show metrics and achievements",
      conclusion: "Final message with call-to-action"
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎬 Video Generator API running on port ${PORT}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   POST /generate-video - Generate video from JSON`);
  console.log(`   GET  /status/:jobId  - Check rendering status`);
  console.log(`   GET  /example        - Get example JSON structure`);
  console.log(`   GET  /component-types - Get available components`);
  console.log(`   GET  /health         - Health check`);
});
