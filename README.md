# VDAC UI

## Overview

VDAC UI is a web application designed to simplify everyday tasks related to video downloading, converting, and transcribing. This client-side application works in conjunction with the VDAC API to provide a seamless user experience.

## Features

- **YouTube Video Downloader**: Download videos from YouTube with ease
- **YouTube Transcript Generator**: Generate and download transcripts for YouTube videos
- **Facebook Video Downloader**: Easily download videos from Facebook

### Coming Soon
- **Instagram Video Downloader**: Save videos from Instagram directly to your device
- **Twitter Video Downloader**: Download videos from Twitter effortlessly

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A running instance of VDAC API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vdac-ui.git
```

2. Navigate to the project directory:
```bash
cd vdac-ui
```

3. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory:
```bash
cp .env.sample .env
```

2. Configure the environment variables in the `.env` file:
```env
# API endpoint URL (required)
VITE_APP_API_URL=http://localhost:5000/api/v1/video

# Secret key (required) - must match the backend service
VITE_APP_SECRET_KEY="your-secret-key"
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check code quality
- `npm run test`: Run the test suite

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions, issues, or suggestions:

- Create an issue in the GitHub repository
- Contact: an2112soni@gmail.com

## Acknowledgments

- Thanks to all contributors who have helped shape VDAC UI
- Built with Vite and React
