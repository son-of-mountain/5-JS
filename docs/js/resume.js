//fonction pour ouvrir ou fermer les detail
function toggleDetails(elementId) {
   
   
    const detailsElement = document.getElementById(elementId); const button = event.target;
    const isCurrentlyOpen = !detailsElement.classList.contains('hidden');
    closeAllDetails();//on ferme tout dabord
    if (!isCurrentlyOpen) {
       
        detailsElement.className = detailsElement.className.replace('hidden', '').trim(); button.className = button.className + ' active'; button.textContent = '×';
       
        detailsElement.style.opacity = '0'; detailsElement.style.transform = 'translateY(-10px)';
        setTimeout(() => { detailsElement.style.opacity = '1'; detailsElement.style.transform = 'translateY(0)'; }, 10);
    }
}

//fonction pour fermer tous les descriptions ouvert
function closeAllDetails() {
    const allDetails = document.getElementsByClassName('details'); const allButtons = document.getElementsByClassName('details-btn');
    //boucle pour fermer chaque detail
    for (let i = 0; i < allDetails.length; i++) {
        const detail = allDetails[i];
        if (!detail.className.includes('hidden')) {
            detail.style.opacity = '0'; detail.style.transform = 'translateY(-10px)';
            setTimeout(() => { if (!detail.className.includes('hidden')) { detail.className = detail.className + ' hidden'; } }, 300);
        }


    }
    //remet les bouton a zero
    for (let i = 0; i < allButtons.length; i++) {
        
        const button = allButtons[i];
        
        button.className = button.className.replace(' active', ''); button.textContent = '+'; button.style.transform = 'scale(1)';
    }
}





//quand la page est chargee on masque tout
document.addEventListener('DOMContentLoaded', function () {
    const allDetails = document.getElementsByClassName('details'); const allButtons = document.getElementsByClassName('details-btn');
    for (let i = 0; i < allDetails.length; i++) {
        const detail = allDetails[i];
        if (!detail.className.includes('hidden')) { detail.className = detail.className + ' hidden'; }
    }
    for (let i = 0; i < allButtons.length; i++) { allButtons[i].textContent = '+'; }
});

//effet de survol sur les bouton
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.getElementsByClassName('details-btn');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('mouseenter', function () { if (!this.className.includes('active')) { this.style.transform = 'scale(1.1)'; } });
        button.addEventListener('mouseleave', function () { if (!this.className.includes('active')) { this.style.transform = 'scale(1)'; } });
    }
});
//creer les tooltip pour les competances
document.addEventListener('DOMContentLoaded', function () {
    const skillItems = document.getElementsByClassName('skill-item');
    for (let i = 0; i < skillItems.length; i++) {
        const skillItem = skillItems[i]; const tooltipText = skillItem.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('span'); tooltipElement.className = 'tooltip'; tooltipElement.textContent = tooltipText;
        skillItem.appendChild(tooltipElement);
        //evenement pour montrer le tooltip
        skillItem.addEventListener('mouseenter', function (event) { showTooltipWithAnimation(tooltipElement); updateTooltipPosition(event, tooltipElement, skillItem); });
        //suivre la souris
        skillItem.addEventListener('mousemove', function (event) { updateTooltipPosition(event, tooltipElement, skillItem); });
        //cacher quand souris part
        skillItem.addEventListener('mouseleave', function () { hideTooltipWithAnimation(tooltipElement); });
    }
});

// ============= met a jour position du tooltip pour suivre souris
function updateTooltipPosition(event, tooltipElement, skillItem) {
    const rect = skillItem.getBoundingClientRect(); const mouseX = event.clientX - rect.left; const mouseY = event.clientY - rect.top;
   
    const offsetX = 15; const offsetY = 20;//decalage pour pas etre sur curseur
   

    tooltipElement.style.left = mouseX + offsetX + 'px'; tooltipElement.style.top = mouseY + offsetY + 'px'; tooltipElement.style.transform = 'none';
}


//      fait apparaitre tooltip progressivement
function showTooltipWithAnimation(tooltipElement) {
    tooltipElement.style.visibility = 'visible'; tooltipElement.style.opacity = '0';
    let opacity = 0; const duration = 200; const steps = 10; const interval = duration / steps; let step = 0;
    function animateShow() {
        step++; opacity = step / steps; tooltipElement.style.opacity = opacity;
        if (step < steps) { setTimeout(animateShow, interval); }
    }
    animateShow();
}




//cache tooltip progressivement
function hideTooltipWithAnimation(tooltipElement) {

    let opacity = 1; const duration = 150; const steps = 8; const interval = duration / steps; let step = 0;

    function animateHide() {

        step++; opacity = 1 - (step / steps); tooltipElement.style.opacity = opacity;
        if (step < steps) { setTimeout(animateHide, interval); } else { tooltipElement.style.visibility = 'hidden'; }

    }



    animateHide();
}

//affiche les etoiles pour chaque competance

document.addEventListener('DOMContentLoaded', function () {

    const skillItems = document.getElementsByClassName('skill-item');

    for (let i = 0; i < skillItems.length; i++) {        const skillItem = skillItems[i]; const level = skillItem.getAttribute('data-level');
        if (level) {

            //creer element pour les etoiles
            
            const starsSpan = document.createElement('span'); starsSpan.className = 'skill-stars';
            
            let starsHTML = '';
            //boucle pour ajouter les etoile pleine
            for (let j = 1; j <= 5; j++) {
                if (j <= level) { starsHTML += '<span class="star-filled">★</span>'; }
                else { starsHTML += '<span class="star-empty">☆</span>'; }
            }
            
            
            starsSpan.innerHTML = starsHTML; skillItem.appendChild(starsSpan);
        }
    }
});




//tableau des valeur pour l'histogramme
const skillsData = [
    { name: 'JavaScript', level: 4, color: '#f7df1e' },
    { name: 'TypeScript', level: 3, color: '#3178c6' },
    { name: 'React', level: 4, color: '#61dafb' },
    { name: 'Node.js', level: 3, color: '#339933' },
    { name: 'Git', level: 5, color: '#f05032' },
    { name: 'Docker', level: 3, color: '#2496ed' },
    { name: 'CI/CD', level: 2, color: '#6e5494' }
];

//fonction pour dessiner histogramme avec canvas
function drawSkillsChart() {
    const canvas = document.getElementById('skillsCanvas');
    if (!canvas) return;//si pas de canvas on arrete
    const ctx = canvas.getContext('2d');
    const width = canvas.width; const height = canvas.height;
    //efface le canvas
    ctx.clearRect(0, 0, width, height);
    //parametres du graphique

    const barWidth = 80; const maxBarHeight = 300; const spacing = 20; const startX = 60; const startY = height - 50;
    //dessine les axes
    
    ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
    
    ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(width - 20, startY); ctx.stroke();//axe horizontal
    
    ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(startX, 50); ctx.stroke();//axe vertical
    
    //dessine les graduations sur axe Y
    
    
    
    ctx.fillStyle = '#666'; ctx.font = '12px Arial'; ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const y = startY - (i * maxBarHeight / 5);
        ctx.fillText(i + '★', startX - 10, y + 5);
        ctx.beginPath(); ctx.moveTo(startX - 5, y); ctx.lineTo(startX, y); ctx.strokeStyle = '#999'; ctx.stroke();
    }
    //dessine les barres
    for (let i = 0; i < skillsData.length; i++) {
        const skill = skillsData[i];

        
        const x = startX + spacing + (i * (barWidth + spacing));
        
        
        
        const barHeight = (skill.level / 5) * maxBarHeight;
        // y position de la barre
        const y = startY - barHeight;
        //dessine barre avec couleur
        ctx.fillStyle = skill.color;


        ctx.fillRect(x, y, barWidth, barHeight);
        //bordure de la barre
        ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.strokeRect(x, y, barWidth, barHeight);
        //nom competence en dessous
        ctx.fillStyle = '#333'; ctx.font = '11px Arial'; ctx.textAlign = 'center';
        ctx.save(); ctx.translate(x + barWidth / 2, startY + 15); ctx.rotate(-Math.PI / 6);
        ctx.fillText(skill.name, 0, 0); ctx.restore();
        
        
        //affiche niveau sur la barre
        ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Arial'; ctx.textAlign = 'center';
        ctx.fillText(skill.level + '★', x + barWidth / 2, y + barHeight / 2 + 5);
    }


    //titre du graphique
    ctx.fillStyle = '#333'; ctx.font = 'bold 16px Arial'; ctx.textAlign = 'center';
    
    ctx.fillText('Niveau de maitrise des competences', width / 2, 30);
}



//appelle la fonction au chargement
document.addEventListener('DOMContentLoaded', drawSkillsChart);
