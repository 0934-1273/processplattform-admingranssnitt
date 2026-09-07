import { useState } from 'react'
import './App.css'
import BpmnUploader from './components/BpmnUploader'

// Anger vilka sidor som kan visas.
type PageId =
  | 'overview'
  | 'processes'
  | 'deploy'
  | 'instances'
  | 'errors'
  | 'audit'

// Beskriver ett alternativ i sidomenyn.
interface MenuItem {
  id: PageId
  label: string
}

// Sidorna som visas i menyn.
const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Översikt' },
  { id: 'processes', label: 'Processer' },
  { id: 'deploy', label: 'Deploy' },
  { id: 'instances', label: 'Instanser' },
  { id: 'errors', label: 'Driftfel' },
  { id: 'audit', label: 'Auditlogg' },
]

function App() {
  // Håller reda på vilken sida som är vald.
  const [activePage, setActivePage] = useState<PageId>('overview')

  // Hämtar namnet på den valda sidan.
  const activePageLabel =
    menuItems.find((item) => item.id === activePage)?.label ?? 'Översikt'

  return (
    <div className="admin-layout">
      {/* Vänster sidomeny */}
      <aside className="sidebar">
        {/* Applikationens namn */}
        <div className="brand">
          <span className="brand-title">Processplattform</span>
          <span className="brand-subtitle">Administration</span>
        </div>

        {/* Navigering mellan sidorna */}
        <nav className="navigation" aria-label="Huvudmeny">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`navigation-item ${
                activePage === item.id ? 'active' : ''
              }`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidans huvudinnehåll */}
      <main className="main-content">
        {/* Rubrik för den valda sidan */}
        <header className="page-header">
          <div>
            <p className="eyebrow">Administratörsgränssnitt</p>
            <h1>{activePageLabel}</h1>
          </div>

          {/* Visar vilken miljö användaren arbetar i */}
          <span className="environment-badge">Utvecklingsmiljö</span>
        </header>

        {/* Visar uppladdningen på Deploy-sidan. */}
        {activePage === 'deploy' ? (
          <BpmnUploader />
        ) : (
          /* Visar tillfälligt innehåll på övriga sidor. */
          <section className="content-card">
            <h2>{activePageLabel}</h2>
            <p>
              Här kommer funktionerna för {activePageLabel.toLowerCase()} att
              visas.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App