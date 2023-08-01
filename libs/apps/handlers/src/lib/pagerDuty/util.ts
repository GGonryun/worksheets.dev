export const parseServices = (services: any[]) => {
  return services?.map(parseService) ?? [];
};

export const parseService = (service: any) => {
  return {
    id: service.id,
    type: service.type,
    name: service.name,
    summary: service.summary,
    description: service.description,
    createdAt: service.created_at,
    status: service.status,
  };
};

export const parseIncidents = (incidents: any[]) => {
  return incidents?.map(parseIncident).filter((i) => i) ?? [];
};

export const parseIncident = (incident: any) => {
  if (!incident) {
    return {
      id: '',
      type: '',
    };
  }
  return {
    id: incident.id ?? '',
    type: incident.type ?? '',
    summary: incident.summary,
    incidentNumber: incident.incident_number,
    createdAt: incident.created_at,
    updatedAt: incident.updated_at,
    resolvedAt: incident.resolved_at,
    status: incident.status,
    title: incident.title,
    incidentKey: incident.incident_key,
    urgency: incident.urgency,
    service: parseService(incident.service),
  };
};
