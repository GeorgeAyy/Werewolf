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
  votes: {}, // player number -> vote count
};

// Role configurations
const roleConfigs = {
  Werewolf: {
    icon: '<i class="fa-solid fa-paw"></i>',
    color: "#dc2626",
    description: "Work with your pack to eliminate the villagers.",
    detailedDescription: "You are a Werewolf! Work with your fellow werewolves to eliminate the villagers. Each night, you can choose one player to eliminate.",
  },
  Villager: {
    icon: '<i class="fa-solid fa-user"></i>',
    color: "#9ca3af",
    description: "Find and eliminate the werewolves.",
    detailedDescription: "You are a Villager! You have no special powers, but your vote and voice are crucial to eliminating the werewolves.",
  },
  Seer: {
    icon: '<i class="fa-solid fa-eye"></i>',
    color: "#3b82f6",
    description: "Investigate one player to learn their true role.",
    detailedDescription: "You are the Seer! Each night, you can investigate one player to learn their true role.",
  },
  Doctor: {
    icon: '<i class="fa-solid fa-kit-medical"></i>',
    color: "#10b981",
    description: "Protect one player from elimination.",
    detailedDescription: "You are the Doctor! Each night, you can protect one player from elimination by the werewolves. You cannot protect the same player two nights in a row.",
  },
  Hunter: {
    icon: '<i class="fa-solid fa-crosshairs"></i>',
    color: "#d97706",
    description: "If you are eliminated, take one player down with you.",
    detailedDescription: "You are the Hunter! If you are eliminated, you may immediately eliminate one player as your final act.",
  },
  Bodyguard: {
    icon: '<i class="fa-solid fa-shield"></i>',
    color: "#059669",
    description: "Protect one player. If attacked, you die instead.",
    detailedDescription: "You are the Bodyguard! Each night, choose one player to protect. If the werewolves attack them, you die instead.",
  },
  Cupid: {
    icon: '<i class="fa-solid fa-heart-arrow-up"></i>',
    color: "#ec4899",
    description: "Choose two players to fall in love.",
    detailedDescription: "You are Cupid! On the first night, select two players to become lovers. If one dies, the other dies too.",
  },
  WolfCub: {
    icon: '<i class="fa-solid fa-dog"></i>',
    color: "#b91c1c",
    description: "If killed, werewolves get an extra kill.",
    detailedDescription: "You are the Wolf Cub! If you are eliminated, your werewolf pack will be enraged and may eliminate two players the following night.",
  },
  AlphaWolf: {
    icon: '<i class="fa-solid fa-crown"></i>',
    color: "#7f1d1d",
    description: "Leader of the werewolves.",
    detailedDescription: "You are the Alpha Wolf! You lead the werewolf pack and know your allies.",
  },
  Sorceress: {
    icon: '<i class="fa-solid fa-hat-wizard"></i>',
    color: "#8b5cf6",
    description: "Check if a player is a werewolf.",
    detailedDescription: "You are the Sorceress! Each night, choose one player to sense. You will know if they are a werewolf, but not their exact role.",
  },
  Lycan: {
    icon: '<i class="fa-solid fa-dog"></i>',
    color: "#4b5563",
    description: "Appears as a werewolf to the Seer.",
    detailedDescription: "You are the Lycan! You are a normal villager with no special powers, but if the Seer investigates you, you appear as a Werewolf.",
  },
  Witch: {
    icon: '<i class="fa-solid fa-flask"></i>',
    color: "#c026d3",
    description: "One heal potion, one kill potion.",
    detailedDescription: "You are the Witch! You can save a player once and eliminate a player once during the game.",
  },
  Detective: {
    icon: '<i class="fa-solid fa-magnifying-glass"></i>',
    color: "#2563eb",
    description: "Check if a player visited someone.",
    detailedDescription: "You are the Detective! You can track one player each night to see if they visited anyone.",
  },
  Revealer: {
    icon: '<i class="fa-solid fa-bullseye"></i>',
    color: "#d97706",
    description: "Shoot a player. If a villager, you die.",
    detailedDescription: "You are the Revealer! Each night, you may shoot one player. If you hit a Werewolf, they die. If Villager, they die AND you die.",
  },
  PI: {
    icon: '<i class="fa-solid fa-user-ninja"></i>',
    color: "#0f766e",
    description: "Learn if they or neighbors are Werewolves.",
    detailedDescription: "You are the Paranormal Investigator! Each night, select one player. You learn if they OR adjacent players are Werewolves.",
  },
  Tanner: {
    icon: '<i class="fa-solid fa-mask"></i>',
    color: "#78716c",
    description: "If lynched, you alone win.",
    detailedDescription: "You are the Tanner! You are not on the village or werewolf team. Your goal is to get yourself eliminated during the day.",
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

// Session controls
const restartGameBtn = document.getElementById("restartGameBtn");
const endGameBtn = document.getElementById("endGameBtn");

// Voting elements
const voteTallyList = document.getElementById("voteTallyList");
const resetVotesBtn = document.getElementById("resetVotesBtn");
const remainingVotesCount = document.getElementById("remainingVotesCount");

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
  if (actionPerformer) actionPerformer.addEventListener("change", updateActionAutoLabel);

  // Session controls
  if (restartGameBtn) restartGameBtn.addEventListener("click", restartGame);
  if (endGameBtn) endGameBtn.addEventListener("click", endGame);

  // Voting controls
  if (resetVotesBtn) resetVotesBtn.addEventListener("click", resetVotes);

  // Initialize player names
  updatePlayerNames();

  // Live villager counter - listen on all role inputs
  const roleInputIds = [
    'playerCount', 'werewolfCount', 'seerCount', 'doctorCount',
    'bodyguardCount', 'cupidCount', 'wolfCubCount', 'alphaWolfCount',
    'sorceressCount', 'lycanCount', 'witchCount', 'detectiveCount',
    'revealerCount', 'piCount', 'tannerCount', 'hunterCount'
  ];
  roleInputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateVillagerCounter);
  });
  updateVillagerCounter();
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

// Toggle role assignments section with smooth transition
function toggleRoleAssignments() {
  const roleAssignmentsSection = document.querySelector(".role-assignments");
  const showRoleAssignmentsBtn = document.getElementById("showRoleAssignmentsBtn");

  if (!roleAssignmentsSection.classList.contains('revealed')) {
    roleAssignmentsSection.style.display = "block";
    // Force reflow for transition
    void roleAssignmentsSection.offsetHeight;
    roleAssignmentsSection.classList.add('revealed');
    showRoleAssignmentsBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Hide Secret Assignments';
    showRoleAssignmentsBtn.classList.add("btn-danger");
    showRoleAssignmentsBtn.classList.remove("text-danger");
  } else {
    roleAssignmentsSection.classList.remove('revealed');
    // Wait for transition to finish, then hide
    setTimeout(() => {
      if (!roleAssignmentsSection.classList.contains('revealed')) {
        roleAssignmentsSection.style.display = "none";
      }
    }, 400);
    showRoleAssignmentsBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Reveal Secret Assignments';
    showRoleAssignmentsBtn.classList.remove("btn-danger");
    showRoleAssignmentsBtn.classList.add("text-danger");
  }
}

// Persistent map to save names when inputs are temporarily cleared
const persistentPlayerNames = {};

// Update player names inputs based on player count
function updatePlayerNames() {
  const playerCount = parseInt(playerCountInput.value) || 0;
  
  // Save existing values
  const existingInputs = playerNamesList.querySelectorAll('input[type="text"]');
  existingInputs.forEach(input => {
    persistentPlayerNames[input.id] = input.value;
  });

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
    
    // Restore value if it existed previously
    if (persistentPlayerNames[`playerName${i}`]) {
      nameInput.value = persistentPlayerNames[`playerName${i}`];
    }

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

  // All wolf-team roles count toward the werewolf requirement
  const totalWolfTeam = werewolfCount + wolfCubCount + alphaWolfCount + sorceressCount;

  if (totalSpecialRoles > playerCount) {
    window.customAlert("Total special roles cannot exceed the number of players.", "Configuration Error");
    return false;
  }

  if (villagerCount < 0) {
    window.customAlert("Not enough players for the specified role distribution.", "Configuration Error");
    return false;
  }

  if (totalWolfTeam < 1) {
    window.customAlert("At least one werewolf-team role is required (Werewolf, Wolf Cub, Alpha Wolf, or Sorceress).", "Missing Requirements");
    return false;
  }

  if (totalWolfTeam >= playerCount / 2) {
    window.customAlert(
      "Too many werewolf-team roles. They should be less than half the players.",
      "Balance Warning"
    );
    return false;
  }

  return true;
}

// Update villager counter live
function updateVillagerCounter() {
  const playerCount = parseInt(playerCountInput.value) || 0;
  const totalRoles =
    (parseInt(werewolfCountInput.value) || 0) +
    (parseInt(seerCountInput.value) || 0) +
    (parseInt(doctorCountInput.value) || 0) +
    (parseInt(bodyguardCountInput.value) || 0) +
    (parseInt(cupidCountInput.value) || 0) +
    (parseInt(wolfCubCountInput.value) || 0) +
    (parseInt(alphaWolfCountInput.value) || 0) +
    (parseInt(sorceressCountInput.value) || 0) +
    (parseInt(lycanCountInput.value) || 0) +
    (parseInt(witchCountInput.value) || 0) +
    (parseInt(detectiveCountInput.value) || 0) +
    (parseInt(revealerCountInput.value) || 0) +
    (parseInt(piCountInput.value) || 0) +
    (parseInt(tannerCountInput.value) || 0) +
    (parseInt(hunterCountInput.value) || 0);
  const villagers = playerCount - totalRoles;
  const display = document.getElementById('villagerCountDisplay');
  const container = document.getElementById('villagerCounter');
  if (display) display.textContent = Math.max(0, villagers);
  if (container) {
    container.classList.remove('warning', 'error');
    if (villagers < 0) container.classList.add('error');
    else if (villagers === 0) container.classList.add('warning');
  }
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

  // Initialize night dialogue script
  initializeNightDialogue();

  // Scroll to results
  gameResults.scrollIntoView({ behavior: "smooth" });
}

// Initialize night dialogue script
function initializeNightDialogue() {
  const dialogueContainer = document.getElementById("nightDialogueList");
  if (!dialogueContainer) return;
  
  // Extract all unique roles present in this game
  const activeRoles = new Set(gameState.players.map(p => p.role));
  
  // Define the master order of operations and dialogue
  const nightDialogueScripts = [
    {
      role: 'ALL',
      title: 'First Night Setup',
      icon: '🌙',
      firstNightOnly: true,
      text: '"Everybody, close your eyes and go to sleep."'
    },
    {
      role: 'Cupid',
      title: 'Cupid',
      icon: '💘',
      firstNightOnly: true,
      text: '"Cupid, wake up. Point to two players to be lovers." <br><small><i>(Wait for selection, tap them to acknowledge)</i></small><br>"Cupid, go to sleep."'
    },
    {
      role: 'Cupid', // Tied to Cupid's presence
      title: 'Lovers',
      icon: '💕',
      firstNightOnly: true,
      text: '"Lovers, wake up and acknowledge each other." <br><small><i>(Make them open eyes and see each other)</i></small><br>"Lovers, go to sleep."'
    },
    {
      role: 'Bodyguard',
      title: 'Bodyguard',
      icon: '🛡️',
      text: '"Bodyguard, wake up. Point to the player you want to protect." <br><small><i>(Acknowledge selection)</i></small><br>"Bodyguard, go to sleep."'
    },
    {
      role: 'Seer',
      title: 'Seer',
      icon: '🔮',
      text: '"Seer, wake up. Point to one player whose role you want to know." <br><small><i>(Give thumbs up for Werewolf/Lycan, thumbs down for Villager)</i></small><br>"Seer, go to sleep."'
    },
    {
      role: 'PI',
      title: 'Paranormal Investigator',
      icon: '🕵️',
      text: '"PI, wake up. Point to two players." <br><small><i>(Nod if at least one is a Werewolf)</i></small><br>"PI, go to sleep."'
    },
    {
      role: 'Detective',
      title: 'Detective',
      icon: '🔍',
      text: '"Detective, wake up. Point to a player to learn their exact role." <br><small><i>(Show them the role card/app screen)</i></small><br>"Detective, go to sleep."'
    },
    {
      role: 'WEREWOLVES', // Group wrapper
      title: 'Werewolves',
      icon: '🐺',
      text: '"Werewolves, wake up. Point to the player you want to kill." <br><small><i>(Wait for consensus)</i></small><br>"Werewolves, go to sleep."'
    },
    {
      role: 'Sorceress',
      title: 'Sorceress',
      icon: '🔮',
      text: '"Sorceress, wake up. Point to a player to see if they are the Seer." <br><small><i>(Nod if Seer, shake head if not)</i></small><br>"Sorceress, go to sleep."'
    },
    {
      role: 'Witch',
      title: 'Witch',
      icon: '🧙‍♀️',
      text: '"Witch, wake up. The Werewolves attacked [Name]. Do you want to use your healing potion?" <br><small><i>(Wait for nod/shake)</i></small><br>"Do you want to use your poison potion and on who?" <br><small><i>(Wait for selection or shake)</i></small><br>"Witch, go to sleep."'
    },
    {
      role: 'Doctor',
      title: 'Doctor',
      icon: '🏥',
      text: '"Doctor, wake up. Point to a player to cure them of disease." <br><small><i>(Acknowledge selection)</i></small><br>"Doctor, go to sleep."'
    },
    {
      role: 'ALL',
      title: 'Morning',
      icon: '☀️',
      text: '"Everybody, wake up! It is now daytime."'
    }
  ];

  let dialogueHTML = "";
  let isFirstNight = gameState.currentPhase === 1; // Assuming day/night pairs, or just show all for first iteration

  nightDialogueScripts.forEach(script => {
    // Determine if this script should be shown based on active roles
    let shouldShow = false;
    
    if (script.role === 'ALL') {
      shouldShow = true;
    } else if (script.role === 'WEREWOLVES') {
      shouldShow = activeRoles.has('Werewolf') || activeRoles.has('AlphaWolf') || activeRoles.has('WolfCub');
    } else {
      shouldShow = activeRoles.has(script.role);
    }

    if (shouldShow) {
      // Add first-night badge if applicable
      const badge = script.firstNightOnly ? '<span style="font-size:0.7rem; background:rgba(56, 189, 248, 0.2); color:#38bdf8; padding:0.1rem 0.4rem; border-radius:4px; margin-left:0.5rem; vertical-align:middle;">First Night Only</span>' : '';
      
      dialogueHTML += `
        <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px dashed rgba(255,255,255,0.1);">
          <div style="font-weight: 700; color: var(--primary); margin-bottom: 0.4rem; font-size: 1.05rem;">
            ${script.icon} ${script.title} ${badge}
          </div>
          <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.4;">
            ${script.text}
          </div>
        </div>
      `;
    }
  });

  dialogueContainer.innerHTML = dialogueHTML || '<div style="color:var(--text-muted); text-align:center; padding:1rem;">No special night roles active.</div>';
}

// Generate player links and QR codes
function generatePlayerLinks() {
  playerLinks.innerHTML = "";

  const werewolfRoles = ["Werewolf", "WolfCub", "AlphaWolf", "Sorceress"];
  const werewolfPlayers = gameState.players.filter((p) => werewolfRoles.includes(p.role));
  const werewolfNames = werewolfPlayers.map((p) => p.name);
  const uniqueRoles = [...new Set(gameState.roles)];

  gameState.players.forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.className = "player-link-card";
    
    // Create base data object
    const playerData = {
      r: player.role,
      p: player.number,
      n: player.name,
      g: uniqueRoles.join(",")
    };

    if (werewolfRoles.includes(player.role)) {
      const teammates = werewolfNames.filter((name) => name !== player.name);
      if (teammates.length > 0) {
        playerData.t = teammates.join(",");
      }
    }

    // Encode to base64
    const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(playerData))));
    const playerUrl = new URL("player.html", window.location.href);
    playerUrl.searchParams.set("data", encodedData);
    
    const urlString = playerUrl.href;

    // Check if Web Share API is available for native sharing
    const canShare = navigator.share !== undefined;

    playerCard.innerHTML = `
      <h3><i class="fa-solid fa-user"></i> ${player.name}</h3>
      <div class="link-actions">
        <button class="btn btn-primary btn-sm show-qr-btn" onclick="showQRCode('${urlString}', 'qr-${player.number}', this)">
          <i class="fa-solid fa-qrcode"></i> QR
        </button>
        <button class="btn btn-secondary btn-sm copy-btn" onclick="copyToClipboard('${urlString}', this)">
          <i class="fa-solid fa-copy"></i> Copy
        </button>
        ${canShare ? `<button class="btn btn-outline btn-sm" onclick="nativeShare('${player.name}', '${urlString}')"><i class="fa-solid fa-share-nodes"></i> Share</button>` : ''}
      </div>
      <div class="qr-code-container" id="qr-${player.number}" style="display: none;">
        <a href="${urlString}" target="_blank" title="Click to open role link in a new tab" style="display: block; width: 100%; height: 100%;">
          <canvas id="canvas-${player.number}"></canvas>
        </a>
      </div>
    `;

    playerLinks.appendChild(playerCard);
  });
}

// Native Web Share API helper
function nativeShare(playerName, url) {
  if (navigator.share) {
    navigator.share({
      title: 'Werewolf Game - Your Role',
      text: `${playerName}, here is your secret Werewolf role link! Do not share this with anyone.`,
      url: url
    }).catch(err => console.log('Error sharing:', err));
  }
}

// Show QR code function
function showQRCode(text, elementId, button) {
  const element = document.getElementById(elementId);
  const canvasId = elementId.replace('qr-', 'canvas-');
  const canvas = document.getElementById(canvasId);
  
  if (element.style.display === "none") {
    element.style.display = "block";
    // Trigger animation by resetting and re-adding class
    element.classList.remove("qr-expand-anim");
    void element.offsetWidth; // trigger reflow
    element.classList.add("qr-expand-anim");

    button.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide';
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");

    // Generate QR code using QRious
    if (window.QRious) {
      new QRious({
        element: canvas,
        value: text,
        size: 200,
        background: 'white',
        foreground: '#0f172a',
        level: 'H'
      });
    } else {
        // Fallback if QRious failed to load from CDN
        element.innerHTML = `<p style="color:var(--danger)">QR library failed to load.</p>`;
    }
  } else {
    element.style.display = "none";
    button.innerHTML = '<i class="fa-solid fa-qrcode"></i> QR';
    button.classList.remove("btn-secondary");
    button.classList.add("btn-primary");
  }
}

// Removed old generateQRCode and generateFallbackQRCode and showTextFallback.

// Generate game summary
function generateGameSummary() {
  const roleCounts = {};

  // Count roles
  gameState.players.forEach((player) => {
    roleCounts[player.role] = (roleCounts[player.role] || 0) + 1;
  });

  const werewolfRoles = ["Werewolf", "WolfCub", "AlphaWolf", "Sorceress"];
  const neutralRoles = ["Tanner"];

  // Create summary HTML with premium cards
  let summaryHTML = "";

  Object.entries(roleCounts).forEach(([role, count]) => {
    const config = roleConfigs[role];
    let teamClass = 'village';
    if (werewolfRoles.includes(role)) teamClass = 'wolf';
    else if (neutralRoles.includes(role)) teamClass = 'neutral';

    summaryHTML += `
      <div class="summary-card ${teamClass}">
        <span class="summary-icon">${config ? config.icon : '👤'}</span>
        <span class="summary-count">${count}</span>
        <span class="summary-role">${role}${count > 1 ? 's' : ''}</span>
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
function copyToClipboard(text, button = null) {
  const showFeedback = () => {
    if (button) {
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      button.classList.replace('btn-secondary', 'btn-success');
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.replace('btn-success', 'btn-secondary');
      }, 2000);
    }
  };

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        showFeedback();
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
    showFeedback();
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
      window.customAlert("Please set a valid time!", "Invalid Timer");
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
    const bellSound = document.getElementById("timerBellSound");
    if (bellSound) {
      bellSound.currentTime = 0;
      bellSound.play().catch(e => console.log("Audio play prevented", e));
    }
    
    if (Notification.permission === "granted") {
      new Notification("Timer Finished!", {
        body: "Your game timer has finished!",
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏰</text></svg>",
      });
    } else {
      window.customAlert("Phase timer has finished!", "⏰ Time's Up");
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
    background: rgba(2, 6, 23, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContent = document.createElement("div");
  modalContent.className = "glass-panel-inner role-guide-content";
  modalContent.style.cssText = `
    background: rgba(15, 23, 42, 0.95);
    padding: 2.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--glass-border);
    max-width: 90%;
    width: 800px;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
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

  let rolesHTML = "<h2 style='font-size: 2rem; color: #fff; margin-bottom: 2rem; text-align: center;'>🎭 Werewolf Role Guide</h2>";

  // Werewolf Roles Section
  rolesHTML +=
    "<h3 style='color: var(--danger); margin-top: 1rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(153, 27, 27, 0.3); padding-bottom: 0.5rem;'>🐺 Werewolf Team</h3>";

  Object.entries(roleConfigs)
    .filter(([roleName, config]) => werewolfRoles.includes(roleName))
    .forEach(([roleName, config]) => {
      rolesHTML += `
        <div class="role-guide-item" style="margin-bottom: 1rem; padding: 1.25rem; border: 1px solid rgba(153, 27, 27, 0.3); border-radius: var(--radius-sm); background: rgba(153, 27, 27, 0.1);">
          <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 1.8rem; margin-right: 1rem; color: var(--danger);">${config.icon}</span>
            <h3 style="margin: 0; color: var(--danger); font-size: 1.3rem;">${roleName}</h3>
          </div>
          <p style="margin: 0.5rem 0; font-weight: 600; color: #fff;">${config.description}</p>
          <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">${config.detailedDescription}</p>
        </div>
      `;
    });

  // Villager Roles Section
  rolesHTML +=
    "<h3 style='color: var(--primary); margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(148, 163, 184, 0.2); padding-bottom: 0.5rem;'>👥 Village Team</h3>";

  Object.entries(roleConfigs)
    .filter(([roleName, config]) => villagerRoles.includes(roleName))
    .forEach(([roleName, config]) => {
      rolesHTML += `
        <div class="role-guide-item" style="margin-bottom: 1rem; padding: 1.25rem; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: var(--radius-sm); background: rgba(30, 41, 59, 0.5);">
          <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 1.8rem; margin-right: 1rem; color: var(--primary);">${config.icon}</span>
            <h3 style="margin: 0; color: var(--primary); font-size: 1.3rem;">${roleName}</h3>
          </div>
          <p style="margin: 0.5rem 0; font-weight: 600; color: #fff;">${config.description}</p>
          <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">${config.detailedDescription}</p>
        </div>
      `;
    });

  // Neutral Roles Section
  rolesHTML +=
    "<h3 style='color: var(--warning); margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(180, 83, 9, 0.3); padding-bottom: 0.5rem;'>⚖️ Neutral Roles</h3>";

  Object.entries(roleConfigs)
    .filter(([roleName, config]) => neutralRoles.includes(roleName))
    .forEach(([roleName, config]) => {
      rolesHTML += `
        <div class="role-guide-item" style="margin-bottom: 1rem; padding: 1.25rem; border: 1px solid rgba(180, 83, 9, 0.3); border-radius: var(--radius-sm); background: rgba(180, 83, 9, 0.1);">
          <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 1.8rem; margin-right: 1rem; color: var(--warning);">${config.icon}</span>
            <h3 style="margin: 0; color: var(--warning); font-size: 1.3rem;">${roleName}</h3>
          </div>
          <p style="margin: 0.5rem 0; font-weight: 600; color: #fff;">${config.description}</p>
          <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">${config.detailedDescription}</p>
        </div>
      `;
    });

  modalContent.innerHTML = `
    ${rolesHTML}
    <button onclick="this.parentElement.parentElement.remove()" style="
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(153, 27, 27, 0.8);
      color: white;
      border: 1px solid rgba(153, 27, 27, 0.4);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    " onmouseover="this.style.background='var(--danger)'" onmouseout="this.style.background='rgba(153, 27, 27, 0.8)'">×</button>
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

  // Initialize votes
  initializeVoteTally();

  // Update displays
  updatePlayerStatusDisplay();
  updateActionDropdowns();
}

// Toggle a player's lover status
function toggleLover(playerNumber) {
  if (!gameState.lovers) gameState.lovers = [];
  
  // If they are already a lover, remove them
  if (gameState.lovers.includes(playerNumber)) {
    gameState.lovers = gameState.lovers.filter(num => num !== playerNumber);
  } else {
    // Add them to the lovers array (max 2)
    if (gameState.lovers.length < 2) {
      gameState.lovers.push(playerNumber);
    } else {
      window.customAlert("Cupid can only bind two lovers.", "Max Lovers Reached");
      return;
    }
  }
  
  updatePlayerStatusDisplay();
}

// Update player status display
function updatePlayerStatusDisplay() {
  if (!playerStatusList) return;

  playerStatusList.innerHTML = "";

  const hasCupid = gameState.players.some((player) => player.role === "Cupid");

  gameState.players.forEach((player) => {
    const status = gameState.playerStatus[player.number] || "alive";
    const roleConfig = roleConfigs[player.role];
    const isLover = gameState.lovers && gameState.lovers.some(
      (pair) => pair.player1 == player.number || pair.player2 == player.number
      // Handle the new single-array lovers format
      || (typeof pair === "number" && pair == player.number)
    );

    // Fallback: Check if they are in the flat array of lovers
    const isLoverSingle = Array.isArray(gameState.lovers) && gameState.lovers.includes(player.number);
    const finalIsLover = isLover || isLoverSingle;

    const playerItem = document.createElement("div");
    playerItem.className = `player-status-item ${status}`;

    let loverBtnHTML = "";
    if (hasCupid) {
        loverBtnHTML = `
          <button class="status-btn lover-btn ${finalIsLover ? 'active' : ''}" onclick="toggleLover(${player.number})" title="Toggle Lover Status">
            <i class="fa-solid fa-heart"></i>
          </button>
        `;
    }

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
        ${loverBtnHTML}
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
function setPlayerStatus(playerNumber, status, isChainedReaction = false) {
  // If no change, do nothing
  if (gameState.playerStatus[playerNumber] === status) return;

  gameState.playerStatus[playerNumber] = status;
  
  // Remove dead players from vote tally
  if (status === 'dead') {
    delete gameState.votes[playerNumber];

    // Handle Lovers Suicide Chain (only if this isn't already a chained reaction to prevent infinite loops)
    if (!isChainedReaction && gameState.lovers) {
      // Check if the dying player is one of the lovers
      const isLover = Array.isArray(gameState.lovers) && gameState.lovers.includes(playerNumber);
      
      if (isLover) {
        // Find the partner
        const partnerNumber = gameState.lovers.find(num => num !== playerNumber);
        
        // If partner exists and is currently alive, kill them too
        if (partnerNumber && gameState.playerStatus[partnerNumber] === 'alive') {
          // Log the chained death
          console.log(`Lover ${playerNumber} died, chaining death to partner ${partnerNumber}`);
          setPlayerStatus(partnerNumber, 'dead', true);
        }
      }
    }
  }
  updatePlayerStatusDisplay();
  updateActionDropdowns();
  updateVoteTallyDisplay();
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

// Role-to-action mapping
const roleActionMap = {
  Werewolf: { action: 'attack', label: '🐺 Attacks', icon: '🐺' },
  AlphaWolf: { action: 'attack', label: '🐺 Attacks', icon: '🐺' },
  WolfCub: { action: 'attack', label: '🐺 Attacks', icon: '🐺' },
  Seer: { action: 'investigate', label: '🔮 Investigates', icon: '🔮' },
  Doctor: { action: 'save', label: '🏥 Saves', icon: '🏥' },
  Bodyguard: { action: 'protect', label: '🛡️ Protects', icon: '🛡️' },
  Witch: null, // Special case — has two actions
  Hunter: { action: 'hunter-kill', label: '🏹 Shoots', icon: '🏹' },
  Sorceress: { action: 'investigate', label: '🔮 Divines', icon: '🔮' },
  Detective: { action: 'investigate', label: '🔍 Inspects', icon: '🔍' },
  PI: { action: 'investigate', label: '🕵️ Investigates', icon: '🕵️' },
  Cupid: { action: 'other', label: '💘 Binds', icon: '💘' },
  Revealer: { action: 'other', label: '🌟 Reveals', icon: '🌟' },
};

// Update action dropdowns — smart, role-grouped
function updateActionDropdowns() {
  if (!actionPerformer || !actionTarget) return;

  const alivePlayers = gameState.players.filter(
    (player) => gameState.playerStatus[player.number] === "alive"
  );

  // Determine which roles have night actions
  const nightRoles = Object.keys(roleActionMap);

  // Build performer dropdown: group night-action roles at top, others at bottom
  actionPerformer.innerHTML = '<option value="">-- Who acts? --</option>';

  // Night-active players only
  const nightPlayers = alivePlayers.filter(p => nightRoles.includes(p.role));

  if (nightPlayers.length > 0) {
    const nightGroup = document.createElement('optgroup');
    nightGroup.label = '🌙 Night Roles';
    nightPlayers.forEach((player) => {
      const config = roleConfigs[player.role];
      // Witch gets TWO entries
      if (player.role === 'Witch') {
        const optSave = document.createElement('option');
        optSave.value = player.number + ':witch-save';
        optSave.innerHTML = `${config.icon} ${player.name} — Save Potion`;
        nightGroup.appendChild(optSave);

        const optKill = document.createElement('option');
        optKill.value = player.number + ':witch-kill';
        optKill.innerHTML = `${config.icon} ${player.name} — Kill Potion`;
        nightGroup.appendChild(optKill);
      } else {
        const opt = document.createElement('option');
        opt.value = player.number + ':' + (roleActionMap[player.role]?.action || 'other');
        opt.innerHTML = `${config.icon} ${player.name} — ${player.role}`;
        nightGroup.appendChild(opt);
      }
    });
    actionPerformer.appendChild(nightGroup);
  }



  // Reset auto label
  updateActionAutoLabel();
}

// Update the smart action label & target dropdown based on selected performer
function updateActionAutoLabel() {
  const autoLabel = document.getElementById('actionAutoLabel');
  const autoIcon = autoLabel?.querySelector('.action-auto-icon');
  const autoText = autoLabel?.querySelector('.action-auto-text');
  
  if (!autoLabel || !autoIcon || !autoText || !actionTarget) return;

  const val = actionPerformer.value;
  actionTarget.innerHTML = '<option value="">-- On who? --</option>';

  if (!val) {
    autoIcon.textContent = '❓';
    autoText.textContent = 'Select a player';
    actionType.value = '';
    return;
  }

  const [playerNum, actionKey] = val.split(':');
  actionType.value = actionKey;

  // Get performer player object
  const performer = gameState.players.find(p => p.number == playerNum);
  if (!performer) return;

  // Smart filtering for target dropdown
  const alivePlayers = gameState.players.filter(
    (player) => gameState.playerStatus[player.number] === "alive"
  );
  
  const wolfTeamRoles = ["Werewolf", "AlphaWolf", "WolfCub"];
  const isPerformerWolf = wolfTeamRoles.includes(performer.role);
  
  // Roles that are allowed to target themselves (Doctor heal, Witch save)
  const canTargetSelf = (performer.role === 'Doctor') || (performer.role === 'Witch' && actionKey === 'witch-save');

  alivePlayers.forEach((player) => {
    // Prevent wolves from targeting other wolves during an attack
    if (isPerformerWolf && actionKey === 'attack' && wolfTeamRoles.includes(player.role)) {
      return; // Skip adding this wolf as a target
    }

    // Prevent players from targeting themselves (unless allowed)
    if (player.number == performer.number && !canTargetSelf) {
      return; 
    }

    const option = document.createElement("option");
    option.value = player.number;
    const config = roleConfigs[player.role];
    option.innerHTML = `${config ? config.icon : ''} ${player.name}`;
    actionTarget.appendChild(option);
  });

  const actionLabels = {
    attack: { icon: '🐺', text: 'Attacks' },
    save: { icon: '🏥', text: 'Saves' },
    investigate: { icon: '🔮', text: 'Investigates' },
    protect: { icon: '🛡️', text: 'Protects' },
    'witch-save': { icon: '🧪', text: 'Save Potion' },
    'witch-kill': { icon: '☠️', text: 'Kill Potion' },
    'hunter-kill': { icon: '🏹', text: 'Shoots' },
    other: { icon: '⚡', text: 'Acts on' },
  };

  const info = actionLabels[actionKey] || actionLabels['other'];
  autoIcon.textContent = info.icon;
  autoText.textContent = info.text;
}

// Add night action
function addNightAction() {
  if (!actionPerformer || !actionTarget) return;

  const performerVal = actionPerformer.value;
  const target = actionTarget.value;

  if (!performerVal || !target) {
    window.customAlert("Select who is acting and on whom.", "Incomplete Entry");
    return;
  }

  const [performerNum, actionKey] = performerVal.split(':');

  const performerPlayer = gameState.players.find((p) => p.number == performerNum);
  const targetPlayer = gameState.players.find((p) => p.number == target);

  if (!performerPlayer || !targetPlayer) return;

  const action = {
    type: actionKey,
    performer: performerNum,
    target: target,
    performerName: performerPlayer.name,
    targetName: targetPlayer.name,
    timestamp: new Date().toLocaleTimeString(),
    phase: gameState.currentPhase,
  };

  gameState.nightActions.push(action);
  updateActionsDisplay();

  // Clear form
  actionPerformer.value = "";
  actionTarget.value = "";
  updateActionAutoLabel();
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


// ===== DAY VOTE TALLY SYSTEM =====

// Initialize vote tally for all alive players
function initializeVoteTally() {
  gameState.votes = {};
  gameState.players.forEach((player) => {
    if (gameState.playerStatus[player.number] === "alive") {
      gameState.votes[player.number] = 0;
    }
  });
  updateVoteTallyDisplay();
}

// Update vote tally display
function updateVoteTallyDisplay() {
  if (!voteTallyList) return;

  voteTallyList.innerHTML = "";

  // Get alive players and their vote counts
  const alivePlayers = gameState.players.filter(
    (player) => gameState.playerStatus[player.number] === "alive"
  );
  const totalAlive = alivePlayers.length;

  // Find the max vote count (for highlighting) and total votes cast
  let maxVotes = 0;
  let totalVotesCast = 0;
  
  alivePlayers.forEach((p) => {
    const v = gameState.votes[p.number] || 0;
    totalVotesCast += v;
    if (v > maxVotes) maxVotes = v;
  });

  // Update remaining votes counter
  if (remainingVotesCount) {
    const remaining = Math.max(0, totalAlive - totalVotesCast);
    remainingVotesCount.textContent = remaining;
    if (remaining === 0 && totalAlive > 0) {
      remainingVotesCount.style.color = "var(--success)";
    } else {
      remainingVotesCount.style.color = "var(--primary)";
    }
  }

  alivePlayers.forEach((player) => {
    const votes = gameState.votes[player.number] || 0;
    const isMostVoted = maxVotes > 0 && votes === maxVotes;

    const item = document.createElement("div");
    item.className = `vote-tally-item${isMostVoted ? " most-votes" : ""}`;

    item.innerHTML = `
      <div class="vote-player-info">
        <div class="player-avatar">${player.number}</div>
        <span class="vote-player-name">${player.name}</span>
      </div>
      <div class="vote-count-controls">
        <button class="vote-btn decrement" onclick="decrementVote(${player.number})" title="Remove vote">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span class="vote-count-badge${votes > 0 ? " has-votes" : ""}">${votes}</span>
        <button class="vote-btn increment" onclick="incrementVote(${player.number})" title="Add vote">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    `;

    voteTallyList.appendChild(item);
  });

  // Show empty state if no alive players
  if (alivePlayers.length === 0) {
    voteTallyList.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 1rem;">No players alive to vote.</div>';
  }
}

// Increment vote for a player
function incrementVote(playerNumber) {
  gameState.votes[playerNumber] = (gameState.votes[playerNumber] || 0) + 1;
  updateVoteTallyDisplay();
}

// Decrement vote for a player
function decrementVote(playerNumber) {
  if ((gameState.votes[playerNumber] || 0) > 0) {
    gameState.votes[playerNumber]--;
  }
  updateVoteTallyDisplay();
}

// Reset all votes to zero
function resetVotes() {
  Object.keys(gameState.votes).forEach((key) => {
    gameState.votes[key] = 0;
  });
  updateVoteTallyDisplay();
}

// ==========================================
// SESSION CONTROLS & UI ALERTS
// ==========================================

// Custom Modal UI
function showCustomModal(options) {
  const { title = "Alert", message, isConfirm = false, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancel" } = options;
  
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(2, 6, 23, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  const modalContent = document.createElement("div");
  modalContent.className = "glass-panel-inner";
  modalContent.style.cssText = `
    background: rgba(15, 23, 42, 0.95);
    padding: 2rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--glass-border);
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
    position: relative;
    animation: fadeInUp 0.3s ease-out;
  `;

  let innerHTML = `<h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: Outfit, sans-serif;">${title}</h3>`;
  innerHTML += `<p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.5;">${message}</p>`;
  
  innerHTML += `<div style="display: flex; gap: 1rem; justify-content: center;">`;
  if (isConfirm) {
    innerHTML += `<button id="modalCancelBtn" class="btn btn-outline" style="flex: 1;">${cancelText}</button>`;
  }
  innerHTML += `<button id="modalConfirmBtn" class="btn btn-primary btn-glow" style="flex: 1;">${confirmText}</button>`;
  innerHTML += `</div>`;
  
  modalContent.innerHTML = innerHTML;
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const confirmBtn = document.getElementById("modalConfirmBtn");
  if (isConfirm) {
    const cancelBtn = document.getElementById("modalCancelBtn");
    cancelBtn.addEventListener("click", () => {
      modal.remove();
      if (onCancel) onCancel();
    });
  }

  confirmBtn.addEventListener("click", () => {
    modal.remove();
    if (onConfirm) onConfirm();
  });
}

// Helper wrappers
window.customAlert = (message, title = "Notice") => showCustomModal({ title, message, isConfirm: false });
window.customConfirm = (message, onConfirm, title = "Please Confirm") => showCustomModal({ title, message, isConfirm: true, onConfirm });

function restartGame() {
  window.customConfirm(
    "Restart game with the same player distribution? New roles will be assigned.",
    () => {
      // Generate new roles directly based on current form inputs
      handleGameSetup(new Event('submit'));
      
      // Reset phases and tracking
      resetTrackingData();
      resetPhase();
      
      // Scroll back to the top of the tracking board or results
      document.getElementById("gameResults").scrollIntoView({ behavior: "smooth" });
    },
    "Restart Game"
  );
}

function endGame() {
  window.customConfirm(
    "End the current game? This will clear all tracking data and return to the setup screen. Your player names and role counts will be preserved.",
    () => {
      // Clear the tracking board and results
      document.getElementById("gameResults").style.display = "none";
      document.getElementById("gameTracking").style.display = "none";
      document.getElementById("roleAssignments").style.display = "none";
      document.getElementById("showRoleAssignmentsBtn").innerHTML = '<i class="fa-solid fa-eye-slash"></i> Reveal Secret Assignments';
      
      // Show the setup form again
      document.getElementById("gameSetupForm").style.display = "block";
      
      // Stop the timer if it's running
      if (timerRunning || timerPaused) {
        resetTimer();
      }
      
      // Clear tracking data
      resetTrackingData();
      resetPhase();
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    "End Game"
  );
}


function resetTrackingData() {
  // Clear players
  const playerStatusList = document.getElementById("playerStatusList");
  if (playerStatusList) playerStatusList.innerHTML = "";
  
  const aliveCount = document.getElementById("aliveCount");
  if (aliveCount) aliveCount.textContent = "0";
  
  const deadCount = document.getElementById("deadCount");
  if (deadCount) deadCount.textContent = "0";

  // Clear night actions
  gameState.nightActions = [];
  const actionsList = document.getElementById("actionsList");
  if (actionsList) actionsList.innerHTML = "";
  
  // Clear lovers
  gameState.lovers = [];
  const loversSection = document.getElementById("loversSection");
  if (loversSection) loversSection.style.display = "none";
  
  const loversList = document.getElementById("loversList");
  if (loversList) loversList.innerHTML = "";
  
  // Clear dropdowns
  const performerSelect = document.getElementById("actionPerformer");
  const targetSelect = document.getElementById("actionTarget");
  if (performerSelect) performerSelect.innerHTML = '<option value="">-- Source --</option>';
  if (targetSelect) targetSelect.innerHTML = '<option value="">-- Target --</option>';

  // Clear votes
  gameState.votes = {};
  const voteTally = document.getElementById("voteTallyList");
  if (voteTally) voteTally.innerHTML = "";
}

// Export functions for global access (if needed)
window.WerewolfGame = {
  generateGame,
  copyToClipboard,
  gameState,
  testQRCode,
};
