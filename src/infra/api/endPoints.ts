// apiEndpoints.ts
const API_ENDPOINTS = {
  sendOtpSms: "api/v2/app/DEY/agent/verification/signup/create_otp/",
  validateOtp: "api/v2/app/DEY/agent/verification/signup/validate_otp/",
  checkAgencyCode:
    "api/v2/app/DEY/agent/verification/signup/check_agency_code/",
  listOfProvinces: "base/provinces_wop/",
  listOfCities: "base/counties_wop/",
  listOfBranches: "api/v2/app/selection_item/insurance_branch/wop_list/",
  signUp: "api/v2/app/DEY/agent/verification/signup/",
};

export default API_ENDPOINTS;
