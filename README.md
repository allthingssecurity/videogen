# 🎬 JSON to Video Generator

A powerful dockerized API that converts JSON content into professional videos automatically using Remotion.

![Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![API](https://img.shields.io/badge/API-REST-orange)

## 🚀 Quick Start

### Prerequisites

* Docker installed on your system
* 4GB+ RAM available
* Port 3000 available

### 1. Clone and Run

git clone <your-repo-url>
cd video-generator
docker build -t video-gen .
docker run -p 3000:3000 video-gen


### 2. Test the API

curl http://localhost:3000/health


### 3. Generate Your First Video

curl -X POST http://localhost:3000/generate-video \
  -H "Content-Type: application/json" \
  -d @examples/simple-example.json

## 📊 API Documentation

### Endpoints

* GET `/health` – Health check
* POST `/generate-video` – Generate video from JSON
* GET `/status/:jobId` – Check rendering status
* GET `/example` – Get sample JSON
* GET `/component-types` – List available components

### Video Generation Flow

1. Submit JSON → Get `jobId`
2. Poll Status → Check `/status/:jobId`
3. Download Video → Access `/videos/:jobId.mp4`

Example:

RESPONSE=$(curl -s -X POST http://localhost:3000/generate-video \
  -H "Content-Type: application/json" \
  -d @examples/simple-example.json)

JOB_ID=$(echo $RESPONSE | jq -r '.jobId')

curl http://localhost:3000/status/$JOB_ID
curl -O http://localhost:3000/videos/$JOB_ID.mp4

## 🎨 Component Types Reference

### Title Slide

Purpose: Opening slide with main title and optional subtitle

{
  "type": "title",
  "title": "Main Title",
  "subtitle": "Optional Subtitle",
  "duration": 5
}

Best for: Video openings, section headers

---

### Problem Statement

Purpose: Present challenges or issues with bullet points
{
  "type": "problem_statement",
  "title": "Current Issues",
  "description": "Brief description",
  "points": ["Problem 1", "Problem 2", "Problem 3"],
  "duration": 10
}

Best for: Identifying pain points

---

### Solution

Purpose: Present your solution with key features
{
  "type": "solution",
  "title": "Our Solution",
  "content": "Solution description",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "duration": 10
}
Best for: Product presentations and proposals

---

### Bullet Points

Purpose: Simple list of key points or features

{
  "type": "bullet_points",
  "title": "Key Points",
  "points": ["Point 1", "Point 2", "Point 3"],
  "duration": 8
}

Best for: Agendas, highlights

---

### Comparison

Purpose: Side-by-side comparison of two options

{
  "type": "comparison",
  "title": "Before vs After",
  "leftTitle": "Before",
  "rightTitle": "After",
  "leftPoints": ["Old way 1", "Old way 2"],
  "rightPoints": ["New way 1", "New way 2"],
  "duration": 12
}

Best for: Transformation, before/after

---

### Results

Purpose: Display metrics and achievements

{
  "type": "results",
  "title": "Amazing Results",
  "results": [
    {"metric": "Speed", "value": "10x faster", "icon": "🚀"},
    {"metric": "Cost", "value": "50% less", "icon": "💰"}
  ],
  "duration": 8
}

Best for: Data impact, performance



### Conclusion

Purpose: Final message with call-to-action

{
  "type": "conclusion",
  "title": "Get Started",
  "content": "Your final message here",
  "callToAction": "Start Now",
  "duration": 5
}


Best for: Closings, prompts



## 📁 Example Templates

### Simple Example

Use for basic test

Duration: \~18s


curl -X POST http://localhost:3000/generate-video \
  -H "Content-Type: application/json" \
  -d @examples/simple-example.json

---

### Product Launch

Marketing-style video

Duration: \~46s
Sections: Title → Problems → Solution → Results → CTA

curl -X POST http://localhost:3000/generate-video \
  -H "Content-Type: application/json" \
  -d @examples/product-launch.json

---

### Business Presentation

Corporate-style update

Duration: \~31s
Sections: Title → Comparison → Metrics → Conclusion

curl -X POST http://localhost:3000/generate-video \
  -H "Content-Type: application/json" \
  -d @examples/business-presentation.json

---

### Educational Content

Training/tutorial video

Duration: \~30s
Sections: Objectives → Problems → Solutions → Steps

curl -X POST http://localhost:3000/generate-video \
  -H "Content-Type: application/json" \
  -d @examples/educational.json

---

## 🎯 Choosing the Right Template

* `product-launch.json` → Product demos
* `business-presentation.json` → Quarterly updates
* `educational.json` → Training or tutorial
* `simple-example.json` → Quick tests

---

## 🔧 Customization Guide

* Title slides: 3–5s
* Simple content: 5–8s
* Complex slides: 10–15s
* Comparisons: 12–15s

Content limits:

* Titles: ≤ 50 characters
* Points: ≤ 80 characters
* Descriptions: ≤ 200 characters
* Max 6 points per slide

Icons:

* Speed: 🚀 ⚡
* Cost: 💰 💵
* Quality: ⭐ 🎯
* Users: 👥 ❤️

---

## 🐳 Docker

### For Development

docker run -p 3000:3000 -v $(pwd)/examples:/app/examples video-gen



```

✅ Now you can paste this entire text as-is into your `README.md` file — no code blocks will interfere with your GitHub formatting. Let me know if you want a `.md` file download too.
```
