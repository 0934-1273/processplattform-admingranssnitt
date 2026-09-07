// Metodsignaturer för administratörsgränssnittets API-klient.
// Implementationen byggs stegvis i MVP:n.

export interface AdminApi {
  listProcesses(): Promise<ProcessDefinition[]>;
  deployProcess(files: File[], options: DeploymentOptions): Promise<DeploymentResult>;
  listInstances(): Promise<WorkflowInstance[]>;
  getInstance(instanceId: string): Promise<WorkflowInstance>;
}

export interface ProcessDefinition {
  processKey: string;
  displayName: string;
  category: string;
  active: boolean;
}

export interface DeploymentOptions {
  deploymentName: string;
  enableDuplicateFiltering: boolean;
  deployChangedOnly: boolean;
}

export interface DeploymentResult {
  deploymentId: string;
  deploymentName: string;
}

export interface WorkflowInstance {
  id: string;
  businessKey: string;
  displayName: string;
  status: string;
  editable: boolean;
}

// Svaret som backend skickar efter en uppladdning.
export interface BpmnUploadResponse {
  fileName: string
  fileSize: number
  message: string
}

// Skickar en BPMN-fil till backend.
export async function uploadBpmnFile(
  file: File,
): Promise<BpmnUploadResponse> {
  // FormData används för att skicka själva filen.
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(
    'http://localhost:8080/api/admin/deployments',
    {
      method: 'POST',
      body: formData,
    },
  )

  // Läser svaret från backend.
  const result = (await response.json()) as BpmnUploadResponse

  // Gör ett felaktigt svar till ett fel i gränssnittet.
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}
