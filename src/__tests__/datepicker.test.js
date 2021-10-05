import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { ReactDOM } from 'react';


import DatePicker from '../elements/datepicker';
import { useEventCallback } from '@material-ui/core';


let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


// кейс с иммитацией ввода клиентом даты в поле ввода.
// тест фейлится пока по непонятным причинам
it('test types invalid date to datepicker 2', async () => {
  let date = null;
  const str = 'Ошибочный формат даты';
  const handleOnChange = jest.fn(value => date = value);
  act(() => {
    render(
      <DatePicker
        label="Дата"
        onChange={handleOnChange}
        value={date}
      />,
      container
    );
  });
  
  
  let input = screen.getByRole('textbox'); // находим поле ввода
  expect(input).toBeInTheDocument();

  userEvent.type(input, '1');
  expect(handleOnChange).toBeCalledTimes(1);

  await waitFor(() => {
      expect(screen.getByText(str)).toBeInTheDocument();
  });  
  expect(screen.getByText(str)).toBeInTheDocument();

  
  screen.debug();
  
});
