import { useState, type ChangeEvent } from 'react'
import { uploadBpmnFile } from '../api/AdminApi'
import './BpmnUploader.css'

// Största tillåtna filstorlek: 10 MB.
const MAX_FILE_SIZE = 10 * 1024 * 1024

function BpmnUploader() {
  // Sparar den fil som användaren har valt.
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Sparar meddelanden och uppladdningens status.
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // Körs när användaren väljer en fil.
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    setSelectedFile(null)
    setErrorMessage('')
    setSuccessMessage('')

    // Avslutar om ingen fil valdes.
    if (!file) {
      return
    }

    // Kontrollerar att filen har rätt filändelse.
    if (!file.name.toLowerCase().endsWith('.bpmn')) {
      setErrorMessage('Välj en fil med filändelsen .bpmn.')
      event.target.value = ''
      return
    }

    // Kontrollerar att filen inte är för stor.
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('Filen får vara högst 10 MB.')
      event.target.value = ''
      return
    }

    setSelectedFile(file)
  }

  // Skickar den valda filen till backend.
  async function handleUpload() {
    if (!selectedFile) {
      return
    }

    setIsUploading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const result = await uploadBpmnFile(selectedFile)
      setSuccessMessage(result.message)
    } catch (error) {
      // Visar felet från backend eller nätverket.
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Filen kunde inte skickas till backend.')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section className="bpmn-uploader">
      <div>
        <h2>Ladda upp BPMN-process</h2>
        <p>Välj en BPMN-fil som senare ska driftsättas i Flowable.</p>
      </div>

      {/* Filväljare som endast visar BPMN-filer. */}
      <div className="file-field">
        <label htmlFor="bpmn-file">BPMN-fil</label>

        <input
          id="bpmn-file"
          type="file"
          accept=".bpmn"
          onChange={handleFileChange}
        />
      </div>

      {/* Visas om ett fel uppstår. */}
      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Visas när backend har tagit emot filen. */}
      {successMessage && (
        <p className="success-message" role="status">
          {successMessage}
        </p>
      )}

      {/* Visas när en giltig fil har valts. */}
      {selectedFile && (
        <div className="selected-file">
          <strong>Vald fil:</strong>
          <span>{selectedFile.name}</span>
          <span>{(selectedFile.size / 1024).toFixed(1)} kB</span>
        </div>
      )}

      <button
        className="upload-button"
        type="button"
        disabled={!selectedFile || isUploading}
        onClick={handleUpload}
      >
        {isUploading ? 'Skickar filen...' : 'Ladda upp BPMN'}
      </button>
    </section>
  )
}

export default BpmnUploader