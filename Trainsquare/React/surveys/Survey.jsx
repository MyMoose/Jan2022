import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SurveyModal from './SurveyModal';


const _surveyLogger = debug.extend('TESTSurvey');

const Survey = (props) => {
    const aSurvey = props.survey;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const onLocalSurveyClicked = (evt) => {
        evt.preventDefault();
        props.onDeleteClicked(props.survey, evt);
    };

    const goToEditSurvey = (e) => {
        navigate(`/surveys/${e.target.id}/edit`, { state: aSurvey });
        _surveyLogger('navigating to edit page', e.target.id);
    };

    return (
        <Card className="d-block">
            {aSurvey.imageUrl && (
                <>
                    <img className="card-img-top" src={aSurvey.imageUrl} alt="" />
                    <div className="card-img-overlay">
                        <div
                            className={
                                ('badge',
                                {
                                    'bg-success': aSurvey.status.name === 'Active',
                                    'bg-secondary': aSurvey.status.name === 'Inactive',
                                    'bg-warning': aSurvey.status.name === 'Pending',
                                    'bg-info': aSurvey.status.name === 'Canceled',
                                },
                                'p-1')
                            }>
                            {aSurvey.status.name}
                        </div>
                    </div>
                </>
            )}

            <Card.Body className={aSurvey.imageUrl ? 'position-relative' : ''}>
                {aSurvey.imageUrl && (
                    <Dropdown className="card-widgets" align="end">
                        <Dropdown.Toggle
                            variant="link"
                            tag="a"
                            className="card-drop arrow-none cursor-pointer p-0 shadow-none">
                            <i className="mdi mdi-account-details-outline"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link
                                to={`/surveys/edit/119`}
                                state={aSurvey}
                                data-original-title="Mat Helme"
                                className="d-inline-block me-1 ms-1">
                                please
                            </Link>
                            <Dropdown.Item>
                                <i className="mdi mdi-pencil me-1" id={aSurvey.id} onClick={goToEditSurvey}></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <i className="mdi mdi-delete me-1" onClick={() => setIsOpen(true)}></i>Delete
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <i className="mdi mdi-email-outline me-1"></i>Invite (Work in Progress...)
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}

                {/* DELETE MODAL */}
                {isOpen && (
                    <SurveyModal onClose={() => setIsOpen(false)}>
                        Are you sure you want to delete?
                        <button
                            className="link-btn btn btn-outline-danger btn-sm mdi mdi-trash-can ms-1 me-1"
                            onClick={onLocalSurveyClicked}
                            style={{ width: 50 }}></button>
                    </SurveyModal>
                )}

                <h4 className="mt-0">
                    <Link to={`/surveys/${aSurvey.id}/details`} className="text-title">
                        {aSurvey.name}
                    </Link>
                </h4>

                {aSurvey.description && (
                    <p className="text-muted font-13 my-3">
                        {aSurvey.description}...
                        <Link to="#" className="fw-bold text-muted">
                            view more
                        </Link>
                    </p>
                )}

                <p className="mb-1">
                    <span className="pe-2 text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-lead-pencil text-muted me-1"></i>
                        <Link to="#" className="fw-bold text-muted">
                            Take Survey
                        </Link>
                    </span>
                    <span className="pe-2 text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-human-queue text-muted me-1"></i>
                        <b>Taken Count</b>
                    </span>
                </p>
                <p className="mb-1">
                    <span className="pe-2 text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-comment-multiple-outline text-muted me-1"></i>
                        <b>Survey Release Date</b> {new Date(aSurvey.dateCreated).toLocaleDateString()}
                    </span>
                </p>
            </Card.Body>

            {aSurvey.imageUrl && (
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
                                        <img
                                            src={aSurvey.createdBy.avatarUrl}
                                            className="rounded-circle avatar-xs"
                                            alt="friend"
                                        />
                                    </Link>
                                </span>
                                {aSurvey.createdBy.firstName} {aSurvey.createdBy.lastName}
                            </span>
                        </p>
                    </li>
                </ul>
            )}
        </Card>
    );
};

Survey.propTypes = {
    survey: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        status: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        surveyType: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        createdBy: PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            avatarUrl: PropTypes.string,
        }),
        dateCreated: PropTypes.string,
    }).isRequired,
    onDeleteClicked: PropTypes.func.isRequired,
};

export default React.memo(Survey);
