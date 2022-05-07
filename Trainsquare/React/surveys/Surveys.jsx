import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Button, ButtonGroup, } from 'react-bootstrap';
import * as surveyService from "../../services/surveyService";
import { useDebounce } from "./Debounce";
import { Link } from "react-router-dom";
import * as toastr from "toastr"
import Survey from "./Survey"


const _logger = debug.extend("Surveys");

const Surveys = () => {

    const [pageData, setPageData] = useState({
        arrayOfSurveys: [],
        surveyComponents: [],
    });

    const [page, setPage] = useState({
        pageIndex: 0,
        pageSize: 12,

    });

    const [searchInput, setSearchInput] = useState("")

    const changeHandler = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)

    }

    const onDeleteRequested = useCallback((mySurvey, e) => {
        _logger(mySurvey.id, { mySurvey, e });
        const handler = getDeleteSuccessHandler(mySurvey.id)
        surveyService.deleteSurvey(mySurvey.id).then(handler).catch(onDeleteError)

    }, []);
    const getDeleteSuccessHandler = (idToBeDeleted) => {

        return () => {
            setPageData(prevState => {
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
        }
    }
    const onDeleteError = (error) => {
        _logger(error);
        toastr.error("Record Not Deleted")
    }

    useEffect(() => {

        surveyService.selectAll(page.pageIndex, page.pageSize).then(onSelectAllSuccess).catch(onSelectAllError);

    }, [page])

    const debouncedSearchInput = useDebounce(searchInput, 1000)

    useEffect(() => {
        if (searchInput.length > 0) {
            surveyService.getByQuery(page.pageIndex, page.pageSize, searchInput)
                .then(onSuccessGetCreatedBy)
                .catch(onErrorGetCreatedBy)
        }
        else {
            surveyService.selectAll(page.pageIndex, page.pageSize)
                .then(onSelectAllSuccess)
                .catch(onSelectAllError)
        }
    }, [debouncedSearchInput])

    const onSelectAllSuccess = (data) => {
        _logger(data.item.pagedItems)

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfSurveys = data.item.pagedItems
            pd.surveyComponents = data.item.pagedItems.map(mapSurvey);
            return pd
        })
    }
    const onSelectAllError = (error) => {
        _logger(error)
        toastr.error("Records not Found")
    }
    const onSuccessGetCreatedBy = (data) => {
        _logger(data.item.pagedItems)

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfSurveys = data.item.pagedItems
            pd.surveyComponents = data.item.pagedItems.map(mapSurvey);
            return pd
        })
    }
    const onErrorGetCreatedBy = (error) => {
        _logger(error)
        toastr.error("Records not Found")
    }

    const mapSurvey = (aSurvey) => {
        return (
            <Col md={6} xxl={3} key={'SurveyA-' + aSurvey.id}>
                <Survey
                    survey={aSurvey}
                    onDeleteClicked={onDeleteRequested}
                />
            </Col>
        )
    }

    const scrollToEnd = () => {
        setPage((prevState) => {
            return {
                ...prevState,
                pageSize: prevState.pageSize + 4
            }
        })
    }

    window.onscroll = function () {
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            scrollToEnd()
        }
    }



    return (
        <>
            <Row className="mb-2">
                <h2>Survey</h2>
            </Row>

            <Row className="searchInputs">
                <Col sm={12}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={changeHandler}

                    />
                </Col>
            </Row>
            <hr />

            <Row className="mb-2">
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
                            <Button variant="light">Inactive</Button>
                            <Button variant="light">Pending</Button>
                            <Button variant="light">Cancelled</Button>
                        </ButtonGroup>


                    </div>
                </Col>
            </Row>

            <Row>
                {pageData.arrayOfSurveys.map(mapSurvey)}
            </Row>
        </>
    );
}



export default Surveys;