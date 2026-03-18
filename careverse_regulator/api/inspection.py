"""
Custom API endpoints for Inspection operations
Provides enhanced inspection data with linked document display names
"""

import frappe
from frappe import _


@frappe.whitelist()
def get_inspections_with_names():
	"""
	Fetch inspections with facility and professional display names

	Returns list of inspections with:
	- All standard inspection fields
	- facility_name: Display name from linked Facility
	- professional_name: Display name from linked Professional

	Respects permission query conditions for multi-tenant isolation
	"""
	# Get inspections the user has permission to view
	inspections = frappe.get_all(
		"Inspection",
		fields=[
			"name",
			"facility",
			"professional",
			"inspection_date",
			"status",
			"note_to_inspector",
			"company"
		],
		order_by="modified desc",
		limit_page_length=9999
	)

	# Enrich with display names
	result = []
	for inspection in inspections:
		# Get facility display name
		facility_name = None
		if inspection.facility:
			facility_name = frappe.db.get_value("Facility", inspection.facility, "facility_name")

		# Get professional display name
		professional_name = None
		if inspection.professional:
			professional_name = frappe.db.get_value("Professional", inspection.professional, "professional_name")

		result.append({
			"name": inspection.name,
			"facility": inspection.facility,
			"facility_name": facility_name,
			"professional": inspection.professional,
			"professional_name": professional_name,
			"inspection_date": inspection.inspection_date,
			"status": inspection.status,
			"note_to_inspector": inspection.note_to_inspector,
			"company": inspection.company
		})

	return result


@frappe.whitelist()
def get_inspection_with_names(name):
	"""
	Fetch single inspection with facility and professional display names

	Args:
		name: Inspection document name

	Returns:
		Inspection document with enriched display names
	"""
	inspection = frappe.get_doc("Inspection", name)

	# Get facility display name
	facility_name = None
	if inspection.facility:
		facility_name = frappe.db.get_value("Facility", inspection.facility, "facility_name")

	# Get professional display name
	professional_name = None
	if inspection.professional:
		professional_name = frappe.db.get_value("Professional", inspection.professional, "professional_name")

	return {
		"name": inspection.name,
		"facility": inspection.facility,
		"facility_name": facility_name,
		"professional": inspection.professional,
		"professional_name": professional_name,
		"inspection_date": inspection.inspection_date,
		"status": inspection.status,
		"note_to_inspector": inspection.note_to_inspector,
		"company": inspection.company
	}
