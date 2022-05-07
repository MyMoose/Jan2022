import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import * as wizardProps from './wizardPropTypes';
import { Card, Form } from 'react-bootstrap';


const WizardStep0000 = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        onBack,
        isSubmitting,
        cantBack,
        backLabel,
        nextLabel,
        onFinish,

    } = props;

    useEffect(() => {
        onChange();
    }, [values]);

    const onChange = () => {
        props.onChange(values);
    };

    const onBackClicked = () => {
        onBack(values);
    };



    return (
        <Form onSubmit={handleSubmit} className="p-1">
            <Card className="p-4 mb-4">
                <Card.Header>
                    <h2 className="text-center">Trainsquare Workshops</h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">Fill in Workshop Date information</h4>
                    <p className="text-muted mb-4"></p>
                </div>

                <div className="form-group row my-3">
                    <div className="col-3">
                        <label htmlFor=""> Is this event free?&nbsp;&nbsp; </label>
                        <Form.Control
                            type="checkbox"
                            name="isFree"
                            className="form-check-input"
                            onChange={handleChange}
                        />

                    </div>{' '}
                    <div className="col-3">
                        <label htmlFor="numberOfSessions"> Input the number of sessions&nbsp;&nbsp;</label>
                        <Form.Control
                            name="numberOfSessions"
                            type="number"
                            placeholder="0"
                            className="drop btn btn-small"
                            onChange={handleChange}
                        />

                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">


                        <label htmlFor="dateStart">Start date:</label>

                        <Form.Control
                            type="date"
                            id="dateStart"
                            name="dateStart"
                            onChange={handleChange}
                            value={values.dateStart}
                            min={values.dateStart}
                        />

                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="dateEnd">End date:</label>

                        <Form.Control
                            type="date"
                            id="dateEnd" name="dateEnd"
                            onChange={handleChange}
                            value={values.dateEnd}
                            min={values.dateStart}
                        />

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
                            !values.isFree ||
                            Boolean(errors.isFree) ||
                            !values.numberOfSessions ||
                            Boolean(errors.numberOfSessions) ||
                            !values.dateStart ||
                            Boolean(errors.dateStart) ||
                            !values.dateEnd ||
                            Boolean(errors.dateEnd)
                        }
                        onClick={onFinish}>
                        {nextLabel}
                    </button>
                </div>
            </Card>
        </Form>

    );
}

WizardStep0000.propTypes = wizardProps.wizardPropTypes;

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
})(WizardStep0000);