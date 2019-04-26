# Kindle Notes to Markdown

## Overview

This is a simple script which converts the standard HTML export from the kindle app in to the markdown file format. The reason I wrote this script is because the kindle HTML format contains a lot of punctuation errors. Additionally, because of the formatting it is not a pleasant experience to read the kindle notes in this exported HTML format.

__Example of the kindle export (.html) opened in Chrome:__

>(Quotes from "Der Wüstenplanet - Frank Herbert")

![Der Wüstenplanet - Frank Herbert](https://user-images.githubusercontent.com/12247845/56811269-a78cf180-6838-11e9-90df-76a02e8e5d3b.png)


__Example of converted file (.md-format) opened in VS Code (Extension: Markdown All in One):__
>(Quotes from "Der Wüstenplanet - Frank Herbert")

![Der Wüstenplanet - Frank Herbert](https://user-images.githubusercontent.com/12247845/56811416-efac1400-6838-11e9-9fc2-3ac42c5c7d44.png)


## Benefits

- You can simply read your notes in a beautiful formatted text on all your devices. Personally I synchronize all my .md files to a cloud service from which I have easily access from all my devices. (For reading the files in Markdown format I can recommend apps like "Bear Notes" or "Pretext" (iOS)).
- You can easily edit your quotes or add additional notes to your quotes.
- Easy conversion: Export your html file from the Kindle App and convert it with a simple command and save it automatically to your favorite file destination.

## How to use ?
  __*IMPORTANT NOTE*__: 
  
  __The IMPORT File is not allowed to have spaces in the name. (In this version of the script)!__

- `git clone https://github.com/sclowbird/kindleNotesToMarkdown.git`
- cd to `.\kindleNotesToMarkdown\`
  - run `npm install`
- Open `kindleNotesToMarkdown/config/app-settings.js`
  - Change `importFilePath` according to your needs
    - `importFilePath` is the path from where the kindle html document is imported. __If you run the script, the file you want to converse has to be in this folder.__ I choose my documents folder because it is the regular export path from the kindle app (macOS).
  - Change `writeFileLocation`
    - This is the location where the result of the conversion is saved to. I choose, as already said, my cloud service path.
- Export your kindle notes:
  - Open a book in your kindle notes app/program.
  - In the upper right corner click "Show notebook".
  - Click "Export"
  - Click "Save as.."
  - Save it to the `importFilePath` path configured in `app-settings.js`.
- cd to `.\kindleNotesToMarkdown\`
  - __(Don't include the file ending  .html)__
  - run `npm start <NameOfHtmlFile>` 
    - e.g. `npm start DerWüstenplanetRoman`  
- I made a simple alias in my `.bash_profile` so i can run the script from everywhere. 
  - BASH RC alias example:
    - `alias kindlenote='npm start --prefix /Users/gregor/Projects/kindleNotesToMarkdown/ '`

Example: 


![Running the script](https://user-images.githubusercontent.com/12247845/56811445-0488a780-6839-11e9-827a-688bae6d5596.png)








