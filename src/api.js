import axios from 'axios';

/**
 * 
 * Function to call the injury-fatality api used by the VicMap component
 * 
 */

export const getInjuryFatalityData = () => (
    axios.get('/api/injury-fatality')
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the injury-data api used by the DonutInjury component
 * 
 */

export const getInjuryData = () => (
    axios.get('/api/injury-data')
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the getCategories api used by the SafetyMeasures component
 * 
 */

export const getCategories = () => (
    axios.get('/api/getCategories')
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the getChecklistItems/:category_id api used by the SafetyChecklist component
 * 
 * @param {string} category_id category_id for which the safety checklist items are retrieved
 * 
 */

export const getChecklistItems = (category_id) => (
    axios.get(`/api/getChecklistItems/${category_id}`)
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the getSeverityQs api used by the PriorityForm component
 * 
 */

export const getSeverityQs = () => (
    axios.get(`/api/getSeverityQs`)
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the getFrequencyQs api used by the PriorityForm component
 * 
 */

export const getFrequencyQs = () => (
    axios.get(`/api/getFrequencyQs`)
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the getHomePageStats api used by the SafetyMeasures component
 * 
 */

export const getHomePageStats = () => (
    axios.get(`/api/getHomePageStats`)
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the get-checklist-questionnaire api used by the ChecklistQuestionnaire component
 * 
 */

export const getChecklistQuestionnaire = () => (
    axios.get(`/api/get-checklist-questionnaire`)
        .then(response => response.data)
        .catch(err => err)
);

/**
 * 
 * Function to call the updateTable api used by the PriorityForm component
 * 
 */

export const updateTable = (question_id, sev,freq) => {
    let params = {id:question_id,se:sev,fre:freq};
    axios.get(`/api/updateTable`, {params})
            .then(response => response.data)
            .catch(err => err);
}

