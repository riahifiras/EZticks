
# EZticks

This repository contains the frontend for a ticket-selling platform, built with Next.js. It provides a user-friendly interface for browsing events, purchasing tickets, and managing reservations.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Features](#features)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/riahifiras/EZticks.git
    cd EZticks
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables as described below.

## Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```
NEXT_PUBLIC_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_user_pool_client_id
```

Replace the placeholders with the actual values.

## Usage

To start the development server:
```bash
npm run dev
```

Access the app in your browser at `http://localhost:3000`.

## Features

- **Event Browsing**: View all available events and ticket details.
- **Ticket Purchase**: Select and purchase tickets securely.
- **User Account Management**: Manage reservations, view ticket history, and more...

## Scripts

- `npm run dev`: Run the app in development mode.
- `npm run build`: Build the app for production.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint to check for code style issues.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
