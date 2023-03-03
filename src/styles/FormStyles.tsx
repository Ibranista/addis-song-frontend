import React from "react";
import styled from "@emotion/styled";
function FormStyles() {
  const FormContainer = styled.form`
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    margin: 20px auto;
    max-width: 500px;
    wrap: wrap;
    &:focus {
      box-shadow: 0 0 5px #0077ff;
      cursor: pointer;
    }
    label {
      margin-top: 10px;
      font-size: 15px;
    }

    input {
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      width: 60%;
      max-width: 400px;

      &:focus {
        outline: none;
        border-color: #0077ff;
        box-shadow: 0 0 5px #0077ff;
      }
    }
    // add media query for mobile
    @media (max-width: 500px) {
      section {
        flex-direction: column;
      }
    }
    section {
      display: flex;
      width: 100%;
      justify-content: space-between;
      wrap: wrap;
    }
    button {
      margin: auto;
      background-color: grey;
      color: #fff;
      border-radius: 5px;
      border: none;
      padding: 10px 20px;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: black;
        color: #fff;
      }
    }
  `;
  return FormContainer;
}

export default FormStyles;
