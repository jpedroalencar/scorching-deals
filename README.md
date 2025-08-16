# 🔥 Scorching Deals  
**Canada’s modern, community-curated deals aggregator with lightning-fast search and clean UX.**

[scorchingdeals.ca](https://scorchingdeals.ca) *(coming soon)*

[![Vercel Deploy](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://vercel.com)  
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)  
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-green?logo=supabase)](https://supabase.com/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)  

---

## ✨ Overview  
**Scorching Deals** is a modern, community-driven platform for discovering and sharing the best promotions in Canada.  
Unlike cluttered forums, it focuses on:  
- **Fast, relevant search**  
- **Deal history and expiration tracking**  
- **Clean experience on mobile and desktop**  
- **Lightweight MVP to validate demand quickly**  

---

## 📚 Features  

- [ ] Home feed of latest deals  
- [ ] Deal submission form with URL dedupe  
- [ ] Deal detail page (price, link, comments)  
- [ ] Voting (up/down) on deals  
- [ ] Search bar with filters (store, category, region)  
- [ ] Google/email login via Supabase Auth  
- [ ] Comments and reporting system  

---

## 🛠 Tech Stack  

| Layer        | Choice                | Why? |
|--------------|-----------------------|------|
| Frontend     | **Next.js 15**        | SSR + App Router, perfect for SEO and fast dev |
| Styling      | **Tailwind + Shadcn** | Speedy styling, accessible components |
| Database     | **Supabase (Postgres)** | Managed SQL with strong relational queries |
| Auth         | **Supabase Auth**     | Google/email login built-in |
| Storage      | **Supabase Storage**  | Free file/image hosting with CDN |
| State/Data   | **React Query**       | Handles server state fetching/caching |
| Deploy       | **Vercel**            | Seamless Next.js deploy |

---

## 🚀 Roadmap  

**Week 1** – Setup repo, Supabase schema, seed data, login + feed  
**Week 2** – Submit deal flow, deal detail, styling polish  
**Week 3** – Search + filters, voting/comments, SEO polish  
**Week 4** – Deploy to production domain, closed beta launch  

> 🎯 MVP goal: Validate community adoption in ≤1 month  

---

## 🔧 Setup 
This project is deployed live at [scorchingdeals.ca](https://scorchingdeals.ca).  

For personal reference, the app can also be run locally with:  
- Node.js 20+  
- Supabase project + env keys  
- `npm install && npm run dev`  

---

## 📬 Contact
Built by **Joao Pedro Alencar**.

- 🌐 Website: [scorchingdeals.ca](https://scorchingdeals.ca)
- 💼 LinkedIn: [linkedin.com/in/joao-alencar-677b52102](https://www.linkedin.com/in/joao-alencar-677b52102)
- ✉️ Email: joaopedroalencar@hotmail.com

Feedback, ideas, or collaborations are welcome — open an issue or reach out directly.
