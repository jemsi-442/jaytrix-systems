# JAYTRIX SYSTEMS

Company website for JAYTRIX SYSTEMS, a Tanzania-based technology services business.

The site presents services in custom software development, web and mobile applications, business management systems, Linux and IT support, and cybersecurity. Project examples include sales and inventory, payroll, pharmacy, governance, ecommerce, and service marketplace platforms.

## Tech stack

- Next.js 14 App Router
- React 18
- Tailwind CSS 4 and custom global styles
- Node.js 18.18+

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

```text
app/
  globals.css        Global theme, motion, and shared styles
  layout.js          Site shell, metadata, and organization structured data
  page.js            Company homepage sections

public/
  images/            Project previews and supporting images

src/
  components/
    layout/          Navigation and footer
    sections/        Hero, company, services, projects, and contact
    ui/              Shared visual components
  lib/
    data.js          Company copy, services, projects, and contact details
```

Edit `src/lib/data.js` to update the company description, services, project examples, and contact details.
