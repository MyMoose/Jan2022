import './loki.css';
import React, { useState } from 'react';
import Loki from 'react-loki';
import WizardStep0 from './WizardStep0';
import WizardStep00 from './WizardStep00';
import WizardStep000 from './WizardStep000';
import WizardStep0000 from './WizardStep0000';
import * as workshop from '../../services/workShopService';
import * as toastr from 'toastr';
import { useNavigate } from 'react-router-dom';


import logger from 'sabio-debug';
const _logger = logger.extend('CreateLoki');

const Wizard = () => {

    const [workshopFormData, setWorkshopForm] = useState({

        name: '',
        summary: '',
        shortDescription: '',
        venueId: '',
        workShopTypeId: '',
        workShopStatusId: '',
        imageUrl: '',
        externalSiteUrl: '',
        languageId: '',
        isFree: false,
        numberOfSessions: 0,
        dateStart: new Date(),
        dateEnd: new Date(),

    });



    let navigate = useNavigate();

    const onChange = (values) => {
        setWorkshopForm(values)
        _logger(values)
    };



    const onFinish = (values) => {
        setWorkshopForm(values)
        //ajax call here
        _logger("Loki", values)
        workshop.add(values).then(onAddWorkshopSuccess).catch(onAddWorkshopError);
    };

    const onAddWorkshopSuccess = (data) => {

        _logger(data);
        toastr.success('Workshop Added');
        navigate('/workshops')
    };

    const onAddWorkshopError = (data) => {
        toastr.error('Workshop failed to add');
        _logger(data);
    };

    const wizardSteps = [
        {
            label: 'Step 0',
            component: <WizardStep0 workshopFormData={workshopFormData} onChange={onChange} />,
        },
        {
            label: 'Step 00',
            component: <WizardStep00 workshopFormData={workshopFormData} onChange={onChange} />,
        },
        {
            label: 'Step 000',
            component: <WizardStep000 workshopFormData={workshopFormData} onChange={onChange} />,
        },
        {
            label: 'Step 0000',
            component: <WizardStep0000 workshopFormData={workshopFormData} onChange={onChange} />,
        },
    ];

    return (
        <div className="wizard">
            <Loki
                steps={wizardSteps}
                onNext={onChange}
                onBack={onChange}
                onFinish={onFinish}
                nextLabel="Next"
                backLabel="Back"
                noActions
            />

        </div>
    );
};

export default Wizard;
