![Logo](https://i.ibb.co/Fgdm3jg/logo.jpg)

# Vidyut - Electricity Billing System

_Vidyut is a complete Electricity Billing solution, that provides many features including new consumer registration, billing, complaints etc._

## Features

**Consumer Side**

- New Consumer Application which is quick, and secured by OTP verification.
- Subsidized applications with proof documents upload is also allowed.
- Timely mails when bill is generated, bill is updated, or due date approaches
- Fetching Bills by entering bill ID
- A complaints page, to let consumers report any discrepencies in the bill.

**Admin Side**

- Clean and Consistent UI
- Generate bills for many consumers in one go, just by uploading a flat file (meter reading csv)
- Billing module generates a detailed bill transparently, for all types of consumers.
- Ability to search and filter applications by consumer ID
- Ability to view/edit, accept/reject with reason applications.
- View all your complaints in one place, accept the complaint and correct the bill meter reading or slab rates, or reject the complaint all together.
- Option to update slabs/rates, change fixed charges, set their validity from time to time.
- See all bills, update payment status

**Other Features**

- Dark theme support
- Keyboard Shortcut (Alt + A) to go to admin panel and (Ctrl + Shift + K) to toggle dark theme.

## Demo

**Consumer Side**

- New Registration and about page

  ![Demo 1](https://github.com/lolla-sai/Vidyut-Frontend/blob/main/demo/newreg.gif)

- Fetching Bill and Complaints

  ![Fetch Bill and complaint](https://i.ibb.co/VQ53VPm/rec-screen-2.gif)

**Admin Side**

- Applications and Complaints

  ![Admin Walkthrough 1](https://i.ibb.co/4dtNtmZ/rec-screen-3.gif)

- Bill Generation and Slab Rates

  ![Admin Walkthrough 2](https://i.ibb.co/WKmfrsB/rec-screen-3-1.gif)

## Tech Stack

**Client:** NextJS-13, Typescript, React Query, Chakra UI, EJS (for bill)

**Server:** Node, Express, Firebase, nodemailer, node-cron (For email sending cron jobs), logger for logging

## Project Architecture

![Architecture](https://i.ibb.co/jMzc8r8/Elec.png)

## Installation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Lessons Learned

As my first project under industry mentorship from OneShield Inc, I realized the importance of planning, and initial research phase in a project. High Level Design Documents, Entity Relationship Diagrams, Flow diagrams, Requirement analysis - all these helped in better understanding the problem at hand.

Through this project I also learnt Typescript, and the benefits it brings in as a statically typed language.

We won the 2nd place for this, and the prize made it all worth the effort 😊

## Support

For any questions/doubts, mail to saisameer.lolla@gmail.com. You can also connect with other team mates shown in the contributors tab.

## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
