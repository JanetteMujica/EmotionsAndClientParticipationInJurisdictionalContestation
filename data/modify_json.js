const fs = require('fs');

// Load the JSON data from your file
const jsonData = require('./bibliography.json');

// Process each entry and generate a new ID
jsonData.forEach((entry) => {
	const authors = entry.author || [];
	const editors = entry.editor || [];
	const year =
		(entry.issued &&
			entry.issued['date-parts'] &&
			entry.issued['date-parts'][0][0]) ||
		'';

	let authorNames;
	if (authors.length > 0) {
		authorNames = authors.map((author) => author.family).join('-');
	} else if (editors.length > 0) {
		authorNames = editors.map((editor) => editor.family).join('-');
	} else {
		// Handle the case when neither author nor editor is available
		authorNames = 'Unknown';
	}

	const newId = `${authorNames}-${year}`;

	// Keep the original ID as an alias
	const originalId = entry.id;
	if (!entry.aliases) {
		entry.aliases = {};
	}
	entry.aliases[originalId] = newId;

	// Update the 'id' field with the new ID
	entry.id = newId;
});

// Sort the entries by alphabetical order of the 'id' field
jsonData.sort((a, b) => a.id.localeCompare(b.id));

// Write the modified JSON data back to a file
fs.writeFileSync(
	'./modified_bibliography.json',
	JSON.stringify(jsonData, null, 2)
);
