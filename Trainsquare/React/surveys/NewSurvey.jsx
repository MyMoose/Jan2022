import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, } from "formik";
import { Row, Col, Card, Dropdown } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as surveyService from "../../services/surveyService"
import NewSurveySchema from "../../schema/surveySchema"
import * as toastr from "toastr"
import avatar3 from "../../assets/images/users/avatar-3.jpg"

const _logger = debug.extend("NewSurvey");

const NewSurvey = () => {

    const { state } = useLocation();
    const navigate = useNavigate()
    const [newData, setNewData] = useState({

        name: "",
        description: "",
        imageUrl: "",
        statusId: "",
        surveyTypeId: "",
        createdBy: "",
        id: null,

    });


    useEffect(() => {
        if (state) {
            setNewData((prevState) => {
                return {
                    ...prevState,
                    ...state,
                    statusId: state.status.id.toString(),
                    surveyTypeId: state.surveyType.id.toString(),
                    createdBy: state.createdBy.firstName.toString()
                }
            })
        }
    }, [])

    const handleSubmit = (values) => {
        if (!values.id) {
            surveyService.addSurvey(values).then(onRegisterSurveySuccess).catch(onRegisterSurveyError);
        }
        else {
            surveyService.updateSurvey(values, values.id).then(onUpdateSuccess).catch(onUpdateError)
        }

        _logger(values)
    };

    const onRegisterSurveySuccess = (data) => {

        toastr.success("Survey Added")
        _logger(data, "onRegisterSurveySuccess")
        navigate(`/surveys`)
    }
    const onRegisterSurveyError = (error) => {
        toastr.error("Survey Not Added")
        _logger(error, "onRegisterSurveyError")
    }
    const onUpdateSuccess = (data) => {
        toastr.success("SurveyUpdated")
        _logger(data)
    }
    const onUpdateError = (error) => {
        toastr.error("Survey Not Updated")
        _logger(error)
    }



    return (

        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={newData}
                                    onSubmit={handleSubmit}
                                    validationSchema={NewSurveySchema}
                                >
                                    {({ values }) => (
                                        <Form>
                                            <Row>
                                                <Col lg={6}>
                                                    <hr />
                                                    <div className="form-group">
                                                        <label htmlFor="name">Survey Title</label>
                                                        <Field type="text" name="name" className="form-control" />
                                                        <ErrorMessage
                                                            name="fullName"
                                                            component="div"
                                                            className="has-error"
                                                        />
                                                    </div>
                                                    <hr />
                                                    <div className="form-group">
                                                        <label htmlFor="description">Description</label>
                                                        <Field
                                                            component="textarea"
                                                            name="description"
                                                            className="form-control"
                                                            rows="5"
                                                        />
                                                        <ErrorMessage
                                                            name="description"
                                                            component="div"
                                                            className="has-error"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="imageUrl">Image</label>
                                                        <Field type="text" name="imageUrl" className="form-control" />
                                                        <ErrorMessage
                                                            name="imageUrl"
                                                            component="div"
                                                            className="has-error"
                                                        />
                                                    </div>

                                                    <hr />
                                                    <div className="form-check">
                                                        <Field
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="statusId"
                                                            value="1"
                                                        ></Field>
                                                        <label className="form-check-label">Active</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <Field
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="statusId"
                                                            value="2"
                                                        ></Field>
                                                        <label className="form-check-label">Inactive</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <Field
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="statusId"
                                                            value="3"
                                                        ></Field>
                                                        <label className="form-check-label">Pending</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <Field
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="statusId"
                                                            value="4"
                                                        ></Field>
                                                        <label className="form-check-label">Canceled</label>
                                                    </div>
                                                    <hr />
                                                    <hr />
                                                    <div className="form-group">
                                                        <Field
                                                            component="select"
                                                            name="surveyTypeId"
                                                            className="form-control"
                                                        >
                                                            <option value="">Please select a Survey Type</option>
                                                            <option value="1">Default</option>
                                                            <option value="2">Draft</option>
                                                        </Field>
                                                    </div>
                                                    <hr />
                                                    <div className="form-group">
                                                        <label htmlFor="createdBy">Created By</label>
                                                        <Field disabled type="text" name="createdBy" className="form-control" placeholder="name" />

                                                    </div>
                                                    <hr />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-success"
                                                    >
                                                        Submit</button>
                                                </Col>
                                                <Col lg={6}>
                                                    <Card className="d-block">
                                                        {values.imageUrl && (
                                                            <>
                                                                <img className="card-img-top" src={values.imageUrl} alt="" />
                                                                <div className="card-img-overlay">
                                                                    <div
                                                                        className={(
                                                                            'badge',
                                                                            {
                                                                                'bg-success': values.statusId === 'Active',
                                                                                'bg-secondary': values.statusId === 'Inactive',
                                                                                'bg-warning': values.statusId === 'Pending',
                                                                                'bg-info': values.statusId === 'Canceled',
                                                                            },
                                                                            'p-1'
                                                                        )}>
                                                                        {values.statusId}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        <Card.Body className={values.imageUrl ? 'position-relative' : ''}>
                                                            {values.imageUrl && (
                                                                <Dropdown className="card-widgets" align="end">
                                                                    <Dropdown.Toggle
                                                                        variant="link"
                                                                        tag="a"
                                                                        className="card-drop arrow-none cursor-pointer p-0 shadow-none">
                                                                        <i className="uil uil-list-ul"></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item>
                                                                            <i className="mdi mdi-pencil me-1"
                                                                                id={values.id}
                                                                            ></i>Edit
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item>
                                                                            <i className="mdi mdi-delete me-1"
                                                                            ></i>Delete
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item>
                                                                            <i className="mdi mdi-email-outline me-1"></i>Invite (Work in Progress...)
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            )}
                                                            <h4 className="mt-0">
                                                                <Link to={`/surveys/${values.id}/details`} className="text-title">
                                                                    {values.name}
                                                                </Link>
                                                            </h4>
                                                            {values.description && (
                                                                <p className="text-muted font-13 my-3">
                                                                    {values.description}...
                                                                    <Link to="#" className="fw-bold text-muted">
                                                                        view more
                                                                    </Link>
                                                                </p>
                                                            )}
                                                            <p className="mb-1">
                                                                <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                                                    <i className="mdi mdi-format-list-bulleted-type text-muted me-1"></i>
                                                                    <b>{values.totalTasks}</b> Take Survey
                                                                </span>
                                                                <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                                                    <i className="mdi mdi-comment-multiple-outline text-muted me-1"></i>
                                                                    <b>{values.totalComments}</b> Taken Count
                                                                </span>
                                                            </p>
                                                            <p className="mb-1">
                                                                <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                                                    <i className="mdi mdi-comment-multiple-outline text-muted me-1"></i>
                                                                    <b>{values.totalComments}</b> Survey Release Date
                                                                </span>
                                                            </p>
                                                        </Card.Body>
                                                        {!values.imageUrl && (

                                                            <ul className="list-group list-group-flush">
                                                                <li className="list-group-item p-3">
                                                                    <p className="mb-2 fw-bold">
                                                                        <span className="float-end">
                                                                            Created By:
                                                                            <span className="float-mid">
                                                                                <Link
                                                                                    to="#"
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title=""
                                                                                    data-original-title="Mat Helme"
                                                                                    className="d-inline-block me-1 ms-1">
                                                                                    <img src={avatar3} className="rounded-circle avatar-xs" alt="friend" />
                                                                                </Link>
                                                                            </span>
                                                                            {values.createdBy.firstName} {values.createdBy.lastName}</span>
                                                                    </p>
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </Card >
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col >
        </Row >

    );
}

export default NewSurvey;