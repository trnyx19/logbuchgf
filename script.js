// ============================================
// LOGBUCH - JAVASCRIPT
// ============================================

// Laden und Anzeigen der Logbuch-Einträge
async function loadEntries() {
    try {
        const response = await fetch('entries.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const entries = await response.json();
        displayEntries(entries);
    } catch (error) {
        console.error('Fehler beim Laden der Einträge:', error);
        displayError('Fehler beim Laden der Einträge. Bitte überprüfen Sie die entries.json Datei.');
    }
}

// Anzeige der Einträge im HTML
function displayEntries(entries) {
    const container = document.getElementById('entries-container');
    
    // Container leeren
    container.innerHTML = '';
    
    // Prüfen ob Einträge vorhanden sind
    if (!entries || entries.length === 0) {
        container.innerHTML = '<div class="no-entries">Keine Einträge vorhanden.</div>';
        return;
    }
    
    // Einträge in umgekehrter Reihenfolge anzeigen (neueste zuerst)
    entries.reverse().forEach(entry => {
        const entryElement = createEntryElement(entry);
        container.appendChild(entryElement);
    });
}

// Erstelle ein Entry-Element
function createEntryElement(entry) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';
    
    // Prüfe erforderliche Felder
    const title = entry.title || 'Untitled';
    const date = entry.date || 'Kein Datum';
    const text = entry.text || '';
    
    // Formatiere das Datum wenn möglich
    let formattedDate = date;
    try {
        const dateObj = new Date(date);
        if (!isNaN(dateObj)) {
            formattedDate = dateObj.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    } catch (e) {
        // Verwende das Original-Datum bei Fehler
    }
    
    entryDiv.innerHTML = `
        <div class="entry-header">
            <div class="entry-title">${escapeHtml(title)}</div>
            <div class="entry-date">${escapeHtml(formattedDate)}</div>
        </div>
        <div class="entry-text">${escapeHtml(text)}</div>
    `;
    
    return entryDiv;
}

// HTML-Escape um XSS zu verhindern
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Fehleranzeige
function displayError(message) {
    const container = document.getElementById('entries-container');
    container.innerHTML = `<div class="no-entries" style="color: #c00000;">${message}</div>`;
}

// Starten wenn DOM fertig ist
document.addEventListener('DOMContentLoaded', loadEntries);

// Toolbar-Buttons Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const toolbarButtons = document.querySelectorAll('.toolbar-button');
    
    toolbarButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (index === 0) {
                // Zurück
                window.history.back();
            } else if (index === 1) {
                // Vorwärts
                window.history.forward();
            } else if (index === 2) {
                // Aktualisieren
                location.reload();
            }
        });
    });
});