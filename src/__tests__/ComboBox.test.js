import {
    fireEvent,
    getByRole as globalGetByRole,
    getByText as globalGetByText,
    render,
} from '@testing-library/react';
import React from 'react';
import ComboBox, { top100Films } from '../components/ComboBox';

it('that autocomplete works', async () => {
    const { getByTestId, getByRole, queryByRole } = render(<ComboBox />, {});

    const AutoCompleteSearch = getByTestId('autocomplete-search');
    const Input = globalGetByRole(AutoCompleteSearch, 'textbox');

    expect(queryByRole('listbox')).toBeNull();

    fireEvent.mouseDown(Input);
    const ListBox = getByRole('listbox');
    expect(ListBox).toBeDefined();
    const menuItem1 = globalGetByText(ListBox, top100Films[0].title);
    fireEvent.click(menuItem1);
    expect(queryByRole('listbox')).toBeNull();

    fireEvent.mouseDown(Input);
    const ListBoxAfter = getByRole('listbox');
    expect(ListBoxAfter).toBeDefined();
    const menuItem2 = globalGetByText(ListBoxAfter, top100Films[1].title);
    fireEvent.click(menuItem2);
    expect(queryByRole('listbox')).toBeNull();
});