// =========================================================================
// 1. VARIABLES D'ÉTAT GLOBALES ET INITIALISATION
// =========================================================================

let currentMainCategory = 'Matériaux';
let currentSubMaterial = 'minerais';
let data = []; // Initialisation vide
let baseOrderPrice = 0;
let baseOrderCost = 0; // Stocke le coût total de fabrication accumulé

// Ordres de tri thématiques pour le catalogue
const weaponOrder = ['arc', 'flèche', 'dague', 'épée', 'espadon', 'hache', 'hache de guerre', 'masse', 'marteau'];
const armorOrder = ['casque', 'tête', 'armure', 'torse', 'tunique', 'robe', 'tenue', 'gants', 'gantelets', 'bottes'];
const resourceOrder = ["kit d'arme", "kit d'armure", 'petit bois', 'charbon pauvre', 'charbon', 'charbon en briquette', 'coke de charbon', 'cuir', 'bande de cuir', 'peau', 'smilodon', 'ours', 'chitine'];
const oreOrder = ['minerai de fer', 'corindon brut', "minerai d'argent", "minerai d'or", "minerai d'orichalque", 'pierre de lune brute', 'vif argent brut', 'malachite brute', 'ébonite brute'];
const ingotOrder = ['lingot de fer', 'lingot de corindon', "lingot d'acier", "lingot d'argent", "lingot d'or", "lingot d'orichalque", 'lingot de pierre de lune', 'lingot de vif-argent', 'lingot dwemer', "lingot d'ébonite", 'lingot de malachite'];
// Ordre de tri spécifique pour la famille d'équipements Bosmer
// Définition stricte et ordonnée (1=Premier affiché, 5=Dernier affiché tout en bas)
const bosmerPriorities = {
    'bosmer de la chasse sauvage': 3,
    'bosmer en plate': 2,
    'capuche bosmer': 1,
    'masque bosmer': 4,
    'cape bosmer': 5,
    'bosmer': 1 // Placé en dernier pour ne pas intercepter les chaînes plus précises au-dessus
};
// Ordre de tri prioritaire unifié pour les sous-catégories (Armes & Armures)
const materialOrder = ['acier', 'fer', 'commun', 'cuir', 'maille', 'peau', 'fourrure', 'orichalque', 'altmer', 'bosmer', 'verre', 'ébonite'];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialisation des composants graphiques de base
    initTabs();
    initFilters();
    initCatalogForm();
    initOrderForm();

    // 2. Écouteurs pour les barres de recherche
    document.getElementById('search').addEventListener('input', applyAllFilters);
    document.getElementById('search-editor').addEventListener('input', filterEditorRows);

    // 3. CHARGEMENT DYNAMIQUE DES DONNÉES EN LIGNE
    const owner = "Haldrius";
    const repo = "Forge-Morthal";
    const path = "catalogue.json";
    
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: { "Accept": "application/vnd.github.v3.raw" }
        });
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error("Erreur de réponse API");
        }
    } catch (e) {
        console.warn("Échec GitHub, chargement de secours via le stockage local...", e);
        data = JSON.parse(localStorage.getItem('forge_raw_catalog')) || [];
    }
    
    localStorage.setItem('forge_raw_catalog', JSON.stringify(data));
    // 4. CONFIGURATION DE L'AFFICHAGE PAR DÉFAUT (Matériaux > Minerais)
    const btnToutAfficher = document.querySelector('#main-filter-row .filter-btn[data-cat="tous"]');
    if (btnToutAfficher) btnToutAfficher.classList.remove('active');

    const btnMateriaux = document.querySelector('#main-filter-row .filter-btn[data-cat="Matériaux"]');
    if (btnMateriaux) btnMateriaux.classList.add('active');

    renderSubFilters('Matériaux');

    const subRow = document.getElementById('sub-filter-row');
    if (subRow) {
        const btnTousSub = subRow.querySelector('.filter-btn[data-sub="tous"]');
        const btnMineraisSub = subRow.querySelector('.filter-btn[data-sub="minerais"]');
        
        if (btnTousSub) btnTousSub.classList.remove('active');
        if (btnMineraisSub) btnMineraisSub.classList.add('active');
    }
    
    renderCatalogEditor();
    applyAllFilters();
    loadOrders();
});

// =========================================================================
// 2. GESTION DES ONGLETS ET DES FILTRES DYNAMIQUES
// =========================================================================

function initTabs() {
    const tabsConfig = [
        { btnId: 'btn-tarifs', contentId: 'tarifs' },
        { btnId: 'btn-commandes', contentId: 'commandes' },
        { btnId: 'btn-admin', contentId: 'admin' }
    ];

    tabsConfig.forEach(tab => {
        document.getElementById(tab.btnId).addEventListener('click', () => {
            tabsConfig.forEach(t => {
                document.getElementById(t.contentId).style.display = 'none';
                document.getElementById(t.btnId).classList.remove('active');
            });
            document.getElementById(tab.contentId).style.display = 'block';
            document.getElementById(tab.btnId).classList.add('active');
            
            if (tab.contentId === 'admin') {
                renderCatalogEditor();
            }
        });
    });
}
function initFilters() {
    const mainFilterButtons = document.querySelectorAll('#main-filter-row .filter-btn');
    mainFilterButtons.forEach(btn => {
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
            
            mainFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderSubFilters(cat);
            applyAllFilters();
        });
    });
}

function renderSubFilters(cat) {
    const subRow = document.getElementById('sub-filter-row');
    if (!subRow) return;
    
    if (cat === 'Matériaux') {
        subRow.style.display = 'flex';
        subRow.innerHTML = `
            <button class="filter-btn active" data-sub="tous">Tous</button>
            <button class="filter-btn" data-sub="minerais">💎 Minerais</button>
            <button class="filter-btn" data-sub="lingot">🧱 Lingots</button>
            <button class="filter-btn" data-sub="ressources">📜 Ressources</button>
            <button class="filter-btn" data-sub="outils">🛠️ Outils</button>
        `;
    } else if (cat === 'Bijou') {
        subRow.style.display = 'flex';
        subRow.innerHTML = `
            <button class="filter-btn active" data-sub="tous">Tous</button>
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
            <button class="filter-btn" data-sub="maille">Maille</button>
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

    const subFilterButtons = subRow.querySelectorAll('.filter-btn');
    subFilterButtons.forEach(subBtn => {
        const subValue = subBtn.getAttribute('data-sub');
        
        if (subValue === currentSubMaterial) {
            subBtn.classList.add('active');
        } else {
            subBtn.classList.remove('active');
        }

        subBtn.addEventListener('click', () => {
            currentSubMaterial = subValue;
            subFilterButtons.forEach(b => b.classList.remove('active'));
            subBtn.classList.add('active');
            applyAllFilters();
        });
    });
}

function getPreciseIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('dague')) return '🗡️';
    if (n.includes('espadon') || n.includes('épée') || n.includes('sword')) return '⚔️';
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

            // Si c'est le même groupe, on trie par type de pièce d'armure
            let checkNameA = nameA.includes('capuche bosmer') ? 'casque' : nameA;
            let checkNameB = nameB.includes('capuche bosmer') ? 'casque' : nameB;

            let indexPieceA = armorOrder.length, indexPieceB = armorOrder.length;
            for (let k = 0; k < armorOrder.length; k++) { if (checkNameA.includes(armorOrder[k])) { indexPieceA = k; break; } }
            for (let l = 0; l < armorOrder.length; l++) { if (checkNameB.includes(armorOrder[l])) { indexPieceB = l; break; } }
            
            return indexPieceA - indexPieceB || nameA.localeCompare(nameB);
        }

        // Si l'un des deux seulement est un équipement Bosmer, on force son placement
        if (isBosmerA !== isBosmerB) {
            // Si on compare un objet Bosmer avec un autre matériau (ex: Fer, Acier)
            // On conserve la logique de placement global par rapport au reste du catalogue
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
                let indexTypeA = armorOrder.length, indexTypeB = armorOrder.length;
                for (let k = 0; k < armorOrder.length; k++) { if (nameA.includes(armorOrder[k])) { indexTypeA = k; break; } }
                for (let l = 0; l < armorOrder.length; l++) { if (nameB.includes(armorOrder[l])) { indexTypeB = l; break; } }
                return indexTypeA - indexTypeB || nameA.localeCompare(nameB);
            }
        }

        if (a.cat === 'Matériaux' && b.cat === 'Matériaux') {
            if (a.mat === 'minerais' && b.mat === 'minerais') {
                let indexA = oreOrder.indexOf(nameA); let indexB = oreOrder.indexOf(nameB);
                return indexA - indexB;
            }
            if (a.mat === 'lingot' && b.mat === 'lingot') {
                let indexA = ingotOrder.indexOf(nameA); let indexB = ingotOrder.indexOf(nameB);
                return indexA - indexB;
            }
            let resIndexA = resourceOrder.length, resIndexB = resourceOrder.length;
            for (let m = 0; m < resourceOrder.length; m++) { if (nameA.includes(resourceOrder[m])) { resIndexA = m; break; } }
            for (let n = 0; n < resourceOrder.length; n++) { if (nameB.includes(resourceOrder[n])) { resIndexB = n; break; } }
            return resIndexA - resIndexB || nameA.localeCompare(nameB);
        }

        return a.cat.localeCompare(b.cat) || nameA.localeCompare(nameB);
    });


    displayItems(filtered);
}

function displayItems(arr) {
    const tbody = document.getElementById('table-body'); 
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (!arr.length) { 
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#888;padding:15px;">Aucun article trouvé.</td></tr>'; 
        return; 
    }
    
    const detailsText = document.getElementById('details').value;
    const qtyMap = {};
    if (detailsText) {
        const lines = detailsText.split('\n');
        lines.forEach(line => {
            const cleanLine = line.trim(); 
            if (cleanLine.includes('x ')) {
                const parts = cleanLine.split('x '); 
                const qty = parseInt(parts[0]) || 0; 
                const name = parts.slice(1).join('x '); 
                if (name) { qtyMap[name] = (qtyMap[name] || 0) + qty; }
            }
        });
    }
    arr.forEach(item => {
        const tr = document.createElement('tr');
        const icon = getPreciseIcon(item.nom);
        const suffix = (typeof item.revente === 'number') ? ' sep.' : '';
        let costValue = '0 sep.';
        if (item.cout) {
            const cleanCost = Number(parseFloat(item.cout).toFixed(2)); 
            costValue = cleanCost + ' sep.';
        }
        const mobilePriceRow = `<div class="inline-prices"><span class="p-view">${item.revente}${suffix}</span> / <span class="c-view">${costValue}</span></div>`;
        const escapedName = item.nom.replace(/'/g, "&#39;");
        const numericPrice = (typeof item.revente === 'number') ? item.revente : 0;
        const currentQty = qtyMap[item.nom] || 0;
        
        let qtyBadgeHtml = '';
        if (currentQty > 0) {
            qtyBadgeHtml = `
            <button type="button" class="cart-minus-btn" data-name="${escapedName}" data-price="${numericPrice}">-</button>
            <input type="number" class="cart-qty-input" data-name="${escapedName}" data-price="${numericPrice}" value="${currentQty}" min="1" minlength="1" autocomplete="off">
        `;
        }   

        let matBadgeHtml = '';
        let nomAffichage = item.nom;

        if (item.cat === "Armure" && item.nom.includes(" - ")) {
            const parts = item.nom.split(" - ");
            const materiauOrigine = parts[0].trim();
            const pieceType = parts[1].trim();

            const texteBadgeMat = (materiauOrigine.toLowerCase() === "cuir bouilli") ? "Cuir" : materiauOrigine;
            matBadgeHtml = `<span class="badge mat-badge">${texteBadgeMat}</span>`;

            let liaison = "en";
            let nomPieceNettoye = pieceType;

            if (nomPieceNettoye.toLowerCase() === "tête") nomPieceNettoye = "Casque";
            if (nomPieceNettoye.toLowerCase() === "gants") nomPieceNettoye = "Gantelets";

            if (materiauOrigine.toLowerCase() === "acier" || materiauOrigine.toLowerCase() === "ébonite") {
                liaison = "d'";
            } else if (materiauOrigine.toLowerCase() === "cuir bouilli") {
                liaison = "en cuir bouilli";
            }

            if (materiauOrigine.toLowerCase() === "cuir bouilli") {
                nomAffichage = `${nomPieceNettoye} ${liaison}`;
            } else {
                nomAffichage = `${nomPieceNettoye} ${liaison} ${materiauOrigine.toLowerCase()}`;
            }
            nomAffichage = nomAffichage.charAt(0).toUpperCase() + nomAffichage.slice(1);
        }
        
        const headerRowHtml = `
            <div class="card-header-row">
                <div class="badges-wrapper">
                    <span class="badge">${item.cat}</span>
                    ${matBadgeHtml}
                </div>
            </div>
        `;

        const cartHtml = `
            <div class="cart-actions-wrapper pc-cart-align">
                ${qtyBadgeHtml}
                <button type="button" class="cart-add-btn" data-name="${escapedName}" data-price="${numericPrice}">🛒</button>
            </div>
        `;

        let texteRecette = "Ressource brute";
        if (item.ing && item.ing.trim() !== "") {
            texteRecette = item.ing;
        }
        const recipeRowHtml = `<td><span class="ingredients">${texteRecette}</span></td>`;

        tr.innerHTML = `
            <td>${headerRowHtml}</td>
            <td><span>${icon} ${nomAffichage}</span>${mobilePriceRow}</td>
            <td><strong>${item.revente}${suffix}</strong></td>
            <td><span class="cost-price">${costValue}</span></td>
            ${recipeRowHtml}
            <td class="cart-column-pc">${cartHtml}</td>
        `;
        
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.cart-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sendToCart(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
        });
    });

    tbody.querySelectorAll('.cart-minus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
        });
    });

    tbody.querySelectorAll('.cart-qty-input').forEach(input => {
        input.addEventListener('change', () => {
            const name = input.getAttribute('data-name');
            const price = parseFloat(input.getAttribute('data-price')) || 0;
            let nouvelleQty = parseInt(input.value) || 0;
            
            if (nouvelleQty < 1) nouvelleQty = 1;
            mettreAJourQuantitePanier(name, price, nouvelleQty);
        });
        input.addEventListener('click', (e) => e.stopPropagation());
    });
}

function sendToCart(name, price) {
    const cleanPrice = parseFloat(price) || 0;
    const detailsField = document.getElementById('details');
    const text = detailsField.value.trim();

    if (text === "") {
        detailsField.value = "1x " + name;
    } else {
        const lines = text.split('\n');
        let found = false;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().includes("x " + name)) {
                const parts = lines[i].split('x ');
                const currentQty = parseInt(parts[0]) || 0;
                lines[i] = (currentQty + 1) + "x " + name;
                found = true;
                break;
            }
        }
        if (!found) { detailsField.value += "\n1x " + name; }
        else { detailsField.value = lines.join('\n'); }
    }
    
    const itemInCatalog = data.find(item => item.nom === name);
    const cleanCost = itemInCatalog ? (parseFloat(itemInCatalog.cout) || 0) : 0;

    baseOrderPrice += cleanPrice;
    baseOrderCost += cleanCost;
    updateDisplayedPrice();
}

function removeFromCart(name, price) {
    const cleanPrice = parseFloat(price) || 0;
    const detailsField = document.getElementById('details');
    const text = detailsField.value.trim();
    if (text === "") return;

    const lines = text.split('\n');
    let found = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().includes("x " + name)) {
            const parts = lines[i].split('x ');
            const currentQty = parseInt(parts[0]) || 0;
            if (currentQty > 1) {
                lines[i] = (currentQty - 1) + "x " + name;
            } else {
                lines.splice(i, 1);
            }
            found = true;
            break;
        }
    }
    if (found) {
        detailsField.value = lines.join('\n');
        
        const itemInCatalog = data.find(item => item.nom === name);
        const cleanCost = itemInCatalog ? (parseFloat(itemInCatalog.cout) || 0) : 0;

        baseOrderPrice = Math.max(0, baseOrderPrice - cleanPrice);
        baseOrderCost = Math.max(0, baseOrderCost - cleanCost);
        updateDisplayedPrice();
    }
}
// =========================================================================
// 4. PERSISTANCE DES COMMANDES ET GESTION DES REMISES
// =========================================================================

function initOrderForm() {
    const chkCitoyen = document.getElementById('chk-citoyen');
    const chkGarde = document.getElementById('chk-garde');
    const totalPriceInput = document.getElementById('total-price');

    if (chkCitoyen) {
        chkCitoyen.addEventListener('change', () => {
            if (chkCitoyen.checked && chkGarde) chkGarde.checked = false;
            updateDisplayedPrice();
        });
    }

    if (chkGarde) {
        chkGarde.addEventListener('change', () => {
            if (chkGarde.checked && chkCitoyen) chkCitoyen.checked = false;
            updateDisplayedPrice();
        });
    }

    if (totalPriceInput) {
        totalPriceInput.addEventListener('input', () => {
            baseOrderPrice = parseFloat(totalPriceInput.value) || 0;
            baseOrderCost = 0; // Sécurité de remise à zéro sur modification manuelle
            if (chkCitoyen) chkCitoyen.checked = false;
            if (chkGarde) chkGarde.checked = false;
            applyAllFilters();
        });
    }

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', addOrder);
    }
}

function updateDisplayedPrice() {
    const p = document.getElementById('total-price');
    const cNode = document.getElementById('total-cost');
    const chkCitoyen = document.getElementById('chk-citoyen');
    const chkGarde = document.getElementById('chk-garde');
    let finalPrice = baseOrderPrice;

    if (chkCitoyen && chkCitoyen.checked) { 
        finalPrice = Math.round(baseOrderPrice * 0.9); 
    }
    if (chkGarde && chkGarde.checked) { 
        finalPrice = Math.round(baseOrderPrice * 0.8); 
    }

    if (p) {
        p.value = parseFloat(finalPrice || 0);
    }
    if (cNode) {
        cNode.value = Number(baseOrderCost.toFixed(2));
    }
    applyAllFilters();
}

function addOrder(e) {
    e.preventDefault();
    const clientInput = document.getElementById('client');
    let clientName = clientInput ? clientInput.value.trim() : "";
    if (clientName === "") { clientName = "Client Inconnu"; }

    const detailsField = document.getElementById('details');
    const totalPriceInput = document.getElementById('total-price');
    const detailsVal = detailsField ? detailsField.value : "";
    const priceVal = totalPriceInput ? totalPriceInput.value : "0";
    
    let ordersList = [];
    try { 
        ordersList = JSON.parse(localStorage.getItem('forge_orders')) || []; 
    } catch(err) {}

    ordersList.push({ 
        client: clientName, 
        details: detailsVal, 
        price: priceVal, 
        date: new Date().toLocaleDateString('fr-FR') 
    });
    localStorage.setItem('forge_orders', JSON.stringify(ordersList));

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.reset();
    }
    
    // ─── CORRECTIF ICI : Vider manuellement le champ invisible des détails du panier ───
    if (detailsField) detailsField.value = "";
    // ─────────────────────────────────────────────────────────────────────────────────

    baseOrderPrice = 0;
    baseOrderCost = 0;
    
    // ─── CORRECTIF ICI : Forcer le rafraîchissement visuel de la vitrine des tarifs ───
    applyAllFilters();
    // ─────────────────────────────────────────────────────────────────────────────────
    
    loadOrders();
}

function loadOrders() {
    const listContainer = document.getElementById('orders-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    let ordersList = [];

    try { 
        ordersList = JSON.parse(localStorage.getItem('forge_orders')) || []; 
    } catch(err) {}

    if (!ordersList.length) {
        listContainer.innerHTML = '<p style="padding:10px;text-align:center;color:#888;">Aucune commande.</p>';
        return;
    }

    ordersList.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <button type="button" class="delete-btn" data-index="${index}">❌</button>
            <strong>Client : ${item.client}</strong> 
            <span style="font-size:11px;color:#888;">(${item.date})</span><br>
            <div style="margin:5px 0;color:#ccc;font-size:13px;white-space:pre-wrap;">${item.details}</div>
            <span style="color:var(--accent);font-weight:bold;">Montant : ${item.price} sep.</span>
        `;
        listContainer.appendChild(div);
    });

    listContainer.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            deleteOrder(idx);
        });
    });
}

function deleteOrder(idx) {
    let ordersList = [];
    try { 
        ordersList = JSON.parse(localStorage.getItem('forge_orders')) || []; 
    } catch(err) {}
    
    ordersList.splice(idx, 1);
    localStorage.setItem('forge_orders', JSON.stringify(ordersList));
    loadOrders();
}
// =========================================================================
// 5. ÉDITEUR VISUEL DU CATALOGUE ET STOCKAGE LOCALSTORAGE
// =========================================================================
const savedToken = localStorage.getItem('forge_gh_token') || '';
const tokenInput = document.getElementById('gh-token');
if (tokenInput && savedToken) { tokenInput.value = savedToken; }

function renderCatalogEditor() {
    const editorTbody = document.getElementById('editor-table-body');
    if (!editorTbody) return;
    
    editorTbody.innerHTML = '';

    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.className = "editor-row";
        tr.setAttribute('data-original-name', item.nom);
        
        const escapedName = item.nom.replace(/"/g, '&quot;');
        const escapedIng = (item.ing || '').replace(/"/g, '&quot;');
        
        if (item.ing && item.ing.trim() !== "") {
            item.cout = calculerCoutRecette(item.ing);
        }

        // --- CORRECTIF ICI : Force l'affichage initial propre à 2 décimales max ---
        const coutNettoye = item.cout ? Number(parseFloat(item.cout).toFixed(2)) : 0;

        const aUneRecette = item.ing && item.ing.trim() !== "";
        const inputClass = aUneRecette ? 'edit-cout disabled-cost-input' : 'edit-cout';
        const readonlyAttr = aUneRecette ? 'readonly' : '';

        tr.innerHTML = `
            <td class="cell-meta">
                <div class="cell-meta-wrapper">
                    <span class="badge">${item.cat}</span>
                    <span class="sub-badge-config">${item.mat}</span>
                </div>
            </td>
            <td class="cell-nom">
                <label class="mobile-label">Nom :</label>
                <input type="text" class="edit-nom" data-index="${index}" value="${escapedName}">
            </td>
            <td class="cell-revente">
                <label class="mobile-label">Revente (sep.) :</label>
                <input type="text" class="edit-revente" data-index="${index}" value="${item.revente}">
            </td>
            <td class="cell-cout">
                <label class="mobile-label">Coût (sep.) :</label>
                <input type="number" step="0.01" class="${inputClass}" data-index="${index}" value="${coutNettoye}" ${readonlyAttr}>
            </td>

            <td class="cell-ing">
                <label class="mobile-label">Recette / Ingrédients :</label>
                <input type="text" class="edit-ing" data-index="${index}" value="${escapedIng}" placeholder="Ex: 1 Lingot de Fer...">
            </td>
        `;
        editorTbody.appendChild(tr);
    });

    addLiveCostRecalculation();
}

function initCatalogForm() {
    const catalogForm = document.getElementById('catalog-form');
    if (!catalogForm) return;

    const exportBtn = document.getElementById('btn-export-code');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const fileHeader = "// =========================================================================\n// CATALOGUE DES ARTICLES - FORGE DE MORTHAL\n// =========================================================================\n\nconst CATALOGUE_INITIAL = ";
            const completeCode = fileHeader + JSON.stringify(data, null, 4) + ";\n";
            navigator.clipboard.writeText(completeCode).then(() => {
                alert("📋 Le code de votre catalogue a été copié !");
            });
        });
    }

    catalogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rows = document.querySelectorAll('#editor-table-body tr');
    const updatedData = [];

    rows.forEach((row) => {
        const nomInput = row.querySelector('.edit-nom');
        const reventeInput = row.querySelector('.edit-revente');
        const coutInput = row.querySelector('.edit-cout');
        const ingInput = row.querySelector('.edit-ing');
        
        // On récupère le nom d'origine stocké sur la ligne pour retrouver le bon item dans data
        const originalName = row.getAttribute('data-original-name');
        const originalItem = data.find(item => item.nom === originalName);

        if (!originalItem) return; // Sécurité si l'item n'est pas trouvé

        let reventeValue = reventeInput.value.trim();
        if (reventeValue.toLowerCase() !== 'à définir' && reventeValue !== '—' && reventeValue !== '') {
            const parsed = parseFloat(reventeValue);
            if (!isNaN(parsed)) reventeValue = parsed;
        }

        updatedData.push({
            cat: originalItem.cat,
            mat: originalItem.mat,
            nom: nomInput.value.trim(),
            revente: reventeValue,
            cout: parseFloat(coutInput.value) || 0,
            ing: ingInput.value.trim()
        });
    });

    data = updatedData;
    localStorage.setItem('forge_raw_catalog', JSON.stringify(data));
    applyAllFilters();

    // ... (Laissez le reste du code GitHub inchangé en dessous)


        const ghTokenInput = document.getElementById('gh-token');
        const token = ghTokenInput ? ghTokenInput.value.trim() : '';

        if (!token) {
            alert("⚔️ Catalogue mis à jour localement sur le navigateur ! Saisissez votre clé GitHub pour synchroniser en ligne.");
            return;
        }

        const owner = "Haldrius";
        const repo = "Forge-Morthal";
        const path = "catalogue.json";
        const finalFileContent = JSON.stringify(data, null, 4);

        try {
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?t=${Date.now()}`;
            
            // ÉTAPE 1 : Récupérer les métadonnées (Pour obtenir le SHA correct)
            const getResponse = await fetch(apiUrl, {
                method: "GET",
                headers: { 
                    "Authorization": `token ${token}`, 
                    "Accept": "application/vnd.github.v3+json" 
                }
            });

            if (!getResponse.ok) throw new Error("Impossible d'accéder au fichier sur GitHub. Vérifiez votre clé.");
            const fileData = await getResponse.json();

            if (!fileData.sha) {
                throw new Error("Impossible de récupérer l'identifiant SHA du fichier GitHub.");
            }

            // ÉTAPE 2 : Mettre à jour avec l'encodage moderne et le SHA valide
            const putResponse = await fetch(apiUrl, {
                method: "PUT",
                headers: { 
                    "Authorization": `token ${token}`, 
                    "Content-Type": "application/json", 
                    "Accept": "application/vnd.github.v3+json" 
                },
                body: JSON.stringify({
                    message: "⚔️ Mise à jour du catalogue depuis l'interface d'administration",
                    content: btoa(String.fromCharCode(...new TextEncoder().encode(finalFileContent))),
                    sha: fileData.sha
                })
            });

            if (putResponse.ok) {
                alert("🚀 Succès ! Le catalogue en ligne (catalogue.json) a été mis à jour.");
                if (ghTokenInput) ghTokenInput.value = ""; 
            } else {
                const errorData = await putResponse.json();
                console.error("Détails de l'erreur GitHub :", errorData);
                alert(`❌ Échec de la mise à jour GitHub : ${errorData.message}`);
            }
        } catch (error) {
            alert(`💥 Erreur : ${error.message}`);
        }
    });
}


function filterEditorRows() {
    const query = document.getElementById('search-editor').value.toLowerCase().trim();
    const rows = document.querySelectorAll('.editor-row');

    rows.forEach(row => {
        const nomInput = row.querySelector('input.edit-nom');
        if (nomInput) {
            if (nomInput.value.toLowerCase().includes(query)) {
                row.style.setProperty('display', '', 'important');
                row.classList.remove('hidden');
            } else {
                row.style.setProperty('display', 'none', 'important');
            }
        }
    });
}

function calculerCoutRecette(ingText) {
    if (!ingText || ingText.trim() === "") return 0;
    let totalCout = 0;
    const composants = ingText.split(/[++]| et /);
    
    console.group(`%c🛠️ ANALYSE RECETTE : "${ingText}"`, "color: #1abc9c; font-weight: bold;");

    composants.forEach(comp => {
        let cleanComp = comp.trim();
        if (cleanComp === "") return;
        
        let qte = 1;
        let nomComposant = cleanComp;
        
        // NOUVELLE REGEX : Capture les entiers OU les décimaux (ex: 1, 14, 0.25, 0,25)
        const matchQty = cleanComp.match(/^(\d+(?:[.,]\d+)?)\s*(?:x|X|[\s-])*\s*(.+)/);
        
        if (matchQty) {
            // On remplace la virgule éventuelle par un point pour que JavaScript comprenne le décimal
            qte = parseFloat(matchQty[1].replace(',', '.')) || 1;
            nomComposant = matchQty[2].trim();
        } 
        
        const normaliserTexte = (texte) => {
            if (!texte) return "";
            let t = texte.toLowerCase().replace(/\bd'\b/g, '').replace(/\bde\b/g, '').replace(/\bdu\b/g, '');
            return t.split(/\s+/).map(mot => {
                const ex = ['rubis', 'bois', 'vif-argent', 'minerai'];
                if (ex.includes(mot)) return mot;
                return (mot.length > 1 && mot.endsWith('s')) ? mot.slice(0, -1) : mot;
            }).join('').trim().toLowerCase();
        };

        const nomRechercheNormalise = normaliserTexte(nomComposant);
        
        // Recherche de l'ingrédient dans la base de données globale
        let itemTrouve = data.find(item => normaliserTexte(item.nom) === nomRechercheNormalise);
        if (!itemTrouve) itemTrouve = data.find(item => normaliserTexte(item.nom).includes(nomRechercheNormalise));
        if (!itemTrouve) itemTrouve = data.find(item => nomRechercheNormalise.includes(normaliserTexte(item.nom)));
        
        if (itemTrouve) {
            // Si l'ingrédient trouvé a lui-même une sous-recette, on la calcule récursivement, sinon on prend son coût fixe
            let coutUnitaire = (itemTrouve.ing && itemTrouve.ing.trim() !== "") ? calculerCoutRecette(itemTrouve.ing) : (parseFloat(itemTrouve.cout) || 0);
            let sousTotal = qte * coutUnitaire;
            totalCout += sousTotal;
            
        }
    });

    return totalCout;
}


function addLiveCostRecalculation() {
    const rows = document.querySelectorAll('.editor-row');
    rows.forEach(row => {
        const ingInput = row.querySelector('.edit-ing');
        const coutInput = row.querySelector('.edit-cout');
        if (ingInput && coutInput) {
            ingInput.addEventListener('input', () => {
                const txt = ingInput.value.trim();
                if (txt === "") {
                    coutInput.readOnly = false;
                    coutInput.classList.remove('disabled-cost-input');
                } else {
                    coutInput.readOnly = true;
                    coutInput.classList.add('disabled-cost-input');
                    
                    // On calcule le coût en direct
                    const coutBrut = calculerCoutRecette(txt);
                    // On force l'arrondi propre à 2 décimales max en retirant les zéros superflus
                    coutInput.value = Number(parseFloat(coutBrut).toFixed(2)); 
                }
            });
        }
    });
}

function mettreAJourQuantitePanier(name, price, nouvelleQty) {
    const detailsField = document.getElementById('details');
    const text = detailsField ? detailsField.value.trim() : "";
    if (text === "") return;
    const lines = text.split('\n');
    let ancienneQty = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().includes("x " + name)) {
            const parts = lines[i].split('x ');
            ancienneQty = parseInt(parts[0]) || 0;
            lines[i] = nouvelleQty + "x " + name;
            break;
         }
    }
    if (detailsField) detailsField.value = lines.join('\n');
    const differenceQty = nouvelleQty - ancienneQty;
    baseOrderPrice += parseFloat((differenceQty * price) || 0);
    const itemInCatalog = data.find(item => item.nom === name);
    const cleanCost = itemInCatalog ? (parseFloat(itemInCatalog.cout) || 0) : 0;
    baseOrderCost += parseFloat((differenceQty * cleanCost) || 0);
    updateDisplayedPrice();
}