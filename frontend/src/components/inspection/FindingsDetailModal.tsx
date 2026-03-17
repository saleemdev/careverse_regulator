import { Modal, Descriptions, Button, Space, Divider } from 'antd'
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons'
import type { Finding } from '@/stores/findingsStore'
import FindingsBadge from './FindingsBadge'

interface FindingsDetailModalProps {
  open: boolean
  onClose: () => void
  finding: Finding | null
}

export default function FindingsDetailModal({ open, onClose, finding }: FindingsDetailModalProps) {
  if (!finding) return null

  return (
    <Modal
      title={
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#101828', marginBottom: '4px' }}>
            Inspection Finding Details
          </div>
          <div style={{ fontSize: '14px', color: '#475467', fontWeight: 400 }}>
            Finding ID: {finding.findingId}
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="primary"
            style={{ backgroundColor: '#11b5a1', borderColor: '#11b5a1' }}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      }
      width={800}
    >
      <div style={{ marginTop: '24px' }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Facility Name" span={2}>
            <strong>{finding.facilityName}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Inspection Date">
            {finding.inspectionDate}
          </Descriptions.Item>

          <Descriptions.Item label="Inspector">
            {finding.inspector}
          </Descriptions.Item>

          <Descriptions.Item label="Category" span={2}>
            {finding.category}
          </Descriptions.Item>

          <Descriptions.Item label="Severity">
            <FindingsBadge severity={finding.severity} />
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <FindingsBadge status={finding.status} />
          </Descriptions.Item>

          <Descriptions.Item label="Due Date">
            {finding.dueDate}
          </Descriptions.Item>

          {finding.resolvedDate && (
            <Descriptions.Item label="Resolved Date">
              {finding.resolvedDate}
            </Descriptions.Item>
          )}
        </Descriptions>

        <Divider />

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828', marginBottom: '8px' }}>
            Description
          </div>
          <div style={{ fontSize: '14px', color: '#475467', lineHeight: '20px' }}>
            {finding.description}
          </div>
        </div>

        {finding.correctiveAction && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828', marginBottom: '8px' }}>
              Corrective Action Required
            </div>
            <div style={{ fontSize: '14px', color: '#475467', lineHeight: '20px' }}>
              {finding.correctiveAction}
            </div>
          </div>
        )}

        {finding.evidence && finding.evidence.length > 0 && (
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828', marginBottom: '12px' }}>
              Evidence & Documentation
            </div>
            <Space direction="vertical" style={{ width: '100%' }}>
              {finding.evidence.map((doc, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid #D0D5DD',
                    borderRadius: '8px',
                    backgroundColor: '#F9FAFB',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileTextOutlined style={{ fontSize: '16px', color: '#475467' }} />
                    <span style={{ fontSize: '14px', color: '#101828' }}>{doc}</span>
                  </div>
                  <Button
                    type="text"
                    icon={<DownloadOutlined />}
                    size="small"
                    style={{ color: '#11b5a1' }}
                  >
                    Download
                  </Button>
                </div>
              ))}
            </Space>
          </div>
        )}
      </div>
    </Modal>
  )
}
