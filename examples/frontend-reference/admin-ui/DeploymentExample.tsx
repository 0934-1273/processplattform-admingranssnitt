import React from "react";

/**
 * Referensexempel: enkel deploy-vy för administratörsgränssnittet.
 *
 * Exemplet visar bara flödet. I skarp kod behövs felhantering,
 * laddningsindikator och tydlig återkoppling till användaren.
 */
export function DeploymentExample() {
  async function uploadDeployment(file: File) {
    // 1. Flowable deployment använder multipart/form-data.
    const formData = new FormData();
    formData.append("file", file);

    // 2. I MVP används headers för mockad användare/grupper.
    //    Senare ersätts detta av Entra/OIDC-token.
    await fetch("/api/admin/deployments", {
      method: "POST",
      headers: {
        "X-User-Id": "admin",
        "X-User-Groups": "workflow-admin"
      },
      body: formData
    });
  }

  return (
    <div>
      <h1>Deploya process</h1>
      <input
        type="file"
        accept=".bpmn,.bpmn20.xml,.dmn,.xml"
        onChange={event => {
          // 3. Ta första valda filen och skicka den till backend.
          const file = event.target.files?.[0];
          if (file) uploadDeployment(file);
        }}
      />
    </div>
  );
}
