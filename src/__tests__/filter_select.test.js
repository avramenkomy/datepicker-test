import React from 'react';
import { render, fireEvent, screen,
    getByRole as globalGetByRole,
} from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import FilterSelect from '../components/filter_select';


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

const foo = (type, value) => jest.fn();

const props_metric = {
    filter_type: 'metric',
    filter_name: 'ORG_UNIT_NAME',
    label: 'Признак организации',
    filters_data: {},
    onChange: foo,
  }

describe('test cases for component filter_select', () => {
    it('test simple render', async () => {
        act(() => {
            render(<FilterSelect {...props_metric}/>, container)
        });
        expect(screen.getByLabelText('Признак организации')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { hidden: true, name: '' })).toBeInTheDocument();

        // screen.debug();
    });

    it('test user event selected fake data', async () => {

        act(() => {
            render(<FilterSelect {...props_metric}/>, container);
        });

        const rootElement = screen.getByRole('combobox');
        const inputElement = globalGetByRole(rootElement, 'textbox');
        const openButton = screen.getByRole('button', { name: 'Open' });

        expect(rootElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
        expect(screen.queryByRole('listbox')).toBeNull();
        await act(async () => {
            fireEvent.mouseDown(inputElement);
        });
        expect(screen.queryByRole('listbox')).toBeDefined();
        expect(screen.getByText('test 0')).toBeInTheDocument();

        screen.debug();
    });
});