import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Dropdown,
  Header,
  Table,
  Modal,
  Input
} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {
  fetchProject,
  setProjectId,
  setName,
  setType,
  setSource
} from '../../actions'
import './css/models.css'

class ModelsIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modelType: 'classifier',
      modelSource: 'transfer',
      open: false
    }

    this.modelTypes = [
      {
        key: 'classifier',
        text: 'Classifier',
        value: 'classifier'
      }
    ]

    this.modelSources = [
      {
        key: 'tranfer',
        text: 'Transfer',
        value: 'transfer'
      },
      {
        key: 'upload',
        text: 'Upload',
        value: 'upload'
      },
      {
        key: 'custom',
        text: 'Custom',
        value: 'custom'
      }
    ]
  }

  componentDidMount() {
    const { setProjectId, project } = this.props
    setProjectId(project.projectId)
  }

  fetchProjectCallback = () => {
    const { fetchProject, project } = this.props
    fetchProject(project.projectId)
  }

  toggleOpen = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }

  render() {
    const { project, setName, setType, setSource } = this.props
    const { modelType, modelSource, open } = this.state

    return (
      <Container>
        <Modal size="small" open={open} onClose={this.toggleOpen}>
          <Modal.Header>
            <p>Create New Model</p>
          </Modal.Header>
          <Modal.Content>
            <Input
              name="modelName"
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="* Model Name"
              label="Name"
              fluid
            />
            <br />
            <Dropdown
              placeholder="Select model type..."
              fluid
              selection
              options={this.modelTypes}
              onChange={(event, { value }) => {
                setType(value)
                this.setState({ modelType: value })
              }}
            />
            <br />
            <Dropdown
              placeholder="Select model source..."
              fluid
              selection
              options={this.modelSources}
              onChange={(event, { value }) => {
                setSource(value)
                this.setState({ modelSource: value })
              }}
            />
          </Modal.Content>
          <Modal.Actions>
            <Link
              to={`/model_editor/${modelType}/${modelSource}/${project.projectId}`}
            >
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
              <Table.HeaderCell singleLine collapsing>
                S. No.
              </Table.HeaderCell>
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
                    <Link
                      to={`/model_editor/${model.type}/${model.source}/${project.projectId}/${model._id}`}
                    >
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
  project: PropTypes.object,
  fetchProject: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setSource: PropTypes.func.isRequired
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
    },
    setProjectId: id => {
      return dispatch(setProjectId(id))
    },
    setName: name => {
      return dispatch(setName(name))
    },
    setType: type => {
      return dispatch(setType(type))
    },
    setSource: source => {
      return dispatch(setSource(source))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelsIndex)
