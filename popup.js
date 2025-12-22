document.getElementById("save").addEventListener("click", () => {
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const zipcode = document.getElementById("zipcode").value.trim();
  const zip4 = document.getElementById("zip4").value.trim();
  const phone = document.getElementById("phone").value.trim();

  chrome.storage.local.set({ privateInfo: { firstname, lastname, email, address, city, zipcode, zip4, phone } }, () => {
    document.getElementById("status").textContent = "Saved";
    setTimeout(() => document.getElementById("status").textContent = "", 1000);
  });
});

chrome.storage.local.get(["privateInfo"], (res) => {
  if (!res.privateInfo) return;
  const { firstname, lastname, email, address, city, zipcode, zip4, phone } = res.privateInfo;
  document.getElementById("firstname").value = firstname || "";
  document.getElementById("lastname").value = lastname || "";
  document.getElementById("email").value = email || "";
  document.getElementById("address").value = address || "";
  document.getElementById("city").value = city || "";
  document.getElementById("zipcode").value = zipcode || "";
  document.getElementById("zip4").value = zip4 || "";
  document.getElementById("phone").value = phone || "";
});
