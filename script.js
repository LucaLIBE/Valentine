const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const result = document.getElementById('result');
const topImage = document.getElementById('top-image');
const message = document.getElementById('message');
const buttonsContainer = document.querySelector('.buttons');

let teleportTimeout = null;

// Positionne les boutons au chargement (Yes centré, No 100px à droite)
function positionButtonsInitial() {
    const msgrect = message.getBoundingClientRect();
    
    // Yes : centré
    yesBtn.style.left = (msgrect.left + msgrect.width/5) + 'px';
    yesBtn.style.top = (msgrect.bottom + yesBtn.offsetHeight / 2) + 'px';
    
    yesBtnrect = yesBtn.getBoundingClientRect()
    // No : 100px à droite du Yes
    noBtn.style.left = (yesBtnrect.right + 50) + 'px';
    noBtn.style.top = yesBtn.style.top
}

// Fonction téléportation DANS la zone visible
function teleportNoButton() {
    if (teleportTimeout) {
        clearTimeout(teleportTimeout);
    }

    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    const randomX = padding + Math.random() * (maxX - padding);
    const randomY = padding + Math.random() * (maxY - padding);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    teleportTimeout = setTimeout(teleportNoButton, 1000 + Math.random() * 1000);
}

// Détecte souris proche du bouton No
document.addEventListener('mousemove', (e) => {
    const rect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (mouseX >= rect.left && mouseX <= rect.right && 
        mouseY >= rect.top && mouseY <= rect.bottom) {
        teleportNoButton();
    }
});

// Position initiale au chargement
window.addEventListener('load', positionButtonsInitial);

// Clic Yes
yesBtn.addEventListener('click', () => {
    if (teleportTimeout) {
        clearTimeout(teleportTimeout);
    }
    
    topImage.src = "https://gifdb.com/images/high/dancing-happy-dance-gif-ws3ssoglw1drr3q7.webp";
    message.textContent = "Youhouhou makes me so happy ! ❤️";
    buttonsContainer.style.display = 'none';
    const link = document.createElement('a');
    link.href = "https://digibouquet.vercel.app/bouquet/f0662c75-d8c8-435e-a5c8-b5d0961ddcca"; // Remplace par ton lien
    link.textContent = "Flowers for you !";
    link.style.cssText = `
        display: block;
        margin-top: 20px;
        color: #e91e63;
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: bold;
        padding: 10px 20px;
        border: 2px solid #e91e63;
        border-radius: 25px;
        transition: all 0.3s ease;
    `;
    
    // Effet hover pour le lien
    link.addEventListener('mouseenter', () => {
        link.style.backgroundColor = '#e91e63';
        link.style.color = 'white';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.backgroundColor = 'transparent';
        link.style.color = '#e91e63';
    });
    
    // Ajoute le lien APRÈS le message
    message.parentNode.insertBefore(link, message.nextSibling);
    
    buttonsContainer.style.display = 'none';
});
