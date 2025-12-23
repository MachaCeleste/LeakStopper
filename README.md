# LeakStopper

**Leak Stopper** is a Chromium/Opera extension that allows users to input sensitive personal information and automatically redacts it on web pages. It helps protect privacy by replacing your personal info with a censor text before it is visible.

---

## Features

- Locally stores private information including:
  - First Name
  - Last Name
  - Email
  - Address
  - Phone Number (supports format: 1234567890 for now, more formats **Coming Soon**)
  - City
  - ZIP Code
  - ZIP+4
- Redact all stored info in real-time as web pages load
- Works on all webpages (page whitelist/blacklist **Coming Soon**)

---

## Usage

1. Click the extension icon in the toolbar.
2. Enter your personal information in the popup:
   - First Name, Last Name, Email, Address, Phone, City, Zip, Zip+4
3. Click **Save**.
4. Navigate to any webpage — your personal info will be automatically replaced with "[ Redacted ]".

---

## Notes

- Input panels **WILL NOT BE REDACTED**, this will not prevent the user input from leaking
- Redaction can only be applied to text fields, not images or other display methods
- System is built for static content, not dynamic
  
