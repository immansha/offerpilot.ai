# 🚀 OfferPilot AI

<p align="center">

**Turn every job description into an interview strategy.**

AI-powered resume analysis that compares your resume against a job description,
identifies missing skills, highlights strengths, and generates a tailored cover
letter — all in seconds.

[🌐 Live Demo](#) • [📄 Documentation](#installation) • [⚡ Tech Stack](#tech-stack)

</p>

---

## ✨ Overview

OfferPilot AI is a production-ready AI SaaS application built with **Next.js 15** and **Google Gemini**.

Instead of simply telling users whether they "match" a role, OfferPilot AI provides actionable insights that improve the quality of job applications.

The application analyses:

- 📊 Job Match Score
- 🔍 Missing Keywords
- 💡 Skill Gap Analysis
- ✍️ AI-generated Cover Letter

> **Disclaimer:** The Job Match Score is AI-generated guidance and **not** an official ATS score or hiring prediction.

---

# 📸 Screenshots

| Landing | Analysis | Results |
|----------|----------|----------|
| <img src="docs/landing.png" width="260"> | <img src="docs/analyse.png" width="260"> | <img src="docs/results.png" width="260"> |

---

# 🚀 Features

| Feature | Description |
|----------|-------------|
| 📄 Resume Upload | Upload PDF resumes securely |
| 🤖 AI Analysis | Gemini-powered resume evaluation |
| 📊 Job Match Score | AI-generated compatibility score |
| 🔑 Keyword Detection | Important & optional missing keywords |
| 📈 Skill Gap Analysis | Strengths, weaknesses & improvement suggestions |
| ✍️ Cover Letter Generator | Tailored cover letter for each job |
| 📋 Copy & Download | Export cover letter as Markdown |
| 🔒 Privacy First | Resume never stored permanently |
| 📱 Responsive UI | Mobile, tablet & desktop support |
| ♿ Accessibility | Keyboard navigation & reduced motion |

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| AI | Google Gemini 2.5 Flash |
| PDF | pdfjs-dist |
| Charts | Recharts |
| Testing | Vitest + React Testing Library |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

# 🏗 Architecture

```text
                 ┌─────────────────────┐
                 │      User           │
                 └─────────┬───────────┘
                           │
                           ▼
               Upload Resume + JD
                           │
                           ▼
          Browser PDF Extraction (pdfjs)
                           │
                           ▼
               POST /api/analyse
                           │
                           ▼
              Zod Request Validation
                           │
                           ▼
              Google Gemini API
                           │
                           ▼
             Structured JSON Response
                           │
                           ▼
              Zod Response Validation
                           │
                           ▼
          sessionStorage (Results Only)
                           │
                           ▼
                  Results Dashboard
```

---

# 📂 Folder Structure

```text
app/
│
├── api/
│   └── analyse/
│       └── route.ts
│
├── analyse/
├── results/
└── page.tsx

components/
lib/
types/
tests/

.github/
└── workflows/
    └── ci.yml
```

---

# ⚙️ Installation

```bash
git clone https://github.com/immansha/offerpilot.ai.git

cd offerpilot.ai

npm install
```

---

# 🔐 Environment Variables

Create:

```env
GEMINI_API_KEY=your_api_key
```

Never expose the key using `NEXT_PUBLIC_`.

---

# ▶️ Run Locally

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

# 🔄 CI/CD Pipeline

Every push triggers:

```text
Push to GitHub
      │
      ▼
GitHub Actions
      │
 ├── Install
 ├── Lint
 ├── Typecheck
 ├── Tests
 ├── Build
      │
      ▼
Vercel Deployment
```

---

# 🔒 Security

- Server-side Gemini integration
- API key never exposed
- Local PDF processing
- Zod validation
- Safe error handling
- Session-only persistence

---

# ⚖️ Trade-offs

| Decision | Reason |
|-----------|--------|
| Browser PDF parsing | Keeps resumes private |
| Session Storage | Avoids unnecessary backend |
| No authentication | Faster MVP |
| No database | Reduced complexity |

---

# 🚀 Future Improvements

- Authentication
- Saved history
- Interview Questions
- Company Research
- Resume Versioning
- PDF Export
- Salary Insights
- Team Workspace

---

# 🤖 AI Usage

AI assisted in:

- UI scaffolding
- Prompt refinement
- Documentation
- Test generation

All generated code was manually reviewed, modified and tested.

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Mansha Kshatriya**

LinkedIn: https://linkedin.com/in/mansha-kshatriya-7188a5251

GitHub: https://github.com/immansha
