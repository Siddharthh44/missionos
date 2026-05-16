# Implementation Rules

## Core Engineering Philosophy

The implementation must prioritize:

* speed
* clarity
* maintainability
* consistency
* demo reliability

This is a hackathon project.

Prefer:

* simple scalable patterns
* readable architecture
* reusable UI systems
* fast debugging

Avoid:

* premature optimization
* unnecessary abstraction
* enterprise architecture complexity

---

# Code Quality Rules

Code should be:

* readable
* modular
* predictable
* easy to debug

Prefer:

* explicit logic
* simple component composition
* semantic naming
* reusable UI primitives

Avoid:

* clever abstractions
* overengineered patterns
* deeply nested logic
* giant utility systems

---

# Folder Structure Rules

Prefer shallow feature-based organization.

Recommended structure:

/app
/components
/features
/lib
/hooks
/types
/styles
/data

Feature folders should remain:

* isolated
* readable
* modular

Avoid:

* deeply nested folders
* unclear naming
* “misc” or “temp” folders

---

# Component Architecture Rules

Components should:

* do one thing well
* remain reusable
* stay visually consistent

Prefer:

* small focused components
* composition over complexity
* reusable dashboard widgets

Avoid:

* giant page-level components
* duplicated UI logic
* massive prop chains

---

# State Management Rules

Keep state management SIMPLE.

Prefer:

* local component state
* lightweight context only where necessary
* server-driven data where possible

Avoid:

* premature global state complexity
* Redux unless absolutely necessary
* unnecessary custom state systems

---

# API & Backend Rules

Backend should remain:

* minimal
* practical
* stable

Prefer:

* simple API routes
* direct Supabase integration
* lightweight server actions
* predictable schemas

Avoid:

* excessive middleware
* unnecessary backend layers
* complex service abstractions

---

# Database Rules

Database structure should prioritize:

* clarity
* scalability basics
* implementation speed

Use:

* normalized relationships where practical
* clear naming
* predictable schemas

Avoid:

* over-normalization
* premature optimization
* complex relational patterns

---

# Authentication Rules

Authentication should be:

* fast
* reliable
* demo-friendly

Prefer:

* simple email/password
* role-switching helpers
* seeded accounts

Avoid:

* complicated enterprise auth
* unnecessary MFA flows
* difficult onboarding

---

# Styling Rules

The design system must remain:

* consistent
* reusable
* scalable

Use:

* Tailwind utility patterns
* reusable component variants
* shared spacing rules
* shared typography system

Avoid:

* random inline styling
* inconsistent spacing
* hardcoded colors everywhere

---

# Animation Rules

Animations should:

* improve perceived quality
* support responsiveness
* enhance flow

Use:

* Framer Motion lightly
* hover transitions
* page transitions
* animated counters
* loading skeletons

Avoid:

* animation overload
* distracting motion
* slow transitions

---

# Responsive Design Rules

Mobile responsiveness is REQUIRED.

Prioritize:

* stacked layouts
* simplified dashboards
* touch-friendly interactions
* collapsible navigation

Avoid:

* desktop-only assumptions
* shrinking desktop UI directly

---

# Data Rules

Use seeded realistic data throughout development.

Include:

* employees
* departments
* missions
* progress updates
* analytics data
* comments
* timelines

Avoid:

* lorem ipsum
* fake placeholder values
* empty dashboards

The product should always feel:

* alive
* populated
* operational

---

# Dashboard Rules

Dashboards should:

* prioritize clarity
* surface momentum
* feel dynamic

Use:

* cards
* charts
* progress rings
* activity feeds
* insights

Avoid:

* giant dense tables
* analytics overload
* spreadsheet aesthetics

---

# AI Feature Rules

AI features should:

* feel integrated
* support workflows
* remain lightweight

Prefer:

* summaries
* insights
* risk indicators
* recommendation snippets

Avoid:

* chatbot-first UX
* large conversational systems
* overcomplicated AI orchestration

---

# Error Handling Rules

The app must fail gracefully.

Include:

* loading states
* empty states
* validation states
* retry messaging

Avoid:

* blank screens
* silent failures
* technical error dumps

---

# Performance Rules

Optimize for:

* perceived speed
* responsiveness
* smooth transitions

Do NOT waste time on:

* advanced optimization
* micro-performance tuning
* premature caching systems

---

# Git & Versioning Rules

Commits should remain:

* focused
* understandable
* feature-oriented

Prefer:

* small iterative changes
* stable checkpoints

Avoid:

* giant unstructured commits

---

# Deployment Rules

Deployment should remain:

* simple
* repeatable
* stable

Prefer:

* Vercel
* Supabase
* environment-based configs

Avoid:

* infrastructure complexity
* unnecessary deployment layers

---

# Final Implementation Goal

The final product should feel:

* polished
* cohesive
* premium
* responsive
* startup-quality

NOT:

* hacked together
* overengineered
* template-generated
* inconsistent

---

# Ultimate Rule

At every implementation decision ask:

“What produces the highest visible quality within the shortest development time?”
