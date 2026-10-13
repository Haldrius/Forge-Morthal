// =========================================================================
// 1. VARIABLES D'ÉTAT GLOBALES ET INITIALISATION
// =========================================================================

let currentMainCategory = 'tous';
let currentSubMaterial = 'tous';
let data = []; // Initialisation vide
let baseOrderPrice = 0;

// Ordres de tri thématiques pour le catalogue
const weaponOrder = ['arc', 'flèche', 'dague', 'épée', 'espadon', 'hache', 'hache de guerre', 'masse', 'marteau'];
const armorOrder = ['casque', 'tête', 'armure', 'torse', 'tunique', 'robe', 'tenue', 'gants', 'gantelets', 'bottes'];

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation et branchement des éléments de l'interface
    initTabs();
    initFilters();
    initCatalogForm();
    initOrderForm();

    // Écouteur pour la barre de recherche
    document.getElementById('search').addEventListener('input', applyAllFilters);

    // Écouteur pour la barre de recherche de l'éditeur
    document.getElementById('search-editor').addEventListener('input', filterEditorRows);


    // CHARGEMENT AUTOMATISÉ : Fichier externe ou stockage local
    const savedCatalog = localStorage.getItem('forge_raw_catalog');
    if (savedCatalog) {
        try {
            data = JSON.parse(savedCatalog);
        } catch (err) {
            console.error("Erreur de lecture du catalogue local, chargement du catalogue par défaut", err);
            data = CATALOGUE_INITIAL;
        }
    } else {
        // Premier démarrage : on utilise le catalogue propre du fichier catalogue.js
        data = CATALOGUE_INITIAL;
    }
    
    // Génère l'éditeur visuel avec les données chargées
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
            currentSubMaterial = 'tous';
            
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
    } else if (cat === 'Arme' || cat === 'Armure') {
        subRow.style.display = 'flex';
        let h = '<button class="filter-btn active" data-sub="tous">Tous</button><button class="filter-btn" data-sub="commun">Commun</button>';
        if (cat === 'Armure') { 
            h += '<button class="filter-btn" data-sub="peau">Peau</button><button class="filter-btn" data-sub="fourrure">Fourrure</button><button class="filter-btn" data-sub="cuir">Cuir</button>'; 
        }
        h += '<button class="filter-btn" data-sub="fer">Fer</button><button class="filter-btn" data-sub="acier">Acier</button><button class="filter-btn" data-sub="orichalque">Orc / Orichalque</button><button class="filter-btn" data-sub="bosmer">Bosmer</button><button class="filter-btn" data-sub="altmer">Altmer</button><button class="filter-btn" data-sub="dwemer">Dwemer</button><button class="filter-btn" data-sub="ébonite">Ébonite</button><button class="filter-btn" data-sub="verre">Verre</button><button class="filter-btn" data-sub="falmer">Falmer</button>';
        subRow.innerHTML = h;
    } else { 
        subRow.style.display = 'none'; 
        subRow.innerHTML = ''; 
        return;
    }

    const subFilterButtons = subRow.querySelectorAll('.filter-btn');
    subFilterButtons.forEach(subBtn => {
        subBtn.addEventListener('click', () => {
            currentSubMaterial = subBtn.getAttribute('data-sub');
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
        if (a.cat === 'Arme' && b.cat === 'Arme') {
            let indexA = weaponOrder.length, indexB = weaponOrder.length;
            for (let i = 0; i < weaponOrder.length; i++) { if (nameA.includes(weaponOrder[i])) { indexA = i; break; } }
            for (let j = 0; j < weaponOrder.length; j++) { if (nameB.includes(weaponOrder[j])) { indexB = j; break; } }
            return indexA - indexB || nameA.localeCompare(nameB);
        }
        if (a.cat === 'Armure' && b.cat === 'Armure') {
            let armIndexA = armorOrder.length, armIndexB = armorOrder.length;
            for (let k = 0; k < armorOrder.length; k++) { if (nameA.includes(armorOrder[k])) { armIndexA = k; break; } }
            for (let l = 0; l < armorOrder.length; l++) { if (nameB.includes(armorOrder[l])) { armIndexB = l; break; } }
            return armIndexA - armIndexB || nameA.localeCompare(nameB);
        }
        return nameA.localeCompare(nameB);
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
        const escapedName = item.nom.replace(/'/g, "\\'");
        const numericPrice = (typeof item.revente === 'number') ? item.revente : 0;
        const currentQty = qtyMap[item.nom] || 0;
        
        let qtyBadgeHtml = '';
        if (currentQty > 0) {
            qtyBadgeHtml = `<span class="cart-qty-badge" data-name="${escapedName}" data-price="${numericPrice}">${currentQty}</span>`;
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
    tbody.querySelectorAll('.cart-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sendToCart(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
        });
    });
    tbody.querySelectorAll('.cart-qty-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            removeFromCart(badge.getAttribute('data-name'), badge.getAttribute('data-price'));
        });
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
                <span class="badge">${item.cat}</span>
                <span class="sub-badge-config">${item.mat}</span>
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
    // Gestion de la sauvegarde du formulaire d'édition visuel
    const catalogForm = document.getElementById('catalog-form');
    if (!catalogForm) return;
        // Gestion du bouton d'exportation pour le fichier catalogue.js
    const exportBtn = document.getElementById('btn-export-code');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // On prépare le texte exact à mettre dans le fichier
            const fileHeader = "// =========================================================================\n// CATALOGUE DES ARTICLES - FORGE DE MORTHAL\n// =========================================================================\n\nconst CATALOGUE_INITIAL = ";
            const fileFooter = ";\n";
            
            // On transforme les données actuelles en texte JSON bien aligné (4 espaces)
            const jsonText = JSON.stringify(data, null, 4);
            const completeCode = fileHeader + jsonText + fileFooter;
            
            // Copie automatique dans le presse-papiers de Windows !
            navigator.clipboard.writeText(completeCode).then(() => {
                alert("📋 Le code de votre catalogue a été copié dans votre presse-papiers !\n\nOuvrez simplement le fichier 'catalogue.js' dans VS Code, faites Ctrl+A puis Ctrl+V pour tout écraser et sauvegardez.");
            }).catch(err => {
                // Secours si le navigateur bloque la copie automatique
                console.log(completeCode);
                alert("Le blocage de sécurité du navigateur a empêché la copie automatique. Le code a été affiché dans la console (F12).");
            });
        });
    }


    catalogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rows = document.querySelectorAll('#editor-table-body tr');
        const updatedData = [];

        rows.forEach((row, index) => {
            const nomInput = row.querySelector('.edit-nom');
            const reventeInput = row.querySelector('.edit-revente');
            const coutInput = row.querySelector('.edit-cout');
            const ingInput = row.querySelector('.edit-ing');

            // On conserve la catégorie et le matériau d'origine de l'objet
            const originalItem = data[index];

            // Traitement du prix de revente (gestion du texte "À définir", "—" ou numérique)
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

        // Mise à jour et sauvegarde permanente
        data = updatedData;
        localStorage.setItem('forge_raw_catalog', JSON.stringify(data));
        
        alert("⚔️ Le catalogue de la forge a été mis à jour avec succès !");
        
        // Rafraîchissement des tarifs publics
        applyAllFilters();
    });
}
// Fonction pour filtrer en temps réel UNIQUEMENT sur le nom de l'article
function filterEditorRows() {
    const query = document.getElementById('search-editor').value.toLowerCase();
    const rows = document.querySelectorAll('.editor-row');

    rows.forEach(row => {
        // On récupère uniquement la valeur textuelle du champ "Nom"
        const nomValue = row.querySelector('.edit-nom').value.toLowerCase();

        // Si la recherche correspond au nom de l'article
        if (nomValue.includes(query)) {
            row.classList.remove('hidden'); // On affiche la carte
        } else {
            row.classList.add('hidden');    // On cache la carte
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
                const exceptions = ['rubis', 'bois', 'vif-argent'];
                
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



