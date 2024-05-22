import i18next from 'i18next';
import Backend from 'i18next-http-backend';

let language

if (localStorage.getItem("preferedLng")) {
    language = localStorage.getItem("preferedLng")
} else {
    language = "es"
}

//va al json por la traduccion
i18next.use(Backend).init({
    lng: language, // if you're using a language detector, do not define the lng option
    debug: false, // true -> muestra mensajes en la consola acerca de los cambios de idioma
    backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json'
    },
    ns: ['translation'],
    defaultNS: 'translation'
}).then(() => updateContent())

// aca recorre las traducciones
function updateContent() {
    // obtenemos todos los elementos de html que tengan ese atributo, ese conecta con el json
    const htmlElements = document.querySelectorAll('[data-i18n]')
    htmlElements.forEach(element => {
        const value = element.getAttribute('data-i18n') // aquí guarda el valor del atributo data-i18n
        element.innerHTML = i18next.t(value)
    })
}

//llamamos la duncion que cambia las traducciones 
window.changeLanguage = function (lng) {
    i18next.changeLanguage(lng).then(() => updateContent())
    localStorage.setItem("preferedLng", lng)
}