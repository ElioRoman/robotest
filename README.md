# Login form

This is a simple Single Page Application (SPA) built with Next.js, Redux Toolkit, Material UI, Formik + Yup, and Jest for testing. The app allows users to log in, view a list of items, and add/edit those items. The application uses Redux for state management and Formik for form handling and validation.

## Features

- Login Page: Simple form to authenticate with email/password.
- Items Page: Displays a list of items with functionality to add or edit them via a modal.
- State Management: Uses Redux Toolkit for managing authentication (isLoggedIn) and items (items).
- Form Validation: Formik with Yup for validating form inputs.
- Routing: Uses Next.js Router for navigation.

## Tech Stack

**Frontend:** React, Next.js

**State Management:** Redux Toolkit

**UI Library:** Material UI

**Form Handling:** Formik + Yup

**Testing:** Jest, React Testing Library

**Routing:** Next.js Router

## Installation

Clone the repository

```bash
git clone https://github.com/ElioRoman/robotest.git
cd robotest
```

Install dependencies

```bash
npm install
# or
yarn install
```

Running the Application
To run the application in development mode, use:

```bash
npm run dev
# or
yarn dev
```

Open your browser and go to http://localhost:3000 to see the app in action.

Running Tests
The project uses Jest for testing. To run the tests, use:

```bash
npm run test
# or
yarn test
```

This will run all the tests using Jest and output the results in the console.
