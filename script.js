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
    description:
      "Work with your fellow werewolves to eliminate the villagers. Each night, you can choose one player to eliminate.",
    detailedDescription:
      "You are a Werewolf! Work with your fellow werewolves to eliminate the villagers. Each night, you can choose one player to eliminate. You must work together to avoid detection and win the game.",
  },
  Seer: {
    icon: "🔮",
    color: "#1976d2",
    description: "Each night, investigate one player to learn their true role.",
    detailedDescription:
      "You are the Seer! Each night, you can investigate one player to learn their true role. Use this information wisely to help the villagers identify and eliminate the werewolves.",
  },
  Doctor: {
    icon: "🏥",
    color: "#388e3c",
    description: "Each night, protect one player from being eliminated.",
    detailedDescription:
      "You are the Doctor! Each night, you can protect one player from being eliminated by the werewolves. You cannot protect the same player two nights in a row. Use your healing powers to keep the villagers alive.",
  },
  Hunter: {
    icon: "🏹",
    color: "#f57c00",
    description:
      "If eliminated, immediately eliminate one other player as your final act.",
    detailedDescription:
      "You are the Hunter! If you are eliminated, you can immediately eliminate one other player as your final act. Choose wisely - you want to take down a werewolf, not a fellow villager.",
  },
  Villager: {
    icon: "👥",
    color: "#7b1fa2",
    description:
      "Work with fellow villagers to identify and eliminate werewolves.",
    detailedDescription:
      "You are a Villager! Work with your fellow villagers to identify and eliminate the werewolves through discussion and voting. You have no special powers, but your voice and vote are crucial to the village's survival.",
  },
  Bodyguard: {
    icon: "🛡️",
    color: "#2e7d32",
    description:
      "Each night, protect one player from elimination. If you protect someone, you might die instead.",
    detailedDescription:
      "You are the Bodyguard! Each night, you can protect one player from elimination. If the werewolves target your protected player, you will die instead of them. You cannot protect the same player two nights in a row.",
  },
  Cupid: {
    icon: "💘",
    color: "#e91e63",
    description:
      "On the first night, choose two players to fall in love. If one dies, the other dies too.",
    detailedDescription:
      "You are Cupid! On the first night, you must choose two players to fall in love. If one of them dies, the other will die of a broken heart. The lovers win together or lose together, regardless of their original roles.",
  },
  WolfCub: {
    icon: "🐺",
    color: "#d32f2f",
    description:
      "A young werewolf. If eliminated, the werewolves get an extra kill the next night.",
    detailedDescription:
      "You are the Wolf Cub! You are a young werewolf with a special ability. If you are eliminated, the werewolves will get an extra kill the following night as revenge. Work with your pack to survive.",
  },
  AlphaWolf: {
    icon: "🐺",
    color: "#b71c1c",
    description:
      "The leader of the werewolves. You can see who the other werewolves are.",
    detailedDescription:
      "You are the Alpha Wolf! You are the leader of the werewolves and can see who the other werewolves are. Lead your pack to victory by eliminating the villagers. Your leadership is crucial to the werewolves' success.",
  },
  Sorceress: {
    icon: "🔮",
    color: "#7b1fa2",
    description:
      "Each night, you can see if a player is a werewolf, but not who they are.",
    detailedDescription:
      "You are the Sorceress! Each night, you can use your magic to see if a player is a werewolf, but you cannot see their identity. Use your powers to help the villagers identify the werewolves.",
  },
  Lycan: {
    icon: "🐺",
    color: "#8d6e63",
    description: "A werewolf who appears as a villager to the Seer.",
    detailedDescription:
      "You are the Lycan! You are a werewolf with a special ability - you appear as a villager to the Seer. Use this deception to your advantage and avoid detection while working with your pack.",
  },
  Witch: {
    icon: "🧙‍♀️",
    color: "#6a1b9a",
    description:
      "You have two potions: one to save a player, one to kill a player. Each can be used only once.",
    detailedDescription:
      "You are the Witch! You have two powerful potions: one to save a player from elimination, and one to kill a player. Each potion can be used only once during the game. Use them wisely to help your team win.",
  },
  Fool: {
    icon: "🤡",
    color: "#ff9800",
    description:
      "You think you're the Seer, but your visions are always wrong.",
    detailedDescription:
      "You are the Fool! You believe you are the Seer and receive visions each night, but your visions are always wrong. You will be told the opposite of the truth. Be careful not to mislead the villagers with your false information.",
  },
  Detective: {
    icon: "🔍",
    color: "#3f51b5",
    description:
      "Each night, you can investigate one player to learn if they have visited someone.",
    detailedDescription:
      "You are the Detective! Each night, you can investigate one player to learn if they have visited someone during the night. This can help you track the movements of werewolves and other night-active roles.",
  },
};

// DOM elements
const gameSetupForm = document.getElementById("gameSetupForm");
const playerCountInput = document.getElementById("playerCount");
const werewolfCountInput = document.getElementById("werewolfCount");
const seerCountInput = document.getElementById("seerCount");
const doctorCountInput = document.getElementById("doctorCount");
const bodyguardCountInput = document.getElementById("bodyguardCount");
const cupidCountInput = document.getElementById("cupidCount");
const wolfCubCountInput = document.getElementById("wolfCubCount");
const alphaWolfCountInput = document.getElementById("alphaWolfCount");
const sorceressCountInput = document.getElementById("sorceressCount");
const lycanCountInput = document.getElementById("lycanCount");
const witchCountInput = document.getElementById("witchCount");
const foolCountInput = document.getElementById("foolCount");
const detectiveCountInput = document.getElementById("detectiveCount");
const hunterCountInput = document.getElementById("hunterCount");
const usePlayerNamesCheckbox = document.getElementById("usePlayerNames");
const playerNamesContainer = document.getElementById("playerNamesContainer");
const playerNamesList = document.getElementById("playerNamesList");
const gameResults = document.getElementById("gameResults");
const playerLinks = document.getElementById("playerLinks");
const gameSummary = document.getElementById("gameSummary");
const roleAssignments = document.getElementById("roleAssignments");

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Update player names when checkbox changes
  usePlayerNamesCheckbox.addEventListener("change", togglePlayerNames);

  // Update player names when player count changes
  playerCountInput.addEventListener("input", updatePlayerNames);

  // Form submission
  gameSetupForm.addEventListener("submit", handleGameSetup);

  // Test QR code button
  const testQRBtn = document.getElementById("testQRBtn");
  if (testQRBtn) {
    testQRBtn.addEventListener("click", testQRCode);
  }

  // Role assignments button
  const showRoleAssignmentsBtn = document.getElementById(
    "showRoleAssignmentsBtn"
  );
  if (showRoleAssignmentsBtn) {
    showRoleAssignmentsBtn.addEventListener("click", toggleRoleAssignments);
  }

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

// Toggle role assignments section
function toggleRoleAssignments() {
  const roleAssignmentsSection = document.querySelector(".role-assignments");
  const showRoleAssignmentsBtn = document.getElementById(
    "showRoleAssignmentsBtn"
  );

  if (roleAssignmentsSection.style.display === "none") {
    roleAssignmentsSection.style.display = "block";
    showRoleAssignmentsBtn.textContent = "Hide Role Assignments";
    showRoleAssignmentsBtn.classList.add("btn-danger");
  } else {
    roleAssignmentsSection.style.display = "none";
    showRoleAssignmentsBtn.textContent = "Show Role Assignments";
    showRoleAssignmentsBtn.classList.remove("btn-danger");
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
  const bodyguardCount = parseInt(bodyguardCountInput.value);
  const cupidCount = parseInt(cupidCountInput.value);
  const wolfCubCount = parseInt(wolfCubCountInput.value);
  const alphaWolfCount = parseInt(alphaWolfCountInput.value);
  const sorceressCount = parseInt(sorceressCountInput.value);
  const lycanCount = parseInt(lycanCountInput.value);
  const witchCount = parseInt(witchCountInput.value);
  const foolCount = parseInt(foolCountInput.value);
  const detectiveCount = parseInt(detectiveCountInput.value);
  const hunterCount = parseInt(hunterCountInput.value);
  const usePlayerNames = usePlayerNamesCheckbox.checked;

  // Validate inputs
  if (
    !validateGameSetup(
      playerCount,
      werewolfCount,
      seerCount,
      doctorCount,
      bodyguardCount,
      cupidCount,
      wolfCubCount,
      alphaWolfCount,
      sorceressCount,
      lycanCount,
      witchCount,
      foolCount,
      detectiveCount,
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
    bodyguardCount,
    cupidCount,
    wolfCubCount,
    alphaWolfCount,
    sorceressCount,
    lycanCount,
    witchCount,
    foolCount,
    detectiveCount,
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
  bodyguardCount,
  cupidCount,
  wolfCubCount,
  alphaWolfCount,
  sorceressCount,
  lycanCount,
  witchCount,
  foolCount,
  detectiveCount,
  hunterCount
) {
  const totalSpecialRoles =
    werewolfCount +
    seerCount +
    doctorCount +
    bodyguardCount +
    cupidCount +
    wolfCubCount +
    alphaWolfCount +
    sorceressCount +
    lycanCount +
    witchCount +
    foolCount +
    detectiveCount +
    hunterCount;
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
  bodyguardCount,
  cupidCount,
  wolfCubCount,
  alphaWolfCount,
  sorceressCount,
  lycanCount,
  witchCount,
  foolCount,
  detectiveCount,
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

  // Add bodyguards
  for (let i = 0; i < bodyguardCount; i++) {
    roles.push("Bodyguard");
  }

  // Add cupids
  for (let i = 0; i < cupidCount; i++) {
    roles.push("Cupid");
  }

  // Add wolf cubs
  for (let i = 0; i < wolfCubCount; i++) {
    roles.push("WolfCub");
  }

  // Add alpha wolves
  for (let i = 0; i < alphaWolfCount; i++) {
    roles.push("AlphaWolf");
  }

  // Add sorceresses
  for (let i = 0; i < sorceressCount; i++) {
    roles.push("Sorceress");
  }

  // Add lycans
  for (let i = 0; i < lycanCount; i++) {
    roles.push("Lycan");
  }

  // Add witches
  for (let i = 0; i < witchCount; i++) {
    roles.push("Witch");
  }

  // Add fools
  for (let i = 0; i < foolCount; i++) {
    roles.push("Fool");
  }

  // Add detectives
  for (let i = 0; i < detectiveCount; i++) {
    roles.push("Detective");
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

  // Generate role assignments
  generateRoleAssignments();

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

    // Create card content with show QR code button
    playerCard.innerHTML = `
            <h3>${player.name}</h3>
            <button class="btn btn-primary show-qr-btn" onclick="showQRCode('${playerUrl.href}', 'qr-${player.number}', this)">
              Show QR Code
            </button>
            <div class="qr-code-container" id="qr-${player.number}" style="display: none;"></div>
        `;

    playerLinks.appendChild(playerCard);
  });
}

// Show QR code function
function showQRCode(text, elementId, button) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  // Toggle QR code visibility
  if (element.style.display === "none") {
    // Show QR code
    element.style.display = "block";
    button.textContent = "Hide QR Code";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");

    // Generate QR code if not already generated
    if (element.innerHTML === "") {
      generateQRCode(text, elementId);
    }
  } else {
    // Hide QR code
    element.style.display = "none";
    button.textContent = "Show QR Code";
    button.classList.remove("btn-secondary");
    button.classList.add("btn-primary");
  }
}

// Generate QR code
function generateQRCode(text, elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  // Clear previous QR code
  element.innerHTML = "";

  console.log("Generating QR code for:", text, "in element:", elementId);

  // Try the most reliable method first - direct API call
  generateFallbackQRCode(text, element);
}

// Fallback QR code generator using multiple methods
function generateFallbackQRCode(text, element) {
  try {
    const size = 200;

    // Method 1: Try QR Server API
    const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      text
    )}`;

    const img = document.createElement("img");
    img.src = qrServerUrl;
    img.alt = "QR Code";
    img.style.width = size + "px";
    img.style.height = size + "px";

    img.onload = function () {
      console.log("QR code generated successfully using QR Server");
    };

    img.onerror = function () {
      console.log("QR Server failed, trying alternative APIs...");

      // Method 2: Try QR Code Monkey API
      const qrMonkeyUrl = `https://www.qrcode-monkey.com/api/qr/custom?size=${size}&data=${encodeURIComponent(
        text
      )}&file=png`;
      img.src = qrMonkeyUrl;

      img.onerror = function () {
        // Method 3: Try GoQR.me API
        const goQrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          text
        )}&size=${size}x${size}&format=png`;
        img.src = goQrUrl;

        img.onerror = function () {
          // Method 4: Simple text fallback
          console.error("All QR APIs failed, showing text link");
          element.innerHTML = `
            <div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px;">
              <p style="margin: 0 0 10px 0; font-weight: bold;">QR Code Unavailable</p>
              <p style="margin: 0 0 10px 0; font-size: 12px; word-break: break-all;">${text}</p>
              <button onclick="navigator.clipboard.writeText('${text}')" style="padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Copy Link
              </button>
            </div>
          `;
        };
      };
    };

    element.appendChild(img);
  } catch (error) {
    console.error("Fallback QR code generation exception:", error);
    element.innerHTML = `
      <div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; font-weight: bold;">QR Code Error</p>
        <p style="margin: 0 0 10px 0; font-size: 12px; word-break: break-all;">${text}</p>
        <button onclick="navigator.clipboard.writeText('${text}')" style="padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Copy Link
        </button>
      </div>
    `;
  }
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

// Generate role assignments display
function generateRoleAssignments() {
  const roleAssignmentsContainer = document.getElementById("roleAssignments");
  if (!roleAssignmentsContainer) {
    console.error("Role assignments container not found");
    return;
  }

  // Create a shuffled copy of players to avoid revealing assignment order
  const shuffledPlayers = [...gameState.players];
  shuffleArray(shuffledPlayers);

  let assignmentsHTML = "";

  shuffledPlayers.forEach((player) => {
    const config = roleConfigs[player.role];
    if (config) {
      assignmentsHTML += `
        <div class="role-assignment-item">
          <div class="role-assignment-icon">${config.icon}</div>
          <div class="role-assignment-info">
            <div class="role-assignment-player">${player.name}</div>
            <div class="role-assignment-role">${player.role}</div>
          </div>
        </div>
      `;
    }
  });

  roleAssignmentsContainer.innerHTML = assignmentsHTML;
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

// Test QR code function
function testQRCode() {
  console.log("Testing QR code generation...");
  console.log("QRCode library available:", typeof QRCode !== "undefined");

  // Create a test container
  const testContainer = document.createElement("div");
  testContainer.id = "test-qr";
  testContainer.style.cssText =
    "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1000;";
  testContainer.innerHTML =
    '<h3>QR Code Test</h3><div id="test-qr-code"></div><button onclick="this.parentElement.remove()" style="margin-top: 10px;">Close</button>';

  document.body.appendChild(testContainer);

  // Test QR code generation with a sample player URL
  const testUrl = new URL("player.html", window.location.href);
  testUrl.searchParams.set("role", "Werewolf");
  testUrl.searchParams.set("player", "1");
  generateQRCode(testUrl.href, "test-qr-code");
}

// Export functions for global access (if needed)
window.WerewolfGame = {
  generateGame,
  copyToClipboard,
  gameState,
  testQRCode,
};
