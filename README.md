# THE AVENUE – Avenue Progressive Baptist Church Website

## Project Overview
Full website for Avenue Progressive Baptist Church (THE AVENUE), located at 3745 Dildock Street, Dallas, TX 75215. Founded 1961, serving South Dallas with worship, discipleship, and community ministry.

## ✅ Completed Features

### Architecture: Single Page Application (SPA)
- **All 11 pages** are embedded in `index.html` with a hash-based SPA router
- **Root cause fix**: Genspark only serves `index.html` properly; other `.html` files were returning 404/JSON errors. Converting to SPA eliminates all routing issues.
- **SPA Router** (`index.html` lines ~821–1100): Intercepts all `.html` link clicks and `#route` hash links, renders page content inline without page reload
- **Hash routing**: `#home`, `#about`, `#history`, `#pastor`, `#beliefs`, `#visit`, `#watch`, `#ministries`, `#events`, `#give`, `#contact`

### Pages Implemented
| Page | Route | Description |
|------|-------|-------------|
| Home | `#home` or `/` | Full homepage with hero, quick bar, welcome, pastor feature, ministries, events, newsletter |
| About Us | `#about` | Identity, photo grid, stats, core values, affiliations |
| Our History | `#history` | Founding story, decade milestones, timeline, pastoral legacy |
| Our Pastor | `#pastor` | Dr. Mancil Carroll III bio, credentials, vision, ministry philosophy |
| What We Believe | `#beliefs` | Core doctrines, Baptist distinctives, faith statements |
| Plan Your Visit | `#visit` | Service times, what to expect, directions, FAQ, visitor form, membership journey |
| Watch Online | `#watch` | Live stream embed placeholder, sermon archive, platforms |
| Ministries | `#ministries` | 6 ministry cards (Sunday School, Youth, Women's, Men's, Music, Hospitality), outreach |
| Events | `#events` | Weekly schedule, recurring events, upcoming events with filter, newsletter signup |
| Give | `#give` | Why we give, 3 giving methods, types of giving, FAQ |
| Contact | `#contact` | Contact form, church info, prayer request form |

### Technical Features
- **Zero external CSS/JS dependencies** (all CSS inlined, all JS inlined)
- **Google Fonts**: Montserrat, Playfair Display, Inter (CDN)
- **All images via Dropbox direct URLs** (`?raw=1`) — no local image files needed
- **Responsive design** with mobile breakpoints at 1100px, 768px, 480px
- **Mobile navigation** with hamburger menu, ARIA labels, keyboard navigation
- **Fade-in animations** via IntersectionObserver
- **Form handling** (contact, visitor, prayer request — client-side success state)
- **Event filter buttons** on Events page
- **Browser back/forward** navigation support via `history.pushState`

## 🌐 Entry Point
**Single URL**: `index.html`
- Navigate pages via hash: `index.html#about`, `index.html#contact`, etc.
- All navbar and footer links work automatically (SPA router intercepts them)

## 📸 Image URLs (Dropbox CDN)
| Image | URL |
|-------|-----|
| Church Logo | `https://www.dropbox.com/scl/fi/3rb3iytt20j5mbcmt8atf/THE-AVENUE.png?rlkey=vblz5m4k4nsgc5zipjgi9v29y&raw=1` |
| Church Building | `https://www.dropbox.com/scl/fi/luynogcm1y94d6sh6y8yu/APBC-church-building.jpg?rlkey=n6otpftavg6q4q7g5y60cwebj&raw=1` |
| Pastor Carroll | `https://www.dropbox.com/scl/fi/qsuwwcaywo1wsamv767ju/Mancil-Carroll-Headshot.png?rlkey=wb1oi2h5rkpk5fzasfh5qwejp&raw=1` |
| Original Avenue | `https://www.dropbox.com/scl/fi/in4t7crnd7yn919gnp87g/OriginalAvenue.png?rlkey=9tvy4eclbs9qihkmpy8dl0ghm&raw=1` |

## ⚠️ Pending / Placeholder Content
- **Pastoral history**: Founding and previous pastors' names/years need to be added
- **Sermon content**: Current sermon title, series, scripture references need to be filled in
- **YouTube/Facebook embed**: Replace video placeholder with actual embed code
- **Online giving platform**: Replace `href="#"` on Give page with Tithe.ly/Givelify URL
- **Social media links**: Replace `href="#"` with actual Facebook, YouTube, Instagram URLs
- **Google Maps embed**: Replace placeholder with actual iframe embed code
- **Deacons Meeting time**: Add specific day/time
- **Youth/Women/Men/Community events**: Add specific upcoming event details
- **Form action URLs**: Forms submit to Formspree (`https://formspree.io/f/your-form-id`) — replace with real endpoint

## 📁 File Structure
```
index.html        ← SINGLE ENTRY POINT — contains entire SPA (all 11 pages)
about.html        ← Legacy standalone file (still works independently)
history.html      ← Legacy standalone file
pastor.html       ← Legacy standalone file
beliefs.html      ← Legacy standalone file
visit.html        ← Legacy standalone file
watch.html        ← Legacy standalone file
ministries.html   ← Legacy standalone file
events.html       ← Legacy standalone file
give.html         ← Legacy standalone file
contact.html      ← Legacy standalone file
css/              ← Legacy CSS files (not loaded — all CSS inlined)
js/               ← Legacy JS files (not loaded — all JS inlined)
images/           ← Legacy image folder (not loaded — all images via Dropbox URLs)
README.md         ← This file
```

## 🚀 Deployment
Go to the **Publish tab** in Genspark to deploy. The site is served as a single `index.html` — no server configuration required.

## 🔐 Supabase Foundation
- Initial Supabase schema + RLS policies: `supabase/schema.sql`
- Setup instructions: `SUPABASE_SETUP.md`
- Frontend config template: `js/supabase-config.example.js`
- Browser helper client: `js/supabase-client.js`

## 🏛️ Church Information
- **Name**: Avenue Progressive Baptist Church / THE AVENUE
- **Address**: 3745 Dildock Street, Dallas, TX 75215
- **Phone**: 469-372-0065
- **Email**: info@avenuepbc.org
- **Service Times**: Sunday School 10:00 AM · Worship Service 11:15 AM · Wednesday Prayer 6:30 PM · Bible Study 7:00 PM
- **Affiliation**: Progressive National Baptist Convention (PNBC)
- **Founded**: May 1961
- **Senior Pastor**: Dr. Mancil Carroll III (elected May 2025)
