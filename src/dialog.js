export function startTextDialog(sceneName) {
    return new Promise((resolve) => {
        const contentContainer = document.getElementById("contentContainer");

        if (!contentContainer) {
            console.error("Content container not found!");
            resolve(); // Menghindari error saat container tidak ditemukan
            return;
        }

        // Clear and set up the dialog container
        contentContainer.innerHTML = `
            <div class="character-avatar" id="leftAvatar">
                <img src="../public/assets/characters/dhafaPixel2.png" alt="Dhafa">
            </div>
            <div class="character-avatar" id="rightAvatar">
                <img src="../public/assets/characters/saliPixel.png" alt="Unknown Lady">
            </div>
            <div id="dialogContainer" class="dialog-container">
                <div id="characterName" class="character-name"></div>
                <div id="dialogBox" class="dialog-box hidden">
                    <div id="dialogText" class="dialog-text"></div>
                </div>
            </div>
        `;

        const dialogBox = document.getElementById("dialogBox");
        const dialogText = document.getElementById("dialogText");
        const characterName = document.getElementById("characterName");
        const leftAvatar = document.getElementById("leftAvatar");
        const rightAvatar = document.getElementById("rightAvatar");

        // Semua dialog berdasarkan scene
        const scenes = {
            "prologue1": [
                { "character": "Dhafa", "text": "(Unlocks phone) 00:00 – February 1st, 2025.", "internal": true },
                { "character": "Dhafa", "text": "(A quiet sigh escapes his lips. His chest tightens.)", "internal": true },
                { "character": "Dhafa", "text": "It's... her birthday." },
                { "character": "Dhafa", "text": "(His fingers hover over the screen. A name. A message never sent.)", "internal": true }
            ],
            "prologue2": [
                { character: "Dhafa", text: "*(She looks just like someone I saw on Bumble...)", internal: true },
                { "character": "Unknown Lady", "text": "Hello? Are you okay? You look like you've seen a ghost." },
                { "character": "Dhafa", "text": "Ah— No, I'm sorry. I just... wasn't expecting this." },
                { "character": "Unknown Lady", "text": "Hmm... is that so? Because to me, you seem like someone carrying a heavy heart." },
                { "character": "Dhafa", "text": "…Why would you say that?" },
                { "character": "Unknown Lady", "text": "(Smiles knowingly) Just a feeling." },
                { "character": "Dhafa", "text": "*(She's too perceptive... this just confirms it. There's no way she's just some random stranger.)", "internal": true },
                { "character": "Unknown Lady", "text": "You’ve been holding onto something, haven’t you?" },
                { "character": "Dhafa", "text": "*(She knows... somehow, she knows.)", "internal": true },
                { "character": "Unknown Lady", "text": "But don't worry. I have an idea. Would you like a way forward? A way to understand things better?" },
                { "character": "Dhafa", "text": "A way forward... What do you mean?" },
                { "character": "Unknown Lady", "text": "You’ll have to play a few games with me first." },
                { "character": "Dhafa", "text": "A game, huh? umm.." },
                { "character": "Unknown Lady", "text": "How about this—if you win, you’ll get the answers you need." },
                { "character": "Dhafa", "text": "…Well, what do I have to lose?" },
                { "character": "Unknown Lady", "text": "(Chuckles) Quite simple, you’ll just have to try again." },
                { "character": "Unknown Lady", "text": "Are you ready?" },
                { "character": "Dhafa", "text": "(Chuckles) Alright, then let’s begin." }
            ],            
            "puzzle1": [
                { character: "Unknown Lady", text: "The first one was called 'Echoes of the Heart'" },
                { character: "Unknown Lady", text: "Memories are like scattered puzzle pieces. If you put them together, you might see the truth you’ve been avoiding." },
                { character: "Dhafa", text: "So, I just match them?" },
                { character: "Unknown Lady", text: "Yes. But remember—some pieces only exist in your heart." }
            ],
            "puzzle2": [
                { character: "Unknown Lady", text: "You remember now, don’t you?" },
                { character: "Dhafa", text: "(Pauses, his expression softens.)", internal: true },
                { character: "Dhafa", text: "Yeah… I do." },
                { character: "Unknown Lady", text: "Then tell me, is remembering enough?" },
                { character: "Dhafa", text: "...."},
                { character: "Unknown Lady", text: "It’s okay… You don’t have to say it now. But soon, you will." }
            ],
            "word1": [
                { character: "Unknown Lady", text: "Next, let’s play with words." },
                { character: "Dhafa", text: "Words?" },
                { character: "Unknown Lady", text: "Yup, it's 'Whisper of the Lines'" },
                { character: "Unknown Lady", text: "Words can build bridges… or walls. The choice is yours." }
            ],
            "word2": [
                { character: "Unknown Lady", text: "*Smiling softly" },
                { character: "Unknown Lady", text: "You choose your words carefully. That’s a good habit." },
                { character: "Dhafa", text: "Some things are hard to say." },
                { character: "Unknown Lady", text: "And some things are harder to leave unsaid." },
                { character: "NULL", text: "(Silence stretches between them).", internal: true },
                { character: "Unknown Lady", text: "Shall we move on?" },
                { character: "Dhafa", text: "*Nods" },
            ],
            "trivia1": [
                { character: "Unknown Lady", text: "The last one named 'The Meaning of Forever"},
                { character: "Unknown Lady", text: "Now, I’ll ask you a question. Answer with your heart. Because The game consists of personal and philosophical questions." },
            ],
            "trivia2": [
                { character: "Unknown Lady", text: "Now tell me… Do you still think there’s nothing you can do?" },
                { character: "Dhafa", text: "(Looks down, deep in thought.)", internal: true },
                { character: "Dhafa", text: "…I don’t know. Maybe I was afraid of making things worse." },
                { character: "Unknown Lady", text: "Or maybe… you were afraid of facing what you truly feel?" },
                { character: "Dhafa", text: "(The question lingers, unanswered.)", internal: true }
            ],
            "epilogue": [
                { character: "Unknown Lady", text: "The Unknown Lady hands Dhafa a small, wrapped gift envelope", internal: true },
                { character: "Unknown Lady", text: "This is for you. But it's not yours to keep—it's meant for her." },
                { character: "Dhafa", text: "What’s inside?" },
                { character: "Unknown Lady", text: "Something that has always been there. You just needed to give it too her." },
                { character: "Dhafa", text: "(Before he can ask more, she turns to leave.)", internal: true },
            ],
            "epilogue2": [
                { character: "Dhafa", text: "Wait—!" },
                { character: "Unknown Lady", text: "You’ll be fine, Dhafa.." },
                { character: "Unknown Lady", text: "(*smiling softly)", internal: true },
                { character: "Unknown Lady", text: "Tell her what you couldn’t before." },
                { character: "Unknown Lady", text: "Goodnight." },
            ],
            "epilogue3": [
                { character: "Dhafa", text: "And just like that, she disappears into the quiet night.", internal: true },
                { character: "Dhafa", text: "(Dhafa stares at the words, his fingers tightening around the paper. A deep exhale escapes him… and then, a quiet smile.)", internal: true },
                { character: "Dhafa", text: "…Thank you." },
                { character: "Dhafa", text: "(Dhafa looks up, his eyes locking onto the screen.)", internal: true },
                { character: "Dhafa", text: "Sali... you're up there, aren't you?" },
                { character: "Dhafa", text: "This is for you, open it. Please." }
            ],
        };

        if (!scenes[sceneName]) {
            console.error(`Scene "${sceneName}" not found!`);
            resolve();
            return;
        }

        const dialogScript = scenes[sceneName];
        let currentLine = 0;

        function showDialog() {
            if (currentLine >= dialogScript.length) {
                dialogBox.classList.add("hidden");
                resolve(); // Dialog selesai, lanjut ke bagian berikutnya
                return;
            }

            const { character, text, internal } = dialogScript[currentLine];
            dialogBox.classList.remove("hidden");
            characterName.textContent = character;
            dialogText.textContent = text;

            if (character === "Dhafa") {
                leftAvatar.style.opacity = 1;
                rightAvatar.style.opacity = 0.2;
            } else {
                leftAvatar.style.opacity = 0.2;
                rightAvatar.style.opacity = 1;
            }

            if (internal) {
                characterName.style.visibility = "hidden";
            } else {
                characterName.style.visibility = "visible";
            }

            currentLine++;
        }

        function handleKeydown(event) {
            if (event.code === "Space") {
                showDialog();
            }
        }

        document.addEventListener("keydown", handleKeydown);
        showDialog();
    });
}
