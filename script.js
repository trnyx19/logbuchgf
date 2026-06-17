// ============================================
// LOGBUCH - JAVASCRIPT
// ============================================

// Konfiguration - Wartungsmitteilung anzeigen (true/false)
const SHOW_MAINTENANCE_MESSAGE = false;

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
    const abgelehnt = entry.abgelehnt;
    
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
    
    // Erstelle Stempel basierend auf abgelehnt Wert
    let stampHtml = '';
    if (abgelehnt === true) {
        stampHtml = '<div class="entry-stamp abgelehnt">Abgelehnt</div>';
    } else if (abgelehnt === false) {
        stampHtml = '<div class="entry-stamp angenommen">Angenommen</div>';
    }
    // Wenn abgelehnt null/undefined ist, kein Stempel
    
    entryDiv.innerHTML = `
        ${stampHtml}
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

// Wartungsmitteilung anzeigen
document.addEventListener('DOMContentLoaded', function() {
    if (SHOW_MAINTENANCE_MESSAGE) {
        const maintenanceModal = document.getElementById('maintenance-modal');
        const closeMaintenanceBtn = document.getElementById('close-maintenance');
        
        maintenanceModal.classList.remove('hidden');
        
        closeMaintenanceBtn.addEventListener('click', function() {
            maintenanceModal.classList.add('hidden');
        });
        
        // Modal schließen bei Klick außerhalb
        maintenanceModal.addEventListener('click', function(e) {
            if (e.target === maintenanceModal) {
                maintenanceModal.classList.add('hidden');
            }
        });
    }
});

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
    
    // Menü-Items Funktionalität
    const menuDatei = document.getElementById('menu-datei');
    const menuAnsicht = document.getElementById('menu-ansicht');
    const menuEinsendung = document.getElementById('menu-einsendung');
    const menuBeschwerde = document.getElementById('menu-beschwerde');
    const colorPickerModal = document.getElementById('color-picker-modal');
    const errorModal = document.getElementById('error-modal');
    const beschwerde = document.getElementById('beschwerde-modal');
    const beschwerdeOkBtn = document.getElementById('beschwerde-ok');
    const closeErrorBtn = document.getElementById('close-error');
    
    // Datei - Hintergrundfarbe ändern
    menuDatei.addEventListener('click', function() {
        colorPickerModal.classList.remove('hidden');
    });
    
    // Color Buttons
    const colorButtons = document.querySelectorAll('.color-btn');
    const colors = [
        'linear-gradient(135deg, #0a7fb0 0%, #0f5f8f 100%)',
        'linear-gradient(135deg, #2d5016 0%, #1a3a0a 100%)',
        'linear-gradient(135deg, #6b2d0a 0%, #3a1a05 100%)',
        'linear-gradient(135deg, #4a0e0e 0%, #2a0a0a 100%)',
        'linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%)',
        'linear-gradient(135deg, #1a4a6b 0%, #0a2a4b 100%)',
        'linear-gradient(135deg, #6b4a2d 0%, #3a2a1a 100%)',
        'linear-gradient(135deg, #4a2d6b 0%, #2a1a3a 100%)',
        'linear-gradient(135deg, #6b6b2d 0%, #4a4a1a 100%)',
        'linear-gradient(135deg, #2d6b6b 0%, #1a3a3a 100%)'
    ];
    
    colorButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            document.body.style.background = colors[index];
            localStorage.setItem('backgroundColor', colors[index]);
            colorPickerModal.classList.add('hidden');
        });
    });
    
    // Modal schließen bei Klick außerhalb
    colorPickerModal.addEventListener('click', function(e) {
        if (e.target === colorPickerModal) {
            colorPickerModal.classList.add('hidden');
        }
    });
    
    // Ansicht - Dark Mode Toggle
    menuAnsicht.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Speichere die Einstellung
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Hilfe - Error Dialog
    menuEinsendung.addEventListener('click', function() {
        errorModal.classList.remove('hidden');
    });
    
    closeErrorBtn.addEventListener('click', function() {
        // Link aus dem Dialog extrahieren
        const linkText = document.querySelector('.error-text').textContent;
        if (linkText) {
            window.open(linkText, '_blank');
        }
        errorModal.classList.add('hidden');
    });
    
    // Error Modal schließen bei Klick außerhalb
    errorModal.addEventListener('click', function(e) {
        if (e.target === errorModal) {
            errorModal.classList.add('hidden');
        }
    });
    
    // Beschwerde Dialog
    menuBeschwerde.addEventListener('click', function() {
        beschwerde.classList.remove('hidden');
    });
    
    beschwerdeOkBtn.addEventListener('click', function() {
        // Link aus dem Dialog extrahieren
        const linkText = document.querySelector('#beschwerde-modal .error-text').textContent;
        if (linkText) {
            window.open(linkText, '_blank');
        }
        beschwerde.classList.add('hidden');
    });
    
    // Beschwerde Modal schließen bei Klick außerhalb
    beschwerde.addEventListener('click', function(e) {
        if (e.target === beschwerde) {
            beschwerde.classList.add('hidden');
        }
    });
    
    // Hintergrundfarbe beim Laden wiederherstellen
    const savedBgColor = localStorage.getItem('backgroundColor');
    if (savedBgColor) {
        document.body.style.background = savedBgColor;
    }
    
    // Dark Mode beim Laden wiederherstellen
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
