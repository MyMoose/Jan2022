import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import * as wizardProps from './wizardPropTypes';
import { Card, Form } from 'react-bootstrap';

const WizardStep000 = (props) => {

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

    return (


        <Form onSubmit={handleSubmit} className="p-1">
            <Card className="p-4 mb-4">
                <Card.Header>
                    <h2 className="text-center">Trainsquare Workshops</h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">Fill in Workshop SNS information</h4>
                    <p className="text-muted mb-4"></p>
                </div>

                <div className="form-group my-3">
                    <Form.Control
                        name="imageUrl"
                        type="text"
                        placeholder="Enter a workshop image url"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                </div>
                <div className="form-group  my-3">
                    <Form.Control
                        name="externalSiteUrl"
                        type="text"
                        placeholder="Enter a workshop external website url"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

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
                            !values.imageUrl ||
                            Boolean(errors.imageUrl) ||
                            !values.externalSiteUrl ||
                            Boolean(errors.externalSiteUrl)
                        }
                        onClick={onNextClicked}>
                        {nextLabel}
                    </button>
                </div>

            </Card>
        </Form>


    );
}

WizardStep000.propTypes = wizardProps.wizardPropTypes;

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
})(WizardStep000);

