export const Inital_State2 = {
  states: "$",
  district: "$",
  job_title: "$",
  duration: "$",
  salary: "$",
  workmode: "$",
  education: "$",
  experience: "$",
  companyname: "$",
  page: 0,
  filter_click: false,
};

export const LongTimeFilter = (state, action) => {
  switch (action.type) {
    case "SET_STATE_long": {
      return {
        ...state,
        states: action.payload,
      };
    }
    case "SET_DISTRICT_long": {
      return {
        ...state,
        district: action.payload,
      };
    }

    case "SET_JOBTITLE_long": {
      return {
        ...state,
        job_title: action.payload,
      };
    }
    case "Is_filter_clicked_long": {
      return {
        ...state,
        filter_click: true,
      };
    }
    case "Page_Increase": {
      return {
        ...state,
        page: action.payload,
      };
    }
    case "Revert_clicked_long": {
      return {
        ...state,
        filter_click: false,
      };
    }
    case "SET_Duration_long": {
      return {
        ...state,
        duration: action.payload,
      };
    }

    case "SET_SALARY_long": {
      return {
        ...state,
        salary: action.payload,
      };
    }
    case "SET_WORKMODE_long": {
      return {
        ...state,
        workmode: action.payload,
      };
    }
    case "SET_EDUCATION_long": {
      return {
        ...state,
        education: action.payload,
      };
    }
    case "SET_experience_long": {
      return {
        ...state,
        experience: action.payload,
      };
    }
    case "RESET": {
      return {
        states: "$",
        district: "$",
        job_title: "$",
        duration: "$",
        salary: "$",
        workmode: "$",
        education: "$",
        experience: "$",
        companyname: "$",
        page: 0,
        filter_click: false,
      };
    }
    case "SET_Company_NAME_long": {
      return {
        ...state,
        companyname: action.payload,
      };
    }
    case "GET Data": {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
