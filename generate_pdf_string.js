const pdfHeader = '%PDF-1.4\n';

const objects = [];

function addObject(content) {
    const id = objects.length + 1;
    objects.push({ id, content });
    return `${id} 0 R`;
}

// Objects definition
const catalogRef = '1 0 R';
const pagesRef = '2 0 R';
const pageRef = '3 0 R';
const resourcesRef = '4 0 R';
const contentRef = '5 0 R';
const fontRef = '6 0 R';

const bodyText = `BT
/F1 18 Tf
50 800 Td
(SHIVI PRABHAKAR) Tj
/F1 11 Tf
0 -22 Td
(QA Automation Development Lead & SDET) Tj
0 -16 Td
(Email: shivi2010vit@gmail.com | Phone: +1 647-xxx-xxxx | Toronto, ON) Tj
0 -16 Td
(LinkedIn: https://www.linkedin.com/in/shivi-prabhakar-60565851) Tj
0 -16 Td
(GitHub: https://github.com/prabshivi) Tj
0 -24 Td
(PROFESSIONAL SUMMARY) Tj
0 -16 Td
(Detail-oriented QA Automation Development Lead and SDET with a 10-year track record) Tj
0 -14 Td
(engineering robust, high-velocity testing architectures for cross-platform enterprise web) Tj
0 -14 Td
(and mobile applications. Dedicated to upholding the highest quality standards through) Tj
0 -14 Td
(mentoring, framework design, and CI/CD pipelines.) Tj
0 -24 Td
(PROFESSIONAL EXPERIENCE) Tj
0 -16 Td
(Empire Life - QA Automation Development Lead | Dec 2023 - Present) Tj
0 -14 Td
(- Led a team of 10 QA engineers in the Retail Insurance Automation domain.) Tj
0 -14 Td
(- Architected scalable hybrid automation frameworks (Selenium + Java + Cucumber).) Tj
0 -14 Td
(- Integrated nightly regressions and test runs via GitHub Actions pipelines.) Tj
0 -14 Td
(- Conducted Web Accessibility (AODA) compliance audits using WAVE and Level Access.) Tj
0 -14 Td
(- Designed comprehensive QA metrics and quality analytical dashboards in PowerBI.) Tj
0 -18 Td
(Royal Bank of Canada (RBC) - Lead SDET | Aug 2022 - Dec 2023) Tj
0 -14 Td
(- Managed service-level verification for the RBC Mobile App.) Tj
0 -14 Td
(- Automated and validated API endpoints using Postman, ReadyAPI, and TestComplete.) Tj
0 -14 Td
(- Monitored application health and network performance with Dynatrace.) Tj
0 -14 Td
(- Verified SWIFT and Fedwire global financial transactions.) Tj
0 -14 Td
(- Integrated watchlist filtering (FircoSoft) for financial crime compliance.) Tj
0 -18 Td
(Empire Life - QA Automation Development Lead | Dec 2019 - Aug 2022) Tj
0 -14 Td
(- Spearheaded automation initiatives across the Retail Insurance / Wealth platforms.) Tj
0 -14 Td
(- Built and scaled test automation frameworks using Selenium and Cypress.) Tj
0 -18 Td
(Workman Inc. - Senior QA Developer | Sep 2019 - Jan 2020) Tj
0 -14 Td
(- Developed backend REST API automation frameworks & ran Cassandra verification.) Tj
0 -18 Td
(Broadsign - QA Tester & Performance Lead | Aug 2018 - Sep 2019) Tj
0 -14 Td
(- Automated test suites using Cucumber and Maven (Java); load testing via JMeter.) Tj
0 -22 Td
(EDUCATION & CERTIFICATIONS) Tj
0 -16 Td
(Cegep de la Gaspesie - Post Graduate Diploma in Mobile Application Development) Tj
0 -14 Td
(Vellore Institute of Technology - B.Tech in Electronics & Communication (3.88 GPA)) Tj
0 -14 Td
(Credentials: ISTQB Certified Tester | Scrum Master Agile Delivery Specialist) Tj
ET`;

// Build PDF structure
const obj1 = `<< /Type /Catalog /Pages ${pagesRef} >>`;
const obj2 = `<< /Type /Pages /Kids [${pageRef}] /Count 1 >>`;
const obj3 = `<< /Type /Page /Parent ${pagesRef} /MediaBox [0 0 595.275 841.889] /Resources ${resourcesRef} /Contents ${contentRef} >>`;
const obj4 = `<< /Font << /F1 ${fontRef} >> >>`;
const obj5 = `<< /Length ${bodyText.length} >>\nstream\n${bodyText}\nendstream`;
const obj6 = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

const rawObjs = [obj1, obj2, obj3, obj4, obj5, obj6];
let currentOffset = pdfHeader.length;
const offsets = [];

let pdfBody = '';
rawObjs.forEach((obj, index) => {
    const id = index + 1;
    const objStr = `${id} 0 obj\n${obj}\nendobj\n`;
    offsets.push(currentOffset);
    currentOffset += objStr.length;
    pdfBody += objStr;
});

const startxref = currentOffset;

let xref = `xref\n0 ${rawObjs.length + 1}\n0000000000 65535 f \n`;
offsets.forEach(offset => {
    const padded = String(offset).padStart(10, '0');
    xref += `${padded} 00000 n \n`;
});

const trailer = `trailer\n<< /Size ${rawObjs.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

const finalPdf = pdfHeader + pdfBody + xref + trailer;

console.log(Buffer.from(finalPdf).toString('base64'));
