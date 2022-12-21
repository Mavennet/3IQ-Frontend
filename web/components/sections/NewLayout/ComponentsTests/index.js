import React from 'react'
import PropTypes from 'prop-types'
import ButtonTextArea from '../../../NewLayout/ButtonTextArea'
import Button from '../../../NewLayout/Button'
import Alert from '../../../NewLayout/Alert'
import Form from '../../../NewLayout/Form'
import {Grid} from '@mui/material'
import TextArea from '../../../NewLayout/TextArea'
import Dropdown from '../../../NewLayout/Dropdown'
import Select from '../../../NewLayout/Select'

function ComponentsTests(props) {
  const {heading} = props

  console.log(heading)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center">
        <Grid item md={9} xs={12} >
          <h2>Components and Typographies</h2>
          <br />
          <h3>Button</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item md={3} xs={6}>
              <Button title="Submit" />
            </Grid>
            <Grid item md={3} xs={6}>
              <Button title="Submit" arrow />
            </Grid>
            <Grid item md={3} xs={6}>
              <Button title="Submit" disabled />
            </Grid>
            <Grid item md={3} xs={6}>
              <Button title="Submit" disabled arrow />
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
          <h3>Button Outlined</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item md={3} xs={6}>
              <Button variant="outlined" title="Submit" />
            </Grid>
            <Grid item md={3} xs={6}>
              <Button variant="outlined" title="Submit" arrow />
            </Grid>
            <Grid item md={3} xs={6}>
              <Button variant="outlined" title="Submit" disabled />
            </Grid>
            <Grid item md={3} xs={6}>
              <Button variant="outlined" title="Submit" disabled arrow />
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
          <h3>Button Text Area</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonTextArea placeholder="Placeholder" buttonTitle="Submit" />
            </Grid>
            <Grid item xs={12}>
              <ButtonTextArea placeholder="Placeholder" disabled buttonTitle="Submit" />
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
          <h3>Form</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Form placeholder="Placeholder Text" />
            </Grid>
            <Grid item xs={12}>
              <Form placeholder="Placeholder Text" disabled />
            </Grid>
          </Grid>

          <br />
          <hr />
          <br />

          <h3>TextArea</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextArea placeholder="Placeholder Text" />
            </Grid>
            <Grid item xs={12}>
              <TextArea placeholder="Placeholder Text" disabled />
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
          <h3>Select (Checkbox e Radio)</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Select
                title='Dropdown text'
                name='dropdown'
                type="checkbox"
                items={[
                  {
                      id: 1,
                      name: "select",
                      label: "Standard",
                      value: 1
                  }, {
                      id: 2,
                      name: "select",
                      label: "Standard",
                      value: 2
                  }
                  , {
                      id: 3,
                      name: "select",
                      label: "Standard",
                      value: 3
                  }
                  , {
                    id: 4,
                    name: "select",
                    disabled: true,
                    label: "Standard",
                    value: 4
                }
              ]}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                title='Dropdown text'
                name='dropdown'
                items={[
                  {
                      id: 1,
                      name: "select",
                      label: "Standard",
                      value: 1
                  }, {
                      id: 2,
                      name: "select",
                      label: "Standard",
                      value: 2
                  }
                  , {
                      id: 3,
                      name: "select",
                      label: "Standard",
                      value: 3
                  }      , {
                    id: 4,
                    name: "select",
                    disabled: true,
                    label: "Standard",
                    value: 4
                }
              ]}
              />
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />

          <h3>Select Dropdown (Primary)</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Dropdown
                title='Dropdown text'
                name='dropdown'
                itens={[
                  {label: 'Placeholder 1', value: 0},
                  {label: 'Placeholder 2', value: 1},
                  {label: 'Placeholder 3', value: 2},
                  {label: 'Placeholder 4', value: 3}
                ]}
              />
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />

          <h3>Select Dropdown (Secondary)</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Dropdown
                isMulti
                title='Dropdown text'
                name='dropdown'
                itens={[
                  {value: 'purple', label: 'Purple', color: '#5243AA'},
                  {value: 'orange', label: 'Orange', color: '#FF8B00'},
                  {value: 'yellow', label: 'Yellow', color: '#FFC400'},
                  {value: 'green', label: 'Green', color: '#36B37E'},
                  {value: 'forest', label: 'Forest', color: '#00875A'},
                  {value: 'slate', label: 'Slate', color: '#253858'},
                  {value: 'silver', label: 'Silver', color: '#666666'},
                ]}
              />
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />

          <h3>Alert</h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert title="Alert" />
            </Grid>
            <Grid item xs={12}>
              <Alert variant="error" title="Alert" />
            </Grid>
            <Grid item xs={12}>
              <Alert variant="success" title="Alert" />
            </Grid>
            <Grid item xs={12}>
              <Alert variant="warning" title="Alert" />
            </Grid>
          </Grid>
          <br />
          <hr />
        </Grid>
        
        <Grid item md={9} xs={12}>
          <Grid container>
            <Grid item md={6} xs={12}>
              <h1>Header H1</h1>
              <h2>Header H2</h2>
              <h3>Header H3</h3>
              <h4>Header H4</h4>
              <h5>Header H5</h5>
              <span>span</span>
              <br />
              <a href="www.google.com">link</a>
              <p>Paragraph</p>
            </Grid>
            <Grid item md={6} xs={12}>
              <p className="h1__secondary">Header H1 secondary</p>
              <p className="h2__secondary">Header H2 secondary</p>
              <p className="h3__secondary">Header H3 secondary</p>
              <p className="h4__secondary">Header H4 secondary</p>
              <p className="h5__secondary">Header H5 secondary</p>
              <p className="span__secondary">span secondary</p>
              <p className="a__secondary">link secondary</p>
              <p className="p__secondary">Paragraph secondary</p>
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
        </Grid>
      </Grid>
    </div>
  )
}

ComponentsTests.propTypes = {
  heading: PropTypes.string,
}

export default ComponentsTests
