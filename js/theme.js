var prime_col_cls = "primary-colour";
var sec_col_cls = "secondary-colour";
var accent_col_cls = "accent-colour";
var third_col_cls = "third-colour";

var prime_col = "#DBE37D"
var sec_col = "#5C91DB";
var accent_col = "#54E2EF";
var third_col = "#13B6C4";

(function () {
    const pairs = [
        [prime_col_cls, prime_col],
        [sec_col_cls, sec_col],
        [accent_col_cls, accent_col],
        [third_col_cls, third_col]
    ]

    const css = ":root {\n" + 
        pairs.map(p => ` --${p[0]}: ${p[1]};`).join("\n") + 
        "\n}\n\n" +
        pairs.map(p => `.${p[0]} { color: ${p[1]}; }`).join("\n");

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    document.adoptedStyleSheets.push(sheet);
})();