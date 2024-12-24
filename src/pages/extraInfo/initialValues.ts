import { AgentType, RepresentativeRegistration } from "@/models";


const initialValues: Omit<
  RepresentativeRegistration,
  "first_name" | "last_name" | "phone_number"
> = {
  agent_code: "",
  province: "",
  county: "",
  insurance_branch: "",
  agency_type: AgentType.REAL,
  city_code: "",
  phone: "",
  name: null,
};

export default initialValues;
