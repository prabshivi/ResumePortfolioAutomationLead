const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'resume.txt');
const outputPath = path.join(__dirname, 'assets', 'Shivi_Prabhakar_Resume.pdf');

try {
    console.log('Running cupsfilter...');
    const pdfData = execSync(`/usr/sbin/cupsfilter ${inputPath}`, { stdio: ['pipe', 'pipe', 'ignore'] });
    console.log('Writing PDF...');
    fs.writeFileSync(outputPath, pdfData);
    console.log('PDF written successfully to', outputPath);
} catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
}
