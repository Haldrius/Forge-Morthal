// Configuration de l'état initial intelligent (Vitrine)
let currentMainCategory = 'Armure'; // Active Matériaux de base
let currentSubMaterial = 'acier';   // Active Minerais de base
let data = [];
let currentGender = Math.random() < 0.5 ? 'Masculin' : 'Féminin'; // Prendra la valeur 'Masculin' ou 'Féminin'

// Ordres de tri thématiques de la forge
const weaponOrder = ['arc', 'flèche', 'dague', 'épée', 'espadon', 'hache', 'hache de guerre', 'masse', 'marteau'];
const armorOrder = ['casque', 'tête', 'armure', 'torse', 'tunique', 'robe', 'tenue', 'gants', 'gantelets', 'bottes'];
const resourceOrder = ['petit bois', 'charbon pauvre', 'charbon', 'charbon en briquette', 'coke de charbon', 'cuir', 'bande de cuir', 'peau', 'smilodon', 'ours', 'chitine'];
const oreOrder = ['minerai de fer', 'corindon brut', "minerai d'argent", "minerai d'or", "minerai d'orichalque", 'pierre de lune brute', 'vif argent brut', 'malachite brute', 'ébonite brute'];
const ingotOrder = ['lingot de fer', 'lingot de corindon', "lingot d'acier", "lingot d'argent", "lingot d'or", "lingot d'orichalque", 'lingot de pierre de lune', 'lingot de vif-argent', 'lingot dwemer', "lingot d'ébonite", 'lingot de malachite'];
const materialOrder = ['acier', 'fer', 'commun', 'cuir','maille' ,'peau', 'fourrure', 'orichalque','verre', 'ébonite'];
const outilOrder = [ 'Réparation (sur place)','Kit de réparation (à emporter)','Pioche','Hache de bûcheron','Clé']
const bosmerPriorities = {
    'bosmer de la chasse sauvage': 3,
    'bosmer en plate': 2,
    'capuche bosmer': 1,
    'masque bosmer': 4,
    'cape bosmer': 5,
    'bosmer': 1 // Placé en dernier pour ne pas intercepter les chaînes plus précises au-dessus
};

const BANNIERES_ARMURES = {
    acier: [
        { fichier: "Acier-Armure1.jpg", titre: "Acier Nordique I" },
        { fichier: "Acier-Armure2.jpg", titre: "Acier Nordique II" },
        { fichier: "Acier-Armure3.jpg", titre: "Acier Nordique III" },
        { fichier: "Acier-Armure4.jpg", titre: "Acier Nordique IV" },
        { fichier: "Acier-Armure à Capuche1.jpg", titre: "Acier à Capuche I" },
        { fichier: "Acier-Armure à Capuche2.jpg", titre: "Acier à Capuche II" },
        { fichier: "Acier-Armure Nordique.jpg", titre: "Acier Nordique" },
        { fichier: "Acier-Armure Robuste.jpg", titre: "Plaques Robuste" },
        { fichier: "Acier-Armure Tabard1.jpg", titre: "Acier & Tabard" }
    ],
    fer: [
        { fichier: "Fer-Armure.jpg", titre: "Fer Classique" },
        { fichier: "Fer-Armure à Bandes.jpg", titre: "Fer Classique à Bandes" },
        { fichier: "Fer-Armure2.jpg", titre: "Fer II" },
        { fichier: "Fer-Armure Lourde.jpg", titre: "Fer Lourd" },
        { fichier: "Fer-Armure Nordique.jpg", titre: "Fer Nordique" },
        { fichier: "Fer-Armure Nordique à Bandes.jpg", titre: "Fer Nordique à Bandes" },
        { fichier: "Fer-Armure Robuste.jpg", titre: "Fer Robuste" },
        { fichier: "Fer-Armure Robuste à Bandes.jpg", titre: "Fer Robuste à Bandes" },
        { fichier: "Fer-Armure Runique.jpg", titre: "Fer Runique" },
        { fichier: "Fer-Armure Runique à Bandes.jpg", titre: "Fer Runique à Bandes" },
        { fichier: "Fer-Armure Forgée.jpg", titre: "Fer Forgé" },
        { fichier: "Fer-Armure Forgée à Bandes.jpg", titre: "Fer Forgé à Bandes" },
        { fichier: "Fer-Armure Tabard1.jpg", titre: "Fer & Tabard" }
    ],
    commun: [
        { fichier: "Commun-Hoqueton.jpg", titre: "Hoqueton" },
        { fichier: "Commun-Brigandine.jpg", titre: "Brigandine" },
        { fichier: "Commun-Gambison.jpg", titre: "Gambison" },
        { fichier: "Commun-Armure Rembourrée.jpg", titre: "Rembourée" },
        { fichier: "Commun-Armure Lamellaire.jpg", titre: "Tunique Lamellaire" },
        { fichier: "Commun-Armure Lamellaire2.jpg", titre: "Armure Lamellaire" },
        { fichier: "Commun-Cotte de Mailles.jpg", titre: "Cotte de Maille" },
        { fichier: "Commun-Tunique de Mailles.jpg", titre: "Tunique de Maille" }
    ],
    cuir: [
        { fichier: "Cuir-Armure.jpg", titre: "Cuir Classique" },
        { fichier: "Cuir-Armure Légère.jpg", titre: "Cuir Léger" },
        { fichier: "Cuir-Armure Nordique.jpg", titre: "Cuir Nordique" },
        { fichier: "Cuir-Armure Robuste.jpg", titre: "Cuir Robuste" },
        { fichier: "Cuir-Doublet1.jpg", titre: "Doublet en Cuir I" },
        { fichier: "Cuir-Doublet2.jpg", titre: "Doublet en Cuir II" },
        { fichier: "Cuir-Armure Bouillie.jpg", titre: "Cuir Bouilli" }
    ],
    maille:[
        { fichier: "Impérial-Tunique en Maille.jpg", titre: "Tunique & Maille" },
        { fichier: "Impérial-Haubert en Maille Huilée.jpg", titre: "Haubert en Maille Huilée" },
        { fichier: "Impérial-Cuir & Maille.jpg", titre: "Armure en Cuir & Maille" },
        { fichier: "Impérial-Cuir & Maille Huilée.jpg", titre: "Armure en Cuir & Maille Huilée" },
        { fichier: "Impérial-Veste en Maille.jpg", titre: "Veste en Maille" },
        { fichier: "Impérial-Veste en Maille Huilée.jpg", titre: "Veste en Maille Huilée" },
        { fichier: "Impérial-Surcot en Maille.jpg", titre: "Surcot en Maille" }
    ],
    peau: [
        { fichier: "Peau-Armure de Rôdeur.jpg", titre: "Rôdeur I" },
        { fichier: "Peau-Armure de Rôdeur2.jpg", titre: "Rôdeur II" },
        { fichier: "Peau-Armure Nordique.jpg", titre: "Peau Nordique" },
        { fichier: "Peau-Armure Nordique Cloutée.jpg", titre: "Peau Nordique Clouté" },
        { fichier: "Peau-Armure en Peau.jpg", titre: "Peau Classique" },
        { fichier: "Peau-Armure Cloutée.jpg", titre: "Peau Cloutée" },
        { fichier: "Peau-Armure en Fer Écaillé.jpg", titre: "Peau et Fer à Écailles" },
        { fichier: "Tenue d'Aprenti Aventurier.jpg", titre: "Apprenti Aventurier" }
    ],
    fourrure: [
        { fichier: "Fourrure-Kilt.jpg", titre: "Fourrure I" },
        { fichier: "Fourrure-Kilt et Cape.jpg", titre: "Fourrure II" },
        { fichier: "Fourrure-Armure1.jpg", titre: "Fourrure III" },
        { fichier: "Fourrure-Armure2.jpg", titre: "Fourrure IV" },
        { fichier: "Fourrure-Armure de Chasseur.jpg", titre: "Chasseur" },
        { fichier: "Fourrure-Armure Nordique1.jpg", titre: "Nordique I" },
        { fichier: "Fourrure-Armure Nordique2.jpg", titre: "Nordique II" },
        { fichier: "Fourrure-Armure Nordique3.jpg", titre: "Nordique III" },
        { fichier: "Fourrure-Armure Colovienne1.jpg", titre: "Colovienne I" },
        { fichier: "Fourrure-Armure Colovienne2.jpg", titre: "Colovienne II" }
    ],
    altmer:[
        { fichier: "Altmer-Armure Elfique.jpg", titre: "Elfique" },
    ],
    bosmer: [
        { fichier: "Bosmer-Armure.jpg", titre: "Bosmer" },
        { fichier: "Bosmer-Armure de Plate.jpg", titre: "Plate Bosmer" },
        { fichier: "Bosmer-Chasse Sauvage.jpg", titre: "Chasse Sauvage" }
    ],
    verre: [
        { fichier: "Verre-Armure.jpg", titre: "Verre Classique" },
        { fichier: "Verre-Armure de Vvardenfell.jpg", titre: "Verre de Vvardenfell" }
    ],
    ébonite: [
        { fichier: "Ebonite-Armure.jpg", titre: "Ebonite Classique" },
        { fichier: "Ebonite-Armure Dorée.jpg", titre: "Ebonite Dorée" },
        { fichier: "Ebonite-Armure Noble.jpg", titre: "Ebonite Noble" },
        { fichier: "Ebonite-Armure Noble Dorée.jpg", titre: "Ebonite Noble Dorée" }
    ]

};
async function chargerCatalogueDepuisGithub() {
    // Remplacez ces variables par vos informations réelles
    const owner = "Haldrius";
    const repo = "Forge-Morthal";
    const path = "catalogue.json"; // Conseil : Utilisez un format .json pur sur GitHub
    
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3.raw' // Force GitHub à renvoyer le contenu brut du fichier directement
        };

        // EN CAS DE DÉPÔT PRIVÉ : Décommentez la ligne ci-dessous (Attention à la sécurité du token !)
        // headers['Authorization'] = `token VOTRE_TOKEN_GITHUB`;

        const response = await fetch(url, { headers: headers });
        
        if (!response.ok) {
            throw new Error(`Erreur GitHub: ${response.status} ${response.statusText}`);
        }

        // Si votre fichier sur GitHub est un .json valide (ex: [ {"cat": "Matériaux", ...}, ... ])
        data = await response.json();
        
        console.log("Catalogue mis à jour avec succès depuis GitHub !");

    } catch (erreur) {
        console.error("Impossible de récupérer le catalogue distant, chargement du catalogue de secours...", erreur);
        // Optionnel : Définir un catalogue de secours vide ou local si GitHub est inaccessible
        data = []; 
    }
}

// 2. ADAPTATION DU DOMCONTENTLOADED (Rendu Asynchrone)
document.addEventListener('DOMContentLoaded', async () => {
    
    // On affiche un message d'attente dans le tableau pendant le chargement
    const tbody = document.getElementById('table-body');
    if (tbody) tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#888;padding:15px;">Chargement du catalogue en cours...</td></tr>';

    // On attend la récupération des données GitHub avant de continuer
    await chargerCatalogueDepuisGithub();

    document.getElementById('search').addEventListener('input', applyAllFilters);
    
    const mainButtons = document.querySelectorAll('#main-filter-row .filter-btn');
    mainButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');
            currentMainCategory = cat;
            
            if (cat === 'Matériaux') {
                currentSubMaterial = 'outils';
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

    const btnArmure = document.querySelector('#main-filter-row .filter-btn[data-cat="Armure"]');
    if (btnArmure) btnArmure.classList.add('active');

    renderSubFilters('Armure');
    applyAllFilters(); // Génère le tableau maintenant que "data" est rempli
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
            <button class="filter-btn" data-sub="outils">🛠️ Outils</button>
            <button class="filter-btn" data-sub="minerais">💎 Minerais</button>
            <button class="filter-btn" data-sub="lingot">🧱 Lingots</button>
            <button class="filter-btn" data-sub="ressources">📜 Ressources</button>
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
            <button class="filter-btn" data-sub="altmer">Altmer</button>
            <button class="filter-btn" data-sub="bosmer">Bosmer</button>
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
            <button class="filter-btn" data-sub="maille">Mailles</button>
            <button class="filter-btn" data-sub="peau">Peau</button>
            <button class="filter-btn" data-sub="fourrure">Fourrure</button>
            <button class="filter-btn" data-sub="altmer">Altmer</button>
            <button class="filter-btn" data-sub="bosmer">Bosmer</button>
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
    
    // ORDRE DE TRI SPÉCIFIQUE POUR LES OUTILS
    const outilOrder = ['Réparation (sur place)', 'Kit de réparation (à emporter)', 'Pioche', 'Hache de bûcheron', 'Clé'];

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

        // Pré-nettoyage des chaînes pour standardiser le mot "tête" en "casque" lors du tri par pièce
        let checkNameA = nameA.includes('capuche bosmer') ? 'casque' : nameA;
        let checkNameB = nameB.includes('capuche bosmer') ? 'casque' : nameB;

        // ─── REGLE SPECIALE : FAMILLE BOSMER ───
        const isBosmerA = nameA.includes('bosmer') || nameA.includes('capuche') || nameA.includes('masque') || nameA.includes('cape');
        const isBosmerB = nameB.includes('bosmer') || nameB.includes('capuche') || nameB.includes('masque') || nameB.includes('cape');

        if (isBosmerA && isBosmerB) {
            let prioA = 99;
            for (const [key, val] of Object.entries(bosmerPriorities)) {
                if (nameA.includes(key)) { prioA = val; break; }
            }
            let prioB = 99;
            for (const [key, val] of Object.entries(bosmerPriorities)) {
                if (nameB.includes(key)) { prioB = val; break; }
            }

            if (prioA !== prioB) {
                return prioA - prioB;
            }

            let indexPieceA = armorOrder.length, indexPieceB = armorOrder.length;
            for (let k = 0; k < armorOrder.length; k++) { if (checkNameA.includes(armorOrder[k])) { indexPieceA = k; break; } }
            for (let l = 0; l < armorOrder.length; l++) { if (checkNameB.includes(armorOrder[l])) { indexPieceB = l; break; } }
            
            return indexPieceA - indexPieceB || nameA.localeCompare(nameB);
        }

        // Si l'un des deux seulement est un équipement Bosmer, on force son placement
        if (isBosmerA !== isBosmerB) {
            let indexMatA = materialOrder.indexOf(matA);
            let indexMatB = materialOrder.indexOf(matB);
            if (indexMatA === -1) indexMatA = materialOrder.length + 100;
            if (indexMatB === -1) indexMatB = materialOrder.length + 100;
            if (indexMatA !== indexMatB) return indexMatA - indexMatB;
        }
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
                let indexPieceA = armorOrder.length, indexPieceB = armorOrder.length;
                for (let k = 0; k < armorOrder.length; k++) { if (checkNameA.includes(armorOrder[k])) { indexPieceA = k; break; } }
                for (let l = 0; l < armorOrder.length; l++) { if (checkNameB.includes(armorOrder[l])) { indexPieceB = l; break; } }
                return indexPieceA - indexPieceB || nameA.localeCompare(nameB);
            }
        }

        // ─── LOGIQUE DE TRI : SECTION MATÉRIAUX ───
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
            if (a.mat === 'outils' && b.mat === 'outils') {
                let indexA = outilOrder.indexOf(a.nom); let indexB = outilOrder.indexOf(b.nom);
                if (indexA === -1) indexA = outilOrder.length;
                if (indexB === -1) indexB = outilOrder.length;
                return indexA - indexB || nameA.localeCompare(nameB);
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

    if (currentMainCategory === 'Armure' && BANNIERES_ARMURES[currentSubMaterial] && BANNIERES_ARMURES[currentSubMaterial].length > 0) {
        
        // 2. Création et insertion du bouton à bascule (Toggle Switch) s'il n'existe pas encore
        let titleNode = previewContainer.querySelector('h2, h3');
        if (!document.getElementById('gender-toggle-wrapper')) {
            const toggleWrapper = document.createElement('div');
            toggleWrapper.id = 'gender-toggle-wrapper';
            toggleWrapper.style.cssText = "display: flex; justify-content: center; align-items: center; gap: 12px; margin: 15px 0; font-weight: bold;";
            
            toggleWrapper.innerHTML = `
                <span class="gender-label-text ${currentGender === 'Masculin' ? 'active-text' : ''}">Masculin</span>
                <label class="switch">
                    <input type="checkbox" id="gender-checkbox" ${currentGender === 'Féminin' ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
                <span class="gender-label-text ${currentGender === 'Féminin' ? 'active-text' : ''}">Féminin</span>
            `;
            
            if (titleNode) {
                titleNode.insertAdjacentElement('afterend', toggleWrapper);
            } else {
                previewContainer.insertBefore(toggleWrapper, previewsGrid);
            }

            const checkbox = document.getElementById('gender-checkbox');
            checkbox.addEventListener('change', () => {
                currentGender = checkbox.checked ? 'Féminin' : 'Masculin';
                const labels = toggleWrapper.querySelectorAll('.gender-label-text');
                labels[0].classList.toggle('active-text', currentGender === 'Masculin');
                labels[1].classList.toggle('active-text', currentGender === 'Féminin');
                updateArmorPreviewGlobal();
            });
        }

        // 3. Génération de la galerie
        previewsGrid.innerHTML = ''; 

        BANNIERES_ARMURES[currentSubMaterial].forEach((set, index) => {
            const card = document.createElement('div');
            card.className = 'armor-set-card';
            
            // Détection des deux types de fiches à Tabards (Acier et Fer)
            const estAcierTabard = (set.titre === "Acier & Tabard");
            const estFerTabard = (set.titre === "Fer & Tabard"); 

            if (estAcierTabard || estFerTabard) {
                card.classList.add('tabard-special-card'); // Réutilise les styles CSS d'agencement
                
                card.innerHTML = `
                    <div class="tabard-flex-container">
                        <div class="armor-image-wrapper">
                            <img src="images/${currentGender}/${currentSubMaterial}/${set.fichier}" 
                                alt="${set.titre}" 
                                id="armor-img-${index}"
                                onerror="this.style.display='none'; this.closest('.armor-image-wrapper').classList.add('has-error');">
                            <div class="coming-soon-placeholder">
                                <span>⏳ Prochainement...</span>
                            </div>
                        </div>
                    </div>
                    <div class="armor-set-title">${set.titre}</div>
                `;

                const colorWrapper = document.createElement('div');
                colorWrapper.className = 'tabard-color-selector';
                
                // Définition dynamique du préfixe selon la fiche sélectionnée
                const prefixeFichier = estAcierTabard ? "Acier-Armure Tabard" : "Fer-Armure Tabard";
                
                // Les 9 coloris partagés
                const coloris = [
                    { nom: 'Noir', code: '#1a1a1a', numero: '1' },
                    { nom: 'Gris', code: '#504f4d', numero: '2' },
                    { nom: 'Blanc', code: '#8b8b83', numero: '3' },
                    { nom: 'Violet', code: '#6a3b66', numero: '4' },
                    { nom: 'Rouge', code: '#753635', numero: '5' },
                    { nom: 'Brun', code: '#644335', numero: '6' },
                    { nom: 'Vert clair', code: '#52502e', numero: '7' },
                    { nom: 'Vert foncé', code: '#3e5636', numero: '8' },
                    { nom: 'Bleu', code: '#4b476c', numero: '9' }
                ];
                
                coloris.forEach((couleur, idx) => {
                    const colorBox = document.createElement('div');
                    colorBox.className = 'color-square';
                    colorBox.style.backgroundColor = couleur.code;
                    colorBox.title = couleur.nom;
                    
                    if (idx === 0) colorBox.classList.add('active-color');
                    
                    colorBox.addEventListener('click', () => {
                        const imageElement = card.querySelector(`#armor-img-${index}`);
                        card.querySelector('.armor-image-wrapper').classList.remove('has-error');
                        imageElement.style.display = 'block';
                        
                        // Concatène correctement le préfixe (Acier ou Fer) avec le numéro
                        imageElement.src = `images/${currentGender}/${currentSubMaterial}/${prefixeFichier}${couleur.numero}.jpg`;
                        
                        colorWrapper.querySelectorAll('.color-square').forEach(box => box.classList.remove('active-color'));
                        colorBox.classList.add('active-color');
                    });
                    
                    colorWrapper.appendChild(colorBox);
                });
                
                card.querySelector('.tabard-flex-container').appendChild(colorWrapper);

            } else {
                // Structure standard pour toutes les autres armures du catalogue
                card.innerHTML = `
                    <div class="armor-image-wrapper">
                        <img src="images/${currentGender}/${currentSubMaterial}/${set.fichier}" 
                            alt="${set.titre}" 
                            id="armor-img-${index}"
                            onerror="this.style.display='none'; this.closest('.armor-image-wrapper').classList.add('has-error');">
                        <div class="coming-soon-placeholder">
                            <span>⏳ Prochainement...</span>
                        </div>
                    </div>
                    <div class="armor-set-title">${set.titre}</div>
                `;
            }

            previewsGrid.appendChild(card);
        });

        previewContainer.style.display = 'block';
    } else {
        const existingToggle = document.getElementById('gender-toggle-wrapper');
        if (existingToggle) existingToggle.remove();
        
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
