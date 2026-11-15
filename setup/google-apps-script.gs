/* ==========================================================================
   Digital Dobby — contact form → Google Sheet + email alert
   --------------------------------------------------------------------------
   Paste this whole file into Extensions → Apps Script of a Google Sheet,
   then deploy it as a Web app (steps in WEBSITE-GUIDE.md).
   Each enquiry is saved as a row on the "Enquiries" tab and emailed to
   NOTIFY_EMAIL. Hitting "Reply" on that email replies to the client.
   ========================================================================== */

const NOTIFY_EMAIL = 'monika@digitaldobby.com';
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

    // Received, the form fields, Page, then the pipeline's Stage and Source columns
    getSheet_().appendRow([new Date()].concat(FIELDS.map(k => safeCell_(clean[k])), safeCell_(page), 'New', 'Website form'));

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

// Run once from the editor (▶ Run) to turn the sheet into a simple sales pipeline:
// adds Stage / Source / Next action / Value / Notes columns with dropdowns to the
// Enquiries tab, and creates an "Outreach" tab for prospects you contact yourself.
// Safe to run again: it only sets up what is missing.
const STAGES = ['New', 'Contacted', 'Call booked', 'Call done', 'Proposal sent', 'Negotiation', 'Won', 'Lost', 'Nurture'];
const SOURCES = ['Website form', 'WhatsApp', 'LinkedIn', 'Instagram', 'Referral', 'Partner', 'Cold email', 'Other'];
const OUTREACH_STAGES = ['To contact', 'Contacted', 'Replied', 'Audit sent', 'Call booked', 'Proposal sent', 'Won', 'Lost', 'Not interested', 'Do not contact'];
const NICHES = ['Real estate', 'D2C / Shopify', 'SaaS / proptech', 'Spiritual / non-profit', 'Other'];

function setupPipeline() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const list = values => SpreadsheetApp.newDataValidation().requireValueInList(values, true).setAllowInvalid(false).build();
  const dates = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build();
  const ROWS = 1000;

  // Enquiries: pipeline columns go right after Page (column 9)
  const enq = getSheet_();
  const first = FIELDS.length + 3; // column 10
  const extra = ['Stage', 'Source', 'Next action', 'Next action date', 'Value (₹/month)', 'Notes'];
  if (enq.getRange(1, first).getValue() !== 'Stage') {
    enq.getRange(1, first, 1, extra.length).setValues([extra]).setFontWeight('bold');
    enq.getRange(2, first, ROWS, 1).setDataValidation(list(STAGES));
    enq.getRange(2, first + 1, ROWS, 1).setDataValidation(list(SOURCES));
    enq.getRange(2, first + 3, ROWS, 1).setDataValidation(dates).setNumberFormat('dd mmm yyyy');
    enq.getRange(2, first + 4, ROWS, 1).setNumberFormat('₹#,##0');
    colourStages_(enq, enq.getRange(2, first, ROWS, 1));
  }

  // Outreach: prospects found on LinkedIn, Instagram, RERA lists and so on
  let out = ss.getSheetByName('Outreach');
  if (!out) {
    out = ss.insertSheet('Outreach');
    const head = ['Date added', 'Name', 'Company', 'Role', 'Email / LinkedIn', 'Phone', 'Industry', 'Niche', 'Where found', 'Stage', 'Last contact', 'Next action', 'Next action date', 'Value (₹/month)', 'Notes'];
    out.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold');
    out.setFrozenRows(1);
    out.getRange(2, 1, ROWS, 1).setDataValidation(dates).setNumberFormat('dd mmm yyyy');
    out.getRange(2, 8, ROWS, 1).setDataValidation(list(NICHES));
    out.getRange(2, 10, ROWS, 1).setDataValidation(list(OUTREACH_STAGES));
    out.getRange(2, 11, ROWS, 1).setDataValidation(dates).setNumberFormat('dd mmm yyyy');
    out.getRange(2, 13, ROWS, 1).setDataValidation(dates).setNumberFormat('dd mmm yyyy');
    out.getRange(2, 14, ROWS, 1).setNumberFormat('₹#,##0');
    colourStages_(out, out.getRange(2, 10, ROWS, 1));
  }
  Logger.log('Pipeline ready: Enquiries columns J–O and the Outreach tab.');
}

// Green for won, grey for lost or closed, orange for anything waiting on a reply or proposal
function colourStages_(sheet, range) {
  const rule = (text, bg) => SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(text).setBackground(bg).setRanges([range]).build();
  const rules = sheet.getConditionalFormatRules()
    .concat(['Won'].map(t => rule(t, '#D6F0DF')))
    .concat(['Lost', 'Not interested', 'Do not contact'].map(t => rule(t, '#E6E3DE')))
    .concat(['Proposal sent', 'Negotiation', 'Call booked', 'Audit sent'].map(t => rule(t, '#FCE3D6')));
  sheet.setConditionalFormatRules(rules);
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
