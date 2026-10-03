const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Opening screen
window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("hidden"), 900);
});

// Smooth scrolling
function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth"
  });
}

window.scrollToId = scrollToId;

// Soft floating hearts and stars
function createParticle() {
  const p = document.createElement("span");
  p.className = "particle";
  p.textContent = Math.random() > .45 ? "♡" : "✦";
  p.style.left = `${Math.random() * 100}%`;
  p.style.fontSize = `${8 + Math.random() * 12}px`;
  p.style.animationDuration = `${7 + Math.random() * 7}s`;

  $("#particles").appendChild(p);

  setTimeout(() => p.remove(), 15000);
}

setInterval(createParticle, 700);

// Cursor glow
const glow = $("#cursor-glow");

window.addEventListener("pointermove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// Modal system
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

$$(".reason-card").forEach(card => {
  card.addEventListener("click", () => {
    openModal(card.dataset.title, card.dataset.text);
  });
});

$$(".open-card").forEach(card => {
  card.addEventListener("click", () => {
    openModal(`When ${card.dataset.title}`, card.dataset.message);
  });
});

$("#modalClose").addEventListener("click", closeModal);
$(".modal-backdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Secret word
// Accepts Gilbert in any combination of uppercase/lowercase letters.
const SECRET = "gilbert";

$("#secretBtn").addEventListener("click", unlockSecret);

$("#secretInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockSecret();
  }
});

function unlockSecret() {
  const input = $("#secretInput").value.trim().toLowerCase();
  const result = $("#secretResult");

  if (input === SECRET) {
    result.textContent =
      "You found it. ♡ I hope you know how much you mean to me. I am so thankful I get to have you in my life, and I wouldn't want to go through all of this with anyone else.";

    burstHearts();
  } else if (!input) {
    result.textContent =
      "You have to put something in first, silly ♡";
  } else {
    result.textContent =
      "Nope... try again ♡";
  }
}

// Heart burst for the secret
function burstHearts() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");

      heart.className = "particle";
      heart.textContent = "♥";
      heart.style.position = "fixed";
      heart.style.left = `${42 + Math.random() * 16}%`;
      heart.style.bottom = `${25 + Math.random() * 10}%`;
      heart.style.fontSize = `${12 + Math.random() * 20}px`;
      heart.style.animationDuration = `${2 + Math.random() * 2}s`;

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 4500);
    }, i * 40);
  }
}
