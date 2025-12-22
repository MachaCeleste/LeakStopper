const overlay = document.createElement("div");
overlay.id = "redact-shield";
overlay.style.position = "fixed";
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.background = "white";
overlay.style.zIndex = 2147483647;
overlay.style.pointerEvents = "none";
document.documentElement.appendChild(overlay);

let regexes = [];

chrome.storage.local.get(["privateInfo"], (res) => {
  const info = res.privateInfo || {};
  const terms = [info.firstname, info.lastname, info.email, info.address, info.city, info.zipcode, info.zip4, info.phone].filter(Boolean);

  if (!terms.length) {
    removeShield();
    return;
  }

  regexes = terms.map(t =>
    new RegExp(escapeRegex(t), "gi")
  );

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", firstPass);
  } else {
    firstPass();
  }
});

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function firstPass() {
  redactTextNodes(document.body);
  removeShield();
  enableDynamicRedaction();
}

function redactNode(node) {
  let text = node.nodeValue;
  for (const r of regexes) text = text.replace(r, "[ Redacted ]");
  node.nodeValue = text;
}

function redactTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n;
  while (n = walker.nextNode()) {
    redactNode(n);
  }
}

function removeShield() {
  const el = document.getElementById("redact-shield");
  if (el) el.remove();
}

function enableDynamicRedaction() {
  const observer = new MutationObserver(muts => {
    for (const m of muts) {
      for (const added of m.addedNodes) {
        if (added.nodeType === Node.TEXT_NODE) {
          redactNode(added);
        } else if (added.nodeType === Node.ELEMENT_NODE) {
          redactTextNodes(added);
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
