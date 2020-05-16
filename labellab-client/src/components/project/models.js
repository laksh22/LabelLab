import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Dropdown,
  Header,
  Table,
  Modal
} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { fetchProject } from '../../actions'
import './css/models.css'

class ModelsIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modelType: "classifier",
      open: false,
    }

    this.model = [
      {
        key: 'classifier',
        text: 'Classifier',
        value: 'classifier'
      }
    ]
  }

  fetchProjectCallback = () => {
    const { fetchProject, project } = this.props
    fetchProject(project.projectId)
  }

  getModelType = (event, {value}) => {
    this.setState({
      modelType: value
    })
  }

  toggleOpen = () => { 
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  render() {
    const { project } = this.props
    const { modelType, open } = this.state

    return (
      <Container>
        <Modal size="small" open={open} onClose={this.toggleOpen}>
          <Modal.Header>
            <p>Create New Model</p>
          </Modal.Header>
          <Modal.Content>
            <Dropdown
              placeholder="Select model type..."
              fluid
              selection
              options={this.model}
            />
          </Modal.Content>
          <Modal.Actions>
            <Link to={`/model_editor/${modelType}/${project.projectId}`}>
              <Button positive>Create</Button>
            </Link>
          </Modal.Actions>
        </Modal>

        <Button positive onClick={this.toggleOpen}>
          Create New Model
        </Button>
        <Table color="green" celled padded striped stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine collapsing>S. No.</Table.HeaderCell>
              <Table.HeaderCell>Model Name</Table.HeaderCell>
              <Table.HeaderCell>Model Type</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {project &&
              project.models &&
              project.models.map((model, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Header as="h4">{index}</Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Header as="h4">{model.name}</Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Header as="h4">{model.type}</Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/model_editor/${model.type}/${project.projectId}/${model._id}`}>
                      <Button icon="pencil" label="Edit" size="tiny" />
                    </Link>
                    <Button
                      icon="trash"
                      label="Delete"
                      size="tiny"
                      onClick={null}
                      negative
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

ModelsIndex.propTypes = {
  project: PropTypes.object
}

const mapStateToProps = state => {
  return {
    project: state.projects.currentProject
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProject: data => {
      return dispatch(fetchProject(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelsIndex)
