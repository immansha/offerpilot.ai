# OfferPilot AI

> Turn every job description into an interview strategy.

OfferPilot AI is a focused AI SaaS application for comparing a resume with a
specific job description. It returns an AI-generated Job Match Score, missing
keywords, a grouped skill-gap analysis, and a tailored cover letter grounded
in the candidate's resume.

The product converts a broad "am I a fit?" question into concrete actions that
can improve the relevance and clarity of a job application. The score is
AI-generated guidance, not an official ATS score or a hiring prediction.

## Live Demo

The production Vercel URL will be added after the repository's first deployment.

## Screenshots

| Landing page                            | Analysis form                           | Results                                 |
| --------------------------------------- | --------------------------------------- | --------------------------------------- |
| Screenshot to be added after deployment | Screenshot to be added after deployment | Screenshot to be added after deployment |

## Features

- Browser-side text extraction from PDF resumes
- Secure server-side analysis using Gemini 2.5 Flash
- Strict request and AI-response validation with Zod
- AI-generated Job Match Score with clear disclosure
- Important and optional missing-keyword groups
- Strong matches, missing skills, and areas to improve
- Copyable and downloadable Markdown cover letter
- Accessible loading, validation, empty, and error states
- Responsive dark interface with reduced-motion support
- Session-only result persistence with no account or database

## Tech Stack

- Next.js 15 App Router and React 19
- TypeScript with strict mode
- Tailwind CSS and Framer Motion
- Lucide React and Recharts
- React Hook Form and Zod
- `pdfjs-dist`
- Google Gemini API
- Vitest and React Testing Library

## Architecture

The browser validates the selected PDF and extracts its text locally with
`pdfjs-dist`. The PDF file is never uploaded or permanently stored. The client
sends only extracted text and job details to `POST /api/analyse`.

The server validates input lengths, calls Gemini with a server-only API key,
removes optional Markdown code fences, and validates the structured response
before returning JSON. The client validates the response once more, stores the
result and optional job context in `sessionStorage`, and navigates to `/results`.
Resume text is not persisted in session storage.

```text
Browser PDF -> extracted text -> /api/analyse -> Gemini
                                           -> Zod validation
                                           -> sessionStorage -> /results
```

## Folder Structure

```text
app/
  api/analyse/route.ts       Server-side analysis endpoint
  analyse/page.tsx           Resume and job-description form
  results/page.tsx           Analysis results route
  page.tsx                   Marketing landing page
components/                  Reusable UI and result components
lib/
  gemini.ts                  Gemini prompt and structured response handling
  pdf-parser.ts              Browser-side PDF text extraction
  schemas.ts                 Shared Zod schemas
tests/                       Unit and component tests
types/                       Shared TypeScript interfaces
.github/workflows/ci.yml     GitHub Actions quality workflow
```

## Installation

Requirements:

- Node.js 20 or newer
- npm
- A Google Gemini API key

```bash
git clone <your-repository-url>
cd offerpilotai
npm install
```

## Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Add the server-only key:

```dotenv
GEMINI_API_KEY=your_gemini_api_key
```

Never prefix this variable with `NEXT_PUBLIC_` and never commit `.env.local`.

## Running Locally

```bash
npm run dev
```

Open the local URL printed by Next.js. To run the release checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## CI/CD

GitHub Actions runs on every push and pull request:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm test`
5. `npm run build`

## Deployment

1. Push the repository to GitHub.
2. Import it from **Vercel -> Add New -> Project**.
3. Add `GEMINI_API_KEY` in Vercel Project Settings for the required environments.
4. Deploy. Vercel detects the Next.js configuration automatically.
5. Use `main` as the production branch for automatic production deployments.

## AI Usage

AI tools assisted with initial scaffolding, UI iteration, prompt refinement,
documentation, and test generation. All generated code was reviewed, tested,
and modified manually.

The application prompt instructs Gemini to remain evidence-based, avoid
inventing candidate experience, return schema-bound JSON, and treat the match
score as guidance rather than a real ATS result.

## Security

- The Gemini key is read only in server-side code.
- No API key is exposed through a public environment variable.
- PDFs are processed locally and are not uploaded or stored.
- Input lengths and all returned fields are bounded and validated.
- Server logs contain lengths and lifecycle events, never resume or job content.
- Provider failures return safe messages without stack traces.

## Trade-offs

- Browser-side extraction keeps file handling private and simple but does not
  support scanned or image-only PDFs.
- Session storage avoids a database but limits results to the current browser
  session.
- AI output can be incomplete or inaccurate and should be reviewed before use.
- Very long inputs are rejected to control latency and model context.

## Future Improvements

- Authentication
- Saved analysis history
- Interview question generation
- Company research
- Salary insights
- Multiple resume versions
- PDF export

## License

This project is available under the [MIT License](LICENSE).

## Author

Built by Imman as a production-focused portfolio project.
