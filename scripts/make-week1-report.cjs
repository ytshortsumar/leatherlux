const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, HeadingLevel
} = require('docx')
const fs = require('fs')

const TNR = 'Times New Roman'
const GREY = 'E0E0E0'

// helper: a bold or normal Times New Roman run
function run(text, { bold = false, size = 24, italics = false } = {}) {
  return new TextRun({ text, bold, italics, font: TNR, size })
}
function para(children, opts = {}) {
  return new Paragraph({ children: Array.isArray(children) ? children : [children], ...opts })
}

// A line inside the activities cell
function line(text, { bold = false, spaceAfter = 20 } = {}) {
  return new Paragraph({
    spacing: { after: spaceAfter },
    children: [run(text, { bold })],
  })
}

const singleBorder = { style: BorderStyle.SINGLE, size: 4, color: 'auto' }
const cellBorders = { top: singleBorder, bottom: singleBorder, left: singleBorder, right: singleBorder }

// ---------- Header ----------
const header = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [run('COMSATS University Islamabad', { bold: true, size: 28 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [run('Sahiwal Campus', { bold: true, size: 26 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [run('Department of Computer Science', { bold: true, size: 26 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 200 },
    children: [run('INTERNSHIP WEEKLY REPORTS', { bold: true, size: 28 })],
  }),
]

// ---------- Info table ----------
function infoRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 3969, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: GREY },
        borders: cellBorders,
        children: [para(run(label, { bold: true }))],
      }),
      new TableCell({
        width: { size: 6642, type: WidthType.DXA },
        borders: cellBorders,
        children: [para(run(value))],
      }),
    ],
  })
}

const infoTable = new Table({
  width: { size: 10611, type: WidthType.DXA },
  columnWidths: [3969, 6642],
  rows: [
    infoRow('Name:', 'Umar Farooq'),
    infoRow('Reg. #:', 'SP24-BCS-063'),
    infoRow('Starting Date:', '20/07/2026'),
    infoRow('End Date:', '15/08/2026'),
    infoRow('Organization Name & Address:', 'Zynvex'),
  ],
})

// ---------- Weeks table ----------
function weekLabelCell(text) {
  const lines = text.split('\n').map((t) =>
    new Paragraph({ alignment: AlignmentType.CENTER, children: [run(t, { bold: true })] })
  )
  return new TableCell({
    width: { size: 2581, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: GREY },
    borders: cellBorders,
    children: lines,
  })
}

// Week 1 activities cell content
const week1 = [
  line('Activities Performed:', { bold: true }),
  line('Set up the project with Vite + React and installed Bootstrap 5 and React Router.'),
  line('Initialized Git and created/pushed the project to a GitHub repository.'),
  line('Built the responsive Navbar (logo, mobile menu, Shop category dropdown) and the Footer (brand info, quick links, newsletter form, social icons).'),
  line('Built the Home page: Hero image carousel, Features strip, and a Featured Products section.'),
  line('Created a reusable ProductCard component and mock product data for six leather products.'),
  line('Built out the About and Contact pages with real content and a working contact form UI.'),
  line('Deployed the site to Vercel and configured routing so all pages work on the live link.'),
  line('Tasks Accomplished:', { bold: true }),
  line('Configured a working React development environment and project structure.'),
  line('Practiced the Git workflow — commits, pushes, and daily progress tracking.'),
  line('Developed fully responsive pages using React components and CSS.'),
  line('Completed Module 1 and deployed a live production build to Vercel (https://leatherlux.vercel.app).'),
  line('Challenges Faced:', { bold: true }),
  line('Fixed a full-width layout bug and several missing-import errors early on.'),
  line('Resolved a 404 error on page refresh on the live site by adding a vercel.json SPA rewrite.'),
  line('Optimized large product images (~15 MB down to ~1.4 MB) for faster load times.'),
  line('Skills Acquired:', { bold: true }),
  line('React (components, props, hooks)'),
  line('React Router'),
  line('Bootstrap 5 & Responsive Web Design'),
  line('Git & GitHub'),
  line('Deployment with Vercel'),
  line('Goals for Next Week:', { bold: true }),
  line('Build the Shop / product listing page with a responsive product grid.'),
  line('Add category and price filtering using React state.'),
  line('Build the Product Detail page with dynamic routing.'),
  line('Integrate Firebase Firestore to replace the mock product data.', { spaceAfter: 0 }),
]

function activitiesCell(children) {
  return new TableCell({
    width: { size: 8028, type: WidthType.DXA },
    borders: cellBorders,
    children,
  })
}

const weeksHeaderRow = new TableRow({
  tableHeader: true,
  children: [
    new TableCell({
      width: { size: 2581, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: GREY },
      borders: cellBorders,
      children: [para(run('Weeks', { bold: true }), { alignment: AlignmentType.CENTER })],
    }),
    new TableCell({
      width: { size: 8028, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: GREY },
      borders: cellBorders,
      children: [para(run('Student Activities', { bold: true }), { alignment: AlignmentType.CENTER })],
    }),
  ],
})

const weeksTable = new Table({
  width: { size: 10609, type: WidthType.DXA },
  columnWidths: [2581, 8028],
  rows: [
    weeksHeaderRow,
    new TableRow({ children: [weekLabelCell('Week 1\n20/07/2026 to\n26/07/2026'), activitiesCell(week1)] }),
    new TableRow({ children: [weekLabelCell('Week 2\n27/07/2026 to\n02/08/2026'), activitiesCell([para(run(''))])] }),
    new TableRow({ children: [weekLabelCell('Week 3\n03/08/2026 to\n09/08/2026'), activitiesCell([para(run(''))])] }),
    new TableRow({ children: [weekLabelCell('Week 4\n10/08/2026 to\n15/08/2026'), activitiesCell([para(run(''))])] }),
  ],
})

// ---------- Signatures ----------
function sigBlock(title, lines) {
  const kids = [new Paragraph({ spacing: { before: 240, after: 60 }, children: [run(title, { bold: true })] })]
  lines.forEach((l) => kids.push(new Paragraph({ spacing: { after: 40 }, children: [run(l)] })))
  return kids
}

const signatures = [
  ...sigBlock('Signature of Site Supervisor', ['Name _____________________', 'Designation ________________', 'Date______________________']),
  ...sigBlock('Signature of Faculty Supervisor', ['Name _____________________', 'Designation ________________', 'Date______________________']),
  ...sigBlock('Signature of Student', ['_____________________']),
]

// ---------- Document ----------
const doc = new Document({
  styles: { default: { document: { run: { font: TNR, size: 24 } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 } } },
    children: [
      ...header,
      infoTable,
      new Paragraph({ spacing: { after: 120 }, children: [] }),
      weeksTable,
      ...signatures,
    ],
  }],
})

Packer.toBuffer(doc).then((buf) => {
  const out = 'D:/Internship details/Module 1/Week 1 Report - Umar Farooq.docx'
  fs.writeFileSync(out, buf)
  console.log('WROTE: ' + out + ' (' + buf.length + ' bytes)')
})
