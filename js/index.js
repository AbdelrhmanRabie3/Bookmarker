var SiteNameInput = document.getElementById("SiteName");
var SiteURLInput = document.getElementById("SiteURL");
var tableBody = document.getElementById("tableBody");
var validationLayer = document.querySelector(".validation-layer");
var btnClose = document.getElementById("btnClose");
var webList = [];

if (localStorage.getItem("webContainer")) {
  webList = JSON.parse(localStorage.getItem("webContainer"));
  displayData();
}

btnSubmit.addEventListener("click", function () {
  if (
    SiteNameInput.classList.contains("is-valid") &&
    SiteURLInput.classList.contains("is-valid")
  ) {
    CreateItem();
  } else {
    validationLayer.classList.replace("d-none", "d-flex");
  }
});
btnClose.addEventListener("click", function () {
  closeLayer();
});
document.addEventListener("click", function (e) {
  if (e.target === validationLayer) closeLayer();
});
SiteNameInput.addEventListener("input", function () {
  validationName();
});
SiteURLInput.addEventListener("input", function () {
  validationURL();
});

function CreateItem() {
  website = {
    name: SiteNameInput.value,
    URL: SiteURLInput.value,
  };
  webList.push(website);
  localStorage.setItem("webContainer", JSON.stringify(webList));
  displayData();
  clearForm();
}

function displayData() {
  var container = "";
  for (var i = 0; i < webList.length; i++) {
    container += ` <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${webList[i].name}</td>
                        <td><button onclick="visitSite('${
                          webList[i].URL
                        }')" id="btnVisit" class="py-2 px-3 rounded-3"> <i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                        <td><button onclick="deleteItem(${i})" id="btnDelete" class="py-2 px-3 rounded-3"> <i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                      </tr>`;
  }
  tableBody.innerHTML = container;
}

function clearForm() {
  SiteNameInput.value = null;
  SiteURLInput.value = null;
}

function deleteItem(Index) {
  webList.splice(Index, 1);
  displayData();
  localStorage.setItem("webContainer", JSON.stringify(webList));
}

function visitSite(itemUrl) {
  window.open(itemUrl, "_blank");
}

function validationName() {
  var regex = /^[a-zA-Z0-9\-_.]{3,20}$/;
  if (regex.test(SiteNameInput.value)) {
    SiteNameInput.classList.add("is-valid");
    SiteNameInput.classList.remove("is-invalid");
  } else {
    SiteNameInput.classList.add("is-invalid");
    SiteNameInput.classList.remove("is-valid");
  }
}
function validationURL() {
  var regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  if (regex.test(SiteURLInput.value)) {
    SiteURLInput.classList.add("is-valid");
    SiteURLInput.classList.remove("is-invalid");
  } else {
    SiteURLInput.classList.add("is-invalid");
    SiteURLInput.classList.remove("is-valid");
  }
}
function closeLayer() {
  validationLayer.classList.replace("d-flex", "d-none");
}
