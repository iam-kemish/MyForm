import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { useState, useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type FormSubmission = {
  FullName: string;
  EmailAddress: string;
  password: string;
  phNumber: string;
  age: number;
  dob: Date;
};

const Form = () => {
  const [selectDate, setSelectDate] = useState(new Date());

  function calculateAge(AcceptDateOfBirth) {
    const today = new Date();
    const birthDate = new Date(AcceptDateOfBirth);
    let requiredAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      requiredAge--;
    }

    return requiredAge;
  }

  const handleOnDateChange = (date) => {
    setSelectDate(date);
    if (date) {
      const age = calculateAge(date);
      setValue("age", age);
    } else {
      setValue("age", null);
    }
  };
  const form = useForm<FormSubmission>({});
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const onsubmit = (data: FormSubmission) => {
    // console.log("form submitted", data);
    localStorage.setItem("key", JSON.stringify(data));
    alert("Your datas are successfully submitted.");
    form.reset();
  };
  const onError = (errors: FieldErrors<FormSubmission>) => {
    alert("form errors", errors);
  };

  return (
    <div>
      <form className="container fluid" onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputUserName" className="form-label">
            Full name:
          </label>
          <input
            type="text"
            placeholder="Kemish bajagai"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            {...register("FullName", {
              required: "User's name is required.",
            })}
          />
        </div>
        <p className="showError">{errors.FullName?.message}</p>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            placeholder="kemishbajgai@gmail.com"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            {...register("EmailAddress", {
              required: "Email address is required.",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format.",
              },
            })}
          />
        </div>
        <p className="showError">{errors.EmailAddress?.message}</p>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="FirstnameBa@"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9@#$%^&+=])(?!.*\s).{8,}$/,
                message:
                  "password should contain minimum 8 characters, with at least one lowercase and uppercase letter, it should not contain any whitespace.",
              },
            })}
          />
        </div>
        <p className="showError">{errors.password?.message}</p>

        <div className="mb-3">
          <label htmlFor="examplePhoneNumber1">Phone Number:</label>
          <input
            type="number"
            placeholder="+977"
            className="form-control"
            id="number"
            {...register("phNumber", {
              required: "Phone number is required.",
              pattern: {
                value: /^[\+]?[+]?[977]{3}[-]?[0-9]{10}$/,
                message:
                  "Invalid phone number format. Please enter a valid phone number starting with either '+977' or '977'(Nepali codes) or 9 followed by 9 or 10 digits as required.",
              },
            })}
          />
        </div>
        <p className="showError">{errors.phNumber?.message}</p>
        <br />

        <label htmlFor="exampleInputUserDate" className="form-label">
          Date of birth:
        </label>
        <DatePicker
          id="exampleInputDate"
          className="form-control"
          selected={selectDate}
          onChange={handleOnDateChange}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <p className="showError">{errors.dob?.message}</p>

        <label htmlFor="exampleInputUserAge" className="form-label">
          Age:
        </label>
        <input
          type="number"
          disabled={selectDate || !selectDate}
          className="form-control"
          id="age"
          aria-describedby="emailHelp"
          {...register("age", {
            // disabled: true,
            valueAsNumber: true,
            required: "User's age is required.",
          })}
        />
        <p className="showError">{errors.age?.required}</p>
        <button className=" submitBtn btn btn-primary my-3">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Form;
