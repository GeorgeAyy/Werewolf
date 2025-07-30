# 🐺 Werewolf (Mafia) Game

A client-side Werewolf (Mafia) game that can be hosted entirely on GitHub Pages. Perfect for playing the classic social deduction game with friends!

## ✨ Features

- **Fully Static**: No server, database, or backend required
- **QR Code Generation**: Each player gets a unique QR code to scan
- **Mobile-Friendly**: Optimized for phones and tablets
- **Role Assignment**: Random role distribution with validation
- **Multiple Roles**: Support for Werewolves, Seers, Doctors, Hunters, and Villagers
- **Player Names**: Optional custom player names
- **Hide/Reveal**: Players can hide their role for secrecy
- **Copy Links**: Easy link sharing functionality

## 🎮 How to Play

### For the Moderator:

1. Open `index.html` in your browser
2. Enter the number of players (6-20)
3. Configure role distribution:
   - Werewolves (1-4, default: 2)
   - Seers (0-2, default: 1)
   - Doctors (0-1, default: 0)
   - Hunters (0-1, default: 0)
   - Villagers (automatically calculated)
4. Optionally enable custom player names
5. Click "Generate Game"
6. Share the QR codes with players

### For Players:

1. Scan the QR code provided by the moderator
2. View your assigned role
3. Use the "Hide/Reveal" button to keep your role secret
4. Copy the link if needed

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment

1. Fork this repository to your GitHub account
2. Go to your repository settings
3. Scroll down to "GitHub Pages" section
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your game will be available at `https://yourusername.github.io/repository-name`

### Option 2: Manual Upload

1. Download all files from this repository
2. Create a new repository on GitHub
3. Upload all files to the repository
4. Follow steps 3-7 from Option 1

## 📁 File Structure

```
werewolf-game/
├── index.html          # Game setup page (moderator)
├── player.html         # Player role display page
├── styles.css          # All styling and animations
├── script.js           # Game logic and QR generation
└── README.md           # This file
```

## 🎯 Game Roles

### Werewolf 🐺

- **Color**: Red (#d32f2f)
- **Goal**: Eliminate all villagers
- **Ability**: Each night, choose one player to eliminate

### Seer 🔮

- **Color**: Blue (#1976d2)
- **Goal**: Help villagers identify werewolves
- **Ability**: Each night, investigate one player's role

### Doctor 🏥

- **Color**: Green (#388e3c)
- **Goal**: Protect villagers from werewolves
- **Ability**: Each night, protect one player from elimination

### Hunter 🏹

- **Color**: Orange (#f57c00)
- **Goal**: Help villagers win
- **Ability**: If eliminated, immediately eliminate one other player

### Villager 👥

- **Color**: Purple (#7b1fa2)
- **Goal**: Identify and eliminate werewolves
- **Ability**: Vote during the day phase

## 🛠️ Technical Details

### Dependencies

- **QRCode.js**: Client-side QR code generation (loaded via CDN)
- **No npm required**: All dependencies loaded via script tags

### Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Offline functionality once loaded

### Features

- Responsive design for all screen sizes
- Smooth animations and transitions
- Role-specific color coding
- URL parameter-based role assignment
- Clipboard API support with fallback

## 🎨 Customization

### Adding New Roles

1. Update `roleConfigs` in `script.js`
2. Add role configuration in `player.html`
3. Update CSS variables in `styles.css`

### Styling Changes

- Modify CSS variables in `:root` section
- Update color schemes for different themes
- Adjust animations and transitions

## 🔧 Troubleshooting

### QR Codes Not Generating

- Ensure QRCode.js is loaded properly
- Check browser console for errors
- Try refreshing the page

### Mobile Issues

- Ensure viewport meta tag is present
- Test on different mobile devices
- Check touch interactions

### Link Sharing Problems

- Verify URL parameters are correct
- Test direct link access
- Check for special characters in URLs

## 📱 Mobile Optimization

The game is fully optimized for mobile devices:

- Touch-friendly buttons and inputs
- Responsive grid layouts
- Optimized QR code sizes
- Mobile-first design approach

## 🤝 Contributing

Feel free to contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Enjoy Your Game!

Set up your Werewolf game, gather your friends, and enjoy the classic social deduction experience! The game is designed to be simple to use while providing all the features needed for an engaging Werewolf session.

---

_Built with ❤️ for the Werewolf community_
