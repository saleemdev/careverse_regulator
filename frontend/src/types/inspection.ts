export interface Inspection {
  id: string
  inspectionId: string
  facilityName: string
  date: string
  inspector: string
  noteToInspector: string
  status: 'Non Compliant' | 'Completed' | 'Pending'
  company?: string
}

export interface BackendInspection {
  name: string
  facility: string
  facility_name?: string
  inspection_date: string
  professional: string
  professional_name?: string
  note_to_inspector: string
  status: 'Non Compliant' | 'Completed' | 'Pending'
  company?: string
}

export interface FrappeListResponse<T> {
  data: T[]
}

export interface FrappeDocResponse {
  data: BackendInspection
}

export interface CreateInspectionPayload {
  facility: string
  inspection_date: string
  professional: string
  note_to_inspector: string
  status?: 'Non Compliant' | 'Completed' | 'Pending'
  company?: string
}

export interface UpdateInspectionPayload {
  facility?: string
  inspection_date?: string
  professional?: string
  note_to_inspector?: string
  status?: 'Non Compliant' | 'Completed' | 'Pending'
}

export interface Facility {
  name: string
  facility_name: string
}

export interface Professional {
  name: string
  professional_name: string
}
