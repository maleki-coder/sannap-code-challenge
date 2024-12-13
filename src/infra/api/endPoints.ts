// apiEndpoints.ts
const API_ENDPOINTS = {
  sendOtpSms: "/DEY/agent/verification/signup/create_otp",
  validateOtp: "/DEY/agent/verification/signup/validate_otp",
  checkAgencyCode: "/DEY/agent/verification/signup/check_agency_code",
  listOfProvinces: "/base/provinces_wop",
  listOfCities: "/base/counties_wop",
  listOfBranches: "/selection_item/insurance_branch/wop_list",
  signUp: "/DEY/agent/verification/signup",
};

export default API_ENDPOINTS;
