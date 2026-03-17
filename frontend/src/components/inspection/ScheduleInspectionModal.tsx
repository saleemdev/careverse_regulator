import { Modal, Select, DatePicker, Input, Button } from 'antd'
import dayjs from 'dayjs'

interface ScheduleInspectionModalProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  formData: {
    facility: string
    inspector: string
    date: string
    note: string
  }
  setFormData: (data: any) => void
  facilities: string[]
  inspectors: string[]
}

export default function ScheduleInspectionModal({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  facilities,
  inspectors,
}: ScheduleInspectionModalProps) {
  return (
    <Modal
      title={
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#101828', marginBottom: '4px' }}>
            Facility Inspection
          </div>
          <div style={{ fontSize: '14px', color: '#475467', fontWeight: 400 }}>
            Fill in the details below to generate report
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={640}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
        <div>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#344054',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Facility <span style={{ color: '#F04438' }}>*</span>
          </label>
          <Select
            placeholder="Select Facility"
            value={formData.facility || undefined}
            onChange={(value) => setFormData({ ...formData, facility: value })}
            style={{ width: '100%' }}
            size="large"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={facilities.map((facility) => ({
              label: facility,
              value: facility,
            }))}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#344054',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Inspector (User) <span style={{ color: '#F04438' }}>*</span>
          </label>
          <Select
            value={formData.inspector}
            onChange={(value) => setFormData({ ...formData, inspector: value })}
            style={{ width: '100%' }}
            size="large"
            options={inspectors.map((inspector) => ({
              label: inspector,
              value: inspector,
            }))}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#344054',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Set Inspection Date <span style={{ color: '#F04438' }}>*</span>
          </label>
          <DatePicker
            value={formData.date ? dayjs(formData.date, 'DD/MM/YYYY') : null}
            onChange={(date) => setFormData({ ...formData, date: date ? date.format('DD/MM/YYYY') : '' })}
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
            size="large"
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#344054',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Note To Inspector
          </label>
          <Input.TextArea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="Check Safety Compliance"
            rows={4}
            style={{ resize: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button
            size="large"
            onClick={onClose}
            style={{
              width: '48%',
              borderColor: '#11b5a1',
              color: '#11b5a1',
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={onSubmit}
            disabled={!formData.facility || !formData.inspector || !formData.date}
            style={{
              width: '48%',
              backgroundColor: '#11b5a1',
              borderColor: '#11b5a1',
            }}
          >
            Schedule Inspection
          </Button>
        </div>
      </div>
    </Modal>
  )
}
