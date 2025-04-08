# OD App

A React Native mobile application for student organizations and events management.

## Features

- Authentication for students and clubs
- Event creation and management
- OD (Organization Development) tracking
- Analytics for clubs
- Notifications system
- Profile management

## Tech Stack

- React Native + Expo
- Supabase for backend and authentication
- React Navigation for routing

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```
git clone https://github.com/evodumb1/od-lol.git
cd od-lol
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file with your Supabase credentials
```
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
```

4. Start the development server
```
npm start
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/screens` - Application screens organized by user type
- `/src/navigation` - Navigation configuration
- `/src/lib` - Utility functions and services