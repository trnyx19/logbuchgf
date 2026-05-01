# Logbuch - Windows XP Retro Style

Eine minimalistische Logbuch-Website im Windows-XP-Retro-Stil. Vollständig Frontend, keine Datenbank erforderlich.

## Funktionen

- 📓 Anzeige von Logbuch-Einträgen
- 🎨 Authentischer Windows-XP-Look mit klassischem UI Design
- 📄 Einträge aus JSON-Datei laden
- 🔄 Responsive Design
- ⚡ Keine Abhängigkeiten, reine HTML/CSS/JavaScript Lösung

## Projektstruktur

```
.
├── index.html      # Hauptdatei
├── style.css       # Windows-XP Styling
├── script.js       # Fetch API und Logik
├── entries.json    # Deine Logbuch-Einträge
└── README.md       # Diese Datei
```

## Eintrag hinzufügen

Öffne `entries.json` und füge neue Einträge hinzu:

```json
{
  "title": "Titel des Eintrags",
  "date": "YYYY-MM-DD",
  "text": "Der Inhalt des Eintrags"
}
```

## Lokal starten

1. **Mit Python 3:**
   ```bash
   python -m http.server 8000
   ```

2. **Mit Node.js (http-server):**
   ```bash
   npx http-server
   ```

3. Öffne dann `http://localhost:8000` im Browser

## Deployment auf Render.com

1. Pushe dieses Repository zu GitHub
2. Gehe zu [render.com](https://render.com)
3. Wähle "New +" → "Static Site"
4. Verbinde dein GitHub-Repository
5. Setze "Build Command": keiner (leer)
6. Setze "Publish directory": `.` (oder root)
7. Deploy!

Render wird die statische Website automatisch servieren.

## Features

- **Windows-XP Design**: Klassische Farben, 3D-Buttons, Titelbar
- **Automatisches Laden**: Einträge werden aus JSON geladen
- **Keine Bearbeitung über UI**: Nur JSON-Bearbeitung
- **XSS-Schutz**: HTML-Escape für alle Eingaben
- **Responsive**: Funktioniert auch auf kleineren Bildschirmen
- **Kommentiert**: Sauberer, gut dokumentierter Code

## Browser-Unterstützung

Funktioniert in allen modernen Browsern:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Lizenz

Frei verwendbar. Viel Spaß!