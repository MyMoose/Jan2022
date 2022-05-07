import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import * as wizardProps from './wizardPropTypes';
import { Card, Form } from 'react-bootstrap';

const WizardStep0 = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        onNext,
        isSubmitting,
        cantBack,
        backLabel,
        nextLabel,
    } = props;

    useEffect(() => {
        onChange();
    }, [values]);

    const onChange = () => {
        props.onChange(values);
    };

    const onNextClicked = () => {
        onNext(values);
    };

    return (


        <Form onSubmit={handleSubmit} className="p-1">
            <Card className="p-4 mb-4">
                <Card.Header>
                    <h2 className="text-center">Trainsquare Workshops</h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">Fill in Workshop information</h4>
                    <p className="text-muted mb-4"></p>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Enter a workshop name </label>
                    <div className="form-group my-3">
                        <Form.Control
                            name="name"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            placeholder="Enter a Workshop Name"
                            className="form-control"
                        />
                    </div>


                    <label htmlFor="summary">Enter a workshop summary </label>
                    <div className="form-group my-3">

                        <Form.Control
                            name="summary"
                            id="summary"
                            value={values.summary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            placeholder="Enter a Workshop Summary"
                            className="form-control"
                        />
                    </div>


                    <label htmlFor="shortDescription">Enter a workshop short Description </label>
                    <div className="form-group my-3">

                        <Form.Control
                            name="shortDescription"
                            id="shortDescription"
                            value={values.shortDescription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            placeholder="Enter a Workshop Short Description"
                            className="form-control"
                        />
                    </div>
                </div>


                <div className="button-group pt-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={isSubmitting || cantBack}>
                        {backLabel}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary ml-1"
                        disabled={
                            !values.name ||
                            Boolean(errors.name) ||
                            !values.summary ||
                            Boolean(errors.summary) ||
                            !values.shortDescription ||
                            Boolean(errors.shortDescription)
                        }
                        onClick={onNextClicked}>
                        {nextLabel}
                    </button>
                </div>
            </Card>
        </Form>

    );
}

WizardStep0.propTypes = wizardProps.wizardPropTypes;

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
})(WizardStep0);