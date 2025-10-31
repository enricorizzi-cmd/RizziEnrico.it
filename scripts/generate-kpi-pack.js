const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

// Assicurati che la directory esista
const outputDir = path.join(__dirname, '..', 'public', 'resources');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const workbook = new ExcelJS.Workbook();

// ===== FOGLIO 1: DASHBOARD KPI =====
const dashboardSheet = workbook.addWorksheet('Dashboard KPI');

// Header
dashboardSheet.mergeCells('A1:F1');
dashboardSheet.getCell('A1').value = 'DASHBOARD KPI - PMI';
dashboardSheet.getCell('A1').font = { size: 16, bold: true };
dashboardSheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
dashboardSheet.getRow(1).height = 30;

// Anno e mese
dashboardSheet.getCell('A3').value = 'Anno:';
dashboardSheet.getCell('B3').value = new Date().getFullYear();
dashboardSheet.getCell('D3').value = 'Mese:';
dashboardSheet.getCell('E3').value = new Date().toLocaleString('it-IT', { month: 'long' });

// Tabella KPI
const kpiHeaders = ['KPI', 'Target', 'Attuale', 'Scostamento', 'Trend', 'Status'];
dashboardSheet.getRow(5).values = kpiHeaders;
dashboardSheet.getRow(5).font = { bold: true };
dashboardSheet.getRow(5).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FF4472C4' }
};
dashboardSheet.getRow(5).font = { bold: true, color: { argb: 'FFFFFFFF' } };

// KPI dati
const kpis = [
  {
    name: 'Fatturato Mensile',
    target: 50000,
    actual: 0,
    unit: '€',
    formula: 'Dati!B3'
  },
  {
    name: 'Marginalità Operativa',
    target: 25,
    actual: 0,
    unit: '%',
    formula: 'Dati!B5'
  },
  {
    name: 'Giorni Medi Incasso (DSO)',
    target: 45,
    actual: 0,
    unit: 'giorni',
    formula: 'Dati!B7'
  },
  {
    name: 'Lead Generati',
    target: 50,
    actual: 0,
    unit: 'n.',
    formula: 'Dati!B9'
  },
  {
    name: 'Conversion Rate',
    target: 15,
    actual: 0,
    unit: '%',
    formula: 'Dati!B11'
  },
  {
    name: 'Costo per Lead (CPL)',
    target: 50,
    actual: 0,
    unit: '€',
    formula: 'Dati!B13'
  },
  {
    name: 'Tempi Consegna Medi',
    target: 7,
    actual: 0,
    unit: 'giorni',
    formula: 'Dati!B15'
  },
  {
    name: 'ROI Campagne Marketing',
    target: 300,
    actual: 0,
    unit: '%',
    formula: 'Dati!B17'
  },
  {
    name: 'Produttività per Addetto',
    target: 15000,
    actual: 0,
    unit: '€',
    formula: 'Dati!B19'
  },
  {
    name: 'NPS (Soddisfazione Clienti)',
    target: 50,
    actual: 0,
    unit: 'punti',
    formula: 'Dati!B21'
  },
  {
    name: 'Assenteismo',
    target: 3,
    actual: 0,
    unit: '%',
    formula: 'Dati!B23'
  },
  {
    name: 'Turnover',
    target: 5,
    actual: 0,
    unit: '%',
    formula: 'Dati!B25'
  }
];

let row = 6;
kpis.forEach((kpi, index) => {
  dashboardSheet.getCell(`A${row}`).value = kpi.name;
  dashboardSheet.getCell(`B${row}`).value = kpi.target;
  dashboardSheet.getCell(`C${row}`).value = { formula: kpi.formula };
  dashboardSheet.getCell(`D${row}`).value = { 
    formula: `C${row}-B${row}` 
  };
  dashboardSheet.getCell(`E${row}`).value = { 
    formula: `IF(C${row}>B${row},"↑","↓")` 
  };
  dashboardSheet.getCell(`F${row}`).value = { 
    formula: `IF(ABS(D${row})/B${row}<=0.1,"OK",IF(ABS(D${row})/B${row}<=0.2,"ATTENZIONE","CRITICO"))` 
  };
  
  // Formattazione
  dashboardSheet.getCell(`C${row}`).numFmt = kpi.unit === '€' ? '#,##0' : kpi.unit === '%' ? '0.0' : '0';
  dashboardSheet.getCell(`B${row}`).numFmt = kpi.unit === '€' ? '#,##0' : kpi.unit === '%' ? '0.0' : '0';
  dashboardSheet.getCell(`D${row}`).numFmt = kpi.unit === '€' ? '#,##0' : kpi.unit === '%' ? '0.0' : '0';
  
  // Colore status
  dashboardSheet.getCell(`F${row}`).font = { bold: true };
  
  if (index % 2 === 0) {
    dashboardSheet.getRow(row).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF2F2F2' }
    };
  }
  
  row++;
});

// Larghezza colonne
dashboardSheet.columns = [
  { width: 30 },
  { width: 15 },
  { width: 15 },
  { width: 15 },
  { width: 10 },
  { width: 15 }
];

// ===== FOGLIO 2: DATI MENSILI =====
const datiSheet = workbook.addWorksheet('Dati');

datiSheet.getCell('A1').value = 'Dati Mensili - Inserisci i tuoi valori qui';
datiSheet.getCell('A1').font = { size: 14, bold: true };
datiSheet.mergeCells('A1:B1');

// KPI con celle di input
const dataRows = [
  { label: 'Fatturato Mensile (€)', cell: 'B3', formula: '=B3' },
  { label: 'Marginalità Operativa (%)', cell: 'B5', formula: '=((B3-C5)/B3)*100', note: 'Ricavi - Costi Variabili' },
  { label: 'Giorni Medi Incasso (DSO)', cell: 'B7', formula: '=(Crediti/B3)*365', note: 'Inserisci valore Crediti in C7' },
  { label: 'Lead Generati (n.)', cell: 'B9', formula: '=B9' },
  { label: 'Conversion Rate (%)', cell: 'B11', formula: '=(Ordini/B9)*100', note: 'Inserisci Ordini in C11' },
  { label: 'Costo per Lead (€)', cell: 'B13', formula: '=CostoMarketing/B9', note: 'Inserisci CostoMarketing in C13' },
  { label: 'Tempi Consegna Medi (giorni)', cell: 'B15', formula: '=B15' },
  { label: 'ROI Campagne Marketing (%)', cell: 'B17', formula: '=((RicaviMarketing-CostoMarketing)/CostoMarketing)*100', note: 'Inserisci RicaviMarketing e CostoMarketing' },
  { label: 'Produttività per Addetto (€)', cell: 'B19', formula: '=B3/NumAddetti', note: 'Inserisci NumAddetti in C19' },
  { label: 'NPS (punti)', cell: 'B21', formula: '=B21', note: 'Scala 0-100' },
  { label: 'Assenteismo (%)', cell: 'B23', formula: '=(GiorniAssenti/(GiorniLavorativi*NumAddetti))*100', note: 'Inserisci GiorniAssenti, GiorniLavorativi, NumAddetti' },
  { label: 'Turnover (%)', cell: 'B25', formula: '=(Uscite/MediaDipendenti)*100', note: 'Inserisci Uscite e MediaDipendenti' }
];

let dataRow = 3;
dataRows.forEach((item, index) => {
  datiSheet.getCell(`A${dataRow}`).value = item.label;
  datiSheet.getCell(`A${dataRow}`).font = { bold: true };
  datiSheet.getCell(`B${dataRow}`).value = 0;
  datiSheet.getCell(`B${dataRow}`).numFmt = item.label.includes('€') ? '#,##0' : item.label.includes('%') ? '0.0' : '0';
  
  if (item.note) {
    datiSheet.getCell(`C${dataRow}`).value = item.note;
    datiSheet.getCell(`C${dataRow}`).font = { italic: true, color: { argb: 'FF666666' } };
  }
  
  if (index % 2 === 0) {
    datiSheet.getRow(dataRow).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF9F9F9' }
    };
  }
  
  dataRow += 2;
});

datiSheet.columns = [
  { width: 35 },
  { width: 20 },
  { width: 40 }
];

// ===== FOGLIO 3: ISTRUZIONI =====
const istruzioniSheet = workbook.addWorksheet('Istruzioni');

istruzioniSheet.getCell('A1').value = 'ISTRUZIONI KPI PACK';
istruzioniSheet.getCell('A1').font = { size: 16, bold: true };
istruzioniSheet.mergeCells('A1:C1');

istruzioniSheet.getCell('A3').value = 'Come usare questo template:';
istruzioniSheet.getCell('A3').font = { size: 12, bold: true };

const istruzioni = [
  '',
  '1. Vai al foglio "Dati" e inserisci i tuoi valori mensili',
  '',
  '2. I valori vengono automaticamente calcolati nel foglio "Dashboard KPI"',
  '',
  '3. Monitora gli scostamenti:',
  '   - OK: scostamento < 10%',
  '   - ATTENZIONE: scostamento 10-20%',
  '   - CRITICO: scostamento > 20%',
  '',
  '4. Aggiorna mensilmente per vedere i trend',
  '',
  '5. Usa i KPI nelle riunioni mensili per decisioni basate sui numeri',
  '',
  'Per supporto: e.rizzi@osmpartnervenezia.it',
  '',
  'Buon lavoro!',
  ''
];

let instRow = 5;
istruzioni.forEach((text) => {
  istruzioniSheet.getCell(`A${instRow}`).value = text;
  instRow++;
});

istruzioniSheet.columns = [{ width: 80 }];

// Salva il file
const filePath = path.join(outputDir, 'kpi-pack.xlsx');
workbook.xlsx.writeFile(filePath)
  .then(() => {
    console.log('✅ KPI Pack Excel creato con successo!');
    console.log(`📁 File salvato in: ${filePath}`);
    console.log(`📊 Fogli creati: Dashboard KPI, Dati, Istruzioni`);
  })
  .catch((error) => {
    console.error('❌ Errore nella creazione del file:', error);
    process.exit(1);
  });

