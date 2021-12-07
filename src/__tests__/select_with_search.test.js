import React from 'react';
import { render, fireEvent, within, waitFor, screen,
    getByRole as globalGetByRole,
    getByText as globalGetByText, 
} from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import SelectWithSearch from '../components/select_with_search';

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

describe('test renderers component', () => {

    it('render', async () => {
        await act(async () => {
            render(
                <SelectWithSearch
                    value={null}
                    label="test label"
                    apiHandler={() => jest.fn()}
                    onChange={() => jest.fn()}
                    options={['test1', 'test2', 'test3']}
                />, 
                container);
        });

        const labelElement = screen.getByLabelText('test label');
        const inputElement = screen.getByRole('textbox');
        const clearButton = screen.getByRole('button', { hidden: true, name: '' });
        const openButton = screen.getByRole('button', { name: 'Open' });

        expect(labelElement).toBeInTheDocument();        
        expect(inputElement).toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();
        expect(openButton).toBeInTheDocument();        
        
        await act(async () => {
            fireEvent.click(openButton)
        });
        expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();        
    });

    it('test render', async () => {
        const onChangeMock = jest.fn();
        const apiHandleMock = jest.fn();
        const { queryByRole, queryByText } = render(
            <SelectWithSearch
                value={null}
                label="test label"
                apiHandler={apiHandleMock}
                onChange={onChangeMock}
                options={['first', 'second', 'third']}
            />,
            container
        );

        const rootElement = screen.getByRole('combobox');        
                
        const inputElement = globalGetByRole(rootElement, 'textbox');

        expect(rootElement).toBeInTheDocument();
        expect(queryByRole('listbox')).toBeNull();
        userEvent.click(inputElement);
        // userEvent.type(inputElement, 'D');
        // expect(inputElement).toHaveValue('D'); // Это работает

        const listBox = queryByRole('listbox');
        expect(listBox).toBeDefined();

        fireEvent.keyDown(rootElement, { key: 'ArrowDown' });
        fireEvent.keyDown(rootElement, { key: 'Enter' });
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(inputElement).toHaveValue('first');

        const clearButton = queryByRole('button', { label: 'Очистить' });
        expect(clearButton).toBeInTheDocument();

        rootElement.focus();
        fireEvent.click(clearButton);

        // await waitFor(() => {
        //     expect(inputElement).toHaveValue(undefined);
        // });
        // expect(listBox).not.toBeInTheDocument();
        // expect(queryByRole('presentation')).not.toBeInTheDocument();

        // screen.debug();
    });

    it('test console.warn call', () => {
        global.console={warn: jest.fn()};
        act(() => {
          render(<SelectWithSearch />, container);
        });
        expect(console.warn).toBeCalled();
    });
});