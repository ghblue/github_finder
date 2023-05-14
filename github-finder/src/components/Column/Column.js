import React from 'react'
import styled from 'styled-components'

import RowComponent from '../Row/Row'

import { MEDIADESKTOP } from '../../helpers/constants'

const ColumnComponent = props => <RowComponent flexDirection='column' {...props} />

export const ColumnDesktop = styled(ColumnComponent)`
  display: none;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: flex;
  }
`

export const ColumnMobile = styled(ColumnComponent)`
  display: flex;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: none;
  }
`

export default ColumnComponent