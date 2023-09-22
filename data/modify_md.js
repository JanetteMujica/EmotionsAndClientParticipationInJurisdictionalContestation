const fs = require('fs');

// Read the input Markdown file
const inputFilePath = 'articleWithPandocCitations.md';
const markdownContent = fs.readFileSync(inputFilePath, 'utf-8');

// Regular expression pattern for matching Pandoc-style citations
const pandocCitationRegex = /@(\w+)_(\w+)_(\d+)(?:[^\]]*(?:\[(?:p(\d+))?\]))?/g;

// Function to replace Pandoc-style citations with Hugo shortcodes
function replaceCitation(match, author, title, year, pageNumber) {
	// Capitalize the first letter of the author's last name
	const lastName = author.charAt(0).toUpperCase() + author.slice(1);

	// Create the modified entryID
	const modifiedEntryID = `${lastName}-${year}`;

	let shortcode = `{{< cite "${modifiedEntryID}"`;
	if (pageNumber) {
		shortcode += ` ${pageNumber}`;
	}
	shortcode += ' >}}';
	return shortcode;
}

// Replace Pandoc-style citations with Hugo shortcodes
const modifiedContent = markdownContent.replace(
	pandocCitationRegex,
	replaceCitation
);

// Write the modified content back to the file
const outputFilePath = 'articleWithHugoCitations.md';
fs.writeFileSync(outputFilePath, modifiedContent, 'utf-8');

console.log('Conversion completed. Check articleWithHugoCitations.md');
