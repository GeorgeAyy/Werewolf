// Game configuration and state
let gameState = {
  players: [],
  roles: [],
  playerNames: [],
};

// Role configurations
const roleConfigs = {
  Werewolf: {
    icon: "🐺",
    color: "#d32f2f",
    description: "Work with your fellow werewolves to eliminate the villagers.",
  },
  Seer: {
    icon: "🔮",
    color: "#1976d2",
    description: "Each night, investigate one player to learn their true role.",
  },
  Doctor: {
    icon: "🏥",
    color: "#388e3c",
    description: "Each night, protect one player from being eliminated.",
  },
  Hunter: {
    icon: "🏹",
    color: "#f57c00",
    description: "If eliminated, immediately eliminate one other player.",
  },
  Villager: {
    icon: "👥",
    color: "#7b1fa2",
    description:
      "Work with fellow villagers to identify and eliminate werewolves.",
  },
};

// DOM elements
const gameSetupForm = document.getElementById("gameSetupForm");
const playerCountInput = document.getElementById("playerCount");
const werewolfCountInput = document.getElementById("werewolfCount");
const seerCountInput = document.getElementById("seerCount");
const doctorCountInput = document.getElementById("doctorCount");
const hunterCountInput = document.getElementById("hunterCount");
const usePlayerNamesCheckbox = document.getElementById("usePlayerNames");
const playerNamesContainer = document.getElementById("playerNamesContainer");
const playerNamesList = document.getElementById("playerNamesList");
const gameResults = document.getElementById("gameResults");
const playerLinks = document.getElementById("playerLinks");
const gameSummary = document.getElementById("gameSummary");

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Update player names when checkbox changes
  usePlayerNamesCheckbox.addEventListener("change", togglePlayerNames);

  // Update player names when player count changes
  playerCountInput.addEventListener("input", updatePlayerNames);

  // Form submission
  gameSetupForm.addEventListener("submit", handleGameSetup);

  // Initialize player names
  updatePlayerNames();
});

// Toggle player names section
function togglePlayerNames() {
  if (usePlayerNamesCheckbox.checked) {
    playerNamesContainer.style.display = "block";
    updatePlayerNames();
  } else {
    playerNamesContainer.style.display = "none";
  }
}

// Update player names inputs based on player count
function updatePlayerNames() {
  const playerCount = parseInt(playerCountInput.value) || 0;
  playerNamesList.innerHTML = "";

  for (let i = 1; i <= playerCount; i++) {
    const playerNameDiv = document.createElement("div");
    playerNameDiv.className = "player-name-input";

    const playerNumber = document.createElement("div");
    playerNumber.className = "player-number";
    playerNumber.textContent = i;

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = `Player ${i} Name (Optional)`;
    nameInput.id = `playerName${i}`;

    playerNameDiv.appendChild(playerNumber);
    playerNameDiv.appendChild(nameInput);
    playerNamesList.appendChild(playerNameDiv);
  }
}

// Handle game setup form submission
function handleGameSetup(event) {
  event.preventDefault();

  // Get form values
  const playerCount = parseInt(playerCountInput.value);
  const werewolfCount = parseInt(werewolfCountInput.value);
  const seerCount = parseInt(seerCountInput.value);
  const doctorCount = parseInt(doctorCountInput.value);
  const hunterCount = parseInt(hunterCountInput.value);
  const usePlayerNames = usePlayerNamesCheckbox.checked;

  // Validate inputs
  if (
    !validateGameSetup(
      playerCount,
      werewolfCount,
      seerCount,
      doctorCount,
      hunterCount
    )
  ) {
    return;
  }

  // Generate game
  generateGame(
    playerCount,
    werewolfCount,
    seerCount,
    doctorCount,
    hunterCount,
    usePlayerNames
  );
}

// Validate game setup
function validateGameSetup(
  playerCount,
  werewolfCount,
  seerCount,
  doctorCount,
  hunterCount
) {
  const totalSpecialRoles =
    werewolfCount + seerCount + doctorCount + hunterCount;
  const villagerCount = playerCount - totalSpecialRoles;

  if (totalSpecialRoles > playerCount) {
    alert("Error: Total special roles cannot exceed the number of players.");
    return false;
  }

  if (villagerCount < 0) {
    alert("Error: Not enough players for the specified role distribution.");
    return false;
  }

  if (werewolfCount < 1) {
    alert("Error: At least one werewolf is required.");
    return false;
  }

  if (werewolfCount >= playerCount / 2) {
    alert(
      "Error: Too many werewolves. Werewolves should be less than half the players."
    );
    return false;
  }

  return true;
}

// Generate the game
function generateGame(
  playerCount,
  werewolfCount,
  seerCount,
  doctorCount,
  hunterCount,
  usePlayerNames
) {
  // Get player names if enabled
  const playerNames = [];
  if (usePlayerNames) {
    for (let i = 1; i <= playerCount; i++) {
      const nameInput = document.getElementById(`playerName${i}`);
      const name = nameInput.value.trim() || `Player ${i}`;
      playerNames.push(name);
    }
  } else {
    for (let i = 1; i <= playerCount; i++) {
      playerNames.push(`Player ${i}`);
    }
  }

  // Create role distribution
  const roles = [];

  // Add werewolves
  for (let i = 0; i < werewolfCount; i++) {
    roles.push("Werewolf");
  }

  // Add seers
  for (let i = 0; i < seerCount; i++) {
    roles.push("Seer");
  }

  // Add doctors
  for (let i = 0; i < doctorCount; i++) {
    roles.push("Doctor");
  }

  // Add hunters
  for (let i = 0; i < hunterCount; i++) {
    roles.push("Hunter");
  }

  // Add villagers to fill remaining slots
  const remainingSlots = playerCount - roles.length;
  for (let i = 0; i < remainingSlots; i++) {
    roles.push("Villager");
  }

  // Shuffle roles
  shuffleArray(roles);

  // Create player assignments
  const players = [];
  for (let i = 0; i < playerCount; i++) {
    players.push({
      number: i + 1,
      name: playerNames[i],
      role: roles[i],
    });
  }

  // Update game state
  gameState.players = players;
  gameState.roles = roles;
  gameState.playerNames = playerNames;

  // Display results
  displayGameResults();
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Display game results
function displayGameResults() {
  // Show results section
  gameResults.style.display = "block";

  // Generate player links and QR codes
  generatePlayerLinks();

  // Generate game summary
  generateGameSummary();

  // Scroll to results
  gameResults.scrollIntoView({ behavior: "smooth" });
}

// Generate player links and QR codes
function generatePlayerLinks() {
  playerLinks.innerHTML = "";

  gameState.players.forEach((player, index) => {
    const playerCard = document.createElement("div");
    playerCard.className = "player-link-card";

    // Create player link
    const playerUrl = new URL("player.html", window.location.href);
    playerUrl.searchParams.set("role", player.role);
    playerUrl.searchParams.set("player", player.number);

    // Create card content
    playerCard.innerHTML = `
            <h3>${player.name}</h3>
            <div class="qr-code-container" id="qr-${player.number}"></div>
            <div class="player-link">${playerUrl.href}</div>
        `;

    playerLinks.appendChild(playerCard);

    // Generate QR code with animation delay
    setTimeout(() => {
      generateQRCode(playerUrl.href, `qr-${player.number}`);
    }, index * 100);
  });
}

// Generate QR code
function generateQRCode(text, elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Clear previous QR code
  element.innerHTML = "";

  // Generate new QR code
  QRCode.toCanvas(
    element,
    text,
    {
      width: 200,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    },
    function (error) {
      if (error) {
        console.error("QR Code generation error:", error);
        element.innerHTML = "<p>QR Code generation failed</p>";
      }
    }
  );
}

// Generate game summary
function generateGameSummary() {
  const roleCounts = {};

  // Count roles
  gameState.players.forEach((player) => {
    roleCounts[player.role] = (roleCounts[player.role] || 0) + 1;
  });

  // Create summary HTML
  let summaryHTML = "";

  Object.entries(roleCounts).forEach(([role, count]) => {
    const config = roleConfigs[role];
    summaryHTML += `
            <div class="summary-item">
                <span class="count">${count}</span>
                <span class="label">${role}${count > 1 ? "s" : ""}</span>
            </div>
        `;
  });

  gameSummary.innerHTML = summaryHTML;
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

// Export functions for global access (if needed)
window.WerewolfGame = {
  generateGame,
  copyToClipboard,
  gameState,
};
