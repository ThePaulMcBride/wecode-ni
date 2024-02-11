import Select from "react-select";

import config from "../config";
import React from "react";
const options = config.tags;

export default React.forwardRef<any, any>(function TagInput(props, ref) {
  return (
    <div className="focus-within:ring rounded">
      <Select
        ref={ref}
        instanceId="tags"
        id="tags"
        inputId="tags-input"
        openMenuOnFocus
        closeMenuOnSelect={false}
        value={
          props.value
            ? props.value.map((tag) =>
                options.find((option) => option.value === tag)
              )
            : []
        }
        components={{
          DropdownIndicator,
          IndicatorSeparator,
          ClearIndicator,
          MultiValue,
        }}
        options={options}
        isMulti
        onChange={(value) => props.onChange(value)}
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "none",
            border: "none",
            boxShadow: "none",
            "&:hover": {
              border: "none",
              boxShadow: "none",
            },
          }),
          container: (provided) => ({
            ...provided,
            zIndex: 100,
            borderRadius: "4px",
            borderColor: "#F4F4F5",
            backgroundColor: "#F4F4F5",
            outline: "none",
            "&:hover": {
              borderColor: "#F4F4F5",
              backgroundColor: "#F4F4F5",
            },
          }),
          input: (provided) => ({
            ...provided,
            outline: "none",
            padding: "0.5rem 0.4rem",
          }),
          placeholder: (provided) => ({
            ...provided,
            marginLeft: "0.5rem",
            color: "#4a5568",
          }),
        }}
      />
    </div>
  );
});

function DropdownIndicator(props) {
  return (
    <span className="px-2 text-gray-700" {...props.innerProps}>
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </span>
  );
}

function ClearIndicator(props) {
  return (
    <span className="px-3 text-gray-700" {...props.innerProps}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 348.333 348.334"
        className="fill-current h-2 w-2"
      >
        <g>
          <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85 c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563 c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85 l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554 L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z" />
        </g>
      </svg>
    </span>
  );
}

function IndicatorSeparator() {
  return <span className="w-px h-5 inline-block bg-gray-400 bg-red" />;
}

function MultiValue(props) {
  return (
    <span className="bg-primary-200 p-1 rounded text-sm text-primary-700 mr-1 flex-inline">
      {props.children}
      <span
        className="pl-2 pr-1 text-primary-700 inline-block"
        {...props.removeProps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 348.333 348.334"
          className="fill-current h-2 w-2"
        >
          <g>
            <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85 c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563 c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85 l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554 L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z" />
          </g>
        </svg>
      </span>
    </span>
  );
}
