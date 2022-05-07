import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, ButtonGroup, Card } from 'react-bootstrap';
import * as surveyService from '../../services/surveyService';
import Survey from './Survey';
import { Link } from 'react-router-dom';
import * as toastr from 'toastr';

const _logger = debug.extend('MySurveys');

const MySurveys = () => {
    const [pageData, setPageData] = useState({
        arrayOfSurveys: [],
        surveyComponents: [],
    });

    const [page] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const mapSurvey = (aSurvey) => {
        return <Survey survey={aSurvey} key={'SurveyA-' + aSurvey.id} onDeleteClicked={onDeleteRequested} />;
    };

    const onDeleteRequested = useCallback((mySurvey, e) => {
        _logger(mySurvey.id, { mySurvey, e });
        const handler = getDeleteSuccessHandler(mySurvey.id);
        surveyService.deleteSurvey(mySurvey.id).then(handler).catch(onDeleteError);
    }, []);
    const getDeleteSuccessHandler = (idToBeDeleted) => {
        return () => {
            setPageData((prevState) => {
                const pd = { ...prevState };
                pd.arrayOfSurveys = [...pd.arrayOfSurveys];

                const idxOf = pd.arrayOfSurveys.findIndex((survey) => {
                    let result = false;

                    if (survey.id === idToBeDeleted) {
                        result = true;
                    }

                    return result;
                });

                if (idxOf >= 0) {
                    pd.arrayOfSurveys.splice(idxOf, 1);
                    pd.surveyComponents = pd.arrayOfSurveys.map(mapSurvey);
                }

                return pd;
            });
        };
    };
    const onDeleteError = (error) => {
        _logger(error);
        toastr.error('Record Not Deleted');
    };

    useEffect(() => {
        _logger('createdByInfo');
        surveyService
            .getByCreatedBy(page.pageIndex, page.pageSize)
            .then(onSuccessGetCreatedBy)
            .catch(onErrorGetCreatedBy);
    }, []);

    const onSuccessGetCreatedBy = (data) => {
        _logger(data.item.pagedItems);

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfSurveys = data.item.pagedItems;
            pd.surveyComponents = data.item.pagedItems.map(mapSurvey);
            return pd;
        });
    };
    const onErrorGetCreatedBy = (error) => {
        _logger(error);
        toastr.error('Records not Found');
    };

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Row className="mb-2">
                                    <h4>My Surveys</h4>
                                    <Col sm={4}>
                                        <Link to="/surveys/create" variant="danger" className="rounded-pill mb-3">
                                            <i className="mdi mdi-plus"></i> Create Survey
                                        </Link>
                                    </Col>
                                    <Col sm={8}>
                                        <div className="text-sm-end">
                                            <div className="btn-group mb-3">
                                                <Button variant="primary">All</Button>
                                            </div>
                                            <ButtonGroup className="mb-3 ms-1">
                                                <Button variant="light">Active</Button>
                                                <Button variant="light">Draft</Button>
                                            </ButtonGroup>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="search p-3">
                                    <div className="form-group searchInputs">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="mdi mdi-magnify search-icon"></span>
                                    </div>
                                    <div className="row">{pageData.arrayOfSurveys.map(mapSurvey)}</div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default MySurveys;
