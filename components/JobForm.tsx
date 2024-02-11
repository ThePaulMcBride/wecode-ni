"use client";

import React from "react";
import { EmploymentType } from "db";
import TagsInput from "components/tags-input";
import { Controller, useForm } from "react-hook-form";
import TextEditor from "./TextEditor";

type CheckboxOption = { key: EmploymentType; value: string }[];

const checkboxOptions: CheckboxOption = [
  { key: "FULL_TIME", value: "Full time" },
  { key: "PART_TIME", value: "Part time" },
  { key: "CONTRACTOR", value: "Contractor" },
  { key: "TEMPORARY", value: "Temporary" },
  { key: "INTERN", value: "Intern" },
];

export interface JobProps {
  title: string;
  description: string;
  tags: string[];
  employmentType: string[];
  salaryData: {
    currency: string;
    value: string;
    max: string;
  };
  location: string;
  applyUrl: string;
  howToApply: string;
  companyTitle: string;
  companyUrl: string;
}

interface Errors {
  title?: string;
  description?: string;
  tags?: string;
  employmentType?: string;
  salaryData?: string;
  location?: string;
  applyUrl?: string;
  howToApply?: string;
  companyTitle?: string;
  companyUrl?: string;
}

interface JobFormProps {
  handleSubmit: (job: JobProps) => void;
  job: JobProps;
  errors?: Errors;
  processing: boolean;
  submitLabel: string;
}

function getJobFormData(job) {
  return {
    title: job.title,
    description: job.description,
    tags: job.tags,
    employmentType: job.employmentType,
    salaryData: job.salaryData,
    location: job.location,
    applyUrl: job.applyUrl,
    howToApply: job.howToApply,
    companyTitle: job.companyTitle,
    companyUrl: job.companyUrl,
  };
}

export const JobForm = (props: JobFormProps) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: getJobFormData(props.job),
  });

  const errors = props.errors || {};

  return (
    <form onSubmit={handleSubmit(props.handleSubmit)}>
      <div className="form-section mb-8">
        <h3 className="text-gray-800 mb-4 font-semibold">Job Details</h3>
        <p className="text-gray-600 mb-6">
          Tell us about the job. This is your chance to convince candidates that
          this is the job for them.
        </p>

        <label htmlFor="title" className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            Job Title
          </span>
          <input
            {...register("title")}
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic mt-2">
              Job title is a required field and must be at least 2 characters
              long
            </p>
          )}
        </label>

        <label htmlFor="salary" className="block mb-4">
          <span className="uppercase tracking-wider text-xs font-bold">
            Salary
          </span>
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            This section is optional, but jobs with a clear salary range attract
            more applicants
          </p>
          <div className="md:grid grid-cols-5 gap-4">
            <div className="mb-4 md:mb-0">
              <label
                htmlFor="currency"
                className="md:sr-only uppercase tracking-wider text-xs font-bold"
              >
                Currency
              </label>
              <div className="relative">
                <select
                  {...register("salaryData.currency")}
                  className={`block appearance-none w-full bg-gray-100 border border-gray-100 text-gray-700 py-2 px-4 pr-8 rounded mt-2 focus:ring focus focus:outline-none ${
                    errors["salaryData,currency"] && "border-red-500"
                  }`}
                >
                  <option value="">Currency</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
                <div
                  className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}
                >
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-span-2 mb-4 md:mb-0">
              <label
                htmlFor="salary-amount"
                className="md:sr-only uppercase tracking-wider text-xs font-bold"
              >
                Amount or Minimum
              </label>
              <input
                {...register("salaryData.value")}
                placeholder="Amount or Minimum"
                className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
              />
            </div>
            <div className="col-span-2 mb-4 md:mb-0">
              <label
                htmlFor="salary-max"
                className="md:sr-only uppercase tracking-wider text-xs font-bold"
              >
                Maximum
              </label>
              <input
                {...register("salaryData.max")}
                placeholder="Maximum"
                className={`col-span-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
              />
            </div>
          </div>
          {errors.salaryData && (
            <p className="text-red-500 text-xs italic mt-2">
              If you specify a currency, then you must provide a numeric value
              for amount. If you wish to omit salary data, make sure all fields
              are blank
            </p>
          )}
        </label>

        <label htmlFor="location" className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            Location
          </span>
          <input
            {...register("location")}
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs italic mt-2">
              Location is a required field
            </p>
          )}
        </label>

        <div className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            Employment Type
          </span>
          {checkboxOptions.map((checkbox) => {
            return (
              <div className="mt-4" key={checkbox.key}>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      {...register("employmentType")}
                      type="checkbox"
                      id={checkbox.key}
                      value={checkbox.key}
                      className="form-checkbox border border-solid rounded h-4 w-4 text-teal-500 transition duration-150 ease-in-out focus:ring-teal-500"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-5">
                    <label
                      htmlFor={checkbox.key}
                      className="font-medium text-gray-700"
                    >
                      {checkbox.value}
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <label htmlFor="tags" className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            Tags
          </span>
          <Controller
            name="tags"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TagsInput
                value={value}
                onChange={(value) =>
                  onChange(value ? value.map((tag) => tag.value) : [])
                }
              />
            )}
          />
          {errors.tags && (
            <p className="text-red-500 text-xs italic mt-2">
              Only tags listed are allowed
            </p>
          )}
        </label>

        <label htmlFor="description" className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            Description
          </span>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextEditor {...field} />}
          />
        </label>
      </div>

      <div className="form-section mb-8">
        <h3 className="text-gray-800 mb-4 font-semibold">How to Apply</h3>
        <p className="text-gray-600 mb-6">
          The applicant needs to know how to apply! Include any specific
          requirements in the section below.
        </p>

        <label htmlFor="applyUrl" className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            URL/Email Address To Apply
          </span>
          <input
            {...register("applyUrl")}
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
          />
          {errors.applyUrl && (
            <p className="text-red-500 text-xs italic mt-2">
              This field is required and must be a valid email or url
            </p>
          )}
        </label>

        <label htmlFor="howToApply">
          <span className="uppercase tracking-wider text-xs font-bold">
            How to apply
          </span>
          <Controller
            name="howToApply"
            control={control}
            render={({ field }) => <TextEditor {...field} />}
          />
        </label>
      </div>

      <div className="form-section mb-8">
        <h3 className="text-gray-800 mb-4 font-semibold">Company Details</h3>
        <p className="text-gray-600 mb-6">
          Tell us some details about the company behind the job. This helps
          candidates find out more about you.
        </p>

        <label htmlFor="companyTitle" className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            Company Name
          </span>
          <input
            {...register("companyTitle")}
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
          />
          {errors.companyTitle && (
            <p className="text-red-500 text-xs italic mt-2">
              Company name is a required field
            </p>
          )}
        </label>

        <label htmlFor="companyUrl" className="mb-4 block">
          <span className="uppercase tracking-wider text-xs font-bold">
            Company URL
          </span>
          <input
            {...register("companyUrl")}
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
          />
          {errors.companyUrl && (
            <p className="text-red-500 text-xs italic mt-2">
              Company url is a required field
            </p>
          )}
        </label>
      </div>

      <button
        disabled={props.processing}
        className="bg-primary-500 hover:bg-primary-600 w-full text-white font-bold py-3 px-4 rounded"
      >
        {props.processing ? "Loading..." : props.submitLabel}
      </button>
    </form>
  );
};
