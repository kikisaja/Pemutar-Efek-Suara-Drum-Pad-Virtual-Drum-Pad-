// --- 1. INISIALISASI WEB AUDIO API CONTEXT ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Elemen DOM Display
const soundDisplay = document.getElementById("sound-display");
const padButtons = document.querySelectorAll(".pad-btn");

// --- 2. SYNTHESIZER DRUM SOUNDS (WEBAUDIO GENERATOR) ---
const soundSynthesizers = {
    kick() {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
    },

    snare() {
        const ctx = getAudioContext();
        // Noise Buffer untuk efek gemuruh snare
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.8, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(ctx.currentTime);
    },

    hihat() {
        playHat(0.05); // Durasi pendek untuk Closed Hi-Hat
    },

    openhat() {
        playHat(0.3); // Durasi lebih panjang untuk Open Hi-Hat
    },

    tom1() {
        playTom(200);
    },

    tom2() {
        playTom(130);
    },

    crash() {
        const ctx = getAudioContext();
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 5000;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.7, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(ctx.currentTime);
    },

    clap() {
        const ctx = getAudioContext();
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.8, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        noise.connect(gain);
        gain.connect(ctx.destination);

        noise.start(ctx.currentTime);
    }
};

// Helper Fungsi Hi-Hat
function playHat(duration) {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(ctx.currentTime);
}

// Helper Fungsi Tom
function playTom(freq) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.9, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
}

// --- 3. LOGIKA EKSEKUSI DAN ANIMASI PAD ---
function triggerSound(soundType, buttonElement) {
    // Jalankan synthesizer suara
    if (soundSynthesizers[soundType]) {
        soundSynthesizers[soundType]();
    }

    // Update Display Text
    soundDisplay.textContent = soundType;

    // Trigger Efek Visual CSS Active
    if (buttonElement) {
        buttonElement.classList.add("active");
        setTimeout(() => {
            buttonElement.classList.remove("active");
        }, 100);
    }
}

// --- 4. EVENT LISTENERS ---

// Event Klik Mouse / Sentuh Layar
padButtons.forEach(button => {
    button.addEventListener("click", () => {
        const soundType = button.getAttribute("data-sound");
        triggerSound(soundType, button);
    });
});

// Event Keydown Keyboard (A-K)
window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    const targetButton = document.querySelector(`.pad-btn[data-key="${key}"]`);

    if (targetButton) {
        const soundType = targetButton.getAttribute("data-sound");
        triggerSound(soundType, targetButton);
    }
});
