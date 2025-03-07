# AnimeCal - AniList Watching list to Calendar Exporter

[![Next.js Version](https://img.shields.io/badge/next.js-15.1.6-blue?logo=next.js)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/react-19.0.0-blue?logo=react)](https://react.dev/)
[![Zustand State Management](https://img.shields.io/badge/state_management-zustand-%2320232a)](https://zustand-demo.pmnd.rs/)


AnimeCal is a Next.js 15 application that helps anime enthusiasts export their AniList watching list into a standardized `.ics` calendar format. Easily integrate your anime schedule with popular calendar services like Google Calendar, Outlook, or Apple Calendar.

## ✨ Features

- 🔐 Secure AniList OAuth authentication
- 📺 Fetch current watching list from AniList
- 🗓️ Generate iCalendar (.ics) files with airing schedules
- ✏️ Type safety with **TypeScript**, **Graphql** and **Codegen**
- ⚡ Offline caching using IndexedDB
- 🎨 Beautiful UI with DaisyUI components
- 🔄 Real-time data synchronization
- 📱 Responsive design

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./public/screenshots/home.png" alt="Home Screen" width="400px">
        <br>
        <em>Home Screen</em>
      </td>
      <td align="center">
        <img src="./public/screenshots/profile.png" alt="Watchlist Preview" width="400px">
        <br>
        <em>Watchlist Preview</em>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="./public/screenshots/settings.png" alt="Profile Settings" width="400px">
        <br>
        <em>Profile Settings</em>
      </td>
      <td align="center">
        <img src="./public/screenshots/anime.png" alt="Anime Details" width="400px">
        <br>
        <em>Anime Details</em>
      </td>
    </tr>
  </table>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- AniList API credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/adenlall/AnimeCal.git
cd AnimeCal
```
2. Install dependencies

```bash
npm install
```

3. Configure environment variables

    - Create a .env.local file in the root directory:

```env
NEXT_PUBLIC_ANILIST_CLIENT_ID=your_client_id
NEXT_PUBLIC_ANILIST_REDIRECT_URI=http://localhost:3000/api/auth/callback
ANILIST_CLIENT_SECRET=your_client_secret
```

4. Run the development server

```bash
npm run dev
```

## 🛠️ Technologies Used

 - **Next.js 15** - React framework for server-side rendering and static generation

 - **React 19** - Frontend library for building user interfaces

 - **Zustand** - State management solution

 - **GraphQL Codegen** - Type-safe GraphQL operations

 - **Tailwind CSS + DaisyUI** - Modern styling framework

 - **IndexedDB** - Client-side storage for offline caching

## 📖 Usage

1. **Authenticate with AniList**
   - Click the "Login with AniList" button
   - Grant necessary permissions

2. **Fetch Watching List**
   - The application will automatically retrieve your current watching list
   - View anime titles with next airing dates

3. **Generate Calendar**
   - Click "Generate Calendar" to create .ics file
   - Customize calendar options:
     - Include past episodes
     - Set reminder notifications
     - Choose calendar timezone

4. **Export & Sync**
   - Download .ics file
   - Import to your preferred calendar service
   - Automatic updates when new episodes air

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

1. AniList team for their excellent API
2. Next.js community for awesome documentation
3. Contributors to the open-source libraries used in this project