//The goal of this script is to have a quick calculator for insurance products

//shows if product has a vsh eigenschaden
function showVshEigenschaden() {
    const findList = document.getElementById("vhEigenschaden");
    const produktAuswahlListeValue = document.getElementById('produktAuswahlListe').value;
    if (produktAuswahlListeValue == "IT" || produktAuswahlListeValue == "MAC") {
        findList.style.display = "block";
    } else {
        findList.style.display = "none";
    }
}

//shows if product has DOinterimsmanager 
function showDoInterimsmanager() {
    const findList = document.getElementById("doInterimsmanagerconsult");
    if (document.getElementById('produktAuswahlListe').value == "MAN") {
        findList.style.display = "block";
    } else {
        findList.style.display = "none";
    }
}

//shows the VS Box for DO
function addDoInterimsmanagerVS() {
    const findModul = document.getElementById("zusatzInterimsmanager");
    if (document.getElementById("doInterimsmanagerJa").checked) {
        findModul.style.display = "block";
    } else {
        findModul.style.display = "none";
    }
}

//provides user option if/he she wants additional modules
function addModules() {
    const findModul = document.getElementById("zusatzModuleList");
    if (document.getElementById("zusatzModuleJa").checked) {
        findModul.style.display = "block";
    } else if (document.getElementById("zusatzModuleNein").checked) {
        findModul.style.display = "none";
    }
}

//checked bhvmodul
function bhvCheck() {
    const findModul = document.getElementById('zusatzModulBhv');

    if (document.getElementById('bhvModul').checked) {
        findModul.style.display = "block";
    } else {
        findModul.style.display = "none";
    }
}

//checked sachCheck
function sachCheck() {
    const zusatzModulSach = document.getElementById('zusatzModulSach');

    if (document.getElementById('sachModul').checked) {
        zusatzModulSach.style.display = "block";
    } else {
        zusatzModulSach.style.display = "none";
    }
}

//checked cyberCheck
function cyberCheck() {
    const zusatzModulCyber = document.getElementById('zusatzModulCyber');

    if (document.getElementById('cyberModul').checked) {
        zusatzModulCyber.style.display = "block";
    } else {
        zusatzModulCyber.style.display = "none";
    }
}

//everything that should be loaded when dom is fired
document.addEventListener('DOMContentLoaded', function () {

    showDoInterimsmanager();
    showVshEigenschaden();

    //everything that should be loaded when submit button is clicked
    document.getElementById('submit').onclick = function () {

        //pushes NET IT vsh eigenschaden into API
        function addVshEigenschaden() {
            if (document.getElementById("vshEigenschaedenJa").checked && document.getElementById('produktAuswahlListe').value == "IT") {
                return "Ja";
            } else if (document.getElementById("vshEigenschaedenNein").checked) {
                return "Nein";
            }
        }

        //pushes Marketing & Advertising berufshaftpflich
        function addVshBerufshaftpflicht() {
            if (document.getElementById("vshEigenschaedenJa").checked && document.getElementById('produktAuswahlListe').value == "MAC") {
                return "Ja";
            } else if (document.getElementById("vshEigenschaedenNein").checked) {
                return "Nein";
            }
        }

        //consult D&O into API
        function doInterimsmanager() {
            const doInterinsmanagerAuswahlValue = parseInt(document.getElementById("doInterinsmanagerAuswahl").value);

            if (document.getElementById("doInterimsmanagerJa").checked) {
                if (doInterinsmanagerAuswahl > 0) {
                    return doInterinsmanagerAuswahl;
                }
                else if (doInterinsmanagerAuswahlValue > document.getElementById("versicherungssumme").value || doInterinsmanagerAuswahlValue > 500000) {
                    errorMessage(document.getElementById("zusatzInterimsmanager"));
                } else {
                    return "x"
                }
            }
        }

        //defines the API input for the Betriebshaftpflicht Module
        const bhvModule = function () {
            const bhvValue = parseInt(document.getElementById('bhvInputVs').value);

            if (bhvValue > 0 && bhvValue <= 3000000) {
                return "3000000";
            }
            else if (bhvValue > 3000000 && bhvValue <= 5000000) {
                return "5000000";
            }
            else if (bhvValue > 5000000 && bhvValue <= 10000000) {
                return "10000000";
            }
            else if (bhvValue > 10000000) {
                errorMessage(document.getElementById('zusatzModulCyber'));
            }
            else {
                return "x";
            }
        }

        //defines the API input for the Sach Module
        const sachModule = function () {
            const sachValue = parseInt(document.getElementById('sachInputVs').value);

            if (document.getElementById('produktAuswahlListe').value === "IT" && parseInt(document.getElementById('jahresumsatz').value) <= 250000) {
                return moduleExceptions(document.getElementById('sachInputVs').value);
            }
            else {
                if (sachValue > 0 && sachValue <= 25000) {
                    return "25000";
                }
                else if (sachValue > 25000 && sachValue <= 50000) {
                    return "50000";
                }
                else if (sachValue > 50000 && sachValue <= 75000) {
                    return "75000";
                }
                else if (sachValue > 75000) {
                    errorMessage(document.getElementById('zusatzModulSach'));
                }
                else {
                    return "x";
                }
            }
        }

        //defines the API input for the Cyber Module 
        const cyberModule = function () {
            const errorMessageCyber = document.getElementById('zusatzModulCyber');
            const cyberValue = parseInt(document.getElementById('cyberInputVs').value);

            if (cyberValue <= 250000) {
                if (document.getElementById('produktAuswahlListe').value === "IT" && parseInt(document.getElementById('jahresumsatz').value) <= 250000) {
                    if (cyberValue <= 100000) {
                        return "100000";
                    }
                    else if (cyberValue > 100000) {
                        console.log("this doesn't work");
                        errorMessage(errorMessageCyber);
                        return "x";
                    }
                }
                else {
                    return "250000"
                };
            }
            else if (cyberValue > 250000) {
                errorMessage(errorMessageCyber);
            }
            else {
                return "x"
            }
        }

        //if NET IT is small for Sach
        const moduleExceptions = function (e) {
            const value = parseInt(e);

            if (value > 0 && value <= 15000) {
                return "15000";
            }
            else if (value > 15000 && value <= 25000) {
                return "25000";
            }
            else {
                errorMessage(document.getElementById('zusatzModulSach'));
                return "x"
            }
        }

        //addons for cyber + sach
        const moduleAddonsCyber = function () {
            if (document.getElementById("cyberInputZusatzModul").checked) {
                return "Ja";
            }
            return "Nein";
        }
        let moduleAddonsSachBetriebsunterbrechung = function () {
            if (document.getElementById("sachInputZusatzBetriebsunterbrecung").checked) {
                return "Ja";
            }
            return "Nein";
        }
        let moduleAddonsSachGlas = function () {
            if (document.getElementById("sachInputZusatzGlas").checked) {
                return "Ja";
            }
            return "Nein";
        }

        //creates error messages. Missing: Clear everything once submit is hit
        const errorMessage = function (e) {
            if (!document.getElementById("error")) {
                e.insertAdjacentHTML('afterend', '<span id="error" class="row alert alert-danger">Ihre Versicherungssumme ist zu hoch!</span>');
            }
        }

        //add thumpsup once button is toggled or checked - ERROR
        function togglelike(e) {
            document.getElementById(e).classList.toggle("hinzugefügt");
        }

        //doesn't fire form as is standard
        document.getElementById("myForm").addEventListener("submit", function (e) {
            e.preventDefault();
        })

        const url = 'https://makler.hiscox.de/api/eppp/v1/calculate';
        const data = {
            "auth_user": "", //enter Authentification
            "auth_apikey": "", //enter Password
            "product_code": document.getElementById('produktAuswahlListe').value,
            "annual_turnover": document.getElementById('jahresumsatz').value,
            "vsh_module": document.getElementById('versicherungssumme').value,
            "vsh_addon_eigenschaeden": addVshEigenschaden(),
            "vsh_addon_berufshaftpflicht": addVshBerufshaftpflicht(),
            "vsh_addon_interimsmanager": doInterimsmanager(),
            "bhv_module": bhvModule(),
            "sach_module": sachModule(),
            "sach_addon_betriebsunterbrechung": moduleAddonsSachBetriebsunterbrechung(),
            "sach_addon_glasversicherung": moduleAddonsSachGlas(),
            "cyber_module": cyberModule(),
            "cyber_addon_betriebsunterbrechung": moduleAddonsCyber(),
        }

        fetch(url, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(json => {
                const netto = document.getElementById('netto');
                const brutto = document.getElementById('brutto');

                if (JSON.stringify(json.data.totals.price_net) == 0 || JSON.stringify(json.data.totals.price_gross) == 0) {
                    netto.innerHTML = "There was an error";
                    brutto.innerHTML = "There was an error";
                }
                else {
                    netto.innerHTML = JSON.stringify(json.data.totals.price_net);
                    brutto.innerHTML = JSON.stringify(json.data.totals.price_gross);
                }
            })
    }
})
