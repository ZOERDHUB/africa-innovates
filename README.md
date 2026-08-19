# Africa Innovates

# ZOERDHUB × ZCASH GHANA RESIDENCY WEBSITE

## Full Website Design & Development Prompt

Build a modern, professional, responsive one-page event website for an upcoming technology residency organized by **ZOERD Privacy Blockchain & AI Innovation Hub** in collaboration with **Zcash Ghana**.

The website should feel like a premium African technology, privacy, blockchain, and developer ecosystem event. It should be modern and visually impressive without becoming overly complicated.

The website must work perfectly on desktop, tablet, and mobile.

The primary purpose of the website is to:

1. Introduce the residency programme.
2. Explain the collaboration between ZOERD and Zcash Ghana.
3. Allow visitors to watch the event livestream.
4. Allow visitors to vote for residency participants every day.
5. Explain exactly how the Zcash-based voting system works.
6. Allow visitors to support the residency by sending Zcash to a dedicated support wallet.
7. Provide a clear, simple, trustworthy user experience.

---

# 1. BRANDING

Use the following organizations prominently:

**ZOERD Privacy Blockchain & AI Innovation Hub**

and

**Zcash Ghana**

The event should visually communicate collaboration between ZOERD and Zcash Ghana.

Use a visual identity inspired by:

* Privacy
* Blockchain
* Zcash
* African technology
* Developer communities
* Innovation
* Research
* Digital freedom
* Modern technology

The visual design should be clean, futuristic, professional, and community-oriented.

Avoid making the website look like a generic cryptocurrency trading website.

The focus is the residency and the people participating in it.

Use subtle blockchain/privacy-inspired visual elements such as:

* Network patterns
* Cryptographic-inspired shapes
* Soft gradients
* Geometric elements
* Digital grid patterns
* Abstract African-inspired geometric details

Do not overload the interface with animations.

---

# 2. HERO SECTION

Create a strong hero section at the top of the website.

Include:

**ZOERDHUB × ZCASH GHANA**

**Technology Residency**

Use a strong headline such as:

"Building the Future of Privacy, Blockchain & Innovation in Africa"

The exact event title should be easy to change later.

Include a short description explaining that this is a residency bringing together developers, builders, researchers, and innovators to learn, build, collaborate, and explore privacy-focused blockchain technology.

Include prominent buttons:

**Vote for a Participant**

**Watch Livestream**

**Support the Residency**

The "Watch Livestream" button should currently link to:

https://www.youtube.com/@ZOERDHubTV

Open the livestream link in a new browser tab.

Include a small event information area:

* Date
* Location
* Duration
* Organizers
* Partners

Use placeholders where exact information has not yet been provided.

---

# 3. ABOUT THE RESIDENCY

Create an "About the Programme" section.

Explain:

* What the residency is.
* Why it is being organized.
* The role of ZOERD.
* The role of Zcash Ghana.
* What participants will learn.
* What participants will build.
* Why privacy technology matters.
* Why blockchain development matters.
* How the residency contributes to Africa's technology ecosystem.

Position the programme as an opportunity for participants to develop technical skills, collaborate with other builders, work on practical projects, and engage with the broader privacy and blockchain ecosystem.

Do not invent specific programme details that have not been provided.

Use editable placeholder content for anything unknown.

---

# 4. ZOERDHUB × ZCASH GHANA

Create a dedicated collaboration section.

Show both organizations.

Explain that the residency is being organized through collaboration between:

**ZOERD Privacy Blockchain & AI Innovation Hub**

and

**Zcash Ghana**

Emphasize the shared focus on:

* Privacy
* Blockchain
* Developer education
* Open-source technology
* Innovation
* Community
* African technology development

Use professional partner presentation rather than making either organization appear subordinate to the other.

---

# 5. PROGRAMME HIGHLIGHTS

Create a section showing what participants will experience.

Use cards for things such as:

* Technical Learning
* Privacy & Blockchain
* Developer Workshops
* Project Building
* Mentorship
* Community
* Collaboration
* Innovation

Each card should contain an icon and short description.

Make these editable.

---

# 6. PARTICIPANTS

Create a major section called:

**Meet the Residents**

Display participants as attractive profile cards.

Each participant card should contain:

* Participant image
* Full name
* Participant ID
* Username / Tag
* Short bio
* Area of specialization
* Voting status
* Vote button

The participant system should be designed dynamically.

Do NOT hardcode participant information directly into the interface if an application backend/database is available.

The system should allow an administrator to:

* Add participants.
* Upload participant images.
* Edit participant information.
* Remove participants.
* Assign participant IDs.
* Assign participant wallet/memo tags.
* Enable/disable voting.
* View voting activity.
* View daily vote totals.

---

# 7. DAILY VOTING SYSTEM

Create a dedicated section:

**Daily Participant Voting**

Explain clearly that visitors can support their preferred resident by sending the specified amount of Zcash per vote.

Voting should be organized by day.

Show:

**Today's Voting**

with:

* Current date
* Voting period
* Number of votes
* Participant ranking
* Voting status

Each participant should have a:

**Vote**

button.

Voting should NOT simply increase a number when someone clicks the button.

The actual vote should be connected to the Zcash payment process.

---

# 8. VOTING FLOW

When a visitor clicks:

**Vote**

open a modal or dedicated voting panel.

The flow should be:

### Step 1: Select Participant

Show:

* Participant image
* Participant name
* Participant ID
* Participant tag

### Step 2: Explain the Vote

Display a clear message such as:

"To cast a vote for this participant, send the required amount of Zcash to the voting wallet below."

The exact token amount per vote must be configurable by the administrator.

Do NOT permanently hardcode the vote amount.

Create an admin-configurable field:

**ZEC per Vote**

Example:

"1 vote = [X] ZEC"

Use a placeholder until the official amount is confirmed.

### Step 3: Voting Wallet

Display the official voting wallet:

u10fgklgfqtyug0zvxwut5qjvf98tzmy75h72lwup9eexgzjcj7dqhpune4kf8n6jry72crmrtpcpgsvcjnwcw76auuthx0rkqv98h762qtxw6uyty9375486uq5zjnwm8fcf7rzcu7n4wut3s27n86dphwkc6quvjr2annd5weqq2x2zu

The wallet address must have a prominent:

**Copy Address**

button.

When clicked:

* Copy the wallet address to the clipboard.
* Show a success message such as:
  "Voting wallet copied."

### Step 4: Memo / Message Instructions

This is extremely important.

Explain to the voter:

"When sending your vote, include the participant's ID or tag name in the wallet message/memo field."

Show the participant's exact tag prominently.

Example:

**Memo / Message: PARTICIPANT-ID**

Add a:

**Copy Participant Tag**

button.

The user should be able to copy the exact participant tag.

Explain that the tag is necessary for the system/team to correctly associate the payment with the participant.

### Step 5: Send Payment

Show:

**Voting Wallet**

[wallet address]

**Amount per Vote**

[X] ZEC

**Participant Memo/Tag**

[participant tag]

Provide a clear instruction:

"Send the required amount of ZEC to the voting wallet and include the participant ID/tag in the transaction memo/message."

### Step 6: Payment Verification

After the user sends the payment, provide:

**I've Sent My Vote**

button.

This should NOT automatically claim that the vote is valid.

Instead display:

"Your payment will be verified before the vote is counted."

If the backend supports blockchain transaction verification, allow the user to enter:

* Transaction ID / TxID

Then verify the transaction against the Zcash network/backend.

If automated verification is not yet implemented, create the interface and backend placeholder for manual/admin verification.

---

# 9. VOTE VALIDATION

The voting system must be designed to prevent fake votes.

The backend should eventually verify:

1. Transaction exists.
2. Transaction was sent to the official voting wallet.
3. Correct amount was received.
4. Participant tag/memo matches a valid participant.
5. Transaction has the required confirmation status.
6. Transaction has not already been used for a vote.
7. Voting is currently open.
8. The transaction belongs to the correct voting day.

Do NOT count votes simply because a user clicked a button.

Do NOT allow users to manually enter a number of votes and have the frontend increase the counter.

The blockchain/payment record should be the source of truth once verification is implemented.

---

# 10. DAILY VOTING

The system should support separate voting periods.

For example:

Day 1
Day 2
Day 3
Day 4
...

The administrator should be able to:

* Create a voting day.
* Set opening date/time.
* Set closing date/time.
* Enable/disable voting.
* Set vote price.
* View votes.
* View verified transactions.
* View participant rankings.

Show the current voting day prominently.

Previous voting days can be displayed in a:

**Previous Results**

section.

---

# 11. VOTING LEADERBOARD

Create a leaderboard showing:

Rank | Participant | Votes

Example:

1. Participant A | 120 votes
2. Participant B | 97 votes
3. Participant C | 82 votes

Use participant images where appropriate.

The leaderboard should update based on VERIFIED votes only.

Clearly label the results:

**Verified Votes**

Do not expose sensitive transaction information publicly.

---

# 12. SUPPORT THE RESIDENCY

Create a separate section:

**Support the Residency**

Explain:

"Want to support the residency beyond voting? You can contribute directly to the event using Zcash."

Use a different wallet from the voting wallet.

Support wallet:

u12f4nh046n9dd0lt7fgmfs4ervdf58v025h5k74v3mmclkfkggwgazk2nhutmtu2hx8vkg4lug0z78rek2w8vqw2wdafctfvy50e09p0tt72n4grhn74u722q0v70twa67q97ljfk7nj48zha5xrp9hhsm6q38mmekmht73hp2y5am2gm

Display:

**Event Support Wallet**

[wallet address]

Add:

**Copy Wallet Address**

button.

After copying, show:

"Support wallet copied."

Make it extremely clear that this is the SUPPORT wallet and NOT the voting wallet.

---

# 13. SUPPORT INFORMATION

Include:

"Your support helps us create opportunities for developers, innovators, researchers, and builders participating in the residency."

Do not make unsupported claims about exactly how funds will be spent.

Allow an optional support amount selector only if a payment integration is later implemented.

For now, use the copy-wallet-address model.

---

# 14. LIVESTREAM

Create a prominent:

**Watch the Residency Live**

section.

Use:

https://www.youtube.com/@ZOERDHubTV

Include a large:

**Watch Live on YouTube**

button.

If technically possible, embed the YouTube livestream/player while still keeping the external YouTube link available.

If a live stream is not currently active, show:

"Livestream will appear here when the event begins."

---

# 15. EVENT SCHEDULE

Create an event schedule section.

Include:

* Date
* Time
* Session
* Speaker/Facilitator
* Description

Use placeholder schedule information until the official programme schedule is provided.

Make it easy for an administrator to update.

---

# 16. FAQ

Create an FAQ section covering:

* What is the residency?
* Who is organizing it?
* Who are the participants?
* How does voting work?
* How much does one vote cost?
* Where do I send Zcash?
* What should I put in the memo?
* What happens if I forget the memo?
* How is my vote verified?
* When does voting close?
* Can I vote multiple times?
* Can I vote every day?
* How can I support the event?
* Where can I watch the livestream?
* What happens if my transaction isn't verified?

Do not invent answers where the rules have not yet been finalized. Use configurable content or "[TO BE CONFIRMED]".

---

# 17. FOOTER

Create a professional footer containing:

ZOERD Privacy Blockchain & AI Innovation Hub

Zcash Ghana

Quick Links:

About
Programme
Participants
Vote
Livestream
Support
FAQ

Social links:

YouTube:
https://www.youtube.com/@ZOERDHubTV

Add placeholders for other official social links.

Include:

© 2026 ZOERD. All rights reserved.

---

# 18. ADMIN SYSTEM

If building a full-stack application, create an admin dashboard.

The administrator should be able to manage:

### Event

* Event name
* Description
* Dates
* Location
* Status
* Livestream URL

### Participants

* Name
* Image
* ID
* Tag
* Biography
* Skills
* Active/inactive

### Voting

* Voting day
* Start date/time
* End date/time
* ZEC per vote
* Voting wallet
* Voting status

### Transactions

* TxID
* Amount
* Participant tag
* Participant
* Voting day
* Verification status
* Confirmation status
* Date
* Notes

Statuses:

Pending
Verified
Rejected
Duplicate

### Results

* Verified votes
* Participant ranking
* Daily results
* Historical results

### Support

Keep support-wallet configuration separate from voting configuration.

---

# 19. DATABASE STRUCTURE

If using a backend, create appropriate models/entities for:

Event
Participant
VotingDay
Vote
ZcashTransaction
SupportConfiguration
SiteConfiguration

A Vote should reference:

* Participant
* VotingDay
* Transaction
* Number of votes
* Verification status
* Timestamp

A Zcash transaction should store enough information to prevent duplicate counting.

Do not store unnecessary sensitive information.

---

# 20. SECURITY

Treat the voting system as a financial/payment-related system.

Important rules:

* Never expose private keys.
* Never ask users for wallet seed phrases.
* Never ask users for private keys.
* Never store private keys in source code.
* Keep wallet addresses in configuration/environment variables where appropriate.
* Validate all transaction information server-side.
* Do not trust frontend vote counts.
* Prevent duplicate transaction submissions.
* Implement rate limiting.
* Sanitize user input.
* Protect the admin dashboard.
* Log verification activity.
* Restrict administrative access.
* Do not expose sensitive blockchain transaction metadata unnecessarily.

---

# 21. RESPONSIVE DESIGN

The site must work beautifully on:

* Desktop
* Laptop
* Tablet
* Mobile

The voting experience is particularly important on mobile.

A visitor should be able to:

1. Open participant.
2. See their photo.
3. See their ID/tag.
4. Copy wallet address.
5. Copy memo/tag.
6. Send Zcash.
7. Submit TxID.
8. Receive verification status.

without struggling with the interface.

---

# 22. UX DETAILS

Use clear CTA buttons:

**Vote Now**

**Copy Wallet**

**Copy Participant Tag**

**I've Sent My Vote**

**Watch Live**

**Support the Residency**

Use toast notifications for:

"Wallet address copied."

"Participant tag copied."

"Transaction submitted."

"Vote verification pending."

"Vote verified."

"Transaction could not be verified."

---

# 23. DESIGN DIRECTION

The design should feel like:

African technology + privacy + blockchain + developer culture.

Use:

* Dark/light contrast
* Modern typography
* Strong visual hierarchy
* Zcash-inspired visual language without simply copying the Zcash website
* ZOERD branding
* Participant photography
* Subtle animations
* Smooth transitions
* Clean cards
* Rounded but professional UI
* Responsive layouts

Avoid:

* Casino aesthetics
* Excessive crypto trading imagery
* Fake blockchain animations
* Excessive neon
* Clutter
* Generic template appearance

The participants should remain the visual focus.

---

# 24. TECHNICAL IMPLEMENTATION

Use a modern production-ready architecture.

Preferred stack if a full-stack implementation is required:

Frontend:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

Backend:

* Python
* Django
* Django REST Framework

Database:

* PostgreSQL

Authentication:

* Secure admin authentication

Storage:

* Appropriate image/file storage for participant images.

The architecture should make it possible to deploy the website and backend separately if necessary.

If the platform requires a different stack, use the platform's recommended production architecture while preserving all functionality described above.

---

# 25. IMPORTANT WALLET CONFIGURATION

Create these as separate configuration values.

VOTING_WALLET:

u10fgklgfqtyug0zvxwut5qjvf98tzmy75h72lwup9eexgzjcj7dqhpune4kf8n6jry72crmrtpcpgsvcjnwc76auuthx0rkqv98h762qtxw6uyty9375486uq5zjnwm8fcf7rzcu7n4wut3s27n86dphwkc6quvjr2annd5weqq2x2zu

SUPPORT_WALLET:

u12f4nh046n9dd0lt7fgmfs4ervdf58v025h5k74v3mmclkfkggwgazk2nhutmtu2hx8vkg4lug0z78rek2w8vqw2wdafctfvy50e09p0tt72n4grhn74u722q0v70twa67q97ljfk7nj48zha5xrp9hhsm6q38mmekmht73hp2y5am2gm

IMPORTANT:

The exact wallet addresses above must be preserved.

Do not swap them.

Do not truncate them in the actual copyable wallet value.

Do not treat the support wallet as the voting wallet.

Do not treat the voting wallet as the support wallet.

---

# 26. VOTING AMOUNT

The amount of Zcash required per vote has NOT yet been finalized.

Therefore:

Create a configurable:

VOTE_PRICE_ZEC

setting.

Display:

"1 vote = [AMOUNT] ZEC"

until the official amount is provided.

Do not invent the amount.

---

# 27. PARTICIPANT MEMO

Each participant must have a unique:

participant_id

and

participant_tag

The tag must be displayed during the voting process.

Example:

Participant:
John Doe

ID:
ZRD001

Tag:
JOHN-ZRD001

The actual participant information will be added later.

The voting system should associate the payment with the participant using the participant tag/memo.

---

# 28. CONTENT MANAGEMENT

Do not hardcode content that is expected to change.

The following should be editable:

* Event title
* Event description
* Dates
* Location
* Schedule
* Participants
* Participant images
* Participant IDs
* Participant tags
* Voting price
* Voting dates
* Voting wallet
* Support wallet
* Livestream URL
* FAQ
* Social links

---

# 29. DEMO DATA

Until the real participant information is available, use clearly labeled demo participants.

For example:

Demo Participant 01
Demo Participant 02
Demo Participant 03

Do not make fake real-world claims about participants.

Clearly label demo data in the admin interface.

---

# 30. FINAL REQUIREMENT

Build the website as a real working application, not merely a static visual mockup.

The initial version should include:

* Responsive landing page
* About section
* Programme section
* ZOERDHUB × Zcash Ghana section
* Participant cards
* Voting interface
* Wallet-copy functionality
* Participant-tag-copy functionality
* Livestream button
* Support section
* FAQ
* Event schedule
* Admin-ready architecture
* Configurable voting price
* Separate voting and support wallets
* Transaction verification architecture
* Daily voting architecture

If automated Zcash blockchain verification cannot be implemented immediately, build the complete interface, database structure, API endpoints, and verification workflow so that blockchain verification can be connected without redesigning the application later.

Prioritize correctness, security, accessibility, mobile usability, and a polished professional presentation.

Before finishing, test the complete user flow:

Homepage → Participant → Vote → Copy Wallet → Copy Participant Tag → Send Payment → Submit TxID → Verification Pending → Verified Vote → Updated Results.

Also test:

Homepage → Support → Copy Support Wallet.

And:

Homepage → Watch Livestream → YouTube.

Do not claim that a vote has been counted until it has actually been verified.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/18352e5e-1398-4bc5-b854-295210768534).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
