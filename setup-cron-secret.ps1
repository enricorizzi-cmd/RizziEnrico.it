# Script PowerShell per configurare CRON_SECRET_TOKEN su GitHub Actions
# Token: 37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223

$TOKEN = "37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223"
$REPO = "enricorizzi-cmd/RizziEnrico.it"

Write-Host "🔐 Configurazione CRON_SECRET_TOKEN su GitHub Actions..." -ForegroundColor Cyan
Write-Host ""

# Verifica se GitHub CLI è installato
if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "✅ GitHub CLI trovato" -ForegroundColor Green
    Write-Host "Configurando secret..."
    
    gh secret set CRON_SECRET_TOKEN --repo $REPO --body $TOKEN
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Secret configurato con successo!" -ForegroundColor Green
    } else {
        Write-Host "❌ Errore nella configurazione del secret" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️  GitHub CLI non trovato" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Configura manualmente:" -ForegroundColor Yellow
    Write-Host "1. Vai su: https://github.com/$REPO/settings/secrets/actions"
    Write-Host "2. Clicca 'New repository secret'"
    Write-Host "3. Name: CRON_SECRET_TOKEN"
    Write-Host "4. Value: $TOKEN"
    Write-Host "5. Clicca 'Add secret'"
    exit 1
}

Write-Host ""
Write-Host "✅ Configurazione completata!" -ForegroundColor Green
Write-Host "Verifica su: https://github.com/$REPO/actions"

