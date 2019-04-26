'use strict';

const winston = require('winston');
const htmlToText = require('html-to-text');

const appSettings = require('./config/app-settings');
const { htmlPattern, puncutationPattern, markdownPattern } = require('./utils/patterns');
const { loadFile, writeToFile, FILEPATH } = require('./utils/utils');

const args = process.argv;
const logger = winston.createLogger(appSettings.winston.logConfig);

(function loadHtmlContent() {
    let bookTitle = '';
    loadFile(appSettings.importFilePath+args[2]+appSettings.importFileFormat).then((fileContent) => {
        return fileContent;
    }).then((htmlData) => {
        logger.info('Extracting text from html elements...', 'textFromHtmlElements()')
        return textFromHtmlElements(htmlData);
    }).then((noteText) => {
        logger.info('Add markdown formats to texts...', 'addMarkdownToText()')
        bookTitle += (noteText.foundBookTitle[0] + appSettings.exportFileFormat);
        return addMarkdownToText(noteText);
    }).then((markdownText) => {
        logger.info('Bring text in the right order...', 'bringTextElementsInOrder()')
        return bringTextElementsInOrder(markdownText);
    }).then((markDownTextString) => {
        logger.info('Writing text to markdown file...', 'writeMarkdownTextToFile()')
        writeMarkdownTextToFile(bookTitle, markDownTextString);
        logger.info(`File successfully written and saved to path '${FILEPATH}${bookTitle}'`, 'loadHtmlContent()')
    }).catch((err) => {
        logger.error(`Error: ${err.message}`, `loadHtmlContent()`);
    });
})();


function textFromHtmlElements(htmlData) {
    let extractedTextFromHtml = {
        foundAuthor: extractHtmlElements(htmlData, htmlPattern.authorPattern),
        foundBookTitle: extractHtmlElements(htmlData, htmlPattern.bookTitlePattern),
        foundSectionHeading: extractHtmlElements(htmlData, htmlPattern.sectionHeadingPattern),
        foundNoteHeadings: extractHtmlElements(htmlData, htmlPattern.noteHeadingsPattern),
        foundNoteText: extractHtmlElements(htmlData, htmlPattern.noteTextPattern)
    }
    return extractedTextFromHtml;
};

function extractHtmlElements(htmlData, pattern) {
    let foundHtmlElements = htmlData.match(pattern);
    return convertHtmlToText(foundHtmlElements);
};


function convertHtmlToText(extractedHtml) {
    for(let i = 0; i < extractedHtml.length; i++) {
        extractedHtml[i] = htmlToText.fromString(extractedHtml[i]);
    }
    return sanitizeConvertedHtmlText(extractedHtml);
};

function sanitizeConvertedHtmlText(convertedText) {
    return sanitizeWhiteSpaceBeforePunctuations(convertedText);
}

function sanitizeWhiteSpaceBeforePunctuations(convertedText) {
    let replacePunctuations = puncutationPattern();
    for(let i = 0; i < convertedText.length; i ++) {
        for(let [punctuationPattern, punctuationString] of replacePunctuations) {
            convertedText[i] = convertedText[i].replace(punctuationPattern, punctuationString);
        };
    }
    return convertedText;
};

function addMarkdownToText(noteTextObject) {
    let markdownTexts = {
        bookTitleMarkdown: appendMarkdownString(noteTextObject.foundBookTitle, markdownPattern.oneHashHeading),
        authorMarkdown: appendMarkdownString(noteTextObject.foundAuthor, markdownPattern.threeHashHeading),
        sectionHeadingMarkdown: appendMarkdownString(noteTextObject.foundSectionHeading, markdownPattern.bulletList),
        noteHeadingMarkdown: appendMarkdownString(noteTextObject.foundNoteHeadings, markdownPattern.fiveHashHeading),
        noteTextMarkdown: appendMarkdownString(noteTextObject.foundNoteText, markdownPattern.quote)
    }
    return markdownTexts;
};


function appendMarkdownString(text, markdownBeginning) {
    for(let i = 0; i < text.length; i++) {
        text[i] = markdownBeginning + text[i] + markdownPattern.doubleLineBreak;
    }
    return text;
};

function bringTextElementsInOrder(markdownTextObject) {
    let kindleNoteString = "";
    kindleNoteString += (markdownTextObject.bookTitleMarkdown[0]);
    kindleNoteString += (markdownTextObject.authorMarkdown[0]);
    for(let j = 0; j < markdownTextObject.sectionHeadingMarkdown.length; j++) {
        kindleNoteString += (markdownTextObject.sectionHeadingMarkdown[j]);
    }
    for(let i = 0; i < markdownTextObject.noteHeadingMarkdown.length; i++) {
        kindleNoteString += (markdownTextObject.noteHeadingMarkdown[i]);
        kindleNoteString += (markdownTextObject.noteTextMarkdown[i]);
    }
    return kindleNoteString;
};

function writeMarkdownTextToFile(bookTitle, stringText) {
    writeToFile(bookTitle, stringText);
};
