// =========================================================================
// CATALOGUE DES ARTICLES - FORGE DE MORTHAL
// =========================================================================

const CATALOGUE_INITIAL = [
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Minerai de fer",
        "revente": 0.6,
        "cout": 0.3,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Corindon brut",
        "revente": 0.6,
        "cout": 0.3,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Minerai d'argent",
        "revente": 1.5,
        "cout": 0.8,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Minerai d'or",
        "revente": 1.5,
        "cout": 0.8,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Minerai d'orichalque",
        "revente": 10,
        "cout": 3,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Pierre de lune brute",
        "revente": 35,
        "cout": 13,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Vif argent brut",
        "revente": 40,
        "cout": 18,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Ébonite brute",
        "revente": 20000,
        "cout": 20000,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "minerais",
        "nom": "Malachite brute",
        "revente": 1500,
        "cout": 400,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot de Fer",
        "revente": 10,
        "cout": 4.8,
        "ing": "6 Minerai de fer + 6 Charbon Pauvre"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot d'Acier",
        "revente": 15,
        "cout": 4.8,
        "ing": "3 Corindon brut + 3 Minerai de fer + 6 Charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot de Corindon",
        "revente": 12,
        "cout": 4.8,
        "ing": "6 Corindon brut + 6 Charbon Pauvre"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot d'Argent",
        "revente": 17,
        "cout": 7.8,
        "ing": "6 Minerai d'argent + 6 Charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot d'Or",
        "revente": 17,
        "cout": 7.8,
        "ing": "6 Minerai d'or + 6 Charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot d'Orichalque",
        "revente": 75,
        "cout": 10.8,
        "ing": "6 Minerai d'orichalque + 6 Briquettes de charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot de Pierre de lune",
        "revente": 135,
        "cout": 84,
        "ing": "6 Pierre de lune brut + 6 Briquettes de charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot de Vif-Argent",
        "revente": 160,
        "cout": 114,
        "ing": "6 Vif Argent brut + 6 Coke de Charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot Dwemer",
        "revente": 400,
        "cout": 0.3,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot d'Ébonite",
        "revente": 50000,
        "cout": 40002,
        "ing": "2 Ébonite brute + 2 Coke de Charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "lingot",
        "nom": "Lingot de Malachite",
        "revente": 5500,
        "cout": 2406,
        "ing": "6 Malachite brut + 6 Coke de Charbon"
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Charbon Pauvre",
        "revente": 1,
        "cout": 0.5,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Charbon",
        "revente": 2,
        "cout": 1,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Charbon en Briquette",
        "revente": 6,
        "cout": 3,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Coke de Charbon",
        "revente": 8,
        "cout": 4,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Cuir (transformé)",
        "revente": 6,
        "cout": 3,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Bande de cuir",
        "revente": 5,
        "cout": 2,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Peau d'Ours",
        "revente": 20,
        "cout": 5,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Peau d'Ours Blanc",
        "revente": 20,
        "cout": 5,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Peau de Smilodon",
        "revente": 20,
        "cout": 5,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Peau de Smilodon Blanc",
        "revente": 20,
        "cout": 5,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Peau de Smilodon des Vallées",
        "revente": 20,
        "cout": 5,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Petit bois (unité)",
        "revente": 0.2,
        "cout": 0.1,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "ressources",
        "nom": "Chitine (unité)",
        "revente": 10,
        "cout": 2,
        "ing": ""
    },
    {
        "cat": "Matériaux",
        "mat": "outils",
        "nom": "Pioche",
        "revente": 10,
        "cout": 4.8,
        "ing": "1 Lingot de fer"
    },
    {
        "cat": "Matériaux",
        "mat": "outils",
        "nom": "Hache de bûcheron",
        "revente": 10,
        "cout": 4.8,
        "ing": "1 Lingot de fer"
    },
    {
        "cat": "Matériaux",
        "mat": "outils",
        "nom": "Clé",
        "revente": 25,
        "cout": 11.6,
        "ing": "1 Lingot de fer + 1 Lingot de corindon + 1 Bande de cuir"
    },
    {
        "cat": "Matériaux",
        "mat": "outils",
        "nom": "Kit d'armure",
        "revente": 10,
        "cout": 1.7,
        "ing": "2 Corindon brut + 2 Minerai de fer + 1 Charbon Pauvre"
    },
    {
        "cat": "Matériaux",
        "mat": "outils",
        "nom": "Kit d'arme",
        "revente": 10,
        "cout": 1.7,
        "ing": "2 Corindon brut + 2 Minerai de fer + 1 Charbon Pauvre"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Arc en Fer",
        "revente": 20,
        "cout": 7.1,
        "ing": "1 Petits Bois + 2 Bandes de Cuir + Cuir"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Dague en Fer",
        "revente": 20,
        "cout": 6.8,
        "ing": "1 Lingot de Fer + 1 Bandes de cuir"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Espadon en Fer",
        "revente": 60,
        "cout": 23.2,
        "ing": "4 Lingots de Fer + 2 Bandes de Cuir"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Flèche en Fer x80",
        "revente": 10,
        "cout": 4.9,
        "ing": "Petit Bois + 1 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Hache d'arme en Fer",
        "revente": 60,
        "cout": 23.2,
        "ing": "4 Lingots de Fer + 2 Bandes de Cuir"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Hache en Fer",
        "revente": 35,
        "cout": 13.6,
        "ing": "2 Lingots de Fer + 2 Bandes de Cuir"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Marteau en Fer",
        "revente": 70,
        "cout": 25.2,
        "ing": "4 Lingots de Fer + 3 Bandes de Cuir"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Masse en Fer",
        "revente": 40,
        "cout": 18.4,
        "ing": "3 Lingots de Fer + 2 Bandes de Cuir"
    },
    {
        "cat": "Arme",
        "mat": "fer",
        "nom": "Épée en Fer",
        "revente": 35,
        "cout": 11.6,
        "ing": "2 Lingots de Fer + 1 Bandes de cuir"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Arc en Acier",
        "revente": 70,
        "cout": 17.4,
        "ing": "2 Lingots d'acier + 8 Petits Bois + 2 Bandes de Cuir + Cuir"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Dague en Acier",
        "revente": 50,
        "cout": 11.6,
        "ing": "1 Lingot d'Acier + 1 Bandes de Cuir + 1 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Espadon en Acier",
        "revente": 100,
        "cout": 34.8,
        "ing": "4 Lingot d'Acier + 3 Bandes de Cuir + 2 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Flèche en Acier x80",
        "revente": 20,
        "cout": 4.9,
        "ing": "Petit Bois + 1 Lingot d'Acier"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Hache en Acier",
        "revente": 70,
        "cout": 18.4,
        "ing": "2 Lingot d'Acier + 2 Bandes de Cuir + 1 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Hache de guerre en Acier",
        "revente": 100,
        "cout": 28,
        "ing": "4 Lingot d'Acier + 2 Bandes de Cuir + 1 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Marteau en Acier",
        "revente": 110,
        "cout": 30,
        "ing": "4 Lingot d'Acier + 3 Bandes de Cuir + 1 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Masse en Acier",
        "revente": 75,
        "cout": 21.2,
        "ing": "3 Lingot d'Acier + 1 Bandes de Cuir + 1 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "acier",
        "nom": "Épée en Acier",
        "revente": 70,
        "cout": 16.4,
        "ing": "2 Lingot d'Acier + 1 Bandes de Cuir + 1 Lingot de Fer"
    },
    {
        "cat": "Arme",
        "mat": "commun",
        "nom": "Arc Commun",
        "revente": 90,
        "cout": 16.4,
        "ing": "3 Lingots acier + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "commun",
        "nom": "Dague Commun",
        "revente": 40,
        "cout": 11.6,
        "ing": "1 Lingot fer + 1 Lingot de Corindon + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "commun",
        "nom": "Hache d'arme Commun",
        "revente": 70,
        "cout": 23.2,
        "ing": "3 Lingots fer + 1 Lingot de Corindon + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "commun",
        "nom": "Hache de guerre Commun",
        "revente": 35,
        "cout": 13.6,
        "ing": "1 Lingot fer + 1 Lingot de Corindon + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "commun",
        "nom": "Masse Commun",
        "revente": 40,
        "cout": 11.6,
        "ing": "1 Lingot fer + 1 Lingot de Corindon + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "commun",
        "nom": "Épée Commun",
        "revente": 35,
        "cout": 11.6,
        "ing": "1 Lingot fer + 1 Lingot de Corindon + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "bosmer",
        "nom": "Arc Bosmer",
        "revente": 850,
        "cout": 140,
        "ing": "1 Lingot vif-argent + 2 Pierre de lune"
    },
    {
        "cat": "Arme",
        "mat": "bosmer",
        "nom": "Dague Bosmer",
        "revente": 600,
        "cout": 133.8,
        "ing": "1 Lingot fer + 1 Lingot vif-argent + 1 Pierre de lune + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "bosmer",
        "nom": "Épée Bosmer",
        "revente": 600,
        "cout": 133.8,
        "ing": "1 Lingot fer + 1 Lingot vif-argent + 1 Pierre de lune + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Arc Altmer",
        "revente": 1000,
        "cout": 140,
        "ing": "1 Lingot vif-argent + 2 Pierre de lune"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Dague Altmer",
        "revente": 900,
        "cout": 133.8,
        "ing": "1 Lingot fer + 1 Lingot vif-argent + 1 Pierre de lune + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Espadon Altmer",
        "revente": 1500,
        "cout": 155.6,
        "ing": "2 Lingots fer + 1 Lingot vif-argent + 2 Pierre de lune + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Flèche Altmer x80",
        "revente": 400,
        "cout": 13.1,
        "ing": "1 Pierre de lune + 1 Petit bois"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Hache d'arme Altmer",
        "revente": 1500,
        "cout": 153.6,
        "ing": "2 Lingots fer + 1 Lingot vif-argent + 2 Pierre de lune + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Hache de guerre Altmer",
        "revente": 900,
        "cout": 135.8,
        "ing": "1 Lingot fer + 1 Lingot vif-argent + 1 Pierre de lune + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Marteau Altmer",
        "revente": 2000,
        "cout": 155.6,
        "ing": "2 Lingots fer + 1 Lingot vif-argent + 2 Pierre de lune + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Masse Altmer",
        "revente": 1000,
        "cout": 146.8,
        "ing": "1 Lingot fer + 1 Lingot vif-argent + 2 Pierre de lune + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "altmer",
        "nom": "Épée Altmer",
        "revente": 1000,
        "cout": 133.8,
        "ing": "1 Lingot fer + 1 Lingot vif-argent + 1 Pierre de lune + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Arc Dwemer",
        "revente": 500,
        "cout": 5.4,
        "ing": "1 Lingot fer + 2 Lingots dwemer"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Dague Dwemer",
        "revente": 500,
        "cout": 11.9,
        "ing": "2 Lingots fer + 1 Lingot dwemer + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Espadon Dwemer",
        "revente": 500,
        "cout": 25.8,
        "ing": "2 Lingots fer + 2 Lingots acier + 2 Lingots dwemer + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Flèche Dwemer x80",
        "revente": 200,
        "cout": 0.4,
        "ing": "1 Lingot dwemer + 1 Petit bois"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Hache d'arme Dwemer",
        "revente": 500,
        "cout": 19,
        "ing": "1 Lingot fer + 2 Lingots acier + 2 Lingots dwemer + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Hache de guerre Dwemer",
        "revente": 500,
        "cout": 13.9,
        "ing": "1 Lingot fer + 1 Lingot acier + 1 Lingot dwemer + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Marteau Dwemer",
        "revente": 500,
        "cout": 21,
        "ing": "1 Lingot fer + 2 Lingots acier + 2 Lingots dwemer + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Masse Dwemer",
        "revente": 500,
        "cout": 12.2,
        "ing": "1 Lingot fer + 1 Lingot acier + 2 Lingots dwemer + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "dwemer",
        "nom": "Épée Dwemer",
        "revente": 500,
        "cout": 11.9,
        "ing": "1 Lingot fer + 1 Lingot acier + 1 Lingot dwemer + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Arc Orc",
        "revente": "À définir",
        "cout": 20.4,
        "ing": "1 Lingot fer + 2 Lingots d'orichalque"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Dague Orc",
        "revente": "À définir",
        "cout": 14.6,
        "ing": "1 Lingot fer + 1 Lingot d'orichalque + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Espadon Orc",
        "revente": "À définir",
        "cout": 46.8,
        "ing": "2 Lingots fer + 4 Lingots d'orichalque + 3 Bandes de cuir"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Flèche Orc x20",
        "revente": "À définir",
        "cout": 7.9,
        "ing": "1 Lingot d'orichalque + 1 Petit bois"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Hache d'arme Orc",
        "revente": "À définir",
        "cout": 40,
        "ing": "1 Lingot fer + 4 Lingots d'orichalque + 2 Bandes de cuir"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Hache de guerre Orc",
        "revente": "À définir",
        "cout": 24.4,
        "ing": "1 Lingot fer + 2 Lingots d'orichalque + 2 Bandes de cuir"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Marteau Orc",
        "revente": "À définir",
        "cout": 42,
        "ing": "1 Lingot fer + 4 Lingots d'orichalque + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Masse Orc",
        "revente": "À définir",
        "cout": 30.2,
        "ing": "1 Lingot fer + 3 Lingots d'orichalque + 1 Bande de cuir"
    },
    {
        "cat": "Arme",
        "mat": "orichalque",
        "nom": "Épée Orc",
        "revente": "À définir",
        "cout": 22.4,
        "ing": "1 Lingot fer + 2 Lingots d'orichalque + 1 Bande de cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Arc d'ébonite",
        "revente": "À définir",
        "cout": 60000,
        "ing": "3 Ébonite"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Dague d'ébonite",
        "revente": "À définir",
        "cout": 20002,
        "ing": "1 Ébonite + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Espadon d'ébonite",
        "revente": "À définir",
        "cout": 100006,
        "ing": "5 Ébonite + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Flèche d'ébonite x20",
        "revente": "À définir",
        "cout": 20000.1,
        "ing": "1 Ébonite + 1 Petit bois"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Hache d'armes d'ébonite",
        "revente": "À définir",
        "cout": 100004,
        "ing": "5 Ébonite + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Hache d'ébonite",
        "revente": "À définir",
        "cout": 40004,
        "ing": "2 Ébonite + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Marteau d'ébonite",
        "revente": "À définir",
        "cout": 100006,
        "ing": "5 Ébonite + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Masse d'ébonite",
        "revente": "À définir",
        "cout": 60002,
        "ing": "3 Ébonite + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Épée d'ébonite",
        "revente": "À définir",
        "cout": 40002,
        "ing": "2 Ébonite + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Gilded Ebony Battleaxe",
        "revente": "À définir",
        "cout": 100004.3,
        "ing": "5 Ébonite + 1 Or + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Gilded Ebony Dagger",
        "revente": "À définir",
        "cout": 20002.3,
        "ing": "1 Ébonite + 1 Or + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Espadon en Ébonite dorée",
        "revente": "À définir",
        "cout": 100006.3,
        "ing": "5 Ébonite + 1 Or + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Gilded Ebony Mace",
        "revente": "À définir",
        "cout": 60002.3,
        "ing": "3 Ébonite + 1 Or + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Épée en Ébonite dorée",
        "revente": "À définir",
        "cout": 40002.3,
        "ing": "2 Ébonite + 1 Or + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "ébonite",
        "nom": "Gilded Ebony War Axe",
        "revente": "À définir",
        "cout": 40004.3,
        "ing": "2 Ébonite + 1 Or + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Arc de verre",
        "revente": 7000,
        "cout": 813,
        "ing": "1 Pierre de lune + 2 Malachite"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Dague de verre",
        "revente": 4500,
        "cout": 415,
        "ing": "1 Pierre de lune + 1 Malachite + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Espadon de verre",
        "revente": 9000,
        "cout": 832,
        "ing": "2 Pierre de lune + 2 Malachite + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Flèche de verre x20",
        "revente": 1200,
        "cout": 400.1,
        "ing": "1 Malachite + 1 Petit bois"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Hache a 2 mains de Verre",
        "revente": 9000,
        "cout": 830,
        "ing": "2 Pierre de lune + 2 Malachite + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Hache de verre",
        "revente": 4500,
        "cout": 417,
        "ing": "1 Pierre de lune + 1 Malachite + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Marteau de verre",
        "revente": 10000,
        "cout": 1232,
        "ing": "2 Pierre de lune + 3 Malachite + 3 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Masse de verre",
        "revente": 7000,
        "cout": 815,
        "ing": "1 Pierre de lune + 2 Malachite + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "verre",
        "nom": "Épée de verre",
        "revente": 7500,
        "cout": 415,
        "ing": "1 Pierre de lune + 1 Malachite + 1 Bande cuir"
    },
    {
        "cat": "Arme",
        "mat": "falmer",
        "nom": "Arc Falmer",
        "revente": "—",
        "cout": 6.8,
        "ing": "1 Lingot fer + 1 Chitine"
    },
    {
        "cat": "Arme",
        "mat": "falmer",
        "nom": "Flèche de Falmer x20",
        "revente": "—",
        "cout": 2.1,
        "ing": "1 Chitine + 1 Petit bois"
    },
    {
        "cat": "Arme",
        "mat": "falmer",
        "nom": "Hache Falmer",
        "revente": "—",
        "cout": 6,
        "ing": "1 Chitine + 2 Bandes cuir"
    },
    {
        "cat": "Arme",
        "mat": "falmer",
        "nom": "Épée Falmer",
        "revente": "—",
        "cout": 4,
        "ing": "1 Chitine + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "peau",
        "nom": "Casque en Peau",
        "revente": 30,
        "cout": 8,
        "ing": "2 Cuir + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "peau",
        "nom": "Armure en Peau",
        "revente": 45,
        "cout": 18,
        "ing": "4 Cuir + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "peau",
        "nom": "Gantelets en Peau",
        "revente": 30,
        "cout": 7,
        "ing": "1 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "peau",
        "nom": "Bottes en Peau",
        "revente": 30,
        "cout": 10,
        "ing": "2 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "peau",
        "nom": "Bouclier en Peau",
        "revente": 50,
        "cout": 16,
        "ing": "4 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "peau",
        "nom": "Armure Cloutée",
        "revente": 100,
        "cout": 22.8,
        "ing": "1 Lingot fer + 4 Cuir + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "peau",
        "nom": "Armure à Écailles",
        "revente": 100,
        "cout": 32.4,
        "ing": "3 Lingot fer + 4 Cuir + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fourrure",
        "nom": "Casque en Fourrure",
        "revente": 20,
        "cout": 8,
        "ing": "2 Cuir + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "fourrure",
        "nom": "Armure en Fourrure",
        "revente": 35,
        "cout": 21,
        "ing": "5 Cuir + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fourrure",
        "nom": "Gantelets en Fourrure",
        "revente": 20,
        "cout": 7,
        "ing": "1 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fourrure",
        "nom": "Bottes en Fourrure",
        "revente": 20,
        "cout": 10,
        "ing": "2 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fourrure",
        "nom": "Bouclier en Fourrure",
        "revente": 35,
        "cout": 16,
        "ing": "4 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fourrure",
        "nom": "Col en Fourrure",
        "revente": 30,
        "cout": 16,
        "ing": "4 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "cuir",
        "nom": "Casque en Cuir",
        "revente": 35,
        "cout": 8,
        "ing": "2 Cuir + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "cuir",
        "nom": "Armure en Cuir",
        "revente": 50,
        "cout": 18,
        "ing": "4 Cuir + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "cuir",
        "nom": "Gantelets en Cuir",
        "revente": 35,
        "cout": 7,
        "ing": "1 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "cuir",
        "nom": "Bottes en Cuir",
        "revente": 35,
        "cout": 10,
        "ing": "2 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "cuir",
        "nom": "Bouclier en Cuir",
        "revente": 60,
        "cout": 16,
        "ing": "4 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "cuir",
        "nom": "Armure en Cuir Bouilli",
        "revente": 100,
        "cout": 26.3,
        "ing": "1 Armure en cuir + 4 Bandes cuir + 1 Fer"
    },
    {
        "cat": "Armure",
        "mat": "commun",
        "nom": "Armure en Maille Commune",
        "revente": 55,
        "cout": 30,
        "ing": "5 Lingots de fer + 3 Bandes de cuir"
    },
    {
        "cat": "Armure",
        "mat": "commun",
        "nom": "Armure Commune",
        "revente": 100,
        "cout": 18,
        "ing": "3 Bandes de cuir + 4 Cuirs"
    },
    {
        "cat": "Armure",
        "mat": "commun",
        "nom": "Gants Communs",
        "revente": 55,
        "cout": 7,
        "ing": "2 Bandes de cuir + 1 Cuir"
    },
    {
        "cat": "Armure",
        "mat": "commun",
        "nom": "Bottes Communes",
        "revente": 55,
        "cout": 10,
        "ing": "2 Bandes de cuir + 2 Cuir"
    },
    {
        "cat": "Armure",
        "mat": "fer",
        "nom": "Casque en Fer",
        "revente": 50,
        "cout": 18.4,
        "ing": "3 Lingots fer + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fer",
        "nom": "Armure en Fer",
        "revente": 75,
        "cout": 30,
        "ing": "5 Lingots fer + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fer",
        "nom": "Gants en Fer",
        "revente": 50,
        "cout": 13.6,
        "ing": "2 Lingots fer + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fer",
        "nom": "Bottes en Fer",
        "revente": 50,
        "cout": 18.4,
        "ing": "3 Lingots fer + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "fer",
        "nom": "Bouclier en Fer",
        "revente": 60,
        "cout": 21.2,
        "ing": "4 Lingots fer + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "acier",
        "nom": "Casque en Acier",
        "revente": 70,
        "cout": 18.4,
        "ing": "1 Lingot fer + 2 Lingots acier + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "acier",
        "nom": "Armure en Acier",
        "revente": 120,
        "cout": 30,
        "ing": "1 Lingot fer + 4 Lingots acier + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "acier",
        "nom": "Gants en Acier",
        "revente": 70,
        "cout": 18.4,
        "ing": "1 Lingot fer + 2 Lingots acier + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "acier",
        "nom": "Bottes en Acier",
        "revente": 70,
        "cout": 23.2,
        "ing": "1 Lingot fer + 3 Lingots acier + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "acier",
        "nom": "Bouclier en Acier",
        "revente": 100,
        "cout": 23.2,
        "ing": "1 Lingot fer + 3 Lingots acier + 2 Bandes"
    },
    {
        "cat": "Armure",
        "mat": "altmer",
        "nom": "Casque en Altmer Elfique",
        "revente": 500,
        "cout": 35.8,
        "ing": "1 Lingot fer + 2 Pierre de lune + 1 Cuir + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "altmer",
        "nom": "Armure en Altmer Elfique",
        "revente": 1000,
        "cout": 65.8,
        "ing": "1 Lingot fer + 4 Pierre de lune + 1 Cuir + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "altmer",
        "nom": "Gantelets en Altmer Elfique",
        "revente": 500,
        "cout": 24.8,
        "ing": "1 Lingot fer + 1 Pierre de lune + 1 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "altmer",
        "nom": "Bottes en Altmer Elfique",
        "revente": 500,
        "cout": 37.8,
        "ing": "1 Lingot fer + 2 Pierre de lune + 1 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "altmer",
        "nom": "Bouclier en Altmer Elfique",
        "revente": 1000,
        "cout": 60.8,
        "ing": "1 Lingot fer + 4 Pierre de lune + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Casque en Bosmer Léger",
        "revente": 500,
        "cout": 35.8,
        "ing": "1 Lingot fer + 2 Pierre de lune + 1 Cuir + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Armure en Bosmer Léger",
        "revente": 1000,
        "cout": 65.8,
        "ing": "1 Lingot fer + 4 Pierre de lune + 1 Cuir + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Gants en Bosmer Léger",
        "revente": 500,
        "cout": 24.8,
        "ing": "1 Lingot fer + 1 Pierre de lune + 1 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Bottes en Bosmer Léger",
        "revente": 500,
        "cout": 37.8,
        "ing": "1 Lingot fer + 2 Pierre de lune + 1 Cuir + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Casque en Bosmer Lourd",
        "revente": 600,
        "cout": 36.1,
        "ing": "1 Lingot fer + 2 Pierre de lune + 1 Corindon + 1 Cuir + 1 Bande"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Armure en Bosmer Lourd",
        "revente": 1200,
        "cout": 66.1,
        "ing": "1 Lingot fer + 4 Pierre de lune + 1 Corindon + 1 Cuir + 3 Bandes"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Gants en Bosmer Lourd",
        "revente": 600,
        "cout": 25.1,
        "ing": "1 Lingot fer + 1 Pierre de lune + 1 Corindon + 1 Cuir + 2 Bandes"
    },
    {
        "cat": "Armure",
        "mat": "bosmer",
        "nom": "Bottes en Bosmer Lourd",
        "revente": 600,
        "cout": 38.1,
        "ing": "1 Lingot fer + 2 Pierre de lune + 1 Corindon + 1 Cuir + 2 Bandes"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Casque en Bosmer Wild Hunt",
        "revente": 14000,
        "cout": 818,
        "ing": "1 Pierre de lune + 1 Cuir + 1 Bande + 2 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Armure en Bosmer Wild Hunt",
        "revente": 24000,
        "cout": 1635,
        "ing": "2 Pierre de lune + 1 Cuir + 3 Bandes + 4 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Gantelets en Bosmer Wild Hunt",
        "revente": 14000,
        "cout": 420,
        "ing": "1 Pierre de lune + 1 Cuir + 2 Bandes + 1 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Bottes en Bosmer Wild Hunt",
        "revente": 14000,
        "cout": 820,
        "ing": "1 Pierre de lune + 1 Cuir + 2 Bandes + 2 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Casque en Verre Vvanderfell",
        "revente": 15000,
        "cout": 818,
        "ing": "1 Pierre de lune + 1 Cuir + 1 Bande cuir + 2 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Armure en Verre Vvanderfell",
        "revente": 25000,
        "cout": 1635,
        "ing": "2 Pierre de lune + 1 Cuir + 3 Bandes cuir + 4 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Gantelets en Verre Vvanderfell",
        "revente": 15000,
        "cout": 420,
        "ing": "1 Pierre de lune + 1 Cuir + 2 Bandes cuir + 1 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Bottes en Verre Vvanderfell",
        "revente": 15000,
        "cout": 820,
        "ing": "1 Pierre de lune + 1 Cuir + 2 Bandes cuir + 2 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "verre",
        "nom": "Bouclier en Verre Vvanderfell",
        "revente": 25000,
        "cout": 1617,
        "ing": "1 Pierre de lune + 2 Bandes cuir + 4 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "malachite",
        "nom": "Casque en Malachite",
        "revente": 15000,
        "cout": 818,
        "ing": "1 Pierre de lune + 1 Cuir + 1 Bande cuir + 2 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "malachite",
        "nom": "Armure en Malachite",
        "revente": 25000,
        "cout": 1635,
        "ing": "2 Pierre de lune + 1 Cuir + 3 Bandes cuir + 4 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "malachite",
        "nom": "Gants en Malachite",
        "revente": 15000,
        "cout": 420,
        "ing": "1 Pierre de lune + 1 Cuir + 2 Bandes cuir + 1 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "malachite",
        "nom": "Bottes en Malachite",
        "revente": 15000,
        "cout": 820,
        "ing": "1 Pierre de lune + 1 Cuir + 2 Bandes cuir + 2 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "malachite",
        "nom": "Bouclier en Malachite",
        "revente": 25000,
        "cout": 1617,
        "ing": "1 Pierre de lune + 2 Bandes cuir + 4 Malachite"
    },
    {
        "cat": "Armure",
        "mat": "ébonite",
        "nom": "Casque en Ébonite",
        "revente": "À définir",
        "cout": 60004,
        "ing": "3 Ébonite + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "ébonite",
        "nom": "Armure en Ébonite",
        "revente": "À définir",
        "cout": 100006,
        "ing": "5 Ébonite + 3 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "ébonite",
        "nom": "Gantelets en Ébonite",
        "revente": "À définir",
        "cout": 40004,
        "ing": "2 Ébonite + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "ébonite",
        "nom": "Bottes en Ébonite",
        "revente": "À définir",
        "cout": 60004,
        "ing": "3 Ébonite + 2 Bandes cuir"
    },
    {
        "cat": "Armure",
        "mat": "ébonite",
        "nom": "Bouclier en Ébonite",
        "revente": "À définir",
        "cout": 80002,
        "ing": "4 Ébonite + 1 Bande cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Casque en Orichalque",
        "revente": "À définir",
        "cout": 24.4,
        "ing": "1 Lingot fer + 2 Lingots d'orichalque + 2 Bandes de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Armure en Orichalque",
        "revente": "À définir",
        "cout": 42,
        "ing": "1 Lingot fer + 4 Lingots d'orichalque + 3 Bandes de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Gants en Orichalque",
        "revente": "À définir",
        "cout": 24.4,
        "ing": "1 Lingot fer + 2 Lingots d'Orichalque + 2 Bandes de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Bottes en Orichalque",
        "revente": "À définir",
        "cout": 32.2,
        "ing": "1 Lingot fer + 3 Lingots d'Orichalque + 2 Bandes de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Bouclier en Orichalque",
        "revente": "À définir",
        "cout": 30.2,
        "ing": "1 Lingot fer + 3 Lingots d'Orichalque + 1 Bande de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Casque en Orcish Hide",
        "revente": "À définir",
        "cout": 15.8,
        "ing": "1 Lingot d'orichalque + 2 Cuir + 1 Bande de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Armure en Orcish Hide",
        "revente": "À définir",
        "cout": 25.8,
        "ing": "1 Lingot d'orichalque + 4 Cuir + 3 Bandes de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Gantelets en Orcish Hide",
        "revente": "À définir",
        "cout": 14.8,
        "ing": "1 Lingot d'orichalque + 1 Cuir + 2 Bandes de cuir"
    },
    {
        "cat": "Armure",
        "mat": "orichalque",
        "nom": "Bottes en Orcish Hide",
        "revente": "À définir",
        "cout": 17.8,
        "ing": "1 Lingot d'orichalque + 2 Cuir + 2 Bandes de cuir"
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Collier fourrure",
        "revente": 50,
        "cout": 8,
        "ing": "1 Bande de cuir + 2 Cuirs"
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Ensemble Voleur",
        "revente": 60,
        "cout": 0,
        "ing": ""
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Cape Ours Noir",
        "revente": 100,
        "cout": 12.8,
        "ing": "1 Peau d'Ours + 1 Lingot d'or"
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Cape Ours Blanc",
        "revente": 250,
        "cout": 12.8,
        "ing": "1 Peau d'Ours Blanc + 1 Lingot d'or"
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Cape Smilodon Marron",
        "revente": 80,
        "cout": 12.8,
        "ing": "1 Peau de Smilodon + 1 Lingot d'or"
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Cape Smilodon Gris",
        "revente": 100,
        "cout": 12.8,
        "ing": "1 Peau de Smilodon Blanc + 1 Lingot d'or"
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Cape Smilodon Gris 2",
        "revente": 150,
        "cout": 12.8,
        "ing": "1 Peau de Smilodon des vallées+ 1 Lingot d'or"
    },
    {
        "cat": "Couture",
        "mat": "tissu",
        "nom": "Cape cuir",
        "revente": 20,
        "cout": 6,
        "ing": "2 Cuirs"
    },
    {
        "cat": "Bijou",
        "mat": "gemmes",
        "nom": "Améthyste brute",
        "revente": 10,
        "cout": 0,
        "ing": ""
    },
    {
        "cat": "Bijou",
        "mat": "gemmes",
        "nom": "Rubis brut",
        "revente": 15,
        "cout": 0,
        "ing": ""
    },
    {
        "cat": "Bijou",
        "mat": "gemmes",
        "nom": "Diamant brut",
        "revente": 40,
        "cout": 0,
        "ing": ""
    },
    {
        "cat": "Bijou",
        "mat": "gemmes",
        "nom": "Grenat brut",
        "revente": 10,
        "cout": 0,
        "ing": ""
    },
    {
        "cat": "Bijou",
        "mat": "gemmes",
        "nom": "Saphir brut",
        "revente": 30,
        "cout": 0,
        "ing": ""
    },
    {
        "cat": "Bijou",
        "mat": "gemmes",
        "nom": "Émeraude brute",
        "revente": 30,
        "cout": 0,
        "ing": ""
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier OR",
        "revente": 60,
        "cout": 7.8,
        "ing": "1 Lingot d'Or"
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier OR + DIAMANT",
        "revente": 500,
        "cout": 7.8,
        "ing": "1 Lingot d'Or + 1 Diamant"
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier OR + RUBIS",
        "revente": 300,
        "cout": 7.8,
        "ing": "1 Lingot d'Or + 1 Rubis"
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier OR + 2 AMETHYSTE",
        "revente": 200,
        "cout": 7.8,
        "ing": "1 Lingot d'Or + 2 Améthystes"
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier ARGENT",
        "revente": 30,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent"
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier ARGENT + AMETHYSTE",
        "revente": 100,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent + 1 Améthyste"
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier ARGENT + SAPHIR",
        "revente": 250,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent + 1 Saphir"
    },
    {
        "cat": "Bijou",
        "mat": "colliers",
        "nom": "Collier ARGENT + 2 GRENAT",
        "revente": 150,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent + 2 Grenats"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues ARGENT",
        "revente": 30,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues ARGENT + AMETHYSTE",
        "revente": 60,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent + 1 Améthyste"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues ARGENT + GRENAT",
        "revente": 80,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent + 1 Grenat"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues ARGENT + RUBIS",
        "revente": 100,
        "cout": 7.8,
        "ing": "1 Lingot d'Argent + 1 Rubis"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues OR",
        "revente": 60,
        "cout": 7.8,
        "ing": "1 Lingot d'Or"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues OR + EMERAUDE",
        "revente": 300,
        "cout": 7.8,
        "ing": "1 Lingot d'Or + 1 Émeraude"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues OR + DIAMANT",
        "revente": 500,
        "cout": 7.8,
        "ing": "1 Lingot d'Or + 1 Diamant"
    },
    {
        "cat": "Bijou",
        "mat": "anneaux",
        "nom": "Bagues OR + SAPHIR",
        "revente": 120,
        "cout": 7.8,
        "ing": "1 Lingot d'Or + 1 Saphir"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème 2 ARGENT + SAPHIR",
        "revente": 250,
        "cout": 15.6,
        "ing": "2 Lingots d'Argent + 1 Saphir"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème 2 ARGENT + PIERRE DE LUNE",
        "revente": 400,
        "cout": 28.6,
        "ing": "2 Lingots d'Argent + 1 Pierre de lune"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème 2 OR + RUBIS",
        "revente": 200,
        "cout": 15.6,
        "ing": "2 Lingots d'Or + 1 Rubis"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème 2 OR + EMERAUDE",
        "revente": 180,
        "cout": 15.6,
        "ing": "2 Lingots d'Or + 1 Émeraude"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème CORINDON",
        "revente": 30,
        "cout": 9.6,
        "ing": "2 Lingots de Corindon"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème CORINDON + RUBIS",
        "revente": 60,
        "cout": 9.6,
        "ing": "2 Lingots de Corindon + 1 Rubis"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème CORINDON + SAPHIR",
        "revente": 80,
        "cout": 9.6,
        "ing": "2 Lingots de Corindon + 1 Saphir"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème CORINDON + PIERRE DE LUNE",
        "revente": 500,
        "cout": 22.6,
        "ing": "2 Lingots de Corindon + 1 Pierre de lune"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème MALACHITE + SAPHIR",
        "revente": 1500,
        "cout": 4812,
        "ing": "2 Lingots de Malachite + 1 Saphir"
    },
    {
        "cat": "Bijou",
        "mat": "diadèmes",
        "nom": "Diadème MALACHITE + EMERAUDE",
        "revente": 1000,
        "cout": 4812,
        "ing": "2 Lingots de Malachite + 1 Émeraude"
    }
];
