export const Inital_State = {
  userdeatils: false,
  notIntrested: false,
  job_provider_info: false,
  job_provider_personal: false,
  job_provider_company: false,
  job_seeker_info: false,
  isrentalseeker: false,
  isrentalprovider: false,
  coords: {},
  location: "",
  CountryCode: "IN",
};

export const AUthReducer = (state, action) => {
  switch (action.type) {
    case "User_details_given": {
      return {
        ...state,
        userdeatils: true,
      };
    }
    case "Change_Country": {
      return {
        ...state,
        CountryCode: action.payload,
      };
    }
    case "Set_Job_seeker": {
      return {
        ...state,
        userdeatils: false,
        notIntrested: false,
        job_provider_info: false,
        job_seeker_info: true,
        isrentalseeker: false,
        isrentalprovider: false,
      };
    }
    case "Set_Location": {
      return {
        ...state,
        location: action.payload,
      };
    }

    case "Set_coords": {
      return {
        ...state,
        coords: action.payload,
      };
    }
    case "Set_Job_Provider": {
      return {
        ...state,
        userdeatils: false,
        notIntrested: false,
        job_provider_info: true,
        job_seeker_info: false,
        isrentalseeker: false,
        isrentalprovider: false,
      };
    }
    case "Set_rental_Seeker": {
      return {
        ...state,
        userdeatils: false,
        notIntrested: false,
        job_provider_info: false,
        job_seeker_info: false,
        isrentalseeker: true,
        isrentalprovider: false,
      };
    }
    case "Set_rental_Provider": {
      return {
        ...state,
        userdeatils: false,
        notIntrested: false,
        job_provider_info: false,
        job_seeker_info: false,
        isrentalseeker: false,
        isrentalprovider: true,
      };
    }
    case "not_intrested": {
      return {
        ...state,
        signedIn: false,
        notIntrested: true,
      };
    }
    case "userdetails":
      return {
        ...state,
        userdeatils: true,
      };
    default:
      return state;
  }
};
