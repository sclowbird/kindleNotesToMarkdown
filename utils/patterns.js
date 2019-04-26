'use strict';

const htmlPattern = {
    bookTitlePattern: /<div class='bookTitle'>([\s\S]*?)<\/div>/g,
    sectionHeadingPattern: /<h2 class='sectionHeading'>([\s\S]*?)<\/h2>/g,
    authorPattern: /<div class='authors'>([\s\S]*?)<\/div>/g,
    noteHeadingsPattern: /<h3 class='noteHeading'>([\s\S]*?)<\/div>/g,
    noteTextPattern: /<div class='noteText'>([\s\S]*?)<\/h3>/g
};

function puncutationPattern() {
    let map = new Map();
    map.set(/(\b \.)/g, ".");
    map.set(/(\b \,)/g, ",");
    map.set(/(\b \:)/g, ":");
    map.set(/(\b \;)/g, ";");
    map.set(/(\“ \b)/g, "“");
    map.set(/( \”)/g, "”");
    map.set(/(\( \b)/g, "(");
    map.set(/(\b \))/g, ")");
    map.set(/(\b \?)/g, "?");
    map.set(/(\b \!)/g, "!");
    map.set(/(\b \-)/g, "-");
    map.set(/(\- \b)/g, "-");
    return map;
};



module.exports.htmlPattern = htmlPattern;
module.exports.puncutationPattern = puncutationPattern;

