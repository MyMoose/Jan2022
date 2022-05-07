import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as wizardProps from './wizardPropTypes';
import lookup from '../../services/lookupService';
import { Card, Form } from 'react-bootstrap';

const _logger = logger.extend('Loki00');

const WizardStep00 = (props) => {

    const [workshopType, setWorkshopType] = useState([]);

    const [venueData, setVenueData] = useState([]);

    const [languageData, setLanguageData] = useState([]);

    const [statusData, setStatusData] = useState([]);

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        onBack,
        onNext,
        isSubmitting,
        cantBack,
        backLabel,
        nextLabel,
    } = props;

    useEffect(() => {
        lookup(['WorkShopTypes']).then(onGetWorkshopTypeSuccess).catch(onGetWorkshopTypeError);
        lookup(['WorkshopVenues']).then(onGetVenuesSuccess).catch(onGetVenuesError);
        lookup(['WorkshopLanguages']).then(onGetLanguagesSuccess).catch(onGetLanguagesError);
        lookup(['WorkShopStatus']).then(onGetStatusSuccess).catch(onGetStatusError);

    }, []);

    useEffect(() => {
        onChange();
    }, [values]);

    const onChange = () => {
        props.onChange(values);
    };

    const onNextClicked = () => {
        onNext(values);
    };

    const onBackClicked = () => {
        onBack(values);
    };

    const mapVenueList = (venue) => {
        return (
            <option key={`${venue.id}_venue`} value={venue.id}>
                {venue.name}
            </option>
        );
    };

    const mapWorkshopTypeList = (workshopType) => {
        return (
            <option key={`${workshopType.id}_type`} value={workshopType.id}>
                {workshopType.name}
            </option>
        );
    };

    const mapLanguageList = (language) => {
        return (
            <option key={`${language.id}_language`} value={language.id}>
                {language.name}
            </option>
        );
    };

    const mapStatusList = (status) => {
        return (
            <option key={`${status.id}_status`} value={status.id}>
                {status.name}
            </option>
        );
    };

    const onGetVenuesSuccess = (data) => {
        let mappedVenues = data.item.workshopVenues?.map(mapVenueList);

        setVenueData(mappedVenues);
    };

    const onGetVenuesError = (response) => {
        _logger('Error', response);
    };

    const onGetWorkshopTypeSuccess = (data) => {
        _logger('types', data);
        let mappedTypes = data.item.workShopTypes?.map(mapWorkshopTypeList);
        setWorkshopType(mappedTypes);
    };

    const onGetWorkshopTypeError = (response) => {
        _logger('Error', response);
    };

    const onGetLanguagesSuccess = (data) => {
        _logger('types', data);
        let mappedLanguages = data.item.workshopLanguages?.map(mapLanguageList);
        setLanguageData(mappedLanguages);
    };

    const onGetLanguagesError = (response) => {
        _logger('Error', response);
    };

    const onGetStatusSuccess = (data) => {
        _logger('types', data);
        let mappedStatus = data.item.workShopStatus?.map(mapStatusList);
        setStatusData(mappedStatus);
    };

    const onGetStatusError = (response) => {
        _logger('Error', response);
    };

    return (


        <Form onSubmit={handleSubmit} className="p-1">
            <Card className="p-4 mb-4">
                <Card.Header>
                    <h2 className="text-center">Trainsquare Workshops</h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">Fill in Venue information</h4>
                    <p className="text-muted mb-4"></p>
                </div>


                <div className="form-group row my-3">
                    <div className="col-6">
                        <Form.Control
                            as="select"
                            type="text"
                            name="venueId"
                            className="dropdown-border btn btn-small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            variant="outlined"
                            value={values.venueId}                        >

                            <option defaultValue={0}>Choose a Venue</option>
                            {venueData}
                        </Form.Control>

                    </div>
                    <div className="col-6">
                        <Form.Control
                            as="select"
                            name="workShopTypeId"
                            type="text"
                            className="dropdown-border btn btn-small"
                            onChange={handleChange}
                            value={values.workShopTypeId}
                            onBlur={handleBlur}
                        >
                            <option defaultValue={0}>Choose a workshop type</option>
                            {workshopType}
                        </Form.Control>

                    </div>
                    <div className="col-6">
                        <Form.Control
                            as="select"
                            name="workShopStatusId"
                            type="text"
                            placeholder="going to change"
                            className="dropdown-border btn btn-small"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            variant="outlined"
                            value={values.workShopStatusId}
                        >
                            {' '}
                            <option defaultValue={0}>Set workshop status</option>
                            {statusData}
                        </Form.Control>

                    </div>
                    <div className="col-6">
                        <Form.Control
                            as="select"
                            name="languageId"
                            type="text"
                            onChange={handleChange}
                            className="dropdown-border btn btn-small"
                            value={values.languageId}
                        >
                            {' '}
                            <option defaultValue={0}>Choose a language</option>
                            {languageData}
                        </Form.Control>

                    </div>
                </div>
                <div className="button-group pt-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onBackClicked}
                        disabled={isSubmitting || cantBack}>
                        {backLabel}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary ml-1"
                        disabled={
                            !values.venueId ||
                            Boolean(errors.venueId) ||
                            !values.workShopTypeId ||
                            Boolean(errors.workShopTypeId) ||
                            !values.workShopStatusId ||
                            Boolean(errors.workShopStatusId) ||
                            !values.workShopStatusId ||
                            Boolean(errors.workShopStatusId) ||
                            !values.languageId ||
                            Boolean(errors.languageId)
                        }
                        onClick={onNextClicked}>
                        {nextLabel}
                    </button>
                </div>

            </Card>
        </Form>


    );
}

WizardStep00.propTypes = wizardProps.wizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        name: props.workshopFormData.name,
        summary: props.workshopFormData.summary,
        shortDescription: props.workshopFormData.shortDescription,
        venueId: props.workshopFormData.venueId,
        workShopTypeId: props.workshopFormData.workShopTypeId,
        workShopStatusId: props.workshopFormData.workShopStatusId,
        languageId: props.workshopFormData.languageId,
        imageUrl: props.workshopFormData.imageUrl,
        externalSiteUrl: props.workshopFormData.externalSiteUrl,
        isFree: props.workshopFormData.isFree,
        numberOfSessions: props.workshopFormData.numberOfSessions,
        dateStart: props.workshopFormData.dateStart,
        dateEnd: props.workshopFormData.dateEnd,
    }),

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(WizardStep00);