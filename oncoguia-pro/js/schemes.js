// Funciones de copia y descarga
function copyToClipboard() {
    const codeElement = document.querySelector('pre code');
    const textToCopy = codeElement.textContent;
    navigator.clipboard.writeText(textToCopy).then(function() {
        alert('¡Código copiado al portapapeles!');
    }, function(err) {
        console.error('Error al copiar: ', err);
    });
}

function downloadFile() {
    const codeElement = document.querySelector('pre code');
    const content = codeElement.textContent;
    const blob = new Blob([content], { type: 'application/javascript' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schemes.js';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Configuración de Genspark (badges y tokens)
window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDgTc%2B8DYgE56DrjqRkCnngNeh3lRzpL5wL7nC4RyTc9gfd7RfdQrVU80Kkst%2B4KBCtuxx5BJQuij86moVsXUoPXqZqZ25noQZpbBMJS71wKHK3EPOwAeuu%2FIzluueA4PCwMoMmMSgBPyi3aL730wyF3EueoTM%2FIKXCI4FtbQKZbjXcdHM67ah3JQVBnINS6s9wNoDcCM8s%2B3p0xV4Dhrii3RC2sIsW2L7kQu1u4Rr1oOoXvG58%2Fg8jvMmdkGM7e%2Fo6JLK5mv%2F6GFpPf8Ei2GnE%2Fn5UslPAiF5ksPfHhmRtbvEoKf4hyrMvLdNCVnof0rZDH6WnzctdMj3zikp%2BleFWxysuasi6XEGsIVsGnZVVL42TOmVVkRi8J9CVvwLOjIQtcnb4l38Bixa7Dm5Z%2BCPGB5bloVP6Rhdosp9Cr8r2ZlKaeCb%2FU0%2FCWkC9ICDvSUSRt%2FG%2F9p3VDXPoEKGvg6RCGnIb%2BwfnTexnfqN23pt0%2BrVKLXMpJZYxy9z7NG6OsCoQ%3D%3D";
window.__genspark_locale = "es-ES";
window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDgTc+8DYgE56DrjqRkCnngNeh3lRzpL5wL7nC4RyTc9gfd7RfdQrVU80Kkst+4KBCtuxx5BJQuij86moVsXUoPXqZqZ25noQZpbBMJS71wKHK3EPOwAeuu/IzluueA4PCwMoMmMSgBPyi3aL730wyF3EueoTM/IKXCI4FtbQKZbjXcdHM67ah3JQVBnINS6s9wNoDcCM8s+3p0xV4Dhrii3RC2sIsW2L7kQu1u4Rr1oOoXvG58/g8jvMmdkGM7e/o6JLK5mv/6GFpPf8Ei2GnE/n5UslPAiF5ksPfHhmRtbvEoKf4hyrMvLdNCVnof0rZDH6WnzctdMj3zikp+leFWxysuasi6XEGsIVsGnZVVL42TOmVVkRi8J9CVvwLOjIQtcnb4l38Bixa7Dm5Z+CPGB5bloVP6Rhdosp9Cr8r2ZlKaeCb/U0/CWkC9ICDvSUSRt/G/9p3VDXPoEKGvg6RCGnIb+wfnTexnfqN23pt0+rVKLXMpJZYxy9z7NG6OsCoQ==";

// Carga dinámica del script externo de Genspark
(function() {
    var s = document.createElement('script');
    s.id = 'html_notice_dialog_script';
    s.src = 'https://www.genspark.ai/notice_dialog.js';
    document.body.appendChild(s);
})();
