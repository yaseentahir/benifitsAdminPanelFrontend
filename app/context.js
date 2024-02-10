"use client";

const { createContext, useContext, useState, useReducer } = require("react");

const BenefitsAdminPanelCtx = createContext();

export const useBenefitsAdminPanelCtx = () => {
  return useContext(BenefitsAdminPanelCtx);
};

// const initialState = {
//   homecards: [],
//   companylinks: [],
//   companycards: [],
//   groups: [],
//   faqs: [],
//   claims: [],
// };

// const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case "HOMECARDS":
//       return { ...state, homecards: payload };
//     case "COMPANYCARDS":
//       return { ...state, companycards: payload };
//     case "LINKS":
//       return { ...state, companylinks: payload };
//     case "FAQS":
//       return { ...state, faqs: payload };
//     case "GROUPS":
//       return { ...state, groups: payload };
//     case "CLAIMS":
//       return { ...state, claims: payload };
//     default:
//       return state;
//   }
// };

export const BenefitsAdminPanelCtxProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(initialState, reducer);
  const [_modalRef, setModalRef] = useState(null);
  const [defaultValues, setDefaultValues] = useState({});
  const [updateId, setUpdateId] = useState("");
  const [consent, setConsent] = useState(false);
  const [tableData, setTableData] = useState([]);

  const values = {
    _modalRef,
    setModalRef,
    defaultValues,
    setDefaultValues,
    updateId,
    setUpdateId,
    consent,
    setConsent,
    tableData,
    setTableData,
  };

  return (
    <BenefitsAdminPanelCtx.Provider value={values}>
      {children}
    </BenefitsAdminPanelCtx.Provider>
  );
};
