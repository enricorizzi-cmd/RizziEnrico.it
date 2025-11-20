#!/bin/bash
# Script per configurare CRON_SECRET_TOKEN su GitHub Actions
# Token: 37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223

TOKEN="37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223"
REPO="enricorizzi-cmd/RizziEnrico.it"

echo "🔐 Configurazione CRON_SECRET_TOKEN su GitHub Actions..."
echo ""

# Verifica se GitHub CLI è installato
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI trovato"
    echo "Configurando secret..."
    gh secret set CRON_SECRET_TOKEN --repo "$REPO" --body "$TOKEN"
    
    if [ $? -eq 0 ]; then
        echo "✅ Secret configurato con successo!"
    else
        echo "❌ Errore nella configurazione del secret"
        exit 1
    fi
else
    echo "⚠️  GitHub CLI non trovato"
    echo ""
    echo "Configura manualmente:"
    echo "1. Vai su: https://github.com/$REPO/settings/secrets/actions"
    echo "2. Clicca 'New repository secret'"
    echo "3. Name: CRON_SECRET_TOKEN"
    echo "4. Value: $TOKEN"
    echo "5. Clicca 'Add secret'"
    exit 1
fi

echo ""
echo "✅ Configurazione completata!"
echo "Verifica su: https://github.com/$REPO/actions"

