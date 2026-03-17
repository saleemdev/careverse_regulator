import { Modal, Descriptions, Button, Divider } from 'antd'
import type { Inspection } from '@/stores/inspectionStore'
import StatusBadge from './StatusBadge'

interface InspectionDetailModalProps {
  open: boolean
  onClose: () => void
  inspection: Inspection | null
}

export default function InspectionDetailModal({ open, onClose, inspection }: InspectionDetailModalProps) {
  if (!inspection) return null

  return (
    <Modal
      title={
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#101828', marginBottom: '4px' }}>
            Scheduled Inspection Details
          </div>
          <div style={{ fontSize: '14px', color: '#475467', fontWeight: 400 }}>
            Inspection ID: {inspection.inspectionId}
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            style={{
              borderColor: '#11b5a1',
              color: '#11b5a1',
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: '#11b5a1', borderColor: '#11b5a1' }}
            onClick={() => {
              console.log('Start inspection:', inspection)
              // TODO: Navigate to inspection form or start inspection process
              onClose()
            }}
          >
            Start Inspection
          </Button>
        </div>
      }
      width={700}
    >
      <div style={{ marginTop: '24px' }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Facility Name" span={2}>
            <strong>{inspection.facilityName}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Inspection Date">
            {inspection.date}
          </Descriptions.Item>

          <Descriptions.Item label="Inspector">
            {inspection.inspector}
          </Descriptions.Item>

          <Descriptions.Item label="Inspection ID">
            {inspection.inspectionId}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <StatusBadge status={inspection.status} />
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828', marginBottom: '8px' }}>
            Note to Inspector
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#475467',
              lineHeight: '20px',
              padding: '12px',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
              border: '1px solid #EAECF0',
            }}
          >
            {inspection.noteToInspector || 'No additional notes provided'}
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#F0F9FF',
            borderRadius: '8px',
            border: '1px solid #B9E6FE',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#026AA2', marginBottom: '8px' }}>
            📋 Inspection Checklist
          </div>
          <div style={{ fontSize: '13px', color: '#026AA2', lineHeight: '20px' }}>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Verify facility licensing and permits</li>
              <li>Inspect safety equipment and emergency systems</li>
              <li>Review staff credentials and certifications</li>
              <li>Check infection control protocols</li>
              <li>Evaluate patient care standards</li>
              <li>Document all findings with photos/evidence</li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  )
}
