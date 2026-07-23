g="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>10xDS Reverse BIM — AI-Powered Engineering Estimation</title>
<meta name="description" content="10xDS Reverse BIM converts RFQ drawings and documents into structured engineering intelligence for cathodic protection proposal workflows." />
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
/* ===== RESET & BASE ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 14px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: #FAFAFA; color: #1A1A1A; line-height: 1.5; }

/* ===== DESIGN TOKENS ===== */
:root {
  --primary: #1E3A8A;
  --primary-light: rgba(30,58,138,0.08);
  --primary-hover: #1e3070;
  --accent: #EA580C;
  --accent-light: rgba(234,88,12,0.10);
  --bg: #FAFAFA;
  --text: #1A1A1A;
  --text-secondary: #6B7280;
  --border: #E5E7EB;
  --success: #16A34A;
  --success-bg: rgba(22,163,74,0.10);
  --warning: #D97706;
  --warning-bg: rgba(217,119,6,0.10);
  --error: #DC2626;
  --error-bg: rgba(220,38,38,0.10);
  --card-radius: 8px;
  --sidebar-width: 240px;
}

/* ===== LAYOUT ===== */
#app-root { display: flex; min-height: 100vh; }

/* ===== SIDEBAR ===== */
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  background: #fff;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}
.sidebar-logo {
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--border);
}
.sidebar-logo h1 {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-logo .logo-mark {
  width: 32px; height: 32px;
  background: var(--primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}
.sidebar-logo .logo-sub {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-secondary);
  margin-top: 2px;
}
.sidebar-nav {
  flex: 1;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.15s ease;
  user-select: none;
  position: relative;
}
.nav-item:hover { background: var(--primary-light); color: var(--text); }
.nav-item.active {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 600;
  border-left-color: var(--primary);
}
.nav-item svg { width: 18px; height: 18px; flex-shrink: 0; opacity: 0.7; }
.nav-item.active svg { opacity: 1; }

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-secondary);
}

/* ===== MAIN AREA ===== */
.main-area {
  margin-left: var(--sidebar-width);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.topbar {
  height: 56px;
  background: #fff;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 50;
}
.topbar-left { display: flex; align-items: center; gap: 8px; }
.topbar-breadcrumb { font-size: 12px; color: var(--text-secondary); }
.topbar-breadcrumb span { color: var(--text-secondary); }
.topbar-title { font-size: 16px; font-weight: 600; color: var(--text); }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.topbar-workspace { font-size: 13px; color: var(--text-secondary); }
.topbar-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.content {
  flex: 1;
  padding: 28px 32px 40px;
  max-width: 1440px;
  width: 100%;
}

/* ===== CARDS ===== */
.card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  padding: 20px 24px;
}
.card-header {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
}
.card-sm { padding: 16px 20px; }

/* ===== BADGES ===== */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 100px;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
.badge-success { background: var(--success-bg); color: var(--success); }
.badge-warning { background: var(--warning-bg); color: var(--warning); }
.badge-error { background: var(--error-bg); color: var(--error); }
.badge-info { background: var(--primary-light); color: var(--primary); }
.badge-accent { background: var(--accent-light); color: var(--accent); }

/* ===== TABLES ===== */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th {
  text-align: left;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
td {
  padding: 12px 16px;
  font-size: 13.5px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}
tr:last-child td { border-bottom: none; }
tbody tr { transition: background 0.1s ease; }
tbody tr:hover { background: #F9FAFB; }

/* ===== BUTTONS ===== */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 6px;
  font-size: 13.5px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}
.btn-primary {
  background: var(--primary);
  color: #fff;
}
.btn-primary:hover { background: var(--primary-hover); }
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}
.btn-ghost:hover { background: #F3F4F6; color: var(--text); }

/* ===== DROPZONE ===== */
.dropzone {
  border: 2px dashed var(--border);
  border-radius: var(--card-radius);
  padding: 48px;
  text-align: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fff;
}
.dropzone:hover { border-color: var(--primary); background: var(--primary-light); }
.dropzone svg { margin-bottom: 12px; }
.dropzone-title { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 4px; }
.dropzone-sub { font-size: 12.5px; }

/* ===== CONFIDENCE BAR ===== */
.confidence-bar-wrap { display: flex; align-items: center; gap: 8px; }
.confidence-bar {
  flex: 1;
  height: 6px;
  background: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
  max-width: 80px;
}
.confidence-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
.confidence-val { font-size: 12px; font-weight: 500; color: var(--text-secondary); min-width: 32px; }

/* ===== GRID HELPERS ===== */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.grid-main-side { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
.grid-main-side-wide { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }

/* ===== SPLIT SCREEN ===== */
.split { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.split-pane { border: 1px solid var(--border); background: #fff; border-radius: var(--card-radius); overflow: hidden; }
.split-pane-label {
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border);
  background: #F9FAFB;
}

/* ===== KNOWLEDGE GRAPH ===== */
.graph-canvas {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  position: relative;
  overflow: hidden;
  min-height: 480px;
}
.graph-legend {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: var(--text-secondary);
  background: rgba(255,255,255,0.92);
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--border);
}
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
}

/* ===== NODE ===== */
.graph-node {
  position: absolute;
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  z-index: 2;
  white-space: nowrap;
}
.graph-node:hover {
  border-color: var(--primary);
  box-shadow: 0 2px 12px rgba(30,58,138,0.15);
  transform: scale(1.05);
  z-index: 10;
}
.graph-node.hub {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  font-weight: 600;
  padding: 12px 18px;
  font-size: 13px;
}
.graph-node.hub:hover { background: var(--primary-hover); transform: scale(1.05); }
.node-icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
}
.node-equipment .node-icon { background: #DBEAFE; color: #1E3A8A; }
.node-standard .node-icon { background: #FEF3C7; color: #92400E; }
.node-cost .node-icon { background: #D1FAE5; color: #065F46; }
.node-zone .node-icon { background: #EDE9FE; color: #5B21B6; }
.node-labour .node-icon { background: #FCE7F3; color: #9D174D; }

/* ===== EDGE LABELS ===== */
.edge-label {
  position: absolute;
  font-size: 10px;
  color: var(--text-secondary);
  background: rgba(250,250,250,0.9);
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
}

/* ===== QUESTION PANEL ===== */
.question-panel { display: flex; flex-direction: column; gap: 16px; }
.search-input {
  width: 100%;
  padding: 10px 14px 10px 36px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s ease;
  background: #F9FAFB;
}
.search-input:focus { border-color: var(--primary); background: #fff; }
.search-input-wrap { position: relative; }
.search-input-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-secondary); }
.question-item {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text);
  cursor: pointer;
  transition: all 0.15s ease;
  line-height: 1.45;
}
.question-item:hover { border-color: var(--primary); background: var(--primary-light); }
.question-item .q-icon {
  color: var(--primary);
  font-size: 12px;
  margin-right: 6px;
  opacity: 0.6;
}

/* ===== COST STACK ===== */
.cost-stack { display: flex; flex-direction: column; gap: 12px; }
.cost-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13.5px;
}
.cost-row:last-child { border-bottom: none; }
.cost-label { color: var(--text-secondary); font-weight: 400; }
.cost-value { font-weight: 600; color: var(--text); }
.cost-total-row {
  padding: 14px 0 4px;
  border-top: 2px solid var(--text);
  border-bottom: none;
}
.cost-total-row .cost-label { font-weight: 600; color: var(--text); font-size: 14px; }
.cost-total-row .cost-value { font-size: 18px; color: var(--primary); }

.editable-field {
  background: #F9FAFB;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 13px;
  font-family: inherit;
  width: 52px;
  text-align: right;
  font-weight: 500;
  color: var(--text);
}

/* ===== PIPELINE STEPPER ===== */
.stepper {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 4px 0;
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  white-space: nowrap;
}
.step.active { color: var(--primary); font-weight: 600; }
.step.completed { color: var(--success); }
.step-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
}
.step.active .step-dot { background: var(--primary); border-color: var(--primary); }
.step.completed .step-dot { background: var(--success); border-color: var(--success); }
.step-connector {
  width: 32px;
  height: 2px;
  background: var(--border);
  flex-shrink: 0;
}
.step.completed + .step-connector,
.step.active + .step-connector { background: var(--primary); }

/* ===== KPI CARD ===== */
.kpi-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  padding: 20px 24px;
}
.kpi-label { font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px; }
.kpi-value { font-size: 28px; font-weight: 700; color: var(--text); line-height: 1.1; }
.kpi-sub { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }

/* ===== AGENT STATUS ===== */
.agent-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  padding: 16px 20px;
}
.agent-name { font-size: 13.5px; font-weight: 600; margin-bottom: 4px; }
.agent-task { font-size: 12.5px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4; }
.agent-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 500;
}
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.status-active .status-dot { background: var(--success); }
.status-idle .status-dot { background: var(--text-secondary); }
.status-complete .status-dot { background: var(--primary); }
.status-active { color: var(--success); }
.status-idle { color: var(--text-secondary); }
.status-complete { color: var(--primary); }

/* ===== REVISION ===== */
.revision-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
}
.rev-badge {
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
}
.rev-arrow { font-size: 18px; color: var(--text-secondary); }
.delta-positive { color: var(--accent); font-weight: 600; }
.delta-negative { color: var(--success); font-weight: 600; }

/* ===== FILE TYPE ICONS ===== */
.file-icon {
  width: 28px; height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  flex-shrink: 0;
}
.file-pdf { background: #FEE2E2; color: #991B1B; }
.file-xlsx { background: #D1FAE5; color: #065F46; }
.file-docx { background: #DBEAFE; color: #1E3A8A; }
.file-dwg { background: #FEF3C7; color: #92400E; }

/* ===== TRANSITIONS ===== */
.fade-enter { opacity: 0; transform: translateY(8px); }
.fade-active { opacity: 1; transform: translateY(0); transition: opacity 0.3s ease, transform 0.3s ease; }

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }

/* ===== SVG DRAWING ===== */
.drawing-svg { width: 100%; height: 100%; }
.drawing-svg text { font-family: 'Inter', system-ui, sans-serif; }

/* ===== MISC ===== */
.section-title { font-size: 16px; font-weight: 600; margin-bottom: 20px; color: var(--text); }
.meta-text { font-size: 12px; color: var(--text-secondary); }
.mb-24 { margin-bottom: 24px; }
.mb-16 { margin-bottom: 16px; }
.mb-8 { margin-bottom: 8px; }
.gap-24 { gap: 24px; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-8 { gap: 8px; }
.gap-12 { gap: 12px; }
.gap-16 { gap: 16px; }
.text-right { text-align: right; }
.font-mono { font-family: 'SF Mono', 'Fira Code', monospace; }

.auto-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--primary);
  background: var(--primary-light);
  padding: 4px 10px;
  border-radius: 100px;
  font-weight: 500;
}
.auto-badge svg { width: 12px; height: 12px; }

/* ===== DRAWING EXTRACTION V2 ===== */
.de-layout { display: grid; grid-template-columns: 1fr; gap: 20px; position: relative; }
.de-layout.history-open { grid-template-columns: 1fr 280px; }

/* Extraction pipeline stepper */
.extraction-stepper {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 12px 20px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  margin-bottom: 20px;
}
.ext-step {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  white-space: nowrap;
  padding: 4px 0;
}
.ext-step.completed { color: var(--success); }
.ext-step.active { color: var(--primary); font-weight: 600; }
.ext-step-num {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  flex-shrink: 0;
}
.ext-step.completed .ext-step-num { background: var(--success); border-color: var(--success); color: #fff; }
.ext-step.active .ext-step-num { background: var(--primary); border-color: var(--primary); color: #fff; box-shadow: 0 0 0 3px rgba(30,58,138,0.15); }
.ext-step-conn { width: 24px; height: 1.5px; background: var(--border); flex-shrink: 0; margin: 0 6px; }
.ext-step.completed + .ext-step-conn { background: var(--success); }

/* Drawing canvas with annotations */
.drawing-canvas-wrap {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  overflow: hidden;
}
.drawing-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  background: #F9FAFB;
}
.drawing-toolbar-left { display: flex; align-items: center; gap: 12px; }
.drawing-toolbar-title { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text-secondary);
  transition: all 0.15s ease;
  font-family: inherit;
}
.toggle-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }
.toggle-btn:hover:not(.active) { background: #F3F4F6; }

/* SVG annotation overlays */
@keyframes annotationPulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.35; }
}
.annotation-overlay { pointer-events: none; }
.annotation-box { cursor: pointer; pointer-events: all; }
.annotation-box rect { transition: all 0.3s ease; }
.annotation-box.highlighted rect {
  stroke-width: 2.5 !important;
  filter: drop-shadow(0 0 6px rgba(30,58,138,0.3));
}
.annotation-box.highlighted .ann-fill {
  animation: annotationPulse 1.5s ease-in-out infinite;
}

/* Object table V2 with actions */
.obj-table-v2 { background: #fff; border: 1px solid var(--border); border-radius: var(--card-radius); overflow: hidden; }
.obj-table-v2 table { margin: 0; }
.obj-row-active { background: rgba(30,58,138,0.06) !important; }
.obj-row-clickable { cursor: pointer; }
.obj-row-clickable:hover { background: #F3F4F6; }

/* Action buttons */
.action-group { display: flex; gap: 4px; }
.action-btn {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10.5px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text-secondary);
  transition: all 0.12s ease;
  font-family: inherit;
  white-space: nowrap;
}
.action-btn:hover { background: #F3F4F6; }
.action-btn-accept { color: var(--success); border-color: rgba(22,163,74,0.3); }
.action-btn-accept:hover { background: var(--success-bg); }
.action-btn-accept.selected { background: var(--success); color: #fff; border-color: var(--success); }
.action-btn-flag { color: var(--warning); border-color: rgba(217,119,6,0.3); }
.action-btn-flag:hover { background: var(--warning-bg); }
.action-btn-flag.selected { background: var(--warning); color: #fff; border-color: var(--warning); }
.action-btn-correct { color: var(--primary); border-color: rgba(30,58,138,0.3); }
.action-btn-correct:hover { background: var(--primary-light); }

/* History sidebar */
.history-sidebar {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  overflow: hidden;
  height: fit-content;
}
.history-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.history-header-title { font-size: 13px; font-weight: 600; }
.history-close {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  color: var(--text-secondary);
  transition: background 0.1s;
  border: none;
  background: none;
  font-size: 16px;
}
.history-close:hover { background: #F3F4F6; }
.history-list { padding: 8px; }
.history-item {
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s ease;
  border: 1px solid transparent;
  margin-bottom: 4px;
}
.history-item:hover { background: #F9FAFB; }
.history-item.active { background: var(--primary-light); border-color: rgba(30,58,138,0.15); }
.history-item-rev { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
.history-item-date { font-size: 11px; color: var(--text-secondary); margin-bottom: 4px; }
.history-item-summary { font-size: 11.5px; color: var(--text-secondary); line-height: 1.4; }
.history-item-stats { display: flex; gap: 10px; margin-top: 6px; }
.history-stat {
  font-size: 10.5px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 3px;
}
.history-stat-val { font-weight: 600; color: var(--text); }

/* History toggle button */
.history-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text-secondary);
  transition: all 0.15s ease;
  font-family: inherit;
}
.history-toggle-btn:hover { background: #F3F4F6; color: var(--text); }
.history-toggle-btn.active { background: var(--primary-light); color: var(--primary); border-color: rgba(30,58,138,0.2); }

/* Extraction stats bar */
.extraction-stats {
  display: flex;
  gap: 24px;
  padding: 12px 20px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  margin-bottom: 16px;
}
.ext-stat { display: flex; flex-direction: column; }
.ext-stat-label { font-size: 11px; color: var(--text-secondary); margin-bottom: 2px; }
.ext-stat-value { font-size: 18px; font-weight: 700; }
</style>
</head>
<body>
<div id="app-root"></div>

<script type="text/babel">
const { useState, useEffect, useRef } = React;

// ─── ICONS (inline SVGs) ──────────────────────
const Icons = {
  upload: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  inbox: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  share2: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  calculator: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/></svg>,
  gitCompare: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/><path d="M18 3v12"/></svg>,
  barChart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  zap: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  shieldCheck: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  clock: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  arrowRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

// ─── NAV CONFIG ──────────────────────
const navItems = [
  { id: 'rfq', label: 'RFQ Ingestion', icon: Icons.inbox },
  { id: 'drawing', label: 'Drawing Extraction', icon: Icons.layers },
  { id: 'explorer', label: 'Object Explorer', icon: Icons.share2 },
  { id: 'estimator', label: 'Estimator Workbench', icon: Icons.calculator },
  { id: 'revision', label: 'Revision Impact', icon: Icons.gitCompare },
  { id: 'dashboard', label: 'Dashboard', icon: Icons.barChart },
];

const pageTitles = {
  rfq: 'RFQ Ingestion',
  drawing: 'Drawing Extraction',
  explorer: 'Object Explorer — Knowledge Graph',
  estimator: 'Estimator Workbench',
  revision: 'Revision Impact Dashboard',
  dashboard: 'Management Dashboard',
  settings: 'Platform Settings',
};

// ─── SIDEBAR ──────────────────────
function Sidebar({ active, onNav }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>
          <div className="logo-mark">10x</div>
          <div>
            Reverse BIM
            <div className="logo-sub">by 10xDS</div>
          </div>
        </h1>
      </div>
      <div className="sidebar-nav">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item${active === item.id ? ' active' : ''}`}
            onClick={() => onNav(item.id)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        v1.0.0 · Enterprise Edition
      </div>
    </div>
  );
}

// ─── TOPBAR ──────────────────────
function TopBar({ page, onNav }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-breadcrumb">Reverse BIM <span>/ </span></span>
        <span className="topbar-title">{pageTitles[page]}</span>
      </div>
      <div className="topbar-right">
        <span className="topbar-workspace">ADNOC CP Retrofit — Phase II</span>
        <div 
          className="topbar-avatar" 
          style={{cursor: 'pointer'}} 
          onClick={() => onNav(page === 'settings' ? 'toggleSettings' : 'settings')}
          title={page === 'settings' ? 'Back to Previous Page' : 'Settings'}
        >
          AK
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SCREEN 1: RFQ INGESTION
// ═══════════════════════════════════════
const initialEnquiries = [
  {
    name: 'ADNOC CP Retrofit',
    files: [
      { name: 'CP_Plot_Plan_Rev4.dwg', type: 'dwg', sizeBytes: 4404019, sizeStr: '4.2 MB', status: 'Classified' },
      { name: 'BOQ_Template_CP.xlsx', type: 'xlsx', sizeBytes: 1153433, sizeStr: '1.1 MB', status: 'Classified' },
      { name: 'Technical_Specification_CP.pdf', type: 'pdf', sizeBytes: 3984588, sizeStr: '3.8 MB', status: 'Classified' },
      { name: 'Scope_of_Work.docx', type: 'docx', sizeBytes: 911360, sizeStr: '890 KB', status: 'Classified' },
      { name: 'Cable_Schedule_Rev3.xlsx', type: 'xlsx', sizeBytes: 2516582, sizeStr: '2.4 MB', status: 'Classified' },
    ]
  },
  {
    name: 'Bapco Refinery Upgrade',
    files: [
      { name: 'Anode_Layout_Area_A.dwg', type: 'dwg', sizeBytes: 5976883, sizeStr: '5.7 MB', status: 'Processing' },
      { name: 'Instrumentation_Diagram.pdf', type: 'pdf', sizeBytes: 6396313, sizeStr: '6.1 MB', status: 'Processing' },
      { name: 'Material_Requisition.xlsx', type: 'xlsx', sizeBytes: 1887436, sizeStr: '1.8 MB', status: 'Classified' },
    ]
  },
  {
    name: 'QatarEnergy LNG Expansion',
    files: [
      { name: 'General_Arrangement_GA01.dwg', type: 'dwg', sizeBytes: 7654604, sizeStr: '7.3 MB', status: 'Classified' },
      { name: 'Vendor_Qualification.pdf', type: 'pdf', sizeBytes: 2306867, sizeStr: '2.2 MB', status: 'Needs Review' },
      { name: 'Site_Survey_Report.docx', type: 'docx', sizeBytes: 4718592, sizeStr: '4.5 MB', status: 'Classified' },
    ]
  }
];

function RFQIngestion({ enquiries }) {
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiries.length > 0 ? enquiries[0].name : '');
  const [sortBySize, setSortBySize] = useState({});

  const statusBadge = (s) => {
    if (s === 'Classified') return <span className="badge badge-success">{Icons.check} {s}</span>;
    if (s === 'Processing') return <span className="badge badge-info">{s}</span>;
    return <span className="badge badge-accent">{s}</span>;
  };

  const toggleSort = (enqName) => {
    setSortBySize(prev => {
      const current = prev[enqName];
      let next = 'desc';
      if (current === 'desc') next = 'asc';
      else if (current === 'asc') next = null;
      return { ...prev, [enqName]: next };
    });
  };

  const sortedEnquiries = [...enquiries].sort((a, b) => a.name.localeCompare(b.name));

  const allFiles = enquiries.flatMap(e => e.files);
  const classified = allFiles.filter(f => f.status === 'Classified').length;
  const processing = allFiles.filter(f => f.status === 'Processing').length;

  return (
    <div>
      <div className="card mb-24" style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--border)', background: '#FAFAFA'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '400px'}}>
          <label style={{fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap'}}>Select Enquiry:</label>
          <select 
            value={selectedEnquiry} 
            onChange={(e) => setSelectedEnquiry(e.target.value)}
            style={{flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '14px', fontFamily: 'inherit', outline: 'none'}}
          >
            {sortedEnquiries.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
          </select>
        </div>
        <div className="dropzone" style={{width: '100%', border: 'none', background: 'transparent', padding: '16px 0 0', cursor: 'pointer'}}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{margin: '0 auto 12px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div className="dropzone-title">Drop RFQ files or click to browse</div>
          <div className="dropzone-sub" style={{marginTop: 4}}>Uploading to: <span style={{fontWeight: 600, color: 'var(--primary)'}}>{selectedEnquiry}</span></div>
          <div className="dropzone-sub" style={{marginTop: 4}}>PDF, XLSX, DOCX, DWG — up to 50 MB per file</div>
        </div>
      </div>
      
      <div className="grid-main-side-wide">
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          {sortedEnquiries.map((enq) => {
            let files = [...enq.files];
            const sortOrder = sortBySize[enq.name];
            if (sortOrder === 'asc') {
              files.sort((a, b) => a.sizeBytes - b.sizeBytes);
            } else if (sortOrder === 'desc') {
              files.sort((a, b) => b.sizeBytes - a.sizeBytes);
            }

            return (
              <div key={enq.name} className="card" style={{padding: 0}}>
                <div style={{padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: '#F9FAFB'}}>
                  <div style={{fontWeight: 600, fontSize: '15px'}}>{enq.name} <span className="badge badge-info" style={{marginLeft: 8}}>{enq.files.length} files</span></div>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th style={{paddingLeft: 24}}>Filename</th>
                        <th>Type</th>
                        <th style={{cursor: 'pointer', userSelect: 'none', color: sortOrder ? 'var(--primary)' : 'var(--text-secondary)'}} onClick={() => toggleSort(enq.name)}>
                          Size {sortOrder === 'desc' ? '↓' : sortOrder === 'asc' ? '↑' : '↕'}
                        </th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((f, i) => (
                        <tr key={i}>
                          <td style={{paddingLeft: 24}}>
                            <div style={{display:'flex', alignItems:'center', gap: 10}}>
                              <div className={`file-icon file-${f.type}`}>{f.type}</div>
                              <span style={{fontWeight: 500}}>{f.name}</span>
                            </div>
                          </td>
                          <td style={{color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase'}}>{f.type}</td>
                          <td style={{color: 'var(--text-secondary)'}}>{f.sizeStr}</td>
                          <td>{statusBadge(f.status)}</td>
                        </tr>
                      ))}
                      {files.length === 0 && (
                        <tr>
                          <td colSpan="4" style={{textAlign: 'center', padding: '24px', color: 'var(--text-secondary)'}}>No files in this enquiry.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{display:'flex', flexDirection:'column', gap: 16}}>
          <div className="card card-sm">
            <div className="meta-text mb-8">Total Files Across Enquiries</div>
            <div style={{fontSize: 28, fontWeight: 700}}>{allFiles.length}</div>
          </div>
          <div className="card card-sm">
            <div className="meta-text mb-8">Files Classified</div>
            <div style={{fontSize: 28, fontWeight: 700, color: 'var(--success)'}}>{classified}</div>
            <div className="meta-text" style={{marginTop: 4}}>{processing} still processing</div>
          </div>
          <div className="card card-sm">
            <div className="meta-text mb-8">Active Enquiries</div>
            <div style={{fontSize: 28, fontWeight: 700}}>{enquiries.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SCREEN 2: DRAWING EXTRACTION (V2 — Real Drawing)
// ═══════════════════════════════════════

// Annotations mapped to real regions on the TK-2903 tank drawing (% of image)
const extractedObjects = [
  { id: 'TK-2903', type: 'Storage Tank', attrs: 'API 650, Ø15.850m × 14.630m H, Produced Water', refs: 'Design Data Table', confidence: 97, color: '#1E3A8A', bbox: { x: 10, y: 5, w: 30, h: 42 } },
  { id: 'NZ-N1', type: 'Nozzle', attrs: '24" Inlet Nozzle, RF Flange, CS', refs: 'Nozzle Schedule', confidence: 92, color: '#065F46', bbox: { x: 2, y: 22, w: 8, h: 10 } },
  { id: 'NZ-N11', type: 'Nozzle', attrs: '4" Drain Nozzle, SW, A106 Gr.B', refs: 'Nozzle Schedule', confidence: 78, color: '#065F46', bbox: { x: 76, y: 60, w: 22, h: 25 } },
  { id: 'ACH-01', type: 'Anchor Chair', attrs: 'Per API 650, 8 Nos., Welded Base', refs: 'Anchor Chair Detail', confidence: 88, color: '#92400E', bbox: { x: 47, y: 52, w: 18, h: 28 } },
  { id: 'FDN-01', type: 'Foundation Data', attrs: 'Ring Wall, Load 945 kN, Seismic Zone 2B', refs: 'Foundation Load Data', confidence: 94, color: '#5B21B6', bbox: { x: 66, y: 42, w: 33, h: 14 } },
  { id: 'CPS-01', type: 'Coating System', attrs: 'Epoxy Primer + MIO Intermediate, DFT 350μm', refs: 'Coating & Painting Spec', confidence: 85, color: '#9D174D', bbox: { x: 47, y: 30, w: 22, h: 20 } },
  { id: 'MAT-01', type: 'Material Spec', attrs: 'API 650, Shell A516 Gr.70, Roof A36', refs: 'Materials of Construction', confidence: 91, color: '#1E3A8A', bbox: { x: 47, y: 54, w: 21, h: 18 } },
  { id: 'TTL-BLK', type: 'Title Block', attrs: 'TK-2903 A/B, GA Drawing, Rev A, NTS', refs: 'Drawing Register', confidence: 99, color: '#6B7280', bbox: { x: 57, y: 88, w: 42, h: 11 } },
];

const extractionSteps = [
  { label: 'OCR', status: 'completed' },
  { label: 'Object Detection', status: 'completed' },
  { label: 'Classification', status: 'completed' },
  { label: 'Attribute Extraction', status: 'active' },
  { label: 'Cross-Reference', status: '' },
];

const drawingHistory = [
  { rev: 'Rev A', date: '18 Jul 2026', author: 'M. Al-Rashid', summary: 'Initial GA drawing issued for review. TK-2903 A/B produced water storage tank.', objects: 8, changes: 0, active: true },
  { rev: 'Rev 0', date: '02 Jul 2026', author: 'S. Nair', summary: 'Preliminary issue — nozzle schedule incomplete, foundation loads TBC.', objects: 5, changes: 3 },
  { rev: 'IFR', date: '15 Jun 2026', author: 'K. Patel', summary: 'Issued for review — anchor chair detail added, coating spec updated.', objects: 4, changes: 2 },
];

function DrawingWithAnnotations({ highlightedId, showAnnotations, onObjectClick }) {
  return (
    <div style={{position: 'relative', lineHeight: 0, background: '#fff'}}>
      <img
        src="drawing.jpg"
        alt="TK-2903 A/B Produced Water Storage Tank — General Arrangement Drawing"
        style={{width: '100%', height: 'auto', display: 'block'}}
      />
      {/* Annotation overlays positioned as % of image */}
      {showAnnotations && extractedObjects.map((obj) => {
        const b = obj.bbox;
        const isHL = highlightedId === obj.id;
        return (
          <div
            key={obj.id}
            onClick={() => onObjectClick && onObjectClick(obj.id)}
            style={{
              position: 'absolute',
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              border: `2px ${isHL ? 'solid' : 'dashed'} ${obj.color}`,
              background: isHL ? `${obj.color}20` : `${obj.color}0A`,
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isHL ? `0 0 12px ${obj.color}40` : 'none',
              zIndex: isHL ? 10 : 1,
            }}
          >
            {/* Label tag */}
            <div style={{
              position: 'absolute',
              top: -18,
              left: 0,
              background: obj.color,
              color: '#fff',
              fontSize: 9,
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '3px 3px 0 0',
              whiteSpace: 'nowrap',
              fontFamily: "'Inter', system-ui, sans-serif",
              lineHeight: '14px',
            }}>
              {obj.id}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DrawingExtraction() {
  const [highlightedId, setHighlightedId] = useState(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [actions, setActions] = useState({});

  const handleAction = (id, action) => {
    setActions(prev => ({ ...prev, [id]: prev[id] === action ? null : action }));
  };

  const acceptedCount = Object.values(actions).filter(a => a === 'accept').length;
  const flaggedCount = Object.values(actions).filter(a => a === 'flag').length;

  return (
    <div>
      {/* Extraction Pipeline Stepper */}
      <div className="extraction-stepper">
        <div style={{fontSize: 12, fontWeight: 600, color: 'var(--text)', marginRight: 16, whiteSpace: 'nowrap'}}>Extraction Pipeline</div>
        {extractionSteps.map((step, i) => (
          <React.Fragment key={i}>
            <div className={`ext-step ${step.status}`}>
              <div className="ext-step-num">
                {step.status === 'completed' ? '✓' : i + 1}
              </div>
              {step.label}
            </div>
            {i < extractionSteps.length - 1 && (
              <div className="ext-step-conn" style={{
                background: step.status === 'completed' ? 'var(--success)' : 'var(--border)'
              }}/>
            )}
          </React.Fragment>
        ))}
        <div style={{marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center'}}>
          <span className="auto-badge">
            {Icons.zap} Processing
            <span style={{marginLeft: 4}}>{Icons.clock} ~45s remaining</span>
          </span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="extraction-stats">
        <div className="ext-stat">
          <span className="ext-stat-label">Objects Detected</span>
          <span className="ext-stat-value">{extractedObjects.length}</span>
        </div>
        <div className="ext-stat">
          <span className="ext-stat-label">Avg. Confidence</span>
          <span className="ext-stat-value" style={{color: 'var(--success)'}}>
            {Math.round(extractedObjects.reduce((a,o) => a + o.confidence, 0) / extractedObjects.length)}%
          </span>
        </div>
        <div className="ext-stat">
          <span className="ext-stat-label">Accepted</span>
          <span className="ext-stat-value" style={{color: acceptedCount > 0 ? 'var(--success)' : 'var(--text-secondary)'}}>
            {acceptedCount}/{extractedObjects.length}
          </span>
        </div>
        <div className="ext-stat">
          <span className="ext-stat-label">Flagged</span>
          <span className="ext-stat-value" style={{color: flaggedCount > 0 ? 'var(--warning)' : 'var(--text-secondary)'}}>
            {flaggedCount}
          </span>
        </div>
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
          <button
            className={`history-toggle-btn${showHistory ? ' active' : ''}`}
            onClick={() => setShowHistory(!showHistory)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Drawing History
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className={`de-layout${showHistory ? ' history-open' : ''}`}>
        <div>
          {/* Drawing Canvas with Annotations */}
          <div className="drawing-canvas-wrap mb-16">
            <div className="drawing-toolbar">
              <div className="drawing-toolbar-left">
                <span className="drawing-toolbar-title">TK-2903 A/B — General Arrangement</span>
                <span className="badge badge-info" style={{fontSize: 10}}>Rev A</span>
              </div>
              <div style={{display: 'flex', gap: 6}}>
                <button
                  className={`toggle-btn${showAnnotations ? ' active' : ''}`}
                  onClick={() => setShowAnnotations(!showAnnotations)}
                >
                  {showAnnotations ? '◉' : '○'} AI Annotations
                </button>
              </div>
            </div>
            <div style={{position: 'relative'}}>
              <DrawingWithAnnotations
                highlightedId={highlightedId}
                showAnnotations={showAnnotations}
                onObjectClick={(id) => setHighlightedId(highlightedId === id ? null : id)}
              />
            </div>
          </div>

          {/* Extracted Objects Table with Actions */}
          <div className="obj-table-v2">
            <div style={{padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontWeight: 600, fontSize: 14}}>Extracted Objects</span>
              <span className="meta-text">{highlightedId ? `Viewing: ${highlightedId}` : 'Click a row or annotation to highlight'}</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{paddingLeft: 20}}>Object ID</th>
                    <th>Type</th>
                    <th>Key Attributes</th>
                    <th>Confidence</th>
                    <th style={{paddingRight: 20}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {extractedObjects.map((obj) => (
                    <tr
                      key={obj.id}
                      className={`obj-row-clickable${highlightedId === obj.id ? ' obj-row-active' : ''}`}
                      onClick={() => setHighlightedId(highlightedId === obj.id ? null : obj.id)}
                    >
                      <td style={{paddingLeft: 20}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                          <div style={{width: 8, height: 8, borderRadius: '50%', background: obj.color, flexShrink: 0}}/>
                          <span style={{fontWeight: 600, fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 12}}>{obj.id}</span>
                        </div>
                      </td>
                      <td><span className="badge badge-info">{obj.type}</span></td>
                      <td style={{fontSize: 12.5, maxWidth: 220}}>{obj.attrs}</td>
                      <td>
                        <div className="confidence-bar-wrap">
                          <div className="confidence-bar">
                            <div className="confidence-bar-fill" style={{
                              width: `${obj.confidence}%`,
                              background: obj.confidence >= 90 ? 'var(--success)' : obj.confidence >= 80 ? 'var(--warning)' : 'var(--error)'
                            }}/>
                          </div>
                          <span className="confidence-val">{obj.confidence}%</span>
                        </div>
                      </td>
                      <td style={{paddingRight: 20}} onClick={(e) => e.stopPropagation()}>
                        <div className="action-group">
                          <button
                            className={`action-btn action-btn-accept${actions[obj.id] === 'accept' ? ' selected' : ''}`}
                            onClick={() => handleAction(obj.id, 'accept')}
                          >✓ Accept</button>
                          <button
                            className={`action-btn action-btn-flag${actions[obj.id] === 'flag' ? ' selected' : ''}`}
                            onClick={() => handleAction(obj.id, 'flag')}
                          >⚑ Flag</button>
                          <button
                            className="action-btn action-btn-correct"
                            onClick={() => {}}
                          >✎ Correct</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Collapsible Drawing History Sidebar */}
        {showHistory && (
          <div className="history-sidebar">
            <div className="history-header">
              <span className="history-header-title">Drawing History</span>
              <button className="history-close" onClick={() => setShowHistory(false)}>×</button>
            </div>
            <div className="history-list">
              {drawingHistory.map((h, i) => (
                <div key={i} className={`history-item${h.active ? ' active' : ''}`}>
                  <div className="history-item-rev">
                    {h.rev}
                    {h.active && <span className="badge badge-info" style={{marginLeft: 8, fontSize: 10}}>Current</span>}
                  </div>
                  <div className="history-item-date">{h.date} · {h.author}</div>
                  <div className="history-item-summary">{h.summary}</div>
                  <div className="history-item-stats">
                    <span className="history-stat">
                      Objects: <span className="history-stat-val">{h.objects}</span>
                    </span>
                    {h.changes > 0 && (
                      <span className="history-stat" style={{color: 'var(--accent)'}}>
                        Δ <span className="history-stat-val" style={{color: 'var(--accent)'}}>{h.changes}</span> changes
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




// ═══════════════════════════════════════
// SCREEN 3: OBJECT EXPLORER / KNOWLEDGE GRAPH (HERO)
// ═══════════════════════════════════════
const graphNodes = [
  { id: 'hub', label: 'CBL-045 — XLPE 1×35mm²', x: 50, y: 50, category: 'hub' },
  { id: 'n1', label: 'Rectifier REC-001', x: 18, y: 18, category: 'equipment' },
  { id: 'n2', label: 'Junction Box JB-012', x: 80, y: 15, category: 'equipment' },
  { id: 'n3', label: 'IEC 62561-7', x: 12, y: 72, category: 'standard' },
  { id: 'n4', label: 'NACE SP0169-2013', x: 30, y: 88, category: 'standard' },
  { id: 'n5', label: 'Unit Rate: $18.40/m', x: 82, y: 78, category: 'cost' },
  { id: 'n6', label: 'Install Labour: 0.35 hr/m', x: 72, y: 92, category: 'labour' },
  { id: 'n7', label: 'Zone A — Tank Farm', x: 85, y: 42, category: 'zone' },
];

const graphEdges = [
  { from: 'hub', to: 'n1', label: 'connects to' },
  { from: 'hub', to: 'n2', label: 'terminates at' },
  { from: 'hub', to: 'n3', label: 'governed by' },
  { from: 'hub', to: 'n4', label: 'governed by' },
  { from: 'hub', to: 'n5', label: 'priced by' },
  { from: 'hub', to: 'n6', label: 'installed per' },
  { from: 'hub', to: 'n7', label: 'located in' },
];

const graphQuestions = [
  "What is the total cable length required in Zone A and what's the estimated cost?",
  "Which rectifiers are connected to Anode Bed AB-003 and what is the design current?",
  "List all equipment governed by NACE SP0169-2013 with their installation labour norms.",
  "What junction boxes are within 50m of the pipeline and what IP rating do they require?",
  "Show me the cost breakdown for all cathodic protection items in Area B.",
];

function ObjectExplorer({ enquiries }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiries.length > 0 ? enquiries[0].name : '');

  const nodeMap = {};
  graphNodes.forEach(n => { 
    nodeMap[n.id] = { ...n }; 
    if (n.category === 'hub' && selectedEnquiry) {
      nodeMap[n.id].label = `Project: ${selectedEnquiry}`;
    }
  });

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'equipment': return '#1E3A8A';
      case 'standard': return '#92400E';
      case 'cost': return '#065F46';
      case 'zone': return '#5B21B6';
      case 'labour': return '#9D174D';
      default: return '#6B7280';
    }
  };

  const isHighlighted = (nodeId) => {
    if (!hoveredNode) return false;
    if (nodeId === hoveredNode) return true;
    return graphEdges.some(e =>
      (e.from === hoveredNode && e.to === nodeId) ||
      (e.to === hoveredNode && e.from === nodeId)
    );
  };

  const isEdgeHighlighted = (edge) => {
    if (!hoveredNode) return false;
    return edge.from === hoveredNode || edge.to === hoveredNode;
  };

  return (
    <div>
      <div style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
        <span style={{fontWeight: 600, fontSize: '14px', color: 'var(--text)'}}>Knowledge Graph Context:</span>
        <select 
          className="search-input"
          style={{padding: '8px 12px', width: '320px', background: '#fff'}}
          value={selectedEnquiry}
          onChange={(e) => setSelectedEnquiry(e.target.value)}
        >
          {enquiries.map((enq, i) => <option key={i} value={enq.name}>{enq.name}</option>)}
        </select>
      </div>
      <div className="grid-main-side">
      <div className="graph-canvas">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
        >
          {graphEdges.map((e, i) => {
            const fromN = nodeMap[e.from];
            const toN = nodeMap[e.to];
            const highlighted = isEdgeHighlighted(e);
            return (
              <line
                key={i}
                x1={fromN.x}
                y1={fromN.y}
                x2={toN.x}
                y2={toN.y}
                stroke={highlighted ? '#1E3A8A' : '#D1D5DB'}
                strokeWidth={highlighted ? 0.4 : 0.2}
                strokeDasharray={highlighted ? 'none' : '1 0.8'}
                style={{transition: 'all 0.3s ease'}}
              />
            );
          })}
        </svg>

        {/* Edge labels */}
        {graphEdges.map((e, i) => {
          const fromN = nodeMap[e.from];
          const toN = nodeMap[e.to];
          const mx = (fromN.x + toN.x) / 2;
          const my = (fromN.y + toN.y) / 2;
          const highlighted = isEdgeHighlighted(e);
          return (
            <div
              key={i}
              className="edge-label"
              style={{
                left: `${mx}%`,
                top: `${my}%`,
                transform: 'translate(-50%, -50%)',
                opacity: highlighted ? 1 : 0.55,
                fontWeight: highlighted ? 500 : 400,
                color: highlighted ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'all 0.3s ease',
              }}
            >
              {e.label}
            </div>
          );
        })}

        {/* Nodes */}
        {graphNodes.map((n) => {
          const highlighted = isHighlighted(n.id);
          const dimmed = hoveredNode && !highlighted;
          return (
            <div
              key={n.id}
              className={`graph-node ${n.category === 'hub' ? 'hub' : `node-${n.category}`}`}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: dimmed ? 0.35 : 1,
                transition: 'all 0.3s ease',
                borderColor: (highlighted && n.category !== 'hub') ? getCategoryColor(n.category) : undefined,
              }}
              onMouseEnter={() => { setHoveredNode(n.id); }}
              onMouseLeave={() => { setHoveredNode(null); }}
            >
              {n.category !== 'hub' && (
                <div className="node-icon" style={{background: `${getCategoryColor(n.category)}18`, color: getCategoryColor(n.category)}}>
                  {n.category === 'equipment' ? '⚡' : n.category === 'standard' ? '📋' : n.category === 'cost' ? '$' : n.category === 'zone' ? '📍' : '👷'}
                </div>
              )}
              {n.category === 'hub' && <span style={{fontSize: 14}}>🔌</span>}
              {n.label}
            </div>
          );
        })}

        {/* Legend */}
        <div className="graph-legend">
          <span><span className="legend-dot" style={{background:'#1E3A8A'}}></span> Equipment</span>
          <span><span className="legend-dot" style={{background:'#92400E'}}></span> Standards</span>
          <span><span className="legend-dot" style={{background:'#065F46'}}></span> Cost / Rate</span>
          <span><span className="legend-dot" style={{background:'#5B21B6'}}></span> Zone</span>
          <span><span className="legend-dot" style={{background:'#9D174D'}}></span> Labour</span>
        </div>
      </div>

      {/* Right panel */}
      <div>
        <div className="card question-panel">
          <div className="card-header" style={{marginBottom: 12}}>Example Questions This Graph Can Answer</div>
          <div className="search-input-wrap">
            {Icons.search}
            <input type="text" className="search-input" placeholder="Ask about relationships, costs, standards…" />
          </div>
          {graphQuestions.map((q, i) => (
            <div key={i} className="question-item">
              <span className="q-icon">→</span> {q}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SCREEN 4: ESTIMATOR WORKBENCH
// ═══════════════════════════════════════
const boqData = [
  { item: '1.0', desc: 'Mobilization & Site Preparation', qty: 1, unit: 'LS', rate: 45000, total: 45000 },
  { item: '1.1', desc: 'Excavation & Trenching (600mm depth)', qty: 1200, unit: 'm', rate: 28, total: 33600 },
  { item: '2.0', desc: 'Supply & Install — XLPE Cable 1×35mm²', qty: 840, unit: 'm', rate: 18.4, total: 15456 },
  { item: '2.1', desc: 'Supply & Install — Cable Tray / Duct', qty: 380, unit: 'm', rate: 42, total: 15960 },
  { item: '3.0', desc: 'Supply — Transformer Rectifier Unit (50V/100A)', qty: 2, unit: 'EA', rate: 12500, total: 25000 },
  { item: '3.1', desc: 'Supply — MMO Ti Anode (1.5m depth)', qty: 24, unit: 'EA', rate: 680, total: 16320 },
  { item: '3.2', desc: 'Supply & Install — Junction Box IP66', qty: 8, unit: 'EA', rate: 420, total: 3360 },
  { item: '4.0', desc: 'Testing & Commissioning', qty: 1, unit: 'LS', rate: 18000, total: 18000 },
  { item: '4.1', desc: 'As-Built Documentation & Handover', qty: 1, unit: 'LS', rate: 8500, total: 8500 },
  { item: '5.0', desc: 'Demobilization', qty: 1, unit: 'LS', rate: 12000, total: 12000 },
];

function EstimatorWorkbench() {
  const materials = 75096;
  const labour = 42800;
  const logistics = 18400;
  const contingency = 6815;
  const subtotal = materials + labour + logistics + contingency;
  const margin = 12;
  const marginAmt = Math.round(subtotal * margin / 100);
  const grandTotal = subtotal + marginAmt;

  const formatCurrency = (n) => '$' + n.toLocaleString('en-US', {minimumFractionDigits: 0});

  return (
    <div className="grid-main-side-wide">
      <div className="card" style={{padding: 0}}>
        <div style={{padding: '16px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontWeight: 600, fontSize: 14}}>Bill of Quantities</span>
          <span className="meta-text">10 line items · Auto-generated from extraction</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{paddingLeft: 24, width: 60}}>Item</th>
                <th>Description</th>
                <th style={{textAlign:'right'}}>Qty</th>
                <th>Unit</th>
                <th style={{textAlign:'right'}}>Unit Rate</th>
                <th style={{textAlign:'right', paddingRight: 24}}>Total</th>
              </tr>
            </thead>
            <tbody>
              {boqData.map((row, i) => (
                <tr key={i}>
                  <td style={{paddingLeft: 24, fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 12, color: 'var(--text-secondary)'}}>{row.item}</td>
                  <td style={{fontWeight: 500}}>{row.desc}</td>
                  <td style={{textAlign:'right', fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 13}}>{row.qty.toLocaleString()}</td>
                  <td style={{color: 'var(--text-secondary)', fontSize: 12}}>{row.unit}</td>
                  <td style={{textAlign:'right', fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 13}}>{formatCurrency(row.rate)}</td>
                  <td style={{textAlign:'right', paddingRight: 24, fontWeight: 600, fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 13}}>{formatCurrency(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap: 16}}>
        <div className="card">
          <div className="card-header">Cost Summary</div>
          <div className="cost-stack">
            <div className="cost-row">
              <span className="cost-label">Materials</span>
              <span className="cost-value">{formatCurrency(materials)}</span>
            </div>
            <div className="cost-row">
              <span className="cost-label">Labour</span>
              <span className="cost-value">{formatCurrency(labour)}</span>
            </div>
            <div className="cost-row">
              <span className="cost-label">Logistics</span>
              <span className="cost-value">{formatCurrency(logistics)}</span>
            </div>
            <div className="cost-row">
              <span className="cost-label">Contingency (5%)</span>
              <span className="cost-value">{formatCurrency(contingency)}</span>
            </div>
            <div className="cost-row" style={{borderBottom:'none'}}>
              <span className="cost-label" style={{display:'flex', alignItems:'center', gap: 8}}>
                Margin
                <input type="text" className="editable-field" defaultValue="12%" />
              </span>
              <span className="cost-value">{formatCurrency(marginAmt)}</span>
            </div>
            <div className="cost-row cost-total-row">
              <span className="cost-label">Grand Total</span>
              <span className="cost-value">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" style={{width:'100%', justifyContent:'center', padding: '12px 20px'}}>
          {Icons.shieldCheck}
          Submit for Margin Approval
        </button>
        <div className="meta-text" style={{textAlign:'center'}}>
          Requires Commercial Lead sign-off before proposal generation
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SCREEN 5: REVISION IMPACT
// ═══════════════════════════════════════
const revisionImpacts = [
  { change: 'Rectifier REC-001 relocated 120m east (new foundation required)', qty: '+1 foundation pad', cost: '+$4,200', dir: 'up' },
  { change: 'Cable route CBL-045 extended by 120m to reach new rectifier position', qty: '+120m cable', cost: '+$2,208', dir: 'up' },
  { change: 'Trenching extended for cable route realignment', qty: '+120m trench', cost: '+$3,360', dir: 'up' },
  { change: 'Junction Box JB-012 removed (superseded by JB-015 in new layout)', qty: '-1 unit', cost: '-$420', dir: 'down' },
  { change: 'Additional test post TP-010 added near relocated rectifier', qty: '+1 unit', cost: '+$380', dir: 'up' },
];

function RevisionImpact() {
  return (
    <div>
      {/* Revision header card */}
      <div className="card mb-24">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="revision-header mb-8">
              <span className="rev-badge" style={{background: 'var(--primary-light)', color: 'var(--primary)'}}>Rev 3</span>
              <span className="rev-arrow">→</span>
              <span className="rev-badge" style={{background: 'var(--accent-light)', color: 'var(--accent)'}}>Rev 4</span>
            </div>
            <div style={{fontSize: 14, fontWeight: 500, marginBottom: 4}}>
              Rectifier REC-001 relocated 120m east within Area A plot boundary
            </div>
            <div className="meta-text">
              Design change issued 18 Jul 2026 — Cascading impacts auto-detected across 5 BOQ line items
            </div>
          </div>
          <div className="auto-badge">
            {Icons.zap}
            Recalculated automatically
            <span style={{marginLeft: 4}}>{Icons.clock} 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Impact table */}
      <div className="card" style={{padding: 0}}>
        <div style={{padding: '16px 24px 0', fontWeight: 600, fontSize: 14}}>Auto-Generated Impact Analysis</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{paddingLeft: 24, width: '50%'}}>Change</th>
                <th>Quantity Impact</th>
                <th style={{paddingRight: 24}}>Cost Impact</th>
              </tr>
            </thead>
            <tbody>
              {revisionImpacts.map((r, i) => (
                <tr key={i}>
                  <td style={{paddingLeft: 24, fontSize: 13}}>{r.change}</td>
                  <td>
                    <span className={r.dir === 'up' ? 'delta-positive' : 'delta-negative'}>
                      {r.qty}
                    </span>
                  </td>
                  <td style={{paddingRight: 24}}>
                    <span className={r.dir === 'up' ? 'delta-positive' : 'delta-negative'} style={{fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 13}}>
                      {r.cost}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span className="meta-text">Net cost impact of Rev 4 changes</span>
          <span style={{fontSize: 16, fontWeight: 700, color: 'var(--accent)', fontFamily: "'SF Mono','Fira Code',monospace"}}>+$9,728</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SCREEN 6: MANAGEMENT DASHBOARD
// ═══════════════════════════════════════
const pipelineSteps = [
  { label: 'RFQ Uploaded', status: 'completed' },
  { label: 'Classified', status: 'completed' },
  { label: 'Extracted', status: 'completed' },
  { label: 'Estimated', status: 'active' },
  { label: 'QA Review', status: '' },
  { label: 'Proposal Generated', status: '' },
];

const agents = [
  { name: 'Classifier Agent', task: 'Sorting 18 uploaded documents by type and relevance', status: 'complete' },
  { name: 'Extraction Agent', task: 'Parsing CP-101 Rev.4 drawing for object identification', status: 'complete' },
  { name: 'Graph Builder', task: 'Linking extracted objects to standards and cost tables', status: 'active' },
  { name: 'Estimator Agent', task: 'Generating BOQ line items from graph relationships', status: 'active' },
  { name: 'Revision Tracker', task: 'Monitoring Rev 3→4 deltas and cascading impacts', status: 'active' },
  { name: 'QA Validator', task: 'Waiting for estimation to complete before validation run', status: 'idle' },
];

function Dashboard() {
  return (
    <div>
      {/* KPIs */}
      <div className="grid-4 mb-24">
        <div className="kpi-card">
          <div className="kpi-label">Quantity Accuracy</div>
          <div className="kpi-value">94.2%</div>
          <div className="kpi-sub" style={{color: 'var(--success)'}}>↑ 2.1% from last quarter</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Turnaround Time</div>
          <div className="kpi-value">2.4h</div>
          <div className="kpi-sub">Per RFQ package</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Revision Processing</div>
          <div className="kpi-value">~8 min</div>
          <div className="kpi-sub">Impact analysis per revision</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Proposals Generated</div>
          <div className="kpi-value">127</div>
          <div className="kpi-sub">This fiscal year</div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="card mb-24">
        <div className="card-header">Current RFQ Pipeline</div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', overflowX:'auto', padding: '8px 0'}}>
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={i}>
              <div className={`step ${step.status}`}>
                <div className="step-dot"></div>
                {step.label}
              </div>
              {i < pipelineSteps.length - 1 && (
                <div className="step-connector" style={{
                  background: step.status === 'completed' ? 'var(--success)' : step.status === 'active' ? 'var(--primary)' : 'var(--border)'
                }}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Agent Status */}
      <div className="section-title">Agent Status</div>
      <div className="grid-3">
        {agents.map((a, i) => (
          <div key={i} className="agent-card">
            <div className="agent-name">{a.name}</div>
            <div className="agent-task">{a.task}</div>
            <div className={`agent-status status-${a.status}`}>
              <span className="status-dot"></span>
              {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════
function SettingsPage({ enquiries, onAddEnquiry }) {
  const [activeTab, setActiveTab] = useState('project');
  const [newEnqName, setNewEnqName] = useState('');

  const handleAdd = () => {
    if (newEnqName.trim()) {
      onAddEnquiry(newEnqName.trim());
      setNewEnqName('');
    }
  };

  return (
    <div style={{display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px'}}>
      <div className="card" style={{padding: 0, height: 'fit-content'}}>
        <div style={{padding: '16px 24px', borderBottom: '1px solid var(--border)', background: '#F9FAFB', fontWeight: 600}}>
          Settings Menu
        </div>
        <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div className={`history-item ${activeTab === 'project' ? 'active' : ''}`} onClick={() => setActiveTab('project')}>
            <div style={{fontWeight: 600, fontSize: '13px'}}>Project & Enquiry</div>
          </div>
          <div className={`history-item ${activeTab === 'extraction' ? 'active' : ''}`} onClick={() => setActiveTab('extraction')}>
            <div style={{fontWeight: 600, fontSize: '13px'}}>Extraction Preferences</div>
          </div>
          <div className={`history-item ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>
            <div style={{fontWeight: 600, fontSize: '13px'}}>Account & System</div>
          </div>
        </div>
      </div>

      <div className="card" style={{padding: '32px'}}>
        {activeTab === 'project' && (
          <div>
            <div className="section-title">Enquiry Management</div>
            <div className="meta-text mb-24">Create new project enquiries and manage existing ones. Added enquiries will appear in the RFQ Ingestion dropdown.</div>
            <div style={{display: 'flex', gap: '12px', marginBottom: '32px', alignItems: 'center'}}>
              <input 
                type="text" 
                value={newEnqName} 
                onChange={(e) => setNewEnqName(e.target.value)}
                placeholder="New Enquiry Title"
                className="search-input"
                style={{maxWidth: '400px'}}
              />
              <button className="btn btn-primary" onClick={handleAdd}>Add Enquiry</button>
            </div>
            
            <div style={{fontWeight: 600, fontSize: '14px', marginBottom: '16px'}}>Active Enquiries ({enquiries.length})</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px'}}>
              {enquiries.map((enq, i) => (
                <div key={i} style={{padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: '#F9FAFB'}}>
                  <div style={{fontWeight: 600, fontSize: '14px', marginBottom: '8px'}}>{enq.name}</div>
                  <div className="meta-text">{enq.files ? enq.files.length : 0} files associated</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'extraction' && (
          <div>
            <div className="section-title">Extraction Preferences</div>
            <div className="meta-text mb-24">Configure the AI models and thresholds used for document parsing.</div>
            
            <div style={{marginBottom: '24px'}}>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px'}}>Default OCR Engine</label>
              <select style={{width: '100%', maxWidth: '400px', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', outline: 'none', fontFamily: 'inherit'}}>
                <option>10xDS Vision API (Recommended)</option>
                <option>Azure Document Intelligence</option>
                <option>AWS Textract</option>
              </select>
            </div>
            
            <div style={{marginBottom: '24px'}}>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px'}}>Flagging Confidence Threshold: 85%</label>
              <input type="range" min="50" max="100" defaultValue="85" style={{width: '100%', maxWidth: '400px'}} />
              <div className="meta-text" style={{marginTop: '6px'}}>Extracted objects with confidence below this threshold will be automatically flagged for human review.</div>
            </div>
            
            <div style={{marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <input type="checkbox" id="autoClassify" defaultChecked style={{width: '16px', height: '16px', cursor: 'pointer'}} />
              <label htmlFor="autoClassify" style={{fontSize: '13px', fontWeight: 500, cursor: 'pointer'}}>Enable AI Auto-Classification</label>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div>
            <div className="section-title">Account & System</div>
            <div className="meta-text mb-24">Manage your personal profile and application-wide system settings.</div>
            
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px'}}>Profile Name</label>
              <input type="text" className="search-input" defaultValue="Alan Koshy" style={{maxWidth: '400px', background: '#fff'}} />
            </div>
            
            <div style={{marginBottom: '24px'}}>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px'}}>Email Address</label>
              <input type="text" className="search-input" defaultValue="alan.koshy@10xds.com" style={{maxWidth: '400px', background: '#fff'}} />
            </div>
            
            <div style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <input type="checkbox" id="emailNotif" defaultChecked style={{width: '16px', height: '16px', cursor: 'pointer'}} />
              <label htmlFor="emailNotif" style={{fontSize: '13px', fontWeight: 500, cursor: 'pointer'}}>Send Email Notifications for Batch Completions</label>
            </div>
            
            <div style={{marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <input type="checkbox" id="darkMode" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
              <label htmlFor="darkMode" style={{fontSize: '13px', fontWeight: 500, cursor: 'pointer'}}>Enable Dark Theme (Beta)</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════
function App() {
  const [activePage, setActivePage] = useState('rfq');
  const [prevPage, setPrevPage] = useState('rfq');
  const [fadeClass, setFadeClass] = useState('fade-active');
  const [enquiries, setEnquiries] = useState(initialEnquiries);

  const handleAddEnquiry = (name) => {
    setEnquiries([...enquiries, { name, files: [] }]);
  };

  const handleNav = (id) => {
    let target = id;
    if (id === 'toggleSettings') {
      target = activePage === 'settings' ? (prevPage || 'rfq') : 'settings';
    }
    if (target === activePage) return;

    if (target === 'settings' && activePage !== 'settings') {
      setPrevPage(activePage);
    }

    setFadeClass('fade-enter');
    setTimeout(() => {
      setActivePage(target);
      setFadeClass('fade-active');
    }, 150);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'rfq': return <RFQIngestion enquiries={enquiries} />;
      case 'drawing': return <DrawingExtraction />;
      case 'explorer': return <ObjectExplorer enquiries={enquiries} />;
      case 'estimator': return <EstimatorWorkbench />;
      case 'revision': return <RevisionImpact />;
      case 'dashboard': return <Dashboard />;
      case 'settings': return <SettingsPage enquiries={enquiries} onAddEnquiry={handleAddEnquiry} />;
      default: return <RFQIngestion enquiries={enquiries} />;
    }
  };

  return (
    <>
      <Sidebar active={activePage} onNav={handleNav} />
      <div className="main-area">
        <TopBar page={activePage} onNav={handleNav} />
        <div className={`content ${fadeClass}`}>
          {renderPage()}
        </div>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app-root'));
root.render(<App />);
