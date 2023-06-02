import { IS_USERIN } from "./action.js";
import { USER_ID } from "./action.js";

const initialState = {
  IS_user_login: false,
  ID: "",
  IP: "",
  lang: "English",
  lang_value: "en",
  CountryCode: "US",
  user_details_given: false,
  job_provider_info: false,
  rental_seeker_user_details: false,
  rental_seeker_info: false,
  rental_provider_info: false,
  selected_Tools: "Tools",
  Rental_provider_user_details: false,
  job_provider_personal_user_details: false,
  job_Provider_company_user_details: false,
  job_seeker_info: false,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_USERIN: {
      return {
        ...state,

        ID: action.payload,
      };
    }
    case "Iam_user": {
      return {
        ...state,
        IS_user_login: true,
      };
    }
    case "job_provider": {
      return {
        ...state,
        job_provider_info: true,
        job_seeker_info: false,
        rental_provider_info: false,
        rental_seeker_info: false,
      };
    }

    case "changeIP": {
      return {
        ...state,
        IP: action.payload,
      };
    }
    case "language": {
      return {
        ...state,
        lang: action.payload,
      };
    }
    case "language_value": {
      return {
        ...state,
        lang_value: action.payload,
      };
    }
    case "select_items": {
      return {
        ...state,
        selected_Tools: action.payload,
      };
    }
    case "Rental_seeker_user_details": {
      return {
        ...state,
        rental_seeker_user_details: true,
      };
    }
    case "personal_job_provider": {
      return {
        ...state,
        user_details_given: true,
        job_provider_personal_user_details: true,
        job_Provider_company_user_details: false,
      };
    }
    case "Rental_provider_Personal": {
      return {
        ...state,
        Rental_provider_user_details: true,
        user_details_given: true,
      };
    }
    case "remove these": {
      return {
        ...state,
        job_Provider_company: false,
        job_Provider_personal: false,
      };
    }
    case "job_Provider_company": {
      return {
        ...state,
        user_details_given: true,
        job_provider_personal_user_details: false,
        job_Provider_company_user_details: true,
      };
    }
    case "im_job_seeker": {
      return {
        ...state,
        job_seeker_info: true,
        job_provider_info: false,
        rental_provider_info: false,
        rental_seeker_info: false,
      };
    }
    case "im_Rental_provider": {
      return {
        ...state,
        job_seeker_info: false,
        job_provider_info: false,
        rental_seeker_info: false,

        rental_provider_info: true,
      };
    }
    case "Restart": {
      return {
        ...state,
        IS_user_login: false,
        ID: "",
        IP: "",
        lang: "en",

        user_details_given: false,
        job_provider_info: false,
        rental_seeker_user_details: false,
        rental_seeker_info: false,
        rental_provider_info: false,
        selected_Tools: "Tools",
        Rental_provider_user_details: false,
        job_provider_personal_user_details: false,
        job_Provider_company_user_details: false,
        job_seeker_info: false,
      };
    }
    case "get_State": {
      return {
        ...state,
      };
    }
    case "im_Rental_seeker": {
      return {
        ...state,
        job_seeker_info: false,
        job_provider_info: false,
        rental_provider_info: false,
        rental_seeker_info: true,
      };
    }
    case "User_Details_Given": {
      return {
        ...state,
        user_details_given: true,
      };
    }
    // case USER_ID: {
    //
    //
    //   return {
    //     ...state,
    //     ID: action.payload,
    //   };
    // }
    case "remove": {
      return {
        IS_user_login: false,
        ID: "",
      };
    }
    default:
      return state;
  }
};
export default todoReducer;
