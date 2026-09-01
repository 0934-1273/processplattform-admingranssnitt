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
