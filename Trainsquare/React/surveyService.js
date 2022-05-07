import axios from "axios";
import * as helper from "./serviceHelpers"

const surveys = {
    endpoint: `${helper.API_HOST_PREFIX}/api/surveys`
}

const selectAll = (pageIndex, pageSize) => {

    const config = {
        method: "GET",
        url: `${surveys.endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);
};

const getByCreatedBy = (pageIndex, pageSize, createdBy) => {
    const config = {
        method: "GET",
        url: `${surveys.endpoint}/current/?pageIndex=${pageIndex}&pageSize=${pageSize}&createdBy=${createdBy}`,
        crossdomain: true,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config).then(helper.onGlobalSuccess);
}

const getByQuery = (pageIndex, pageSize, query) => {
    const config = {
        method: "GET",
        url: `${surveys.endpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        crossdomain: true,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config).then(helper.onGlobalSuccess);
}

const addSurvey = (payload) => {
    const config = {
        method: "POST",
        url: `${surveys.endpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess);
};

const updateSurvey = (payload, updateId) => {
    const config = {
        method: "PUT",
        url: `${surveys.endpoint}/${updateId}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);
};

const deleteSurvey = (deleteId) => {
    const config = {
        method: "DELETE",
        url: `${surveys.endpoint}/${deleteId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess);
};

const getById = (id) => {
    const config = {
        method: "GET",
        url: `${surveys.endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess);
}



export { addSurvey, updateSurvey, deleteSurvey, selectAll, getByCreatedBy, getByQuery, getById }