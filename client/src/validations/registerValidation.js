// import * as yup from "yup"

// const regFormValidationSchema = yup.object().shape(
//     {
//         fullName : yup.string().required("Name cant be empty!"),
//         dob : yup.string().required("Date of Birth cant be empty!"),
//         email : yup.string().required("Email cant be empty!").email("Enter a valid email!"),
//         pwd : yup.string().required("Cant be empty!").min(6, "Minimum 6 characters!"),
//         cnfPwd : yup.string().required("Cant be empty!").oneOf([yup.ref("pwd"), null], "Passwords do not match!")
//     }
// )

// export default regFormValidationSchema

import * as yup from "yup";

const regFormValidationSchema = yup.object().shape({
  name: yup.string().required("Name cannot be empty!"),

  email: yup
    .string()
    .required("Email cannot be empty!")
    .email("Enter a valid email!"),

  password: yup
    .string()
    .required("Password cannot be empty!")
    .min(6, "Minimum 6 characters!"),

  confirmPassword: yup
    .string()
    .required("Confirm Password cannot be empty!")
    .oneOf([yup.ref("password")], "Passwords do not match!")
});

export default regFormValidationSchema;
