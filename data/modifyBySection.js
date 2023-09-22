const fs = require('fs');

// Read the input Markdown file
const inputFilePath = 'articleWithHugoCitations.md'; // Replace with your input file path
const markdownContent = fs.readFileSync(inputFilePath, 'utf-8');

// Split the Markdown content into sections based on ## headers
const sections = markdownContent.split(/\n(?=##)/);

// Create separate Markdown files for each section
sections.forEach((section, index) => {
	// Extract the section title (assumes ## Title format)
	const sectionTitleMatch = section.match(/^## (.+)$/m);
	const sectionTitle = sectionTitleMatch
		? sectionTitleMatch[1]
		: `Section${index + 1}`;

	// Generate the output file name (e.g., section1.md, section2.md, ...)
	const outputFileName = `section${index + 1}.md`;

	// Define YAML front matter
	const frontMatter = `---
title: "${sectionTitle}"
weight: ${index + 1}
bibFile: data/modified_bibliography.json
---`;

	// Combine front matter and section content
	const sectionWithFrontMatter = frontMatter + '\n\n' + section;

	// Write the section content with front matter to the output file
	fs.writeFileSync(outputFileName, sectionWithFrontMatter, 'utf-8');

	console.log(`Created ${outputFileName} for section: ${sectionTitle}`);
});
