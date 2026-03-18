import dayjs from 'dayjs'
import { apiRequest } from '@/utils/api'
import type {
  Inspection,
  BackendInspection,
  FrappeListResponse,
  FrappeDocResponse,
  CreateInspectionPayload,
  UpdateInspectionPayload,
  Facility,
  Professional,
} from '@/types/inspection'

const INSPECTION_DOCTYPE = 'Inspection'

export function transformInspection(backendInspection: BackendInspection): Inspection {
  return {
    id: backendInspection.name,
    inspectionId: backendInspection.name,
    facilityName: backendInspection.facility_name || backendInspection.facility,
    date: formatDateForFrontend(backendInspection.inspection_date),
    inspector: backendInspection.professional_name || backendInspection.professional,
    noteToInspector: backendInspection.note_to_inspector,
    status: backendInspection.status,
    company: backendInspection.company,
  }
}

export function formatDateForBackend(frontendDate: string): string {
  return dayjs(frontendDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

export function formatDateForFrontend(backendDate: string): string {
  return dayjs(backendDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
}

export async function listInspections(): Promise<Inspection[]> {
  const response = await apiRequest<{ message: BackendInspection[] }>(
    `/api/method/careverse_regulator.api.inspection.get_inspections_with_names`
  )
  return response.message.map(transformInspection)
}

export async function getInspection(name: string): Promise<Inspection> {
  const response = await apiRequest<{ message: BackendInspection }>(
    `/api/method/careverse_regulator.api.inspection.get_inspection_with_names?name=${encodeURIComponent(name)}`
  )
  return transformInspection(response.message)
}

export async function createInspection(payload: CreateInspectionPayload): Promise<Inspection> {
  const response = await apiRequest<FrappeDocResponse>(
    `/api/resource/${INSPECTION_DOCTYPE}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  )
  // Fetch the created inspection with display names
  return getInspection(response.data.name)
}

export async function updateInspection(name: string, payload: UpdateInspectionPayload): Promise<Inspection> {
  await apiRequest<FrappeDocResponse>(
    `/api/resource/${INSPECTION_DOCTYPE}/${encodeURIComponent(name)}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  )
  // Fetch the updated inspection with display names
  return getInspection(name)
}

export async function deleteInspection(name: string): Promise<void> {
  await apiRequest<void>(
    `/api/resource/${INSPECTION_DOCTYPE}/${encodeURIComponent(name)}`,
    {
      method: 'DELETE',
    }
  )
}

export function createInspectionFromForm(formData: {
  facility: string
  inspector: string
  date: string
  note: string
}): CreateInspectionPayload {
  return {
    facility: formData.facility,
    professional: formData.inspector,
    inspection_date: formatDateForBackend(formData.date),
    note_to_inspector: formData.note,
    status: 'Pending',
  }
}

export async function listFacilities(): Promise<Facility[]> {
  const response = await apiRequest<FrappeListResponse<Facility>>(
    `/api/resource/Facility?fields=["name","facility_name"]&filters=[["disabled","=",0]]`
  )
  return response.data
}

export async function listProfessionals(): Promise<Professional[]> {
  const response = await apiRequest<FrappeListResponse<Professional>>(
    `/api/resource/Professional?fields=["name","professional_name"]&filters=[["disabled","=",0]]`
  )
  return response.data
}
