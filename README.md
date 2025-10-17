# Mon CV (site statique)

Visiter le site : [monCV](https://son-of-mountain.github.io/5-JS/)

Ce dépôt contient une petite application statique (HTML/CSS/JS) qui présente un CV.

Important — changements récents
- Toutes les images sont centralisées dans le dossier `docs/image/` (les pages et la documentation ont été mises à jour pour pointer vers `image/...`).
- Les données des compétences (chart et génération d'affichage) ont été extraites dans `docs/data/skills.json` pour simplifier les modifications : éditez ce fichier JSON pour changer les compétences, niveaux, couleurs et tooltips sans toucher au JS.
- Le script principal `docs/js/resume.js` a été modifié pour charger `data/skills.json` et pour générer dynamiquement les éléments `.skill-item` (si ceux-ci n'existent pas déjà dans le HTML). Le graphique (canvas) est dessiné à partir de ces données.

Fichiers clés
- Pages : `docs/index.html`, `docs/ubo-resume.html`
- Styles : `docs/css/resume.css`, `docs/css/responsive.css`
- Scripts : `docs/js/resume.js` (interactions, tooltips, étoiles, chart)
- Données : `docs/data/skills.json` (modifier ici pour changer les compétences)
- Images : `docs/image/` (toutes les images du site)

Comment modifier les compétences (workflow simple)
1. Ouvrir `docs/data/skills.json` et modifier/ajouter/retirer des objets {name, level, color, group, tooltip}.
2. Ouvrir la page localement pour vérification :

```bash
cd docs
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/index.html
```

Notes techniques
- Le chargement du JSON utilise `fetch('data/skills.json')`. Si tu ouvres directement le fichier HTML avec `file://`, la requête peut être bloquée par le navigateur, mais le script contient un fallback avec des valeurs par défaut.
- Si tu préfères que le HTML soit entièrement statique (pas de fetch runtime), je peux ajouter un petit script de build qui injecte les compétences depuis le JSON dans les pages HTML.

Si tu veux que je fusionne d'autres parties de la documentation ou que je supprime l'ancien README sous `docs/`, dis-le et je m'en occupe.
