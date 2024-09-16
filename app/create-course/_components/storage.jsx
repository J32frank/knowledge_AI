import React from 'react'

let selectedValue = null;

export const setSelectedValue = (value) => {
  selectedValue = value;
};

export const getSelectedValue = () => {
  return selectedValue;
};