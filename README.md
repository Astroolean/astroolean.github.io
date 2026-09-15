# FatAshBOT

**FatAshBOT** is a full desktop toolkit I built for X/Twitter because I wanted everything in one place instead of having to jump between a bunch of different tools, websites, scripts, dashboards, and random utilities just to manage one account.

The entire application is written in Python and built around the official X API. It is designed to function as a complete desktop control center for monitoring accounts, finding posts, managing targets, writing and reviewing replies, composing posts, scheduling content, checking analytics, managing live activity, testing API access, and handling the rest of the workflow from one interface.

I wanted FatAshBOT to feel like an actual finished application instead of another Python script with a few buttons thrown on top of it. The GUI is fully custom and includes its own dark and light theme system, animated visuals, detailed page guides, a proper login system, loading screen, licensing system, diagnostics, local database, saved settings, history, review queues, and twelve separate sections so everything stays organized instead of being crammed into one giant window.

## What FatAshBOT Is Built For

FatAshBOT is designed to bring the majority of an X/Twitter workflow into one desktop application.

It includes systems for:

- Account monitoring
- Target management
- Post discovery
- Search and saved searches
- Reply drafting
- Reply review and approval
- Standalone post creation
- Quote posts
- Threads
- Polls
- Scheduled posts
- Draft management
- Analytics
- Live activity monitoring
- API diagnostics
- Local AI reply generation
- Stream management
- Data exports
- Local history
- Safety controls
- Rate-limit awareness
- Manual engagement tools
- Advanced configuration
- License management

The goal is simple: keep everything organized, understandable, and controlled from one application.

## Desktop First

FatAshBOT is built as a real desktop application.

It is not a browser extension, not a website wrapper, and not a collection of loose scripts.

The interface is split into twelve main sections:

1. **Overview**
2. **Connection**
3. **Targets**
4. **Discovery**
5. **Engagement**
6. **Compose**
7. **Automation**
8. **Review**
9. **Analytics**
10. **Tools**
11. **Advanced**
12. **Live Activity**

Each section has its own purpose and its own detailed in-app explanation so the user can understand what every part of the program actually does.

## Official X API Integration

FatAshBOT is built around the official X API.

The project is intentionally designed to avoid browser scraping, Selenium automation, fake browser clicks, and other methods that try to work around the platform itself.

Anything that interacts with X still depends on the permissions, scopes, developer access, API limits, and automation rules provided by X.

The application is designed to work with proper user-context authorization for features that require access to an X account.

## Local-First Design

A large part of FatAshBOT runs locally on the machine using it.

The application stores its own working data in SQLite, including things such as:

- Posts
- Reply candidates
- Sent replies
- Drafts
- Scheduled content
- Saved searches
- Application events
- Analytics history
- Review states
- Local configuration

This keeps the application's internal workflow organized without requiring a separate cloud database for normal use.

## Review Before Posting

FatAshBOT is designed around keeping the user in control.

The application can prepare content, monitor accounts, generate reply candidates, schedule posts, and automate parts of the workflow, but the review system is there so content can be checked before it is sent.

The review queue supports:

- Editing generated replies
- Regenerating replies
- Approving content
- Rejecting content
- Copying content
- Opening source posts
- Publishing approved content

The goal is not just automation for the sake of automation. The goal is making repetitive work easier while still keeping control in the hands of the person using the application.

## Local AI Support

FatAshBOT can optionally use local AI through **Ollama**.

This allows reply generation to run locally instead of requiring a separate cloud AI service.

The reply system supports multiple styles, configurable instructions, model selection, temperature settings, and safe fallback behavior.

The application also records information such as:

- AI provider
- Generation latency
- Generation errors
- Candidate status
- Review status

## Licensing System

FatAshBOT includes a completely separate Owner License Manager.

The licensing system supports:

- Daily licenses
- Weekly licenses
- Monthly licenses
- Yearly licenses
- Short readable license codes
- Signed activation certificates
- Username and password authentication
- Start and expiration times
- Owner-side license history
- Eastern Time display
- Customer-ready login bundles

The normal FatAshBOT application only contains the public verification key.

The private signing key stays inside the separate Owner License Manager.

This allows the customer application to verify licenses without containing the private key required to create them.

## Security and Safety

FatAshBOT includes multiple layers of protection and policy controls.

Examples include:

- Allowlist controls
- Blocked keyword filtering
- Required keyword filtering
- Reply limits
- Daily limits
- Per-author delays
- Duplicate reply detection
- Link restrictions
- Hashtag and cashtag limits
- Review requirements
- AI posting restrictions
- Stream rule ownership
- Local diagnostics
- Database integrity checks
- Safe settings exports

The application is designed to fail safely and provide useful information instead of silently doing something unexpected.

## Reliability

A lot of work has gone into making the application behave like a proper desktop program instead of a fragile script.

FatAshBOT includes:

- Startup logging
- Dependency checks
- Background runtime initialization
- Login and loading screens
- Progress reporting
- Database migrations
- SQLite integrity checks
- Stream reconnect handling
- Queue limits
- Error reporting
- API diagnostics
- Settings validation
- Export tools
- Backup tools
- Regression tests

The startup system is also separated from the main interface so backend components can load while the user is signing in.

## Built to Be Expanded

This project has grown far beyond the original idea of simply watching accounts and replying to posts.

At this point, FatAshBOT is my attempt at building a complete X/Twitter desktop toolkit from scratch.

The codebase is intentionally split into separate modules for things like:

- GUI
- Startup
- X API
- AI
- Database
- Scheduling
- Streaming
- Policy
- Licensing
- Configuration
- Testing

I organized it this way on purpose so I can continue working on it without turning the entire application into one impossible-to-maintain Python file.

## Current Version

**Version 1.1.0**

FatAshBOT is still actively being improved and expanded.

The goal is to keep pushing it toward being a complete, polished, professional desktop toolkit for X/Twitter while keeping the code understandable enough that I can continue building on it myself.

## Disclaimer

FatAshBOT is an independent project.

It is not affiliated with, endorsed by, sponsored by, or officially connected to X Corp.

Features that interact with X depend on the permissions, scopes, API access, rate limits, and current platform rules available to the account using the application.
