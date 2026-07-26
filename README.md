# OfferPilot AI

> Turn every job description into an interview strategy.

OfferPilot AI is a production-ready AI web application that analyses a candidate's resume against a job description using Google Gemini. It provides an AI-generated Job Match Score, identifies missing keywords, highlights skill gaps, and generates a tailored cover letter.

The application is designed as a focused SaaS product that demonstrates AI integration, secure backend architecture, responsive frontend development, validation, testing, CI/CD, and deployment.

**Live Demo:** https://your-vercel-link.vercel.app

---

## Table of Contents

- Overview
- Features
- Tech Stack
- Architecture
- Project Structure
- Installation
- Environment Variables
- Running Locally
- API Flow
- CI/CD
- Security
- Trade-offs
- Future Improvements
- AI Usage
- License
- Author

---

# Overview

OfferPilot AI helps job seekers understand how well their resume aligns with a specific role.

Instead of returning a generic score, the application provides actionable insights including:

- Job Match Score
- Missing Keywords
- Skill Gap Analysis
- Tailored Cover Letter

The Job Match Score is AI-generated guidance and should not be interpreted as an official ATS score or hiring prediction.

---

# Features

| Feature | Description |
|---------|-------------|
| Resume Upload | Upload PDF resumes securely |
| Resume Parsing | Browser-side PDF text extraction |
| AI Analysis | Google Gemini-powered resume evaluation |
| Job Match Score | AI-generated compatibility score |
| Missing Keywords | Important and optional keyword detection |
| Skill Gap Analysis | Strengths, missing skills, and recommendations |
| Cover Letter Generation | Role-specific cover letter |
| Responsive Design | Mobile, tablet, and desktop support |
| Accessibility | Keyboard navigation and reduced motion support |
| Privacy | Resume files are never permanently stored |

---

# Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Forms | React Hook Form |
| Validation | Zod |
| AI | Google Gemini 2.5 Flash |
| PDF Parsing | pdfjs-dist |
| Charts | Recharts |
| Testing | Vitest, React Testing Library |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

# Architecture

```text
                User
                  │
                  ▼
      Resume Upload + Job Description
                  │
                  ▼
       Browser-side PDF Extraction
             (pdfjs-dist)
                  │
                  ▼
          POST /api/analyse
                  │
                  ▼
         Request Validation (Zod)
                  │
                  ▼
      Google Gemini (Server-side)
                  │
                  ▼
        Response Validation (Zod)
                  │
                  ▼
          Session Storage
                  │
                  ▼
             Results Page
```

---

# Project Structure

```text
app/
├── api/
│   └── analyse/
├── analyse/
├── results/
└── page.tsx

components/
lib/
types/
tests/

.github/
└── workflows/
```

---

# Installation

```bash
git clone https://github.com/immansha/offerpilot.ai.git

cd offerpilot.ai

npm install
```

---

# Environment Variables

Create a `.env.local` file.

```env
GEMINI_API_KEY=your_api_key
```

The API key is read only on the server and is never exposed to the client.

---

# Running Locally

```bash
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

---

# API Flow

```text
Resume PDF
      │
      ▼
Extract Resume Text
      │
      ▼
Validate Input
      │
      ▼
Google Gemini
      │
      ▼
Validate Output
      │
      ▼
Return Structured JSON
      │
      ▼
Render Analysis Results
```

---

# CI/CD

Every push and pull request triggers:

| Stage | Status |
|--------|--------|
| Install Dependencies | ✓ |
| Lint | ✓ |
| Type Check | ✓ |
| Tests | ✓ |
| Production Build | ✓ |

Deployment is handled automatically through Vercel.

---

# Security

- Server-side AI integration
- API keys stored in environment variables
- Browser-side PDF processing
- Zod request and response validation
- Safe error handling
- Session-only persistence
- No permanent resume storage

---

# Trade-offs

| Decision | Reason |
|----------|--------|
| Browser PDF extraction | Improves privacy and reduces backend complexity |
| Session Storage | Eliminates database requirements |
| No Authentication | Keeps the application focused on the assessment |
| No Database | Reduces operational complexity |

---

# Future Improvements

- Authentication
- Saved analysis history
- Multiple resume versions
- Interview question generation
- Company research
- Salary insights
- PDF export
- Resume comparison

---

# AI Usage

AI tools were used to accelerate development through code scaffolding, UI refinement, prompt engineering, documentation, and test generation.

All generated code was manually reviewed, modified, validated, and tested before deployment.

---

# License

MIT License

---

# Author

**Mansha Kshatriya**

GitHub: https://github.com/immansha

LinkedIn: https://linkedin.com/in/mansha-kshatriya-7188a5251
