const elem = document.documentElement
const prologueContainer = document.getElementById('prologue-container');
const prologueText = document.getElementById('prologue');
const startButton = document.getElementById('start-button');
const character1 = document.getElementById('character1');
const character2 = document.getElementById('character2');
const blank = '';
const dialogueContainer = document.getElementById('dialogue-container');
const dialogue = document.getElementById('dialogue');
const nextButton = document.getElementById('next-button');
const bgMusic = new Audio('home.mp3');
const typewriterSound = new Audio('bubble.mp3');

const story = [
  { character: character1, dialogue: 'Hai, aku Lisia' },
  { character: character1, dialogue: 'Kini, aku berusia 17 tahun' },
  { character: character1, dialogue: 'Aku mengikuti olimpiade ekonomi di sekolah' },
  { character: character1, dialogue: 'Suatu saat, saya bertemu dengan Felix, kakak tingkat saya.' },
  { character: character1, dialogue: 'Dia mengikuti olimpiade fisika.' },
  { character: character1, dialogue: 'Awalnya, kami hanya sekadar berbicara sesekali.' },
  { character: character1, dialogue: 'Kami juga hanya sekadar teman seperjuangan olim.' },
  { character: character1, dialogue: 'Begitu sampai suatu saat, di bulan Desember.' },
  { character: character1, dialogue: 'Kami didekatkan di ultah teman.' },
  { character: character1, dialogue: 'Di sana, temanku jatuh cinta dengan teman koko itu' },
  { character: character1, dialogue: 'Kami menjadi perantara antara teman.' },
  { character: character1, dialogue: 'Semakin lama kami juga ikut semakin dekat' },
  { character: character1, dialogue: 'Dia terus memberikan support ke aku' },
  { character: character1, dialogue: 'Kami semakin sering saling chat' },
  { character: character1, dialogue: 'Sampai sering dijodohin teman' },
  { character: character1, dialogue: 'Tapi kami terus melanjutkan sebagai teman' },
  { character: character1, dialogue: 'Hingga suatu saat, pada kelas 12 sudah tamat.' },
  { character: character1, dialogue: 'Di pesta ulangtahunku yang ke-17.' },
  { character: character2, dialogue: 'Setelah ini, kita akan jarang ketemu' },
  { character: character2, dialogue: 'Sebelum aku pergi, aku mau ngucapin selamat ulang tahun' },
  { character: character2, dialogue: 'Semoga kamu bisa mewujudkan mimpi-mimpi kamu, membanggakan kedua orang tua kamu' },
  { character: character2, dialogue: 'Semoga kamu juga makin cantik, imut, dan mandiri' },
  { character: character2, dialogue: 'Good luck juga buat olim dan lomba-lomba kamu nanti' },
  { character: character2, dialogue: 'Kalau kamu butuh sesuatu dari aku bilang aja, akan aku usahakan' },
  { character: character2, dialogue: 'Terima kasih banyak karena sudah membuat tahun terakhirku di IGS jauh lebih baik' },
  { character: character2, dialogue: 'Hati-hati, tetap stay safe, jangan sering-sering sedih, sering senyum' },
  { character: character2, dialogue: 'Kamu keliatan manis kalo lagi senyum' },
  { character: character2, dialogue: 'Kalau kamu sedih mungkin kamu bisa bilang ke aku' },
  { character: character2, dialogue: 'Sekian aja dari aku' },
  { character: character2, dialogue: 'Sampai ketemu di suatu kesempatan' },
  { character: character2, dialogue: 'Maaf kalo aku ada apa-apa, kadang nyebelin ke kamu' },
  { character: character2, dialogue: 'Apapun yang terjadi, aku bakalan terus berusaha support kamu' },
  { character: character2, dialogue: 'Bye-bye!' },
  { character: character2, dialogue: '' }
];

let currentIndex = 0;

let isTyping = false;
let typingIndex = 0;
function typeWriter(element, text, callback) {
  isTyping = true;
  if (typingIndex < text.length) {
    element.textContent += text.charAt(typingIndex);
    typingIndex++;
    typewriterSound.pause();
    typewriterSound.currentTime = 0; // Kembali ke awal audio
    typewriterSound.play(); // Memainkan efek suara typewriter
    setTimeout(() => typeWriter(element, text, callback), 50);
  } else {
    typingIndex = 0;
    isTyping = false;
    if (callback) {
      callback();
    }
  }
}

function startStory() {
  prologueContainer.style.display = 'none';
  openFullscreen();
  showNextDialogue();
  bgMusic.play(); // Memainkan musik latar
}

function showNextDialogue() {
  if (currentIndex < story.length) {
    const scene = story[currentIndex];
    character1.style.display = 'none';
    character2.style.display = 'none';
    scene.character.style.display = 'block';
    dialogueContainer.style.display = 'block';
    dialogue.textContent = '';

    // Nonaktifkan tombol "Next" saat animasi typewriter sedang berlangsung
    nextButton.disabled = true;

    // Memainkan efek suara typewriter dan menampilkan teks secara bertahap
    typewriterSound.play(); // Memainkan efek suara typewriter
    dialogue.textContent = scene.dialogue.charAt(0);
    typingIndex = 1;
    let typeInterval = setInterval(function() {
      dialogue.textContent += scene.dialogue.charAt(typingIndex);
      typingIndex++;
      if (typingIndex > scene.dialogue.length) {
        clearInterval(typeInterval);
        isTyping = false;
        nextButton.style.display = 'inline-block';

        // Aktifkan kembali tombol "Next" setelah animasi typewriter selesai
        nextButton.disabled = false;

        if (currentIndex === story.length - 1) {
          // closeFullscreen();
          nextButton.textContent = 'Next';
          nextButton.onclick = function fadeout () {
            if (bgMusic.volume > 0){
              bgMusic.volume -= 0.0001;
              setTimeout(fadeout, 200)
            }
            setTimeout("window.location.href = 'index2.html';", 2000);
          };
        }
      }
    }, 50);
    currentIndex++;
  } else {
    dialogueContainer.style.display = 'none';
    currentIndex = 0;
    // bgMusic.pause(); // Jeda musik latar saat cerita selesai
  }
}

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

nextButton.addEventListener('click', () => {
  if (!nextButton.disabled && !isTyping) {
    showNextDialogue();
  }
});

typeWriter(prologueText, 'Cerita ini berkisah tentang seseorang, yang berharga bagiku.', () => {
  startButton.style.display = 'inline-block';
});

startButton.addEventListener('click', startStory);