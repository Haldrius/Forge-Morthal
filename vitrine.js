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
const materialOrder = ['acier', 'fer', 'commun', 'cuir', 'peau', 'fourrure', 'orichalque','verre', 'ébonite'];

const BANNIERES_ARMURES = {
    acier: [
        { fichier: "Armure en Acier Nordique1.jpg", titre: "Acier Nordique I" },
        { fichier: "Armure en Acier Nordique2.jpg", titre: "Acier Nordique II" },
        { fichier: "Armure en Acier Laminé.jpg", titre: "Acier Laminé" },
        { fichier: "Armure en Plaques d'Acier.jpg", titre: "Plaques d'Acier" }
    ],
    fer: [
        { fichier: "Armure en Fer Nordique.jpg", titre: "Fer Nordique" },
        { fichier: "Armure en Fer Nordique à Bandes.jpg", titre: "Fer Nordique à Bandes" },
        { fichier: "Armure en Fer Robuste.jpg", titre: "Fer Robuste" },
        { fichier: "Armure en Fer Robuste à Bandes.jpg", titre: "Fer Robuste à Bandes" },
        { fichier: "Armure en Fer Runique.jpg", titre: "Fer Runique" },
        { fichier: "Armure en Fer Runique à Bandes.jpg", titre: "Fer Runique à Bandes" },
        { fichier: "Armure en Fer Usée.jpg", titre: "Fer Usé" },
        { fichier: "Armure en Fer Usée à Bandes.jpg", titre: "Fer Usé à Bandes" }
    ],
    commun: [
        { fichier: "Armure Commune Brigandine.jpg", titre: "Brigandine" },
        { fichier: "Armure Commune de Gambison.jpg", titre: "Gambison" },
        { fichier: "Armure Commune Lamellaire.jpg", titre: "Lamellaire" },
        { fichier: "Armure Commune de Maille.jpg", titre: "Maille" }
    ],
    cuir: [
        { fichier: "Armure en Cuir Maillé.jpg", titre: "Cuir Maillé" },
        { fichier: "Armure en Cuir Nordique.jpg", titre: "Cuir Nordique" }
    ],
    peau: [
        { fichier: "Armure en Peau Nordique1.jpg", titre: "Peau Nordique I" },
        { fichier: "Armure en Peau Nordique2.jpg", titre: "Peau Nordique II" }
    ],
    fourrure: [
        { fichier: "Armure en Fourrure de Chasseur.jpg", titre: "Fourrure de Chasseur" },
        { fichier: "Armure en Fourrure Nordique.jpg", titre: "Fourrure Nordique" }
    ],
    verre: [
        { fichier: "", titre: "Verre I" },
        { fichier: "", titre: "Verre II" }
    ],
    ébonite: [
        { fichier: "Armure d'Ebonite Mer.jpg", titre: "Ebonite Mer" },
        { fichier: "Armure d'Ebonite Nordique.jpg", titre: "Ebonite Nordique" },
        { fichier: "Armure d'Ebonite Mer.jpg", titre: "Ebonite Mer Dorée" },
        { fichier: "Armure d'Ebonite Nordique Dorée.jpg", titre: "Ebonite Nordique Dorée" }
    ]

};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').addEventListener('input', applyAllFilters);
    
    const mainButtons = document.querySelectorAll('#main-filter-row .filter-btn');
    mainButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');
            currentMainCategory = cat;
            
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

    const btnToutAfficher = document.querySelector('#main-filter-row .filter-btn[data-cat="tous"]');
    if (btnToutAfficher) btnToutAfficher.classList.remove('active');

    const btnMateriaux = document.querySelector('#main-filter-row .filter-btn[data-cat="Matériaux"]');
    if (btnMateriaux) btnMateriaux.classList.add('active');

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
            <button class="filter-btn" data-sub="orichalque">Orsimer</button>
            <button class="filter-btn" data-sub="verre">Verre</button>
            <button class="filter-btn" data-sub="ébonite">Ébonite</button>
        `;
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
    } else {
        subRow.style.display = 'none';
        subRow.innerHTML = '';
        return;
    }

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

        const isEquipement = (item) => item.cat === 'Arme' || item.cat === 'Armure';
        if (isEquipement(a) && isEquipement(b)) {
            if (a.cat !== b.cat) return a.cat.localeCompare(b.cat);

            let indexMatA = materialOrder.indexOf(matA);
            let indexMatB = materialOrder.indexOf(matB);
            if (indexMatA === -1) indexMatA = materialOrder.length + 100;
            if (indexMatB === -1) indexMatB = materialOrder.length + 100;

            if (indexMatA !== indexMatB) return indexMatA - indexMatB;

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

        if (a.cat === 'Matériaux' && b.cat === 'Matériaux') {
            if (a.mat === 'minerais' && b.mat === 'minerais') {
                let indexA = oreOrder.indexOf(nameA); let indexB = oreOrder.indexOf(nameB);
                if (indexA === -1) indexA = oreOrder.length + 1; if (indexB === -1) indexB = oreOrder.length + 1;
                return indexA - indexB;
            }
            if (a.mat === 'lingot' && b.mat === 'lingot') {
                let indexA = ingotOrder.indexOf(nameA); let indexB = ingotOrder.indexOf(nameB);
                if (indexA === -1) indexA = ingotOrder.length + 1; if (indexB === -1) indexB = ingotOrder.length + 1;
                return indexA - indexB;
            }
            let resIndexA = resourceOrder.length, resIndexB = resourceOrder.length;
            for (let m = 0; m < resourceOrder.length; m++) { if (nameA.includes(resourceOrder[m])) { resIndexA = m; break; } }
            for (let n = 0; n < resourceOrder.length; n++) { if (nameB.includes(resourceOrder[n])) { resIndexB = n; break; } }
            return resIndexA - resIndexB || nameA.localeCompare(nameB);
        }
        return a.cat.localeCompare(b.cat) || nameA.localeCompare(nameB);
    });

    updateArmorPreviewGlobal();
    displayItems(filtered);
}
// Fonction de génération automatique de la galerie d'armures avec gestion des dossiers
function updateArmorPreviewGlobal() {
    const previewContainer = document.getElementById('armor-preview-container');
    const previewsGrid = document.getElementById('armor-previews-grid');
    
    if (!previewContainer || !previewsGrid) return;

    // On vérifie si on est dans l'onglet Armure et si des images existent pour ce matériau
    if (currentMainCategory === 'Armure' && BANNIERES_ARMURES[currentSubMaterial] && BANNIERES_ARMURES[currentSubMaterial].length > 0) {
        
        let htmlGenere = '';
        
        // Boucle automatique sur chaque image déclarée dans la configuration
        BANNIERES_ARMURES[currentSubMaterial].forEach(set => {
            // Le script va chercher dans "images/nom-du-materiau/nom-du-fichier.jpg"
            htmlGenere += `
                <div class="armor-set-card">
                    <img src="images/${currentSubMaterial}/${set.fichier}" alt="${set.titre}">
                    <div class="armor-set-title">${set.titre}</div>
                </div>
            `;
        });
        
        previewsGrid.innerHTML = htmlGenere;
        previewContainer.style.display = 'block';
    } else {
        // Cache tout si aucune image n'est configurée pour ce matériau ou cet onglet
        previewsGrid.innerHTML = '';
        previewContainer.style.display = 'none';
    }
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
