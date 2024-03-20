import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes, faCheck, faEdit, faTrash, faDownload,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import QRGen from '@/lib/qr'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import QRDownload from '@/lib/download'
import { QR } from '@prisma/client'
import axios from 'axios'
import { useRouter, usePathname } from 'next/navigation'

import { ACTIONTYPES, API_QR } from '@/lib/constants'

export default function QRList(
  props: {
    data: QR[];
    showScans?: boolean;
    showQR?: boolean;
    showLabel?: boolean;
    showURL?: boolean;
    showActive?: boolean;
    actions?: ACTIONTYPES[];
  },
) {
  const router = useRouter()
  const pathname = usePathname()

  const {
    data = [], actions, showScans, showActive, showLabel, showQR, showURL,
  } = props

  const deleteRow = async (row: QR) => {
    await axios.delete(`${API_QR}/${row.uniqueID}`)
    window.location.reload()
    return { status: 200 }
  }

  const editQR = (row: QR) => {
    router.push(`${pathname}/${row.id}/edit`)
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  const QRTemplate = (row: QR, { rowIndex }: { rowIndex: number }) => <div id={`qr_${rowIndex}`}>{QRGen(row)}</div>
  const isActiveTemplate = (row: QR) => <FontAwesomeIcon icon={row.is_active ? faCheck : faTimes} />
  const actionsTemplate = (row: QR, { rowIndex }: { rowIndex: number }) => (
    <ButtonGroup vertical>
      {actions?.some((action) => action === ACTIONTYPES.DOWNLOAD) && (
      <Button variant="secondary" onClick={() => QRDownload(rowIndex)}>
        <FontAwesomeIcon icon={faDownload} />
      </Button>
      )}
      {actions?.some((action) => action === ACTIONTYPES.EDIT) && (
      <Button variant="secondary">
        <FontAwesomeIcon icon={faEdit} onClick={() => editQR(row)} />
      </Button>
      )}
      {actions?.some((action) => action === ACTIONTYPES.DELETE) && (
      <Button variant="secondary">
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteRow(row)} />
      </Button>
      )}
    </ButtonGroup>
  )

  const footer = `In total there ${data?.length > 1 ? 'are' : 'is'} ${data ? data.length : 0} item${data?.length > 1 ? 's' : ''}.`

  return (
    <DataTable
      showGridlines
      stripedRows
      value={data}
      footer={footer}
    >
      {showQR && <Column header="QR" body={QRTemplate} />}
      {showLabel && <Column field="label" header="Label" align="center" />}
      {showURL && <Column field="url" header="Current URL" align="center" />}
      {showScans && <Column field="scans" header="Scans" style={{ width: '10%', textAlign: 'center' }} align="center" /> }
      {showActive && <Column field="is_active" header="Active" style={{ width: '10%', textAlign: 'center' }} align="center" body={isActiveTemplate} />}
      {actions?.length && <Column headerStyle={{ width: '5%', minWidth: '1rem', textAlign: 'center' }} header="Actions" body={actionsTemplate} />}
    </DataTable>
  )
}
