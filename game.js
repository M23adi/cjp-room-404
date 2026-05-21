// Room 404: CJP Edition (Desi Meme Overhaul - Infrastructure & Karma Update)

// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const sanityFill = document.getElementById('sanity-fill');
const sanityText = document.getElementById('sanity-text');
const patienceFill = document.getElementById('patience-fill');
const patienceText = document.getElementById('patience-text');
const inventoryText = document.getElementById('inventory-text');
const storyText = document.getElementById('story-text');
const stampContainer = document.getElementById('stamp-container');

const choiceBtns = [
    document.getElementById('choice-a'),
    document.getElementById('choice-b'),
    document.getElementById('choice-c'),
    document.getElementById('choice-d')
];

const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');

// --- Game State ---
let state = {
    sanity: 100,
    patience: 100,
    inventory: "Empty Folder",
    currentScene: "entrance",
    isTyping: false
};

// --- Story Data ---
const scenes = {
    entrance: {
        icon: "🏛️",
        text: "Welcome to the Ministry of Delays, Republic of Janta.\n\nYou are a fresh graduate, a certified 'cockroach' according to the Supreme Adjudicators. You need the elusive 'Final Stamp' on your file so your employment allowance can come 'khatakhat, khatakhat' into your bank account.\n\nYou step into Room 404. The smell of dust, phenol, and stale samosas fills the air. You approach Desk A (Inquiry).",
        choices: [
            { text: "Approach Desk A", next: "desk_a" }
        ]
    },
    desk_a: {
        icon: "🎧📱",
        text: "Desk A.\n\nThe Babu is watching Instagram Reels at max volume while forwarding a message about microchips in currency notes. \n\nHe doesn't look up. 'Kya hai?' he mumbles.",
        choices: [
            { text: "Quote the citizen's charter to him.", action: () => { state.sanity -= 15; state.patience -= 5; }, next: "desk_a_argue" },
            { text: "Wait silently. You have nowhere else to go.", action: () => { state.patience -= 25; }, next: "desk_a_wait" },
            { text: "Cough and slip a 50 rupee note under a file.", action: () => { state.sanity -= 5; }, next: "desk_a_bribe" }
        ]
    },
    desk_a_argue: {
        text: "You explain your constitutional rights. The Babu laughs, a deep, rumbling sound.\n\n'Arre bhai, this is not a prime-time TV debate. Do you even have a 70-hour work week mindset? Where is Form 38-B and your N.E.E.T. Clearance?'\n\nYou have neither.",
        choices: [
            { text: "Where do I get Form 38-B?", next: "desk_b_intro" }
        ]
    },
    desk_a_wait: {
        text: "45 minutes pass. A spider weaves a web on your shoulder. Finally, he looks up.\n\n'Yes? Give Form 38-B and N.E.E.T. Clearance. Aur thoda jaldi karo, server slow hai.'\n\nYou have neither.",
        choices: [
            { text: "Ask where to get them.", next: "desk_b_intro" }
        ]
    },
    desk_a_bribe: {
        text: "He smoothly slides the note into his pocket.\n\n'Jugaad nahi chalega idhar, but go to Desk B for Form 38-B. Then Desk D for N.E.E.T. Tell them Sharmaji sent you.'",
        choices: [
            { text: "Go to Desk B", next: "desk_b_intro" }
        ]
    },
    desk_b_intro: {
        icon: "🕒🍽️",
        text: "Desk B (Forms & Annexures).\n\nThere is a piece of cardboard hanging from a string: 'LUNCH BREAK 1:00 PM - 3:00 PM'.\n\nYou check your phone. It's 11:15 AM. The chair is empty.",
        choices: [
            { text: "Wait patiently for 'Lunch' to end.", action: () => { state.patience -= 30; }, next: "desk_b_wait" },
            { text: "Search the desk yourself.", action: () => { state.sanity -= 20; }, next: "desk_b_search" },
            { text: "Tweet angrily at the Ministry (Tag CJP).", action: () => { state.patience -= 10; }, next: "desk_b_tweet" }
        ]
    },
    desk_b_tweet: {
        text: "You tweet a photo of the empty chair. Within minutes, the CJP swarm retweets it 5,000 times. \n\nA panicked official runs in, panting, and hands you Form 38-B. 'Delete the tweet bhai, please! Desk D is across the street.'",
        choices: [
            { text: "Head across the street via the new Flyover.", action: () => { state.inventory = "Form 38-B"; }, next: "flyover_collapse" }
        ]
    },
    desk_b_search: {
        text: "You rummage through the desk. An officer yells! 'Aye! What are you doing? Security! Anti-national activity!'\n\nYou apologize profusely and lose a chunk of your Dimag.",
        choices: [
            { text: "Sit down quietly and wait.", action: () => { state.patience -= 20; }, next: "desk_b_wait" }
        ]
    },
    desk_b_wait: {
        text: "Hours pass. The clerk finally arrives, picking his teeth. He hands you a crumpled paper.\n\n'This is Form 38-B. Now get your N.E.E.T. Marksheet Clearance from Desk D across the street.'",
        choices: [
            { text: "Head across the street via the new Flyover.", action: () => { state.inventory = "Form 38-B"; }, next: "flyover_collapse" }
        ]
    },
    flyover_collapse: {
        icon: "🌉💥",
        text: "To reach Desk D, you step outside to cross the newly inaugurated 'Vikas Corridor Flyover'. \n\nSuddenly, the entire bridge collapses like a pack of cards! A media reporter immediately shoves a mic in your face: 'Do you think the opposition's black magic caused this?'",
        choices: [
            { text: "Blame the corrupt contractor.", action: () => { state.sanity -= 10; }, next: "flyover_reporter" },
            { text: "Blame the founding fathers from 70 years ago.", action: () => { state.patience -= 5; }, next: "flyover_nehru" },
            { text: "Ignore them and swim through the debris.", action: () => { state.sanity -= 15; state.patience -= 10; }, next: "desk_d_neet" }
        ]
    },
    flyover_reporter: {
        text: "'Anti-national!' the reporter screams. 'The contractor donated heavily! How dare you!' You are forced to write a 500-word essay on patriotism before they let you cross the rubble.",
        choices: [
            { text: "Limp to Desk D.", next: "desk_d_neet" }
        ]
    },
    flyover_nehru: {
        text: "'Exactly!' the reporter beams. 'The foundations were laid 70 years ago! It is a historical error!' They give you a VIP pass to cross the rubble.",
        choices: [
            { text: "Walk to Desk D.", next: "desk_d_neet" }
        ]
    },
    desk_d_neet: {
        icon: "📄💸",
        text: "Desk D (National Exam Evaluation Testing).\n\nCovered in flyover dust, you approach the desk. The officer is busy shredding documents and taking phone calls from coaching centers.\n\n'Your marksheet? Did you pay the Grace Marks Fee? It is only 15 lakhs.'",
        choices: [
            { text: "Argue about merit and hard work.", action: () => { state.sanity -= 30; }, next: "desk_d_argue" },
            { text: "Threaten to expose the paper leak.", action: () => { state.patience -= 10; }, next: "desk_d_threaten" },
            { text: "Cry. Just cry.", action: () => { state.sanity -= 15; state.patience -= 10; }, next: "desk_d_cry" }
        ]
    },
    desk_d_argue: {
        text: "'Merit? What is merit?' he laughs. 'Merit is a myth, beta. But since you are eating my brain, here is a provisional marksheet. Now go up to the IT Cell on the 3rd floor.'",
        choices: [
            { text: "Take it and climb to the IT Cell (Desk E).", action: () => { state.inventory = "Form 38-B + Marksheet"; }, next: "desk_e_intro" }
        ]
    },
    desk_d_threaten: {
        text: "You whisper about the leaked Telegram groups. He pales.\n\n'Shh! Awaaz neeche. Take the marksheet. Get out of here. Go up to the IT Cell on the 3rd floor.'",
        choices: [
            { text: "Take it and climb to the IT Cell (Desk E).", action: () => { state.inventory = "Form 38-B + Marksheet"; }, next: "desk_e_intro" }
        ]
    },
    desk_d_cry: {
        text: "Your tears smudge his ledger. *Moye moye* plays softly in the background. Disgusted, he throws a marksheet at you and points to the stairs.",
        choices: [
            { text: "Take it and climb to the IT Cell (Desk E).", action: () => { state.inventory = "Form 38-B + Marksheet"; }, next: "desk_e_intro" }
        ]
    },
    desk_e_intro: {
        icon: "🌫️😷",
        text: "Desk E (The IT Cell).\n\nYou reach the 3rd floor. The room is filled with Delhi-level AQI 999 smog. 'To clear this file, you must prove you are Chronically Online. What is your daily screen time?'",
        choices: [
            { text: "Proudly show your 14-hour Instagram usage.", next: "desk_e_pass" },
            { text: "Tell them you read books.", action: () => { state.sanity -= 40; }, next: "desk_e_fail" },
            { text: "Forward them a WhatsApp University message.", action: () => { state.patience -= 10; }, next: "desk_e_pass" }
        ]
    },
    desk_e_fail: {
        text: "They look at you in horror. 'A reader?! You are a threat to the ecosystem!' They force you to watch 500 cringe reels without a mask. Your Bheja is fried.",
        choices: [
            { text: "Stumble down to Desk C (Gazetted Officer) in the basement.", action: () => { state.inventory = "Verified Forms"; }, next: "desk_c_intro" }
        ]
    },
    desk_e_pass: {
        text: "'Excellent,' the head troll says through the smog. 'You are a true citizen of the digital age. Go get it signed by a Gazetted Officer in the basement.'",
        choices: [
            { text: "Descend to the basement for Desk C.", action: () => { state.inventory = "Verified Forms"; }, next: "desk_c_intro" }
        ]
    },
    desk_c_intro: {
        icon: "👀📱",
        text: "Desk C (Gazetted Officer).\n\nYou reach the damp basement. The officer is glued to his phone under the desk. The audio sounds suspiciously like the 'educational' videos politicians are caught watching during assembly sessions.\n\nHe doesn't notice you.",
        choices: [
            { text: "Ahem. Sir, signature please?", action: () => { state.sanity -= 15; }, next: "desk_c_interrupt" },
            { text: "Offer him your premium 5G hotspot so it loads faster.", action: () => { state.patience -= 5; }, next: "desk_c_hotspot" }
        ]
    },
    desk_c_interrupt: {
        text: "He jumps, frantically closing the tab. 'I was... researching deepfakes! It's a public notice issue!' he stammers. He hurriedly signs your file just to get rid of you.",
        choices: [
            { text: "Take the file.", action: () => { state.inventory = "Signed & Ready"; }, next: "waterlog" }
        ]
    },
    desk_c_hotspot: {
        text: "He looks at you with deep gratitude. 'Beta, you are doing god's work. The Wi-Fi here is terrible.' He happily stamps your file in 4K resolution.",
        choices: [
            { text: "Take the file.", action: () => { state.inventory = "Signed & Ready"; }, next: "waterlog" }
        ]
    },
    waterlog: {
        icon: "☔🌊",
        text: "Just as he hands it back, unprecedented rain hits! The brand new multi-crore roof of the office collapses and waterlogging begins in the basement immediately. Your precious signed file is about to get ruined!",
        choices: [
            { text: "Use a plastic bag 'jugaad' to protect it.", action: () => { state.sanity -= 5; }, next: "anti_defection" },
            { text: "Wait for the disaster management fund.", action: () => { state.patience -= 40; }, next: "waterlog_wait" }
        ]
    },
    waterlog_wait: {
        text: "You wait in waist-deep water. The fund is announced, but 90% goes to contractors. You wade through the sewage water yourself.",
        choices: [
            { text: "Wade out and head back up to Desk A.", next: "anti_defection" }
        ]
    },
    anti_defection: {
        icon: "🏃‍♂️💰",
        text: "You escape the flooded basement. On your way back to Desk A, an MLA jumps out of nowhere! He tries to grab your file to defect to another department! \n\nA tempo full of black money is waiting for him outside!",
        choices: [
            { text: "Enforce the CJP 20-Year Ban on him!", action: () => { state.sanity += 10; }, next: "anti_defection_win" },
            { text: "Let him take it (Lose Sabar).", action: () => { state.patience -= 30; }, next: "anti_defection_lose" }
        ]
    },
    anti_defection_win: {
        text: "You shout, '20-YEAR BAN FROM PUBLIC OFFICE!'\n\nThe MLA drops the file and sprints toward the tempo in terror. You gain a sliver of Dimag back for holding the system accountable.",
        choices: [
            { text: "Return to Desk A", next: "return_to_a" }
        ]
    },
    anti_defection_lose: {
        text: "He takes your file, opens it, realizes it has no cash inside, and tosses it into a pothole. You pick it up, exhausted and wet.",
        choices: [
            { text: "Drag yourself back to Desk A", next: "return_to_a" }
        ]
    },
    return_to_a: {
        text: "Dripping wet and clutching your file, you finally return to Desk A and slam it on the table.\n\nThe Babu looks at it. 'Very good.'\n\nHe clicks a mouse button. A loading icon spins. \n\n'Arre... Server down hai.'",
        choices: [
            { text: "Ask why it's down.", action: () => { state.sanity -= 20; }, next: "server_down_why" },
            { text: "Go to the server room.", action: () => { state.patience -= 10; }, next: "server_down" }
        ]
    },
    server_down_why: {
        icon: "🐌🖥️",
        text: "'The server is busy linking everyone's Aadhaar card to their Kundali (horoscope),' the Babu shrugs. 'National security project. Kya karein? Go check if the wire is loose.'",
        choices: [
            { text: "Go to the server room.", next: "server_down" }
        ]
    },
    server_down: {
        text: "You walk to the NIC room. The 'server' is a dusty desktop PC from 2008. The plug is slightly pulled out of the socket.",
        choices: [
            { text: "Push the plug back in.", action: () => { state.sanity -= 5; }, next: "final_step" },
            { text: "Kick the CPU in pure frustration.", action: () => { state.sanity -= 10; }, next: "kick_cpu" }
        ]
    },
    kick_cpu: {
        text: "You kick the CPU. Miraculously, the fan whirs back to life. Percussive maintenance works every time. \n\nDesi jugaad always wins.",
        choices: [
            { text: "Run back to Desk A.", next: "final_step" }
        ]
    },
    final_step: {
        text: "You run back to Desk A. \n\n'Ah, server is back,' the Babu says. He picks up a heavy, ink-stained rubber stamp.\n\nHe breathes on it. He raises it high in the air...",
        choices: [
            { text: "Hold your breath.", next: "win" }
        ]
    },
    win: {
        icon: "📜✅",
        text: "THWACK!\n\nThe Final Stamp is placed on your file. You have survived the bureaucratic loop. You are officially recognized by the Republic of Janta.\n\nThe allowance will now come khatakhat, khatakhat. You cannot be squashed.",
        choices: [
            { text: "Play Again (Submit Next Form)", action: () => { initGame(); }, next: "entrance" }
        ] // Added play again button on win
    }
};

// --- Core Logic ---

function initGame() {
    state = {
        sanity: 100,
        patience: 100,
        inventory: "Empty Folder",
        currentScene: "entrance",
        isTyping: false
    };
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    stampContainer.classList.add('hidden');
    const sceneIcon = document.getElementById('scene-icon');
    if(sceneIcon) sceneIcon.classList.add('hidden');
    
    renderScene();
}

function updateUI() {
    // Clamp values
    state.sanity = Math.max(0, Math.min(100, state.sanity));
    state.patience = Math.max(0, Math.min(100, state.patience));

    // Update Text
    sanityText.textContent = state.sanity + '%';
    patienceText.textContent = state.patience + '%';
    inventoryText.textContent = state.inventory;

    // Update Bars
    sanityFill.style.width = state.sanity + '%';
    patienceFill.style.width = state.patience + '%';

    // Color logic
    if (state.sanity < 30) sanityFill.className = 'meter-fill red-fill';
    else if (state.sanity < 60) sanityFill.className = 'meter-fill orange-fill';
    else sanityFill.className = 'meter-fill green-fill';

    if (state.patience < 30) patienceFill.className = 'meter-fill red-fill';
    else if (state.patience < 60) patienceFill.className = 'meter-fill orange-fill';
    else patienceFill.className = 'meter-fill green-fill';
}

function renderScene() {
    updateUI();

    // Check for Game Over conditions
    if (state.sanity <= 0) {
        gameOver("Dimag Kharab!", "You started rambling about Kafka and eventually became a Babu yourself. You now work at Desk D processing paper leaks.");
        return;
    }
    if (state.patience <= 0) {
        gameOver("Sabar Toot Gaya!", "You flipped a table, threw the inkpad out the window, and stormed out. Your application is void. Moye moye.");
        return;
    }

    const sceneData = scenes[state.currentScene];
    
    // Check for Win condition
    if (state.currentScene === 'win') {
        gameWin(sceneData.text);
        // We do not return immediately, we allow the typeWriter to run to show the Play Again button
    } else {
        stampContainer.classList.add('hidden');
    }

    // Typewriter effect for text
    storyText.textContent = "";
    const sceneIcon = document.getElementById('scene-icon');
    if(sceneData.icon) {
        sceneIcon.textContent = sceneData.icon;
        sceneIcon.classList.remove('hidden');
        // Add a small pop animation
        sceneIcon.style.animation = 'none';
        sceneIcon.offsetHeight; /* trigger reflow */
        sceneIcon.style.animation = null; 
    } else {
        sceneIcon.classList.add('hidden');
    }

    let i = 0;
    state.isTyping = true;
    
    // Hide buttons during typing
    choiceBtns.forEach(btn => btn.classList.add('hidden'));
    
    function typeWriter() {
        if (i < sceneData.text.length && state.isTyping) {
            storyText.textContent += sceneData.text.charAt(i);
            i++;
            // Scroll to bottom
            const storyPanel = document.getElementById('story-panel');
            storyPanel.scrollTop = storyPanel.scrollHeight;
            setTimeout(typeWriter, 15); // typing speed
        } else {
            state.isTyping = false;
            storyText.textContent = sceneData.text; // Ensure full text is there if skipped
            
            // Show choices
            choiceBtns.forEach(btn => btn.classList.add('hidden')); // clear all
            
            if(sceneData.choices) {
                sceneData.choices.forEach((choice, index) => {
                    if (index < 4) {
                        choiceBtns[index].textContent = choice.text;
                        choiceBtns[index].classList.remove('hidden');
                        
                        // Clear old event listeners
                        const newBtn = choiceBtns[index].cloneNode(true);
                        choiceBtns[index].parentNode.replaceChild(newBtn, choiceBtns[index]);
                        choiceBtns[index] = newBtn;
                        
                        // Add new event listener
                        choiceBtns[index].addEventListener('click', () => {
                            if (choice.action) choice.action();
                            if (choice.next === "entrance") {
                                // Handled by initGame via action
                            } else {
                                state.currentScene = choice.next;
                                renderScene();
                            }
                        });
                    }
                });
            }
        }
    }
    
    typeWriter();
}

function gameOver(title, message) {
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    endTitle.textContent = title;
    endMessage.textContent = message;
    endTitle.style.color = 'var(--text-color)';
}

function gameWin(winText) {
    stampContainer.classList.remove('hidden'); // Show the CJP Stamp animation
}

// Allow skipping typing by clicking the text area
document.getElementById('story-panel').addEventListener('click', () => {
    if (state.isTyping) {
        state.isTyping = false;
    }
});

// Options / Fast Forward Button in UI
document.addEventListener('DOMContentLoaded', () => {
    // Add a fast forward UI hint dynamically
    const header = document.getElementById('header-panel');
    if (header && !document.getElementById('skip-btn')) {
        const skipBtn = document.createElement('button');
        skipBtn.id = 'skip-btn';
        skipBtn.textContent = '⏩ Fast Forward Text';
        skipBtn.className = 'inventory-box';
        skipBtn.style.cursor = 'pointer';
        skipBtn.style.border = 'none';
        skipBtn.style.marginLeft = 'auto';
        skipBtn.style.backgroundColor = 'var(--box-bg)';
        skipBtn.style.color = 'var(--accent-red)';
        skipBtn.style.fontWeight = 'bold';
        
        skipBtn.addEventListener('click', () => {
            if (state.isTyping) state.isTyping = false;
        });
        
        header.appendChild(skipBtn);
    }
});

// --- Event Listeners ---
startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', initGame);
