// Game configuration and state
let gameState = {
  players: [],
  roles: [],
  playerNames: [],
  // Game tracking state
  playerStatus: {}, // player number -> 'alive' or 'dead'
  nightActions: [], // array of action objects
  lovers: [], // array of lover pairs
  currentPhase: "Night 1",
  phaseCount: 1,
};

// Role configurations
const roleConfigs = {
  Werewolf: {
    icon: "🐺",
    color: "#d32f2f",
    description:
      "Work with your fellow werewolves to eliminate the villagers each night.",
    detailedDescription:
      "You are a Werewolf! Work with your fellow werewolves to eliminate the villagers. Each night, you can choose one player to eliminate. Avoid detection to win the game with your pack.",
  },
  Villager: {
    icon: "👥",
    color: "#7b1fa2",
    description:
      "Work with fellow villagers to identify and eliminate werewolves.",
    detailedDescription:
      "You are a Villager! You have no special powers, but your vote and voice are crucial to eliminating the werewolves. Discuss, deduce, and survive.",
  },
  Seer: {
    icon: "🔮",
    color: "#1976d2",
    description: "Each night, investigate one player to learn their true role.",
    detailedDescription:
      "You are the Seer! Each night, you can investigate one player to learn their true role. Use this information wisely to help the village identify werewolves.",
  },
  Doctor: {
    icon: "🏥",
    color: "#388e3c",
    description: "Each night, protect one player from elimination.",
    detailedDescription:
      "You are the Doctor! Each night, you can protect one player from elimination by the werewolves. You cannot protect the same player two nights in a row. Use your ability wisely to save the village.",
  },
  Hunter: {
    icon: "🏹",
    color: "#f57c00",
    description:
      "If you are eliminated, you can take one player down with you.",
    detailedDescription:
      "You are the Hunter! If you are eliminated, you may immediately eliminate one player as your final act. Choose carefully to maximize your impact.",
  },
  Bodyguard: {
    icon: "🛡️",
    color: "#2e7d32",
    description:
      "Each night, protect one player. If attacked, you die in their place.",
    detailedDescription:
      "You are the Bodyguard! Each night, choose one player to protect. If the werewolves attack them, you die instead. You cannot protect the same player on consecutive nights.",
  },
  Cupid: {
    icon: "💘",
    color: "#e91e63",
    description: "On the first night, choose two players to fall in love.",
    detailedDescription:
      "You are Cupid! On the first night, select two players to become lovers. If one dies, the other dies too. Lovers win together regardless of their original teams.",
  },
  WolfCub: {
    icon: "🐺",
    color: "#d32f2f",
    description:
      "A young werewolf. If killed, werewolves get an extra kill next night.",
    detailedDescription:
      "You are the Wolf Cub! If you are eliminated, your werewolf pack will be enraged and may eliminate two players the following night.",
  },
  AlphaWolf: {
    icon: "🐺",
    color: "#b71c1c",
    description: "Leader of the werewolves. Knows all fellow werewolves.",
    detailedDescription:
      "You are the Alpha Wolf! You lead the werewolf pack and know your allies. Coordinate attacks and survive to win.",
  },
  Sorceress: {
    icon: "🔮",
    color: "#7b1fa2",
    description:
      "Each night, check if a player is a werewolf (without seeing exact role).",
    detailedDescription:
      "You are the Sorceress! Each night, choose one player to sense. You will know if they are a werewolf, but not their exact role.",
  },
  Lycan: {
    icon: "🐺",
    color: "#8d6e63",
    description: "A normal villager who appears as a werewolf to the Seer.",
    detailedDescription:
      "You are the Lycan! You are a normal villager with no special powers, but if the Seer investigates you, the moderator will tell them that you are a Werewolf. Use this to mislead the Seer or to create confusion among the players.",
  },
  Witch: {
    icon: "🧙‍♀️",
    color: "#6a1b9a",
    description:
      "You have two potions: one heal, one kill. Each can be used once.",
    detailedDescription:
      "You are the Witch! You can save a player once and eliminate a player once during the game. Choose carefully to shift the balance.",
  },

  Detective: {
    icon: "🔍",
    color: "#3f51b5",
    description:
      "Each night, check if a player visited someone during the night.",
    detailedDescription:
      "You are the Detective! You can track one player each night to see if they visited anyone. This can help identify night-active roles like werewolves.",
  },
  Revealer: {
    icon: "🔫",
    color: "#795548",
    description:
      "At night, you may shoot a player. If you hit a villager, you die.",
    detailedDescription:
      "You are the Revealer! Each night, you may shoot one player. If you hit a Werewolf, they die and you survive. If you hit a Villager or non-Werewolf, they die and you die as punishment. A high-risk, high-reward role for the village.",
  },
  PI: {
    icon: "🧭",
    color: "#009688",
    description:
      "Check one player. Learn if they or their neighbors are Werewolves.",
    detailedDescription:
      "You are the Paranormal Investigator! Each night, select one player. You will receive 'YES' if that player OR the players to their left or right are Werewolves. Otherwise, you get 'NO'. Use this info to guide the village.",
  },
  Tanner: {
    icon: "🪓",
    color: "#9e9e9e",
    description:
      "You hate your job and want to die. If lynched, you alone win.",
    detailedDescription:
      "You are the Tanner! You are not on the village or werewolf team. Your goal is to get yourself eliminated during the day. If the village votes you out, you win instantly—even if the werewolves survive.",
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

const detectiveCountInput = document.getElementById("detectiveCount");
const revealerCountInput = document.getElementById("revealerCount");
const piCountInput = document.getElementById("piCount");
const tannerCountInput = document.getElementById("tannerCount");
const hunterCountInput = document.getElementById("hunterCount");
const usePlayerNamesCheckbox = document.getElementById("usePlayerNames");
const playerNamesContainer = document.getElementById("playerNamesContainer");
const playerNamesList = document.getElementById("playerNamesList");
const gameResults = document.getElementById("gameResults");
const playerLinks = document.getElementById("playerLinks");

// Timer elements
const timerMinutesInput = document.getElementById("timerMinutes");
const timerSecondsInput = document.getElementById("timerSeconds");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const timerDisplay = document.getElementById("timerDisplay");
const timerTime = document.getElementById("timerTime");

// Role guide button
const roleGuideBtn = document.getElementById("roleGuideBtn");
const gameSummary = document.getElementById("gameSummary");
const roleAssignments = document.getElementById("roleAssignments");

// Game tracking elements
const gameTracking = document.getElementById("gameTracking");
const playerStatusList = document.getElementById("playerStatusList");
const aliveCount = document.getElementById("aliveCount");
const deadCount = document.getElementById("deadCount");
const actionType = document.getElementById("actionType");
const actionPerformer = document.getElementById("actionPerformer");
const actionTarget = document.getElementById("actionTarget");
const addActionBtn = document.getElementById("addActionBtn");
const actionsList = document.getElementById("actionsList");
const loversSection = document.getElementById("loversSection");
const loversList = document.getElementById("loversList");
const addLoversBtn = document.getElementById("addLoversBtn");
const nextPhaseBtn = document.getElementById("nextPhaseBtn");
const currentPhase = document.getElementById("currentPhase");
const resetPhaseBtn = document.getElementById("resetPhaseBtn");

// Timer state variables (global scope)
let timerInterval = null;
let timerRunning = false;
let timerPaused = false;
let remainingTime = 0;

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

  // Timer functionality
  if (startTimerBtn) startTimerBtn.addEventListener("click", startTimer);
  if (pauseTimerBtn) pauseTimerBtn.addEventListener("click", pauseTimer);
  if (resetTimerBtn) resetTimerBtn.addEventListener("click", resetTimer);

  // Role guide functionality
  if (roleGuideBtn) roleGuideBtn.addEventListener("click", showRoleGuide);

  // Game tracking functionality
  if (addActionBtn) addActionBtn.addEventListener("click", addNightAction);
  if (addLoversBtn) addLoversBtn.addEventListener("click", addLoversPair);
  if (nextPhaseBtn) nextPhaseBtn.addEventListener("click", nextPhase);
  if (resetPhaseBtn) resetPhaseBtn.addEventListener("click", resetPhase);

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

  const detectiveCount = parseInt(detectiveCountInput.value);
  const revealerCount = parseInt(revealerCountInput.value);
  const piCount = parseInt(piCountInput.value);
  const tannerCount = parseInt(tannerCountInput.value);
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
      detectiveCount,
      revealerCount,
      piCount,
      tannerCount,
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
    detectiveCount,
    revealerCount,
    piCount,
    tannerCount,
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
  detectiveCount,
  revealerCount,
  piCount,
  tannerCount,
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
    detectiveCount +
    revealerCount +
    piCount +
    tannerCount +
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
  detectiveCount,
  revealerCount,
  piCount,
  tannerCount,
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

  // Add detectives
  for (let i = 0; i < detectiveCount; i++) {
    roles.push("Detective");
  }

  // Add revealers
  for (let i = 0; i < revealerCount; i++) {
    roles.push("Revealer");
  }

  // Add PIs
  for (let i = 0; i < piCount; i++) {
    roles.push("PI");
  }

  // Add tanners
  for (let i = 0; i < tannerCount; i++) {
    roles.push("Tanner");
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
  // Hide the game setup form since it's no longer needed
  gameSetupForm.style.display = "none";

  // Show results section
  gameResults.style.display = "block";

  // Show game tracking system
  gameTracking.style.display = "block";

  // Generate player links and QR codes
  generatePlayerLinks();

  // Generate game summary
  generateGameSummary();

  // Generate role assignments
  generateRoleAssignments();

  // Initialize game tracking
  initializeGameTracking();

  // Scroll to results
  gameResults.scrollIntoView({ behavior: "smooth" });
}

// Generate player links and QR codes
function generatePlayerLinks() {
  playerLinks.innerHTML = "";

  // Get all werewolf players for teammate information
  const werewolfRoles = ["Werewolf", "WolfCub", "AlphaWolf", "Sorceress"];
  const werewolfPlayers = gameState.players.filter((p) =>
    werewolfRoles.includes(p.role)
  );
  const werewolfNames = werewolfPlayers.map((p) => p.name);

  gameState.players.forEach((player, index) => {
    const playerCard = document.createElement("div");
    playerCard.className = "player-link-card";

    // Create player link
    const playerUrl = new URL("player.html", window.location.href);
    playerUrl.searchParams.set("role", player.role);
    playerUrl.searchParams.set("player", player.number);
    playerUrl.searchParams.set("name", player.name);

    // Add werewolf teammates if this player is a werewolf role
    if (werewolfRoles.includes(player.role)) {
      const teammates = werewolfNames.filter((name) => name !== player.name);
      if (teammates.length > 0) {
        playerUrl.searchParams.set("teammates", teammates.join(","));
      }
    }

    // Add game roles so the player guide only shows roles in this game
    const uniqueRoles = [...new Set(gameState.roles)];
    playerUrl.searchParams.set("gameRoles", uniqueRoles.join(","));

    // Create card content with show QR code button
    playerCard.innerHTML = `
            <h3>${player.name}</h3>
            <button class="btn btn-primary show-qr-btn" onclick="showQRCode('${playerUrl.href}', 'qr-${player.number}', this)">
              Show QR Code
            </button>
            <div class="qr-code-container" id="qr-${player.number}" style="display: none;">
              <a href="${playerUrl.href}" class="qr-code-link" target="_blank" title="Click to open player page">
                <!-- QR code will be inserted here -->
              </a>
            </div>
        `;

    playerLinks.appendChild(playerCard);
  });
}

// Show QR code function
function showQRCode(text, elementId, button) {
  console.log("showQRCode called with:", text, elementId);

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  console.log("Element found:", element);
  console.log("Current display style:", element.style.display);

  // Toggle QR code visibility
  if (element.style.display === "none") {
    // Show QR code
    element.style.display = "block";
    button.textContent = "Hide QR Code";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");

    // Always generate QR code when showing
    console.log("Generating QR code...");
    generateQRCode(text, elementId);
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
  console.log("generateQRCode called with:", text, elementId);

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  console.log("Element HTML:", element.innerHTML);

  // Find the link element inside the container
  const linkElement = element.querySelector(".qr-code-link");
  if (!linkElement) {
    console.error("Link element not found in:", elementId);
    console.log("Available elements:", element.children);
    return;
  }

  console.log("Link element found:", linkElement);

  // Clear previous QR code
  linkElement.innerHTML = "";

  console.log("Generating QR code for:", text, "in element:", elementId);

  // Try the most reliable method first - direct API call
  generateFallbackQRCode(text, linkElement);
}

// Fallback QR code generator using multiple methods
function generateFallbackQRCode(text, element) {
  console.log("generateFallbackQRCode called with:", text);
  console.log("Target element:", element);

  try {
    const size = 200;

    // Method 1: Try QR Server API
    const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      text
    )}`;

    console.log("QR Server URL:", qrServerUrl);

    const img = document.createElement("img");
    img.src = qrServerUrl;
    img.alt = "QR Code";
    img.style.width = size + "px";
    img.style.height = size + "px";

    img.onload = function () {
      console.log("QR code generated successfully using QR Server");
      console.log("Image loaded:", img);
    };

    img.onerror = function () {
      console.log("QR Server failed, trying alternative APIs...");
      console.log("Image error:", img);

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

    console.log("Appending image to element:", element);
    element.appendChild(img);
    console.log("Image appended successfully");
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

// Timer functions
function startTimer() {
  if (!timerRunning) {
    const minutes = parseInt(timerMinutesInput.value) || 0;
    const seconds = parseInt(timerSecondsInput.value) || 0;
    remainingTime = minutes * 60 + seconds;

    if (remainingTime <= 0) {
      alert("Please set a valid time!");
      return;
    }

    timerRunning = true;
    timerPaused = false;
    startTimerBtn.style.display = "none";
    pauseTimerBtn.style.display = "inline-block";
    timerDisplay.style.display = "block";

    updateTimerDisplay();
    timerInterval = setInterval(updateTimer, 1000);
  } else if (timerPaused) {
    // Resume timer
    timerPaused = false;
    startTimerBtn.style.display = "none";
    pauseTimerBtn.style.display = "inline-block";
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  if (timerRunning && !timerPaused) {
    timerPaused = true;
    clearInterval(timerInterval);
    startTimerBtn.style.display = "inline-block";
    pauseTimerBtn.style.display = "none";
    startTimerBtn.textContent = "Resume";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerPaused = false;
  startTimerBtn.style.display = "inline-block";
  pauseTimerBtn.style.display = "none";
  startTimerBtn.textContent = "Start Timer";
  timerDisplay.style.display = "none";
  timerMinutesInput.value = "15";
  timerSecondsInput.value = "0";
}

function updateTimer() {
  remainingTime--;
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    timerRunning = false;
    startTimerBtn.style.display = "inline-block";
    pauseTimerBtn.style.display = "none";
    startTimerBtn.textContent = "Start Timer";
    timerTime.textContent = "00:00";

    // Play notification sound or show alert
    if (Notification.permission === "granted") {
      new Notification("Timer Finished!", {
        body: "Your game timer has finished!",
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏰</text></svg>",
      });
    } else {
      alert("⏰ Timer finished!");
    }
  } else {
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Role guide function
function showRoleGuide() {
  const modal = document.createElement("div");
  modal.className = "role-guide-modal";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
  `;

  // Define role categories
  const werewolfRoles = ["Werewolf", "WolfCub", "AlphaWolf", "Sorceress"];
  const villagerRoles = [
    "Seer",
    "Doctor",
    "Hunter",
    "Villager",
    "Bodyguard",
    "Cupid",
    "Witch",
    "Detective",
    "Revealer",
    "PI",
    "Lycan",
  ];
  const neutralRoles = ["Tanner"];

  let rolesHTML = "<h2>🎭 Werewolf Role Guide</h2>";

  // Werewolf Roles Section
  rolesHTML +=
    "<h3 style='color: #d32f2f; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 2px solid #d32f2f; padding-bottom: 0.5rem;'>🐺 Werewolf Team</h3>";

  Object.entries(roleConfigs)
    .filter(([roleName, config]) => werewolfRoles.includes(roleName))
    .forEach(([roleName, config]) => {
      rolesHTML += `
        <div class="role-guide-item" style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #d32f2f; border-radius: 8px; background: rgba(211, 47, 47, 0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 2rem; margin-right: 1rem;">${config.icon}</span>
            <h3 style="margin: 0; color: ${config.color};">${roleName}</h3>
          </div>
          <p style="margin: 0.5rem 0; font-weight: bold;">${config.description}</p>
          <p style="margin: 0; color: #666; font-size: 0.9rem;">${config.detailedDescription}</p>
        </div>
      `;
    });

  // Villager Roles Section
  rolesHTML +=
    "<h3 style='color: #1976d2; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 2px solid #1976d2; padding-bottom: 0.5rem;'>👥 Village Team</h3>";

  Object.entries(roleConfigs)
    .filter(([roleName, config]) => villagerRoles.includes(roleName))
    .forEach(([roleName, config]) => {
      rolesHTML += `
        <div class="role-guide-item" style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #1976d2; border-radius: 8px; background: rgba(25, 118, 210, 0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 2rem; margin-right: 1rem;">${config.icon}</span>
            <h3 style="margin: 0; color: ${config.color};">${roleName}</h3>
          </div>
          <p style="margin: 0.5rem 0; font-weight: bold;">${config.description}</p>
          <p style="margin: 0; color: #666; font-size: 0.9rem;">${config.detailedDescription}</p>
        </div>
      `;
    });

  // Neutral Roles Section
  rolesHTML +=
    "<h3 style='color: #ff9800; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 2px solid #ff9800; padding-bottom: 0.5rem;'>⚖️ Neutral Roles</h3>";

  Object.entries(roleConfigs)
    .filter(([roleName, config]) => neutralRoles.includes(roleName))
    .forEach(([roleName, config]) => {
      rolesHTML += `
        <div class="role-guide-item" style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #ff9800; border-radius: 8px; background: rgba(255, 152, 0, 0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 2rem; margin-right: 1rem;">${config.icon}</span>
            <h3 style="margin: 0; color: ${config.color};">${roleName}</h3>
          </div>
          <p style="margin: 0.5rem 0; font-weight: bold;">${config.description}</p>
          <p style="margin: 0; color: #666; font-size: 0.9rem;">${config.detailedDescription}</p>
        </div>
      `;
    });

  modalContent.innerHTML = `
    ${rolesHTML}
    <button onclick="this.parentElement.parentElement.remove()" style="
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      font-size: 16px;
    ">×</button>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// ===== GAME TRACKING SYSTEM =====

// Initialize game tracking
function initializeGameTracking() {
  // Initialize player status
  gameState.players.forEach((player) => {
    gameState.playerStatus[player.number] = "alive";
  });

  // Show lovers section if Cupid is in the game
  const hasCupid = gameState.players.some((player) => player.role === "Cupid");
  if (hasCupid && loversSection) {
    loversSection.style.display = "block";
  }

  // Update displays
  updatePlayerStatusDisplay();
  updateActionDropdowns();
  updatePhaseDisplay();
}

// Update player status display
function updatePlayerStatusDisplay() {
  if (!playerStatusList) return;

  playerStatusList.innerHTML = "";

  gameState.players.forEach((player) => {
    const status = gameState.playerStatus[player.number] || "alive";
    const roleConfig = roleConfigs[player.role];

    const playerItem = document.createElement("div");
    playerItem.className = `player-status-item ${status}`;

    playerItem.innerHTML = `
      <div class="player-info">
        <div class="player-avatar">${player.number}</div>
        <div class="player-details">
          <div class="player-name">${player.name}</div>
          <div class="player-role">
            <span class="player-role-icon">${roleConfig.icon}</span>
            ${player.role}
          </div>
        </div>
      </div>
      <div class="status-controls">
        <button class="status-btn alive" onclick="setPlayerStatus(${player.number}, 'alive')">Alive</button>
        <button class="status-btn dead" onclick="setPlayerStatus(${player.number}, 'dead')">Dead</button>
      </div>
    `;

    playerStatusList.appendChild(playerItem);
  });

  // Update statistics
  updateGameStatistics();
}

// Set player status
function setPlayerStatus(playerNumber, status) {
  gameState.playerStatus[playerNumber] = status;
  updatePlayerStatusDisplay();
  updateActionDropdowns();
}

// Update game statistics
function updateGameStatistics() {
  if (!aliveCount || !deadCount) return;

  const alivePlayers = Object.values(gameState.playerStatus).filter(
    (status) => status === "alive"
  ).length;
  const deadPlayers = Object.values(gameState.playerStatus).filter(
    (status) => status === "dead"
  ).length;

  aliveCount.textContent = alivePlayers;
  deadCount.textContent = deadPlayers;
}

// Update action dropdowns
function updateActionDropdowns() {
  if (!actionPerformer || !actionTarget) return;

  const alivePlayers = gameState.players.filter(
    (player) => gameState.playerStatus[player.number] === "alive"
  );

  // Update performer dropdown
  actionPerformer.innerHTML = '<option value="">Performer</option>';
  alivePlayers.forEach((player) => {
    const option = document.createElement("option");
    option.value = player.number;
    option.textContent = `${player.name} (${player.role})`;
    actionPerformer.appendChild(option);
  });

  // Update target dropdown
  actionTarget.innerHTML = '<option value="">Target</option>';
  alivePlayers.forEach((player) => {
    const option = document.createElement("option");
    option.value = player.number;
    option.textContent = `${player.name} (${player.role})`;
    actionTarget.appendChild(option);
  });
}

// Add night action
function addNightAction() {
  if (!actionType || !actionPerformer || !actionTarget) return;

  const type = actionType.value;
  const performer = actionPerformer.value;
  const target = actionTarget.value;

  if (!type || !performer || !target) {
    alert("Please fill in all fields");
    return;
  }

  const performerPlayer = gameState.players.find((p) => p.number == performer);
  const targetPlayer = gameState.players.find((p) => p.number == target);

  const action = {
    type: type,
    performer: performer,
    target: target,
    performerName: performerPlayer.name,
    targetName: targetPlayer.name,
    timestamp: new Date().toLocaleTimeString(),
    phase: gameState.currentPhase,
  };

  gameState.nightActions.push(action);
  updateActionsDisplay();

  // Clear form
  actionType.value = "";
  actionPerformer.value = "";
  actionTarget.value = "";
}

// Update actions display
function updateActionsDisplay() {
  if (!actionsList) return;

  actionsList.innerHTML = "";

  gameState.nightActions.forEach((action) => {
    const actionItem = document.createElement("div");
    actionItem.className = "action-item";

    const actionText = getActionText(action);

    actionItem.innerHTML = `
      <div class="action-text">${actionText}</div>
      <div class="action-time">${action.timestamp}</div>
    `;

    actionsList.appendChild(actionItem);
  });
}

// Get action text
function getActionText(action) {
  const actionTexts = {
    attack: `🐺 ${action.performerName} attacked ${action.targetName}`,
    save: `🏥 ${action.performerName} saved ${action.targetName}`,
    investigate: `🔮 ${action.performerName} investigated ${action.targetName}`,
    protect: `🛡️ ${action.performerName} protected ${action.targetName}`,
    "witch-save": `🧙‍♀️ ${action.performerName} used save potion on ${action.targetName}`,
    "witch-kill": `🧙‍♀️ ${action.performerName} used kill potion on ${action.targetName}`,
    "hunter-kill": `🏹 ${action.performerName} killed ${action.targetName}`,
    other: `⚡ ${action.performerName} performed action on ${action.targetName}`,
  };

  return actionTexts[action.type] || actionTexts["other"];
}

// Add lovers pair
function addLoversPair() {
  if (!loversList) return;

  const alivePlayers = gameState.players.filter(
    (player) => gameState.playerStatus[player.number] === "alive"
  );

  if (alivePlayers.length < 2) {
    alert("Need at least 2 alive players to create lovers");
    return;
  }

  // Create a modal for selecting lovers
  showLoversSelectionModal(alivePlayers);
}

// Show lovers selection modal
function showLoversSelectionModal(alivePlayers) {
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContent = document.createElement("div");
  modalContent.className = "lovers-selection-modal";
  modalContent.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
  `;

  // Create player selection options
  let playerOptions = '<option value="">Select Player</option>';
  alivePlayers.forEach((player) => {
    playerOptions += `<option value="${player.number}">${player.name} (${player.role})</option>`;
  });

  modalContent.innerHTML = `
    <h3 style="color: #e91e63; margin-bottom: 1.5rem;">💕 Select Lovers Pair</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">First Lover:</label>
        <select id="lover1Select" style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px;">
          ${playerOptions}
        </select>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Second Lover:</label>
        <select id="lover2Select" style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px;">
          ${playerOptions}
        </select>
      </div>
    </div>
    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
        padding: 0.75rem 1.5rem;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      ">Cancel</button>
      <button onclick="createLoversPair()" style="
        padding: 0.75rem 1.5rem;
        background: #e91e63;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      ">Create Lovers</button>
    </div>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Create lovers pair from modal selection
function createLoversPair() {
  const lover1Select = document.getElementById("lover1Select");
  const lover2Select = document.getElementById("lover2Select");

  if (!lover1Select || !lover2Select) return;

  const lover1Number = lover1Select.value;
  const lover2Number = lover2Select.value;

  if (!lover1Number || !lover2Number) {
    alert("Please select both lovers");
    return;
  }

  if (lover1Number === lover2Number) {
    alert("A player cannot be in love with themselves");
    return;
  }

  // Check if either player is already in a lovers pair
  const existingLovers = gameState.lovers.some(
    (pair) =>
      pair.player1 == lover1Number ||
      pair.player2 == lover1Number ||
      pair.player1 == lover2Number ||
      pair.player2 == lover2Number
  );

  if (existingLovers) {
    alert("One or both players are already in a lovers pair");
    return;
  }

  const lover1 = gameState.players.find((p) => p.number == lover1Number);
  const lover2 = gameState.players.find((p) => p.number == lover2Number);

  const loversPair = {
    player1: lover1.number,
    player2: lover2.number,
    player1Name: lover1.name,
    player2Name: lover2.name,
  };

  gameState.lovers.push(loversPair);
  updateLoversDisplay();

  // Close modal
  const modal = document.querySelector("div[style*='position: fixed']");
  if (modal) modal.remove();
}

// Update lovers display
function updateLoversDisplay() {
  if (!loversList) return;

  loversList.innerHTML = "";

  gameState.lovers.forEach((pair) => {
    const loversItem = document.createElement("div");
    loversItem.className = "lovers-pair";

    loversItem.innerHTML = `
      <div class="lovers-names">
        <span class="player-name">${pair.player1Name}</span>
        <span class="separator">💕</span>
        <span class="player-name">${pair.player2Name}</span>
      </div>
      <button class="btn btn-danger" onclick="removeLoversPair(${pair.player1}, ${pair.player2})">Remove</button>
    `;

    loversList.appendChild(loversItem);
  });
}

// Remove lovers pair
function removeLoversPair(player1, player2) {
  gameState.lovers = gameState.lovers.filter(
    (pair) => !(pair.player1 === player1 && pair.player2 === player2)
  );
  updateLoversDisplay();
}

// Next phase
function nextPhase() {
  gameState.phaseCount++;

  if (gameState.phaseCount % 2 === 0) {
    gameState.currentPhase = `Day ${gameState.phaseCount / 2}`;
  } else {
    gameState.currentPhase = `Night ${Math.ceil(gameState.phaseCount / 2)}`;
  }

  updatePhaseDisplay();
}

// Reset phase
function resetPhase() {
  gameState.phaseCount = 1;
  gameState.currentPhase = "Night 1";
  updatePhaseDisplay();
}

// Update phase display
function updatePhaseDisplay() {
  if (currentPhase) {
    currentPhase.textContent = gameState.currentPhase;
  }
}

// Export functions for global access (if needed)
window.WerewolfGame = {
  generateGame,
  copyToClipboard,
  gameState,
  testQRCode,
};
