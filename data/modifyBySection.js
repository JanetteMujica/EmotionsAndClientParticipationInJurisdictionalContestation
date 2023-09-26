const fs = require('fs');

// Read the input Markdown file
const inputFilePath = 'articleWithHugoCitations.md'; // Replace with your input file path
const markdownContent = fs.readFileSync(inputFilePath, 'utf-8');

// Split the Markdown content into sections based on ## or ### headers
const sections = markdownContent.split(/\n(?=##|#)/);

// Create separate Markdown files for each section
sections.forEach((section, index) => {
	// Extract the section title (assumes ## Title or ### Subtitle format)
	const sectionTitleMatch = section.match(/^(##|###) (.+)$/m);
	let sectionTitle = `Section${index + 1}`;
	let isSubtitle = false;

	if (sectionTitleMatch) {
		if (sectionTitleMatch[1] === '###') {
			isSubtitle = true;
		}
		sectionTitle = sectionTitleMatch[2];
	}

	// Remove the title from the section content
	const sectionContent = section.replace(/^(##|###) (.+)$/m, '');

	// Define YAML front matter
	const frontMatter = `---
title: "${sectionTitle}"
weight: ${index + 1}
bibFile: data/modified_bibliography.json
subtitle: ${isSubtitle}
---`;

	// Combine front matter and section content
	const sectionWithFrontMatter = frontMatter + '\n\n' + sectionContent.trim();

	// Generate the output file name (e.g., section1.md, section2.md, ...)
	const outputFileName = `section${index + 1}.md`;

	// Write the section content with front matter to the output file
	fs.writeFileSync(outputFileName, sectionWithFrontMatter, 'utf-8');

	console.log(`Created ${outputFileName} for section: ${sectionTitle}`);
});
