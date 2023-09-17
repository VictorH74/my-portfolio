import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Header from '.'

test('shows the children when the checkbox is checked', () => {
  render(<Header />)

  // query* functions will return the element or null if it cannot be found
  // get* functions will return the element or throw an error if it cannot be found
  expect(screen.queryByText("VH")).toBeDefined()

  // the queries can accept a regex to make your selectors more resilient to content tweaks and changes.
  // .toBeInTheDocument() is an assertion that comes from jest-dom
  // otherwise you could use .toBeDefined()
  expect(screen.getByText("VH")).toBeInTheDocument()
})