// =========================================================================
// 1. VARIABLES D'ÉTAT GLOBALES ET INITIALISATION
// =========================================================================

let currentMainCategory = 'Matériaux';
let currentSubMaterial = 'minerais';
let data = []; // Initialisation vide
let baseOrderPrice = 0;

// Ordres de tri thématiques pour le catalogue
const weaponOrder = ['arc', 'flèche', 'dague', 'épée', 'espadon', 'hache', 'hache de guerre', 'masse', 'marteau'];
const armorOrder = ['casque', 'tête', 'armure', 'torse', 'tunique', 'robe', 'tenue', 'gants', 'gantelets', 'bottes'];
const resourceOrder = ["kit d'arme", "kit d'armure", 'petit bois', 'charbon pauvre', 'charbon', 'charbon en briquette', 'coke de charbon', 'cuir', 'bande de cuir', 'peau', 'smilodon', 'ours', 'chitine'];
const oreOrder = ['minerai de fer', 'corindon brut', "minerai d'argent", "minerai d'or", "minerai d'orichalque", 'pierre de lune brute', 'vif argent brut', 'malachite brute', 'ébonite brute'];
const ingotOrder = ['lingot de fer', 'lingot de corindon', "lingot d'acier", "lingot d'argent", "lingot d'or", "lingot d'orichalque", 'lingot de pierre de lune', 'lingot de vif-argent', 'lingot dwemer', "lingot d'ébonite", 'lingot de malachite'];
// Ordre de tri prioritaire unifié pour les sous-catégories (Armes & Armures)
const materialOrder = ['acier', 'fer', 'commun', 'cuir', 'peau', 'fourrure', 'dwemer', 'orichalque', 'bosmer', 'altmer', 'verre', 'ébonite'];


document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation des composants graphiques de base
    initTabs();
    initFilters();
    initCatalogForm();
    initOrderForm();

    // 2. Écouteurs pour les barres de recherche
    document.getElementById('search').addEventListener('input', applyAllFilters);
    document.getElementById('search-editor').addEventListener('input', filterEditorRows);

    // 3. CHARGEMENT DYNAMIQUE DES DONNÉES (Force l'utilisation de catalogue.js)
    // À chaque actualisation, on charge la version fraîche écrite dans catalogue.js
    data = CATALOGUE_INITIAL;
    
    // On met à jour le localStorage pour que l'éditeur visuel soit sur la même longueur d'onde
    localStorage.setItem('forge_raw_catalog', JSON.stringify(data));

    // 4. CONFIGURATION DE L'AFFICHAGE PAR DÉFAUT (Matériaux > Minerais)
    // Désactiver le bouton "Tout afficher"
    const btnToutAfficher = document.querySelector('#main-filter-row .filter-btn[data-cat="tous"]');
    if (btnToutAfficher) btnToutAfficher.classList.remove('active');

    // Activer le bouton "Matériaux"
    const btnMateriaux = document.querySelector('#main-filter-row .filter-btn[data-cat="Matériaux"]');
    if (btnMateriaux) btnMateriaux.classList.add('active');

    // Générer et afficher la ligne des sous-filtres de Matériaux
    renderSubFilters('Matériaux');

    // Activer le sous-bouton "Minerais" et désactiver "Tous"
    const subRow = document.getElementById('sub-filter-row');
    if (subRow) {
        const btnTousSub = subRow.querySelector('.filter-btn[data-sub="tous"]');
        const btnMineraisSub = subRow.querySelector('.filter-btn[data-sub="minerais"]');
        
        if (btnTousSub) btnTousSub.classList.remove('active');
        if (btnMineraisSub) btnMineraisSub.classList.add('active');
    }
    
    // 5. Rendu de l'éditeur, application des filtres et historique des commandes
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
            
            // NOUVEAU : Si on clique sur l'onglet Config, on rafraîchit l'éditeur visuel
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
            
            // CONFIGURATION DYNAMIQUE DU SOUS-FILTRE PAR DÉFAUT
            if (cat === 'Matériaux') {
                currentSubMaterial = 'minerais'; // Deuxième option pour Matériaux
            } else if (cat === 'Arme' || cat === 'Armure') {
                currentSubMaterial = 'acier';    // Deuxième option pour Armes et Armures
            } else if (cat === 'Bijou') {
                currentSubMaterial = 'colliers'; // Deuxième option pour Bijoux
            } else {
                currentSubMaterial = 'tous';     // Cas par défaut ("Tout afficher" ou "Couture")
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
            <button class="filter-btn" data-sub="dwemer">Dwemer</button>
            <button class="filter-btn" data-sub="orichalque">Orsimer</button>
            <button class="filter-btn" data-sub="bosmer">Bosmer</button>
            <button class="filter-btn" data-sub="altmer">Altmer</button>
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
            <button class="filter-btn" data-sub="dwemer">Dwemer</button>
            <button class="filter-btn" data-sub="orichalque">Orsimer</button>
            <button class="filter-btn" data-sub="bosmer">Bosmer</button>
            <button class="filter-btn" data-sub="altmer">Altmer</button>
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
        
        // Si le bouton correspond à la sous-catégorie active configurée, on l'allume
        if (subValue === currentSubMaterial) {
            subBtn.classList.add('active');
        } else {
            subBtn.classList.remove('active');
        }

        // Écouteur de clic classique si l'utilisateur change manuellement
        subBtn.addEventListener('click', () => {
            currentSubMaterial = subValue;
            subFilterButtons.forEach(b => b.classList.remove('active'));
            subBtn.classList.add('active');
            applyAllFilters();
        });
    });
}

// =========================================================================
// 3. LOGIQUE D'ICÔNES, FILTRES DE RECHERCHE ET RENDU DU TABLEAU
// =========================================================================

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
    if (n.includes('charbon')) return '🔥';
    if (['améthyste', 'rubis', 'diamant', 'grenat', 'saphir', 'émeraude'].some(gem => n.includes(gem))) return '✨';
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
            const formatCout = (item.cout % 1 !== 0) ? item.cout.toFixed(1) : item.cout;
            costValue = formatCout + ' sep.';
        }
        const mobilePriceRow = `<div class="inline-prices"><span class="p-view">${item.revente}${suffix}</span> / <span class="c-view">${costValue}</span></div>`;
        const escapedName = item.nom.replace(/'/g, "&#39;");
        const numericPrice = (typeof item.revente === 'number') ? item.revente : 0;
        const currentQty = qtyMap[item.nom] || 0;
        
        let qtyBadgeHtml = '';
        if (currentQty > 0) {
            qtyBadgeHtml = `
            <button type="button" class="cart-minus-btn" data-name="${escapedName}" data-price="${numericPrice}">-</button>
            <input type="number" class="cart-qty-input" data-name="${escapedName}" data-price="${numericPrice}" value="${currentQty}" min="1" style="width: 34px !important; text-align: center; padding: 2px !important; font-size: 11px !important; font-weight: bold; color: var(--accent); background: #332200; border: 1px solid var(--accent); border-radius: 4px; box-sizing: border-box; -moz-appearance: textfield;">
        `;
        }   

        
        // --- CALCUL DES BADGES ET DU NOM D'AFFICHAGE FR ---
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
        
        // 1. La première colonne ne contient désormais QUE les badges (Catégorie + Matière)
        const headerRowHtml = `
            <div class="card-header-row">
                <div class="badges-wrapper">
                    <span class="badge">${item.cat}</span>
                    ${matBadgeHtml}
                </div>
            </div>
        `;

        // 2. On prépare le bloc du panier de manière isolée
        const cartHtml = `
            <div class="cart-actions-wrapper pc-cart-align">
                ${qtyBadgeHtml}
                <button type="button" class="cart-add-btn" data-name="${escapedName}" data-price="${numericPrice}">🛒</button>
            </div>
        `;

        // 3. On génère la cellule de la recette normalement
        let texteRecette = "Ressource brute";
        if (item.ing && item.ing.trim() !== "") {
            texteRecette = item.ing;
        }
        const recipeRowHtml = `<td><span class="ingredients">${texteRecette}</span></td>`;

        // 4. On assemble la ligne complète du tableau
        tr.innerHTML = `
            <td>${headerRowHtml}</td>
            <td><span>${icon} ${nomAffichage}</span>${mobilePriceRow}</td>
            <td><strong>${item.revente}${suffix}</strong></td>
            <td><span class="cost-price">${costValue}</span></td>
            ${recipeRowHtml}
            <td class="cart-column-pc">${cartHtml}</td>
        `;
        
        tbody.appendChild(tr);
    }); // Fin sécurisée de la boucle arr.forEach

    // BRANCHEMENT DES ÉCOUTEURS DE CLICS (Une fois le tableau entièrement construit)
        // Gestion du bouton Plus (Chariot 🛒)
    tbody.querySelectorAll('.cart-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sendToCart(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
        });
    });

    // Gestion du nouveau bouton Moins (-)
    tbody.querySelectorAll('.cart-minus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
        });
    });

    // Gestion de la saisie manuelle directe au clavier !
    tbody.querySelectorAll('.cart-qty-input').forEach(input => {
        // Évite que l'utilisateur tape des lettres ou des nombres négatifs
        input.addEventListener('change', () => {
            const name = input.getAttribute('data-name');
            const price = parseFloat(input.getAttribute('data-price')) || 0;
            let nouvelleQty = parseInt(input.value) || 0;
            
            if (nouvelleQty < 1) nouvelleQty = 1;
            
            // Mise à jour de la zone de texte de la commande en fonction de la nouvelle quantité
            mettreAJourQuantitePanier(name, price, nouvelleQty);
        });
        
        // Empêche le clic sur le champ de texte de propager des bugs graphiques
        input.addEventListener('click', (e) => e.stopPropagation());
    });

}

// =========================================================================
// 4. PANIER, CALCUL DES REMISES ET PERSISTANCE LOCALSTORAGE
// =========================================================================

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
    baseOrderPrice += cleanPrice;
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
        baseOrderPrice = Math.max(0, baseOrderPrice - cleanPrice);
        updateDisplayedPrice();
    }
}

function initOrderForm() {
    const chkCitoyen = document.getElementById('chk-citoyen');
    const chkGarde = document.getElementById('chk-garde');
    const totalPriceInput = document.getElementById('total-price');

    chkCitoyen.addEventListener('change', () => {
        if (chkCitoyen.checked) chkGarde.checked = false;
        updateDisplayedPrice();
    });

    chkGarde.addEventListener('change', () => {
        if (chkGarde.checked) chkCitoyen.checked = false;
        updateDisplayedPrice();
    });

    totalPriceInput.addEventListener('input', () => {
        baseOrderPrice = parseFloat(totalPriceInput.value) || 0;
        chkCitoyen.checked = false;
        chkGarde.checked = false;
        applyAllFilters();
    });

    document.getElementById('order-form').addEventListener('submit', addOrder);
}

function updateDisplayedPrice() {
    const p = document.getElementById('total-price');
    const c = document.getElementById('chk-citoyen');
    const g = document.getElementById('chk-garde');
    let f = baseOrderPrice;

    if (c.checked) { f = Math.round(baseOrderPrice * 0.9); }
    if (g.checked) { f = Math.round(baseOrderPrice * 0.8); }

    p.value = f;
    applyAllFilters();
}

function addOrder(e) {
    e.preventDefault();
    let cl = document.getElementById('client').value.trim();
    if (cl === "") { cl = "Client Inconnu"; }

    const de = document.getElementById('details').value;
    const pr = document.getElementById('total-price').value;
    let o = [];

    try { o = JSON.parse(localStorage.getItem('forge_orders')) || []; } catch(err) {}

    o.push({ client: cl, details: de, price: pr, date: new Date().toLocaleDateString('fr-FR') });
    localStorage.setItem('forge_orders', JSON.stringify(o));

    document.getElementById('order-form').reset();
    baseOrderPrice = 0;
    loadOrders();
}

function loadOrders() {
    const listContainer = document.getElementById('orders-list');
    listContainer.innerHTML = '';
    let o = [];

    try { o = JSON.parse(localStorage.getItem('forge_orders')) || []; } catch(err) {}

    if (!o.length) {
        listContainer.innerHTML = '<p style="padding:10px;text-align:center;color:#888;">Aucune commande.</p>';
        return;
    }

    o.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `<button type="button" class="delete-btn" data-index="${index}">❌</button><strong>Client : ${item.client}</strong> <span style="font-size:11px;color:#888;">(${item.date})</span><br><div style="margin:5px 0;color:#ccc;font-size:13px;white-space:pre-wrap;">${item.details}</div><span style="color:var(--accent);font-weight:bold;">Montant : ${item.price} sep.</span>`;
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
    let o = [];
    try { o = JSON.parse(localStorage.getItem('forge_orders')) || []; } catch(err) {}
    o.splice(idx, 1);
    localStorage.setItem('forge_orders', JSON.stringify(o));
    loadOrders();
}

// =========================================================================
// 4. ÉDITEUR VISUEL DU CATALOGUE ET STOCKAGE LOCALSTORAGE
// =========================================================================

// Cette fonction va remplir le tableau de modification dans l'onglet Config
function renderCatalogEditor() {
    const editorTbody = document.getElementById('editor-table-body');
    if (!editorTbody) return;
    
    editorTbody.innerHTML = '';

    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.className = "editor-row";
        
        const escapedName = item.nom.replace(/"/g, '&quot;');
        const escapedIng = (item.ing || '').replace(/"/g, '&quot;');
        
        const aUneRecette = item.ing && item.ing.trim() !== "";
        if (aUneRecette) {
            item.cout = calculerCoutRecette(item.ing);
        }

        // Configuration dynamique du champ coût selon la présence d'une recette
        const inputStyle = aUneRecette 
            ? 'background-color: #1a1a1a; color: #888; border-color: #222; cursor: not-allowed;' 
            : 'background-color: #121212; color: #fff; border-color: var(--border); cursor: text;';
        const readonlyAttr = aUneRecette ? 'readonly' : '';

        // NOUVEAUTÉ : On sépare TOUT dans de vraies cellules de tableau <td> indépendantes !
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
                <input type="number" step="any" class="edit-cout" data-index="${index}" value="${parseFloat(item.cout || 0).toFixed(1)}" ${readonlyAttr} style="${inputStyle}">
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

    // Gestion du bouton d'exportation pour le fichier catalogue.js
    const exportBtn = document.getElementById('btn-export-code');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const fileHeader = "// =========================================================================\n// CATALOGUE DES ARTICLES - FORGE DE MORTHAL\n// =========================================================================\n\nconst CATALOGUE_INITIAL = ";
            const fileFooter = ";\n";
            const jsonText = JSON.stringify(data, null, 4);
            const completeCode = fileHeader + jsonText + fileFooter;
            
            navigator.clipboard.writeText(completeCode).then(() => {
                alert("📋 Le code de votre catalogue a été copié dans votre presse-papiers !");
            });
        });
    }

    // SAUVEGARDE ET SYNCHRONISATION GITHUB EN LIGNE
    catalogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const rows = document.querySelectorAll('#editor-table-body tr');
        const updatedData = [];

        rows.forEach((row, index) => {
            const nomInput = row.querySelector('.edit-nom');
            const reventeInput = row.querySelector('.edit-revente');
            const coutInput = row.querySelector('.edit-cout');
            const ingInput = row.querySelector('.edit-ing');
            const originalItem = data[index];

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

        // 1. Sauvegarde locale immédiate
        data = updatedData;
        localStorage.setItem('forge_raw_catalog', JSON.stringify(data));
        applyAllFilters();

        // 2. Vérification de la clé GitHub
        const tokenInput = document.getElementById('gh-token');
        const token = tokenInput ? tokenInput.value.trim() : '';

        if (!token) {
            alert("⚔️ Le catalogue a été mis à jour localement sur votre navigateur !\n(Pour le synchroniser sur GitHub, entrez votre clé).");
            return;
        }

        // Configuration de ciblage automatique de votre dépôt
                // Configuration de ciblage automatique de votre dépôt
                const owner = "Haldrius";
        const repo = "Forge-Morthal";
        const path = "catalogue.js";
        const finalFileContent = "// =========================================================================\n// CATALOGUE DES ARTICLES - FORGE DE MORTHAL\n// =========================================================================\n\nconst CATALOGUE_INITIAL = " + JSON.stringify(data, null, 4) + ";\n";

        try {
            // CORRECTION DE L'URL : api.github.com/repos/ au lieu de github.com/repos/
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
            
            // A. Récupération du SHA du fichier actuel sur GitHub
            const getResponse = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Authorization": `token ${token}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            if (!getResponse.ok) {
                throw new Error("Impossible d'accéder au fichier sur GitHub. Vérifiez votre clé.");
            }

            const fileData = await getResponse.json();
            const currentSha = fileData.sha;

            // B. Envoi de la mise à jour (PUT) sur l'API
            const putResponse = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Authorization": `token ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/vnd.github.v3+json"
                },
                body: JSON.stringify({
                    message: "⚔️ Mise à jour du catalogue depuis l'interface d'administration",
                    content: btoa(unescape(encodeURIComponent(finalFileContent))), // Encodage Base64
                    sha: currentSha
                })
            });

            if (putResponse.ok) {
                alert("🚀 Succès ! Mise à jour des données effectuées");
                if (tokenInput) tokenInput.value = ""; // Efface la clé par sécurité
            } else {
                const errorData = await putResponse.json();
                alert(`❌ Erreur API GitHub : ${errorData.message}`);
            }

        } catch (error) {
            console.error(error);
            alert(`💥 Échec de la synchronisation en ligne : ${error.message}`);
        }

    });

}

// Fonction pour filtrer en temps réel UNIQUEMENT sur le nom de l'article
function filterEditorRows() {
    const query = document.getElementById('search-editor').value.toLowerCase().trim();
    const rows = document.querySelectorAll('.editor-row');

    rows.forEach(row => {
        // Ciblage ultra-précis de l'input de nom, peu importe la cellule td
        const nomInput = row.querySelector('input.edit-nom');

        if (nomInput) {
            const nomValue = nomInput.value.toLowerCase();

            // Si la recherche correspond au nom de l'article
            if (nomValue.includes(query)) {
                // On restaure l'affichage par défaut (table-row sur PC / grid sur Mobile)
                row.style.setProperty('display', '', 'important'); 
                row.classList.remove('hidden'); // Sécurité pour le mobile
            } else {
                // On force la disparition absolue de la ligne (écrase le CSS PC et Mobile)
                row.style.setProperty('display', 'none', 'important');
            }
        }
    });
}

// Fonction pour calculer automatiquement le coût d'une recette à partir du catalogue actuel
// Fonction de calcul automatique avec dictionnaire d'exceptions et inclusion partielle
// Fonction de calcul automatique corrigée sans l'erreur sur matchQty
function calculerCoutRecette(ingText) {
    if (!ingText || ingText.trim() === "") return 0;
    
    let totalCout = 0;
    // Séparation des ingrédients par les "+" ou "et"
    const composants = ingText.split(/[++]| et /);
    
    composants.forEach(comp => {
        let cleanComp = comp.trim();
        if (cleanComp === "") return;
        
        let qte = 1;
        let nomComposant = cleanComp;
        
        // Extraction propre de la quantité au début
        const matchQty = cleanComp.match(/^(\d+)\s*(?:x|X|[\s-])*\s*(.+)/);
        
        if (matchQty) {
            qte = parseInt(matchQty[1]) || 1; // matchQty[1] contient le chiffre
            nomComposant = matchQty[2].trim(); // CORRECTION : matchQty[2] contient la chaîne de texte du nom
        }
        
        // --- NORMALISATION INTELLIGENTE AVEC EXCEPTIONS ---
        const normaliserTexte = (texte) => {
            let t = texte.toLowerCase();
            
            // On retire les liaisons courantes
            t = t.replace(/\bd'\b/g, '')
                 .replace(/\bde\b/g, '')
                 .replace(/\bdu\b/g, '');
                 
            const mots = t.split(/\s+/);
            const motsNettoyes = mots.map(mot => {
                // LISTE DES MOTS QUI FINISSENT PAR 'S' MAIS NE SONT PAS DES PLURIELS
                const exceptions = ['rubis', 'bois', 'vif-argent', 'minerai'];
                
                if (exceptions.includes(mot)) {
                    return mot; // On ne touche pas à ces mots !
                }
                
                if (mot.length > 1 && mot.endsWith('s')) {
                    return mot.slice(0, -1); // Enlève le 's' uniquement si c'est un vrai pluriel
                }
                return mot;
            });
            
            return motsNettoyes.join('').trim();
        };

        const nomRechercheNormalise = normaliserTexte(nomComposant);

        // RECHERCHE ULTRA-TOLÉRANTE (Correspondance exacte OU inclusion mutuelle)
        const itemTrouve = data.find(item => {
            const nomCatalogNormalise = normaliserTexte(item.nom);
            
            return nomCatalogNormalise === nomRechercheNormalise || 
                   nomCatalogNormalise.includes(nomRechercheNormalise) || 
                   nomRechercheNormalise.includes(nomCatalogNormalise);
        });
        
        if (itemTrouve) {
            if (itemTrouve.ing && itemTrouve.ing.trim() !== "") {
                totalCout += qte * calculerCoutRecette(itemTrouve.ing);
            } else {
                totalCout += qte * (parseFloat(itemTrouve.cout) || 0);
            }
        } else {
            console.warn(`Artisanat : "${nomComposant}" introuvable dans le catalogue.`);
        }
    });
    
    return totalCout;
}






// Recalcule le coût en direct à l'écran lorsque l'utilisateur modifie le texte de la recette
// Ajuste dynamiquement le verrouillage et le coût en direct pendant que vous tapez
function addLiveCostRecalculation() {
    const rows = document.querySelectorAll('.editor-row');
    rows.forEach(row => {
        const ingInput = row.querySelector('.edit-ing');
        const coutInput = row.querySelector('.edit-cout');
        
        if (ingInput && coutInput) {
            ingInput.addEventListener('input', () => {
                const recetteTexte = ingInput.value.trim();
                
                if (recetteTexte === "") {
                    // Si on vide la recette, le champ redevient modifiable normalement
                    coutInput.readOnly = false;
                    coutInput.style.backgroundColor = "#121212";
                    coutInput.style.color = "#fff";
                    coutInput.style.borderColor = "var(--border)";
                    coutInput.style.cursor = "text";
                } else {
                    // Si on écrit une recette, on verrouille et on applique le calcul auto
                    coutInput.readOnly = true;
                    coutInput.style.backgroundColor = "#1a1a1a";
                    coutInput.style.color = "#888";
                    coutInput.style.borderColor = "#222";
                    coutInput.style.cursor = "not-allowed";
                    
                    const nouveauCout = calculerCoutRecette(recetteTexte);
                    coutInput.value = nouveauCout.toFixed(1);
                }
            });
        }
    });
}
// Fonction pour recalculer le panier quand on change manuellement le chiffre au clavier
function mettreAJourQuantitePanier(name, price, nouvelleQty) {
    const detailsField = document.getElementById('details');
    const text = detailsField.value.trim();
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
    
    detailsField.value = lines.join('\n');
    
    // Ajustement dynamique du prix total
    const differenceQty = nouvelleQty - ancienneQty;
    baseOrderPrice += (differenceQty * price);
    updateDisplayedPrice();
}



