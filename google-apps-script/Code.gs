/**
 * Приём ответов анкеты с сайта-приглашения в Google Таблицу.
 * Установка — см. README.md (Расширения → Apps Script → Развернуть как веб-приложение).
 * Ответы с обеих ссылок (общей и для подруг) пишутся на один лист «Гости».
 */
const SHEET_NAME = 'Гости';
const HEADERS = ['Дата', 'Аты-жөнү', 'Жооп', 'Адам саны', 'Бардыгы'];

// сколько человек придёт по каждому варианту ответа
const GUESTS = {
  'Албетте, келем': 1,
  'Жубайым менен келем': 2,
  'Келе албайм': 0,
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const name = String(data.name || '').trim().slice(0, 200);
    const answer = String(data.answer || '').trim();
    if (!name || !(answer in GUESTS)) return json({ ok: false, error: 'bad request' });

    getSheet().appendRow([new Date(), name, answer, GUESTS[answer]]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// открыть URL веб-приложения в браузере — проверка, что всё развёрнуто
// (заодно приводит лист к нужному виду)
function doGet() {
  getSheet();
  return json({ ok: true, sheet: SHEET_NAME });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME, 0);
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('dd.MM.yyyy HH:mm');
  }
  // шапка; в столбце «Бардыгы» под заголовком — сумма всех гостей
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  const total = sh.getRange('E2');
  if (total.getFormula() !== '=SUM(D2:D)') total.setFormula('=SUM(D2:D)').setFontWeight('bold');
  // убрать то, что осталось от прежней раскладки: «Шилтеме» в E и итог в G1:H1
  const last = sh.getLastRow();
  if (last >= 3) sh.getRange(3, 5, last - 2, 1).clearContent();
  sh.getRange('F1:H1').clearContent();
  return sh;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
