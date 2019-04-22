'use strict';

const htmlPattern = {
    bookTitlePattern: /<div class='bookTitle'>([\s\S]*?)<\/div>/g,
    sectionHeadingPattern: /<h2 class='sectionHeading'>([\s\S]*?)<\/h2>/g,
    authorPattern: /<div class='authors'>([\s\S]*?)<\/div>/g,
    noteHeadingsPattern: /<h3 class='noteHeading'>([\s\S]*?)<\/div>/g,
    noteTextPattern: /<div class='noteText'>([\s\S]*?)<\/h3>/g
};

// ` .` | ` ,` | ` :` | `“ ` | ` ”` | `( ` | ` )` | ` ?` | ` !`
const removeWhiteSpacePattern = {
    removeWhiteSpaces: /(\b \.)|(\b \,)|(\b \:)|(\“ \b)|(\b \”)|(\( \b)|(\b \))|(\b \?)|(\b \!)/g
};

module.exports.htmlPattern = htmlPattern;
module.exports.removeWhiteSpacePattern = removeWhiteSpacePattern;

