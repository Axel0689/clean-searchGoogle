# Google History Cleaner

Estensione Chrome semplice per eliminare rapidamente le vecchie ricerche mostrate nei suggerimenti di Google.

Quando sei su `google.com`, l'estensione aggiunge un pulsante fisso **Svuota Ricerche**. Apri la tendina della barra di ricerca, premi il pulsante e l'estensione clicca in sequenza sui controlli **Elimina** disponibili.

## Caratteristiche

- Aggiunge un pulsante direttamente nelle pagine Google.
- Elimina le ricerche suggerite una alla volta, aspettando che Google aggiorni il DOM.
- Non richiede login, backend o servizi esterni.
- Non raccoglie dati e non invia informazioni fuori dal browser.
- Funziona come estensione Manifest V3.

## Installazione locale

1. Scarica o clona questo repository.
2. Apri Chrome e vai su `chrome://extensions/`.
3. Attiva **Modalita sviluppatore**.
4. Clicca **Carica estensione non pacchettizzata**.
5. Seleziona la cartella del progetto.

Per Microsoft Edge il flusso e lo stesso, usando `edge://extensions/`.

## Uso

1. Vai su `https://www.google.com/`.
2. Clicca nella barra di ricerca per aprire i suggerimenti.
3. Premi **Svuota Ricerche** in basso a destra.
4. Attendi il completamento della pulizia.

Se non viene trovata nessuna vecchia ricerca, assicurati che la tendina dei suggerimenti sia aperta prima di premere il pulsante.

## Struttura

```text
.
+-- assets/
|   `-- icon.png
+-- content.js
+-- manifest.json
`-- README.md
```

## Sincronizzazione su un altro PC

Clona il repository sul nuovo computer e carica la cartella come estensione non pacchettizzata da `chrome://extensions/`.

```bash
git clone <url-del-repository>
```

Quando fai modifiche su un PC:

```bash
git add .
git commit -m "Aggiorna estensione"
git push
```

Sull'altro PC:

```bash
git pull
```

Poi ricarica l'estensione dalla pagina `chrome://extensions/`.

## Note

Questa estensione dipende dalla struttura attuale dell'interfaccia Google. Se Google modifica i nomi o il markup dei suggerimenti, potrebbe essere necessario aggiornare `content.js`.
