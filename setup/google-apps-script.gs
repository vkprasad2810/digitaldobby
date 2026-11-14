/* ==========================================================================
   Digital Dobby — contact form → Google Sheet + email alert
   --------------------------------------------------------------------------
   Paste this whole file into Extensions → Apps Script of a Google Sheet,
   then deploy it as a Web app (steps in WEBSITE-GUIDE.md).
   Each enquiry is saved as a row on the "Enquiries" tab and emailed to
   NOTIFY_EMAIL. Hitting "Reply" on that email replies to the client.
   ========================================================================== */

const NOTIFY_EMAIL = 'digital.dobbyy@gmail.com';
const SHEET_NAME = 'Enquiries';
const FIELDS = ['Name', 'Email', 'Company', 'Phone', 'Services', 'Budget', 'Message'];
const MAX_LEN = 5000;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data._honey) return json_({ success: true }); // hidden field only bots fill in

    const clean = {};
    FIELDS.forEach(k => { clean[k] = String(data[k] || '').trim().slice(0, MAX_LEN); });
    if (!clean.Name || !clean.Message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.Email)) {
      return json_({ success: false, message: 'Please fill in your name, a valid email and a message.' });
    }
    const page = String(data.Page || '').slice(0, 500);

    getSheet_().appendRow([new Date()].concat(FIELDS.map(k => safeCell_(clean[k])), safeCell_(page)));

    const rows = FIELDS.filter(k => clean[k])
      .map(k => `<tr><td style="padding:6px 12px;color:#666;vertical-align:top"><b>${k}</b></td>` +
                `<td style="padding:6px 12px;white-space:pre-wrap">${escape_(clean[k])}</td></tr>`)
      .join('');
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: clean.Email,
      name: 'Digital Dobby website',
      subject: `New enquiry from ${clean.Name} — Digital Dobby website`,
      htmlBody: `<p>New enquiry from the website contact form:</p>` +
                `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table>` +
                `<p style="color:#888;font-size:12px">Sent from ${escape_(page)}. All enquiries are also saved in the Google Sheet.</p>`,
      body: FIELDS.filter(k => clean[k]).map(k => `${k}: ${clean[k]}`).join('\n')
    });

    return json_({ success: true });
  } catch (err) {
    console.error(err);
    return json_({ success: false, message: 'Server error: ' + err.message });
  } finally {
    lock.releaseLock();
  }
}

// Opening the Web app URL in a browser shows this — a quick "is it live?" check.
function doGet() {
  return json_({ success: true, message: 'Digital Dobby contact form is live.' });
}

// Run this once from the editor (▶ Run) to grant permissions and create the tab.
function setup() {
  getSheet_();
  Logger.log('Ready. Emails left today: ' + MailApp.getRemainingDailyQuota());
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Received'].concat(FIELDS, 'Page'));
    sheet.getRange(1, 1, 1, FIELDS.length + 2).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stop text like "=HYPERLINK(...)" from running as a formula in the sheet.
function safeCell_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function escape_(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
