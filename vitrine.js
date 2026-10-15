// Configuration de l'état initial intelligent (Vitrine)
let currentMainCategory = 'Matériaux'; // Active Matériaux de base
let currentSubMaterial = 'minerais';   // Active Minerais de base
const data = CATALOGUE_INITIAL;

// Ordres de tri thématiques de la forge
const weaponOrder = ['arc', 'flèche', 'dague', 'épée', 'espadon', 'hache', 'hache de guerre', 'masse', 'marteau'];
const armorOrder = ['casque', 'tête', 'armure', 'torse', 'tunique', 'robe', 'tenue', 'gants', 'gantelets', 'bottes'];
const resourceOrder = ["kit d'arme", "kit d'armure", 'petit bois', 'charbon pauvre', 'charbon', 'charbon en briquette', 'coke de charbon', 'cuir', 'bande de cuir', 'peau', 'smilodon', 'ours', 'chitine'];
const oreOrder = ['minerai de fer', 'corindon brut', "minerai d'argent", "minerai d'or", "minerai d'orichalque", 'pierre de lune brute', 'vif argent brut', 'malachite brute', 'ébonite brute'];
const ingotOrder = ['lingot de fer', 'lingot de corindon', "lingot d'acier", "lingot d'argent", "lingot d'or", "lingot d'orichalque", 'lingot de pierre de lune', 'lingot de vif-argent', 'lingot dwemer', "lingot d'ébonite", 'lingot de malachite'];
// Ordre de tri prioritaire unifié pour les sous-catégories (Armes & Armures)
//const materialOrder = ['acier', 'fer', 'commun', 'cuir', 'peau', 'fourrure', 'dwemer', 'orichalque', 'bosmer', 'altmer', 'verre', 'ébonite'];
const materialOrder = ['acier', 'fer', 'commun', 'cuir', 'peau', 'fourrure', 'verre', 'ébonite'];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').addEventListener('input', applyAllFilters);
    
    // Initialisation et gestion intelligente des filtres principaux
    const mainButtons = document.querySelectorAll('#main-filter-row .filter-btn');
    mainButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');
            currentMainCategory = cat;
            
            // LOGIQUE DE SÉLECTION AUTOMATIQUE DE LA DEUXIÈME OPTION
            if (cat === 'Matériaux') {
                currentSubMaterial = 'minerais';
            } else if (cat === 'Arme' || cat === 'Armure') {
                currentSubMaterial = 'acier';
            } else if (cat === 'Bijou') {
                currentSubMaterial = 'colliers';
            } else {
                currentSubMaterial = 'tous';
            }
            
            mainButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderSubFilters(cat);
            applyAllFilters();
        });
    });

    // CONFIGURATION DE L'AFFICHAGE PAR DÉFAUT AU CHARGEMENT (Matériaux > Minerais)
    const btnToutAfficher = document.querySelector('#main-filter-row .filter-btn[data-cat="tous"]');
    if (btnToutAfficher) btnToutAfficher.classList.remove('active');

    const btnMateriaux = document.querySelector('#main-filter-row .filter-btn[data-cat="Matériaux"]');
    if (btnMateriaux) btnMateriaux.classList.add('active');

    // Construit la barre de boutons et allume directement "Minerais"
    renderSubFilters('Matériaux');
    applyAllFilters();
});

function getPreciseIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('dague')) return '🗡️'; 
    if (n.includes('espadon') || n.includes('épée')) return '⚔️';
    if (n.includes('arc')) return '🏹'; 
    if (n.includes('flèche')) return '🎯'; 
    if (n.includes('bouclier')) return '🛡️';
    if (n.includes('casque') || n.includes('tête')) return '💂'; 
    if (n.includes('armure') || n.includes('torse')) return '👕';
    if (n.includes('gants') || n.includes('gantelets')) return '🧤'; 
    if (n.includes('bottes')) return '🥾';
    if (n.includes('diadème')) return '👑'; 
    if (n.includes('collier')) return '📿'; 
    if (n.includes('bague')) return '💍';
    if (n.includes('lingot')) return '🧱'; 
    if (n.includes('minerai')) return '💎'; 
    if (n.includes('brut')) return '💎';
    if (n.includes('bois')) return '🌲';
    if (n.includes('charbon')) return '🔥';
    if (['améthyste', 'rubis', 'diamant', 'grenat', 'saphir', 'émeraude'].some(gem => n.includes(gem))) return '💎';
    if (n.includes('pioche') || n.includes('hache')) return '🛠️'; 
    if (n.includes('clé')) return '🔑';
    return '⚒️';
}
function renderSubFilters(cat) {
    const subRow = document.getElementById('sub-filter-row');
    if (cat === 'Matériaux') {
        subRow.style.display = 'flex';
        subRow.innerHTML = `
            <button class="filter-btn" data-sub="tous">Tous</button>
            <button class="filter-btn" data-sub="minerais">💎 Minerais</button>
            <button class="filter-btn" data-sub="lingot">🧱 Lingots</button>
            <button class="filter-btn" data-sub="ressources">📜 Ressources</button>
            <button class="filter-btn" data-sub="outils">🛠️ Outils</button>
        `;
    } else if (cat === 'Bijou') {
        subRow.style.display = 'flex';
        subRow.innerHTML = `
            <button class="filter-btn" data-sub="tous">Tous</button>
            <button class="filter-btn" data-sub="colliers">📿 Colliers</button>
            <button class="filter-btn" data-sub="anneaux">💍 Anneaux</button>
            <button class="filter-btn" data-sub="diadèmes">👑 Diadèmes</button>
            <button class="filter-btn" data-sub="gemmes">✨ Gemmes</button>
        `;
        } else if (cat === 'Arme') {
        subRow.style.display = 'flex';
        subRow.innerHTML = `
            <button class="filter-btn" data-sub="tous">Tous</button>
            <button class="filter-btn" data-sub="acier">Acier</button>
            <button class="filter-btn" data-sub="fer">Fer</button>
            <button class="filter-btn" data-sub="commun">Commun</button>
            <button class="filter-btn" data-sub="verre">Verre</button>
            <button class="filter-btn" data-sub="ébonite">Ébonite</button>
        `;
        /*<button class="filter-btn" data-sub="dwemer">Dwemer</button>
            <button class="filter-btn" data-sub="orichalque">Orsimer</button>
            <button class="filter-btn" data-sub="bosmer">Bosmer</button>
            <button class="filter-btn" data-sub="altmer">Altmer</button>*/
    } else if (cat === 'Armure') {
        subRow.style.display = 'flex';
        subRow.innerHTML = `
            <button class="filter-btn" data-sub="tous">Tous</button>
            <button class="filter-btn" data-sub="acier">Acier</button>
            <button class="filter-btn" data-sub="fer">Fer</button>
            <button class="filter-btn" data-sub="commun">Commun</button>
            <button class="filter-btn" data-sub="cuir">Cuir</button>
            <button class="filter-btn" data-sub="peau">Peau</button>
            <button class="filter-btn" data-sub="fourrure">Fourrure</button>
            <button class="filter-btn" data-sub="verre">Verre</button>
            <button class="filter-btn" data-sub="ébonite">Ébonite</button>
        `;
        /*<button class="filter-btn" data-sub="dwemer">Dwemer</button>
            <button class="filter-btn" data-sub="orichalque">Orsimer</button>
            <button class="filter-btn" data-sub="bosmer">Bosmer</button>
            <button class="filter-btn" data-sub="altmer">Altmer</button>*/

    } else {
        subRow.style.display = 'none';
        subRow.innerHTML = '';
        return;
    }

    // ALLUMAGE DYNAMIQUE DU BON SOUS-BOUTON
    const subButtons = subRow.querySelectorAll('.filter-btn');
    subButtons.forEach(subBtn => {
        const subValue = subBtn.getAttribute('data-sub');
        
        if (subValue === currentSubMaterial) {
            subBtn.classList.add('active');
        } else {
            subBtn.classList.remove('active');
        }

        subBtn.addEventListener('click', () => {
            currentSubMaterial = subValue;
            subButtons.forEach(b => b.classList.remove('active'));
            subBtn.classList.add('active');
            applyAllFilters();
        });
    });
}

function applyAllFilters() {
    const q = document.getElementById('search').value.toLowerCase(); 
    const filtered = [];
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i]; 
        const matchMain = (currentMainCategory === 'tous' || item.cat === currentMainCategory);
        const matchSub = (currentSubMaterial === 'tous' || item.mat === currentSubMaterial);
        const matchSearch = (item.nom.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q));
        if (matchMain && matchSub && matchSearch) { 
            filtered.push(item); 
        }
    }
    
        filtered.sort((a, b) => {
        const nameA = a.nom.toLowerCase(), nameB = b.nom.toLowerCase();
        const matA = a.mat.toLowerCase(), matB = b.mat.toLowerCase();

        // 1. SI les deux objets sont des Armes ou des Armures, on applique l'ordre des matériaux personnalisé
        // 1. SI les deux objets sont des Armes ou des Armures
        const isEquipement = (item) => item.cat === 'Arme' || item.cat === 'Armure';
        if (isEquipement(a) && isEquipement(b)) {
            
            // NOUVEAU : Si on affiche "Tout", on sépare d'abord les Armes des Armures
            if (a.cat !== b.cat) {
                return a.cat.localeCompare(b.cat); // Range les Armes ensemble, puis les Armures
            }

            let indexMatA = materialOrder.indexOf(matA);
            let indexMatB = materialOrder.indexOf(matB);

            // Si le matériau n'est pas trouvé, sécurité à la fin
            if (indexMatA === -1) indexMatA = materialOrder.length + 100;
            if (indexMatB === -1) indexMatB = materialOrder.length + 100;

            // Si les matériaux sont différents, tri selon la progression (materialOrder)
            if (indexMatA !== indexMatB) {
                return indexMatA - indexMatB;
            }

            // Si le matériau est identique, tri par type spécifique (ex: Dague avant Épée)
            if (a.cat === 'Arme' && b.cat === 'Arme') {
                let indexTypeA = weaponOrder.length, indexTypeB = weaponOrder.length;
                for (let i = 0; i < weaponOrder.length; i++) { if (nameA.includes(weaponOrder[i])) { indexTypeA = i; break; } }
                for (let j = 0; j < weaponOrder.length; j++) { if (nameB.includes(weaponOrder[j])) { indexTypeB = j; break; } }
                return indexTypeA - indexTypeB || nameA.localeCompare(nameB);
            }
            if (a.cat === 'Armure' && b.cat === 'Armure') {
                let indexTypeA = armorOrder.length, indexTypeB = armorOrder.length;
                for (let k = 0; k < armorOrder.length; k++) { if (nameA.includes(armorOrder[k])) { indexTypeA = k; break; } }
                for (let l = 0; l < armorOrder.length; l++) { if (nameB.includes(armorOrder[l])) { indexTypeB = l; break; } }
                return indexTypeA - indexTypeB || nameA.localeCompare(nameB);
            }
        }

        // 2. Tri thématique existant pour les Matériaux / Ressources brutes
                // 2. Tri thématique pour les Matériaux / Minerais / Lingots / Ressources
        if (a.cat === 'Matériaux' && b.cat === 'Matériaux') {
            // A. Si ce sont des minerais
            if (a.mat === 'minerais' && b.mat === 'minerais') {
                let indexA = oreOrder.indexOf(nameA);
                let indexB = oreOrder.indexOf(nameB);
                if (indexA === -1) indexA = oreOrder.length + 1;
                if (indexB === -1) indexB = oreOrder.length + 1;
                return indexA - indexB;
            }
            
            // B. Si ce sont des lingots
            if (a.mat === 'lingot' && b.mat === 'lingot') {
                let indexA = ingotOrder.indexOf(nameA);
                let indexB = ingotOrder.indexOf(nameB);
                if (indexA === -1) indexA = ingotOrder.length + 1;
                if (indexB === -1) indexB = ingotOrder.length + 1;
                return indexA - indexB;
            }

            // C. Reste des ressources brutes et outils (Logique d'origine)
            let resIndexA = resourceOrder.length, resIndexB = resourceOrder.length;
            for (let m = 0; m < resourceOrder.length; m++) { if (nameA.includes(resourceOrder[m])) { resIndexA = m; break; } }
            for (let n = 0; n < resourceOrder.length; n++) { if (nameB.includes(resourceOrder[n])) { resIndexB = n; break; } }
            return resIndexA - resIndexB || nameA.localeCompare(nameB);
        }

        
        // Par défaut pour le reste (Bijoux, Couture...)
        return a.cat.localeCompare(b.cat) || nameA.localeCompare(nameB);
    });

    displayItems(filtered);
}

function displayItems(arr) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    if (!arr.length) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#888;padding:15px;">Aucun article disponible.</td></tr>';
        return;
    }

    arr.forEach(item => {
        const tr = document.createElement('tr');
        const icon = getPreciseIcon(item.nom);
        const suffix = (typeof item.revente === 'number') ? ' sep.' : '';

        let nomAffichage = item.nom;
        let matBadgeHtml = '';

        if (item.cat === "Armure" && item.nom.includes(" - ")) {
            const parts = item.nom.split(" - ");
            const matOrigine = parts[0].trim();
            const pieceType = parts[1].trim();
            matBadgeHtml = `<span class="badge mat-badge">${matOrigine}</span>`;
            let liaison = (matOrigine.toLowerCase() === "acier" || matOrigine.toLowerCase() === "ébonite") ? "d'" : "en ";
            let nomPieceNettoye = pieceType;
            if (nomPieceNettoye.toLowerCase() === "tête") nomPieceNettoye = "Casque";
            if (nomPieceNettoye.toLowerCase() === "gants") nomPieceNettoye = "Gantelets";
            nomAffichage = `${nomPieceNettoye} ${liaison}${matOrigine.toLowerCase()}`;
            nomAffichage = nomAffichage.charAt(0).toUpperCase() + nomAffichage.slice(1);
        }

        const mobilePriceRow = `<div class="inline-prices"><span class="p-view">${item.revente}${suffix}</span></div>`;

        tr.innerHTML = `
            <td>
                <div class="badges-wrapper">
                    <span class="badge">${item.cat}</span>
                    ${matBadgeHtml}
                </div>
            </td>
            <td><span>${icon} ${nomAffichage}</span>${mobilePriceRow}</td>
            <td><strong>${item.revente}${suffix}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}
