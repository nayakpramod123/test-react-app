import { get, post, put } from 'axios'
import axios from 'axios'
import { services, domains } from 'config'
import { checkStatus } from './utils/index'
import { SR_NUM_SOURCE_CDE } from '../app/utils/constants.js'

export const setStudentLists = (headers, body) => {
  return post(`${domains.restService}${services.students}`, body, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const getStudentLists = (headers) => {
  return get(`${domains.restService}${services.students}`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const setStudentData = (headers, body, id) => {
  return put(`${domains.restService}${services.students}/${id}`, body, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => err)
}

export const getStudentNationality = (headers, id) => {
  return get(`${domains.restService}${services.students}/${id}/Nationality/`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const setStudentNationality = (headers, body, id, nationalityId) => {
  return put(`${domains.restService}${services.students}/${id}/Nationality/${nationalityId}`, body, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const getStudentFamilyMembers = (headers, id) => {
  return get(`${domains.restService}${services.students}/${id}/FamilyMembers/`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const setStudentFamilyMembers = (headers, body, id) => {
  return post(`${domains.restService}${services.students}/${id}/FamilyMembers/`, body, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const setFamilyMembers = (headers, body, id) => {
  return put(`${domains.restService}${services.familyMembers}/${id}`, body, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const deleteFamilyMembers = (headers, body, id) => {
  return axios.delete(`${domains.restService}${services.familyMembers}/${id}`, body, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const getFamilyMemberNationality = (headers, id) => {
  return get(`${domains.restService}${services.familyMembers}/${id}/Nationality/`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const setFamilyMemberNationality = (headers, body, id, nationalityId) => {
  return put(`${domains.restService}${services.familyMembers}/${id}/Nationality/${nationalityId}`, body, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const getAllNationalities = (headers, id) => {
  return get(`${domains.restService}${services.nationalities}`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const fetchCurrentPolicyInfo = (headers, nmUniqueId, logger, policyNumber) => {
  return get(`${domains.plservices}${services.headers}/${policyNumber}/loans`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const getOwnerDetails = (headers, nmUniqueId, logger, finProdId) => {
  return get(`${domains.plservices}${services.ownerDetails}/${finProdId}/owner`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}
/*
export const getQuestions = (headers, nmUniqueId, logger, finProdId) => {
  return get(`${domains.plservices}${services.headers}/${finProdId}/owner`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => {
      return err
    })
}
*/

export const getKlemps = (headers, logger) => {
  // Temporary way to mock headers and force error page unil service is ready
  let usersToShowError = ['PET8267', 'WOL14']
  let clientsToShowError = ['C7FBDED27', 'RWFBQE917'] // 12809311, 10537546 (Field)
  let visibility = !(usersToShowError.indexOf(headers['x-nm-nm_login_id']) >= 0 && clientsToShowError.indexOf(headers['x-nm-px-auth-client-nm-unique-id']) >= 0)
  return {visibility: visibility}
}

export const getSections = (headers, nmUniqueId, logger) => {
  return get(`${domains.localhost}${services.sections}`, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => err)
}

export const validateBank = (headers, nmUniqueId, logger, body) => {
  return put(`${domains.banking}${services.upsert}`, body, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => err)
}

export const getBanks = (headers, LEID, logger) => {
  headers['x-nm-nm_leid'] = LEID
  return get(`${domains.banking}${services.inquire}`, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => {
      return err
    })
}

export const getQuestions = (headers, nmUniqueId, logger, sectionId, answers) => {
  return post(`${domains.localhost}${services.questions}/${sectionId}`, answers, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => {
      return err
    })
}

export const getOptions = (headers, nmUniqueId, logger, type) => {
  return get(`${domains.localhost}${services.options}/${type}`, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => {
      return err
    })
}

export const getReflexiveQuestions = (questionId, sectionId, value, reqNum, headers, nmUniqueId, logger) => {
  return get(`${domains.localhost}${services.reflexiveQuestions}/${questionId}/${sectionId}/${value}`, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => {
      return err
    })
}

export const getAllAccounts = (headers, nmUniqueId, logger) => {
  return get(`${domains.plservices}${services.headers}/getAllAccounts`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}

export const getEligibility = (headers, finProdId, logger) => {
  return get(`${domains.plservices}${services.eligibility}/${finProdId}/eligibility?prodtypecd=01`, {headers})
  .then(checkStatus)
  .then(response => response)
  .catch(err => err)
}

export const getAllEditCodes = (body, headers, nmUniqueId, logger) => {
  return post(`${domains.plservices}${services.headers}`, body, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => err)
}
export const getExistingCases = (operatorId, policyNumber, headers, nmUniqueId, logger) => {
  return get(`${domains.plservices}${services.caseDetails}/${operatorId}?policyNumber=${policyNumber}`, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => err)
}

export const saveCustomCoverLetter = (logger, headers, body) => {
  return post(`${domains.plservices}${services.aemService}/saveCustomCoverLetter`, body, {headers})
    .then(checkStatus)
    .then(response => response.data[0])
    .catch(err => err)
}

export const generateSRNumber = (headers, nmUniqueId, logger) => {
  return get(`${domains.plservices}${services.generateSrNumber}/${SR_NUM_SOURCE_CDE}`, {headers})
    .then(checkStatus)
    .then(response => response.data)
    .catch(err => err)
}

export const submitData = (logger, headers, body) => {
  return post(`${domains.plservices}${services.submit}`, body, {headers})
    .then(checkStatus)
    .then(response => {
      return response
    })
    .catch(err => {
      return err
    })
}

export const previewForm = (logger, headers, body) => {
  return post(`${domains.plservices}${services.aemService}/aem-proxy`, body, {headers})
  .then(checkStatus)
  .then(response => {
    return response
  })
  .catch(err => {
    return err
  })
}

export const getForm = (headers, SRNumber, logger) => {
  return get(`${domains.plservices}${services.form}/${SRNumber}`, {headers})
    .then(checkStatus)
    .then(response => response)
    .catch(err => err)
}
